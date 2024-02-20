import React, { ReactNode, useState } from "react";
import styles from "./ExpandableText.module.css";

interface Props {
  children: ReactNode;
  maxChars?: number;
}

export default function ExpandableText({ children, maxChars = 100 }: Props) {
  const [isExpanded, setExpandState] = useState(false);

  const handleButtonClick = () => {
    setExpandState(!isExpanded);
  };

  const text = isExpanded
    ? children
    : typeof children === "string"
    ? children.substring(0, 100) + "..."
    : children;

  // Check if children is defined before rendering
  if (!children || typeof children !== "string") return null;

  if (children.length <= maxChars) return <p>{children}</p>;

  return (
    <p>
      {text}
      {
        <button onClick={handleButtonClick}>
          {isExpanded ? "Less" : "More"}
        </button>
      }
    </p>
  );
}
