import { useState } from "react";

interface Item {
  id: number;
  name: string;
}

interface Props {
  items: Item[];
  heading: string;
}

function ListGroup({ items, heading }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = (item: any) => {
    setSelectedIndex(item.id);
    console.log(item.name + " Clicked!");
  };

  return (
    <>
      <h1>{heading}</h1>
      <ul className="list-group">
        {items.length === 0 && <p>No items available to show! </p>}
        {items.map((item) => (
          <li
            className={
              item.id === selectedIndex
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item.id}
            onClick={() => handleClick(item)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
