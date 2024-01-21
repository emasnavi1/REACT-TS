import { useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

interface Props {
  onClick: () => void;
}

export default function Like({ onClick }: Props) {
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
    console.log("Status is " + isLiked);
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
