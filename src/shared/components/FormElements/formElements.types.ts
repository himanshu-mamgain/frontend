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

export type InputTypes = "text" | "number" | "password";
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
