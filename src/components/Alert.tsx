import { ReactNode } from "react";

// Children is a special prop which allows you to use something like <Alert> Text to be shown </Alert> when you use it
interface Props {
  children: ReactNode;
  onClose: () => void;
}

function Alert({ children, onClose }: Props) {
  return (
    <div
      className="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
}

export default Alert;
