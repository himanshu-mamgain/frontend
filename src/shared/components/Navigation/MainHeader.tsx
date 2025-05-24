import "./MainHeader.css";
import type { MainHeaderProps } from "./navigation.types";

const MainHeader = (props: MainHeaderProps) => {
  return <header className="main-header">{props.children}</header>;
};

export default MainHeader;
