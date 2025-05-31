import React, { useContext } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";
import { getApiUrl } from "../../shared/util/apiUrl";
import { useNavigate } from "react-router-dom";

import "./PlaceForm.css";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value!);
      formData.append("description", formState.inputs.description.value!);
      formData.append("address", formState.inputs.address.value!);
      formData.append("image", formState.inputs.image.value!);
      await sendRequest(
        {
          url: getApiUrl("ADD_PLACE"),
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            authorization: `Bearer ${auth.token}`,
          },
        },
        // JSON.stringify({
        //   title: formState.inputs.title.value,
        //   description: formState.inputs.description.value,
        //   address: formState.inputs.address.value,
        // })
        formData
      );
      // Redirect the user to a different page
      navigate("/");
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error!} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText={"Please enter a valid title"}
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText={"File must be less than 100KB."}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
