import { useEffect, useRef, useState } from "react";
import type { IImageUploadProps } from "../../../interface";
import Button from "./Button";

import "./ImageUpload.css";

const ImageUpload = (props: IImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>();
  const [isValid, setIsValid] = useState<boolean>(false);

  const filePickRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      console.log("fileRead", fileReader);
      setPreviewUrl(fileReader.result?.toString());
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pickedFile: File | null = null;
    let fileIsValid: boolean = isValid;

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickRef.current?.click();
  };

  return (
    <div className="form-control">
      <input
        type="file"
        id={props.id}
        ref={filePickRef}
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          {previewUrl ? "CHANGE IMAGE" : "PICK IMAGE"}
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
