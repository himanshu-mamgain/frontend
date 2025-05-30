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
  asOverlay: boolean;
}