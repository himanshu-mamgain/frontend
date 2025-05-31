export interface IAuthContext {
  isLoggedIn: boolean;
  token: string | null;
  userId: string | null;
  login: (token: string, userId: string, expirationDate: Date) => void;
  logout: () => void;
}

export interface IStoredData {
  token: string;
  userId: string;
  expiration: string;
}

export interface IUsers {
  _id: string;
  image: string;
  name: string;
  places: number;
}

export type UserItemProps = Omit<IUsers, "places"> & { placeCount: number };

export interface Places {
  _id: string;
  imageUrl: string;
  title: string;
  description: string;
  address: string;
  creator: string;
  location: PlacesLocation;
}

export interface PlacesLocation {
  lat: number;
  lng: number;
}

export type PlaceItemProps = Omit<
  Places,
  "imageUrl" | "creator" | "location"
> & {
  image: string;
  creatorId: string;
  coordinates: PlacesLocation;
  onDelete: (deletedPlaceId: string) => void;
};

export interface InitialInputs {
  [x: string]: {
    value: string | undefined;
    isValid: boolean;
  };
}

import type React from "react";

export interface AvatarProps {
  className?: string;
  style?: React.CSSProperties;
  image: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CardProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export interface BackDropProps {
  onClick: () => void;
}

export interface MapProps {
  className?: string;
  style?: React.CSSProperties;
  center: center;
  zoom: number;
}

interface center {
  lng: number;
  lat: number;
}

export interface ToasterProps {
  show: boolean;
  message: string;
  type: "success" | "error";
  onCancel: () => void;
}

export interface IErrorModalProps {
  onClear: () => void;
  error: string;
}

export interface ILoadingSpinnerProps {
  asOverlay?: boolean;
}

export interface IResponse {
  success: boolean;
  statusCode: number;
  message: string;
  payload: any;
}

export interface ISendRequest {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
}

export type ButtonTypes = "button" | "submit" | "reset";

export interface ButtonProps {
  href?: string;
  inverse?: boolean;
  danger?: boolean;
  size?: string;
  children: string;
  to?: string;
  type?: ButtonTypes;
  onClick?: () => void;
  disabled?: boolean;
}

export type InputTypes = "text" | "email" | "number" | "password";
export type InputElementTypes = "input" | "textarea";

export interface InputState {
  value: string | undefined;
  isTouched: boolean;
  isValid: boolean;
}

export interface InputProps {
  element: InputElementTypes;
  id: string;
  type?: InputTypes;
  label: string;
  placeholder?: string;
  className?: string;
  rows?: number;
  validators?: InputValidators;
  errorText: string;
  onInput: (id: string, value: string | undefined, isValid: boolean) => void;
  initialValue?: string | undefined;
  initialValid?: boolean;
}

export interface InputValidators {}

export interface ModalOverlayProps {
  headerClass?: string;
  header: string;
  onSubmit?: () => void;
  contentClass?: string;
  children?: React.ReactNode;
  footerClass?: string;
  footer?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface ModalProps extends ModalOverlayProps {
  show: boolean;
  onCancel: () => void;
}

export interface MainHeaderProps {
  children: React.ReactNode;
}

export interface MainNavigationProps {}

export interface SideDrawerProps {
  children: React.ReactElement;
  show: boolean;
  onClick: () => void;
}

export interface IImageUploadProps {
  id: string;
  onInput: (id: string, pickedFile: any, isValid: boolean) => void;
  errorText: string;
  center?: boolean;
}
