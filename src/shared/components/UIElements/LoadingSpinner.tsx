
import type { ILoadingSpinnerProps } from "../../../interface";
import "./LoadingSpinner.css";

const LoadingSpinner = (props: ILoadingSpinnerProps) => {
  return (
    <div className={`${props.asOverlay && "loading-spinner__overlay"}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
