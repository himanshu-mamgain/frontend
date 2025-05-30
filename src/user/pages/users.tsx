import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
// import DUMMY_USERS from "../DUMMY_USERS.json";
import type { IResponse } from "../../interface";
import type { Users } from "../types/user.types";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Users = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadedUsers, setLoadedUsers] = useState<Users[]>();

  useEffect(() => {
    setIsLoading(true);

    const sendRequest = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users`);

        const responseData: IResponse = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        } else {
          setIsLoading(false);
          setLoadedUsers(responseData.payload);
        }
      } catch (error: any) {
        setIsLoading(false);
        setError(error.message || "Something went wrong, please try again.");
      }
      setIsLoading(false);
    };

    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error!} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers!} />}
    </React.Fragment>
  );
};

export default Users;
