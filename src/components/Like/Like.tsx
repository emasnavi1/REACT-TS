import { useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

interface Props {
  onClick: () => void;
}

export default function Like({ onClick }: Props) {
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
    console.log("Status is " + isLiked); // If you see this trace message in the browser you will see that its value is actually reverse of what it is set here
    // that is becuase the state Hook will update the state once the handleClick has been executed and the excution reached
    // the "};" at the end of the handleClick function
    onClick();
  };

  return (
    <>
      {!isLiked && (
        <AiOutlineLike onClick={handleClick} color="#ff6b81" size={30} />
      )}
      {isLiked && (
        <AiFillLike onClick={handleClick} color="#ff6b81" size={30} />
      )}
    </>
  );
}
