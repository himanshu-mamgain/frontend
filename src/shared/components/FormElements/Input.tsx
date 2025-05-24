import { useEffect, useReducer, type ReactNode } from "react";
import type {
  InputProps,
  InputState,
  InputValidators,
} from "./formElements.types";
import { validate } from "../../util/validators";

import "./Input.css";

const inputReducer = (
  state: { value: string | undefined; isTouched: boolean; isValid: boolean },
  action: { type: string; val?: string; validators?: InputValidators }
) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val!, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props: InputProps): ReactNode | Promise<ReactNode> => {
  const [inputState, dispatch]: [
    InputState,
    React.ActionDispatch<
      [
        action: {
          type: string;
          val?: string;
          validators?: InputValidators;
        }
      ]
    >
  ] = useReducer(inputReducer, {
    value: props.value || "",
    isTouched: false,
    isValid: props.valid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    props.onInput(props.id, inputState.value!, inputState.isValid);
  }, [id, value, inputState, isValid, onInput]);

  const changeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: "CHANGE",
      val: event?.target?.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control__invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
