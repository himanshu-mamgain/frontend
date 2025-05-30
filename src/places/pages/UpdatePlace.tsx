import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { getApiUrl } from "../../shared/util/apiUrl";
import { AuthContext } from "../../shared/context/auth-context";
import type { Places } from "../../interface";
// import DUMMY_PLACES from "../DUMMY_PLACES.json";

import "./PlaceForm.css";

const UpdatePlace = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [loadedPlace, setLoadedPlace] = useState<Places>();
  const auth = useContext(AuthContext);
  const placeId: string | undefined = useParams().placeId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
      address: {
        value: "",
        isValid: true,
      },
    },
    true
  );

  // const identifiedPlace = DUMMY_PLACES.find((p) => p._id === Number(placeId));

  // useEffect(() => {
  //   if (identifiedPlace) {
  //     setFormData(
  //       {
  //         title: {
  //           value: identifiedPlace?.title,
  //           isValid: true,
  //         },
  //         description: {
  //           value: identifiedPlace?.description,
  //           isValid: true,
  //         },
  //         address: {
  //           value: identifiedPlace?.address,
  //           isValid: true,
  //         },
  //       },
  //       true
  //     );
  //   }
  //   setIsLoading(false);
  // }, [setFormData, identifiedPlace]);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await sendRequest({
          url: getApiUrl("GET_PLACE_BY_ID", placeId),
          method: "GET",
          headers: {
            authorization: `Bearer ${auth.token}`,
          },
        });

        setLoadedPlace(response?.payload);

        setFormData(
          {
            title: {
              value: loadedPlace?.title,
              isValid: true,
            },
            description: {
              value: loadedPlace?.description,
              isValid: true,
            },
            address: {
              value: loadedPlace?.address,
              isValid: true,
            },
          },
          true
        );
      } catch (error: any) {
        console.error(error);
      }
    };
    fetchPlace();
  }, [sendRequest, placeId]);

  const placeUpdateSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await sendRequest(
        {
          url: getApiUrl("UPDATE_PLACE_BY_ID", placeId),
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${auth.token}`,
          },
        },
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        })
      );
      // Redirect the user to a different page
      navigate(`/${auth.userId}/places`);
    } catch (error: any) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error!} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />
          <Input
            id="address"
            element="input"
            label="Address"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid address."
            onInput={inputHandler}
            initialValue={loadedPlace.address}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
