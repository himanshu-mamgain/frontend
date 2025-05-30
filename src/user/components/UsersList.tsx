import type { IUsers } from "../../interface";
import UsersItem from "./UsersItem";

import "./UsersList.css";

const UsersList = (props: { items: IUsers[] }) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No users found.</h2>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map((user) => (
        <UsersItem
          key={user._id}
          _id={user._id}
          image={user.image}
          name={user.name}
          placeCount={user.places}
        />
      ))}
    </ul>
  );
};

export default UsersList;
