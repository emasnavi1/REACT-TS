import { ReactNode } from "react";

// Children is a special prop which allows you to use something like <Alert> Text to be shown </Alert> when you use it
interface Props {
  children: ReactNode;
}

function Alert({ children }: Props) {
  return (
    <div className="alert alert-primary" role="alert">
      {children}
    </div>
  );
}

export default Alert;
