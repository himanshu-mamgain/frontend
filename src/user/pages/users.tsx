import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { getApiUrl } from "../../shared/util/apiUrl";
import type { IUsers } from "../../interface";
// import DUMMY_USERS from "../DUMMY_USERS.json";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState<IUsers[]>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest({
          url: getApiUrl("GET_ALL_USERS"),
          method: "GET",
        });

        setLoadedUsers(responseData?.payload);
      } catch (error: any) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error!} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers!} />}
    </React.Fragment>
  );
};

export default Users;
