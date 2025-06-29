import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import type { UserItemProps } from "../../interface";

import "./UserItem.css";

const UsersItem = (props: UserItemProps): ReactNode | Promise<ReactNode> => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props._id}/places`}>
          <div className="user-item__image">
            <Avatar
              image={props.image}
              alt={props.name}
            />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UsersItem;
