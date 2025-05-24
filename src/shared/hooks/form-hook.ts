import { useCallback, useReducer } from "react";
import type { InitialInputs } from "./hooks.type";

const formReducer = (
  state: {
    isValid: boolean;
    inputs: { [x: string]: { value: string | undefined; isValid: boolean } };
  },
  action: {
    inputs?: any;
    formIsValid?: any;
    type: "INPUT_CHANGE" | "SET_DATA";
    value?: string | undefined;
    inputId?: string;
    isValid?: boolean;
  }
) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;

      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid!;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId!]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (
  initialInputs: InitialInputs,
  initialFormValidity: boolean
): [
  {
    inputs: InitialInputs;
    isValid: boolean;
  },
  (id: string, value: string | undefined, isValid: boolean) => void,
  setFormData: (inputData: any, formValidity: any) => void
] => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback(
    (id: string, value: string | undefined, isValid: boolean) => {
      dispatch({ type: "INPUT_CHANGE", value: value, isValid, inputId: id });
    },
    []
  );

  const setFormData = useCallback((inputData: any, formValidity: any) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
