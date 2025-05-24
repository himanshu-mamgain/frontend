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