import { useState } from "react";
import styles from "./ListGroup.module.css"; // By adding the kyword 'module' you limit the scope of this CSS to this component, so the CSS content would not be global
import styled from "styled-components"; // The 'styled-component' is a library you installed to be able to include 'css' styling inside this tsx file, like how you do in ReactNative.
// Its not really lie how react native works, cause it creates a new html element basically.

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

interface ListItemProps {
  active: boolean;
}

const setListItemStyle = (props: ListItemProps) => {
  return props.active ? "Yellow" : "none";
};

const ListItem = styled.li<ListItemProps>`
  padding: 5px 0;
  background-color: ${(props) => (props.active ? "dodgerblue" : "none")};
  color: ${setListItemStyle};
`;

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

function ListGroupWithStyled({ items, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = (item: Item) => {
    setSelectedIndex(item.id);
    console.log(item.name + " Clicked!");
  };

  return (
    <>
      <h1>{heading}</h1>
      {/* <ul className="list-group"> */}
      <List>
        {items.length === 0 && <p>No items available to show! </p>}
        {items.map((item) => (
          <ListItem
            active={item.id === selectedIndex}
            key={item.id}
            onClick={() => {
              handleClick(item);
              onSelectItem(item);
            }}
          >
            {item.name}
          </ListItem>
        ))}
        {/* </ul> */}
      </List>
    </>
  );
}

export default ListGroupWithStyled;
