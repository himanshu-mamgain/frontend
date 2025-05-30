import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import type { IResponse } from "../../interface";

import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            }),
          }
        );

        const responseData: IResponse = await response.json();
        console.log(responseData);

        if (!response.ok) {
          throw new Error(responseData.message);
        } else {
          setIsLoading(false);
          auth.login();
        }
      } catch (error: any) {
        console.error(error);
        setError(error.message || "Something went wrong, please try again.");
      }
    } else {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formState.inputs.name.value,
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            }),
          }
        );

        const responseData: IResponse = await response.json();
        console.log(responseData);

        if (!response.ok) {
          throw new Error(responseData.message);
        } else {
          setIsLoading(false);
          auth.login();
        }
      } catch (error: any) {
        console.error(error);
        setError(error.message || "Something went wrong, please try again.");
      }
    }
    setIsLoading(false);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error!} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLoginMode ? "Login" : "Signup"} Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid email password, at least 5 characters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          {`SWITCH TO ${isLoginMode ? "SIGNUP" : "LOGIN"}`}
        </Button>
      </Card>
      ;
    </React.Fragment>
  );
};

export default Auth;
