import React, { useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import type { Places } from "../../interface";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { getApiUrl } from "../../shared/util/apiUrl";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

// import DUMMY_PLACES from "../DUMMY_PLACES.json";

const UserPlaces = () => {
  const userId: string | undefined = useParams().userId;
  const [loadedPlaces, setLoadedPlaces] = useState<Places[]>();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await sendRequest({
          url: getApiUrl("GET_PLACES_BY_USER_ID", userId),
          method: "GET",
        });

        setLoadedPlaces(response?.payload);
      } catch (error: any) {
        console.error(error);
      }
    };
    fetchPlaces();
  }, [sendRequest]);

  const placeDeleteHandler = (deletedPlaceId: string) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces?.filter((places) => places._id !== deletedPlaceId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error!} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList
          // items={DUMMY_PLACES.filter((place) => place.creator === Number(userId))}
          items={loadedPlaces!}
          onDeletePlace={placeDeleteHandler}
        />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
