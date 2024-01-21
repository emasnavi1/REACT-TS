import styles from "./Button.module.css";
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
  const testFunction = () => {
    console.log([styles.btn, styles["btn-" + "success"]].join(" "));
  };

  const handleClick = () => {
    // this is how you wrap two functions if you need to do more than one mthod to be called on an onLcik event. in this case
    // you did this bcuae you wanted to see what is th result of the joining the className of the button
    onButtonClick(); // Execute the onButtonClick prop
    testFunction(); // Execute the testFunction
  };

  return (
    // The line that has been removed was the original line from bootstrap, but you
    // wanted to dinmically change the color, so you are set the ClassName value
    // dynamically
    // <button type="button" className="btn btn-primary">Primary</button>
    <button
      type="button"
      className={[styles.btn, styles["btn-" + buttonColor]].join(" ")} // Joining so the result would be something like: className={"btn btn-" + buttonColor}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
