import type { CardProps } from "../../../interface";

import "./Card.css";

const Card = (props: CardProps) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
