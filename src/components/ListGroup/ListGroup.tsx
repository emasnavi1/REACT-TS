import { useState } from "react";
import styles from "./ListGroup.module.css"; // By adding the kyword 'module' you limit the scope of this CSS to this component, so the CSS content would not be global

interface Item {
  id: number;
  name: string;
}

interface Props {
  items: Item[];
  heading: string;
  // here you are trying to pass a fucntion as a prop, it reads it is fucntion
  // that receives an input of type string and retunrs 'void'
  onSelectItem: (item: Item) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = (item: Item) => {
    setSelectedIndex(item.id);
    console.log(item.name + " Clicked!");
  };

  return (
    <>
      <h1>{heading}</h1>
      <ul className="list-group">
        {/* <ul className={[styles.listGroup, styles.container].join(" ")}>  */}
        {items.length === 0 && <p>No items available to show! </p>}
        {items.map((item) => (
          <li
            className={
              item.id === selectedIndex
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item.id}
            onClick={() => {
              handleClick(item);
              onSelectItem(item);
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
