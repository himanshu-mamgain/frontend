import Modal from "./Modal";
import Button from "../FormElements/Button";
import type { IErrorModalProps } from "./elements.types";

const ErrorModal = (props: IErrorModalProps) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
