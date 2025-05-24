import type { CardProps } from "./elements.types";
import "./Card.css";

const Card = (props: CardProps) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
