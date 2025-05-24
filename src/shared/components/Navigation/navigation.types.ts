import type React from "react";

export interface MainHeaderProps {
  children: React.ReactNode;
}

export interface MainNavigationProps {}

export interface SideDrawerProps {
  children: React.ReactElement;
  show: boolean;
  onClick: () => void;
}
