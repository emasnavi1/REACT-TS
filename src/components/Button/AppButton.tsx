import { ReactNode } from "react";

interface Props {
  buttonColor?: "primary" | "secondary" | "success"; // ? means the item is optional, if not provided the value 'primary' will be used. Doing the union operator will help you limit the
  // possible values you could use to pass to this component as the value of its buttonColor property
  children: ReactNode;
  onButtonClick: () => void;
}

export default function AppButton({
  buttonColor = "primary", // you set the default value to 'primary'
  children,
  onButtonClick,
}: Props) {
  return (
    // The line that has been removed was the original line from bootstrap, but you
    // wanted to dinmically change the color, so you are setting the ClassName value
    // dynamically
    // <button type="button" className="btn btn-primary">Primary</button>
    <button
      type="button"
      className={"btn btn-" + buttonColor}
      onClick={onButtonClick}
    >
      {children}
    </button>
  );
}
