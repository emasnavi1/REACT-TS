import { useState } from "react";
import { List, ListItem, styled } from "@mui/material";
import { ListItemProps } from "@mui/material/ListItem";
import { FaUserCircle } from "react-icons/fa";

// const List = styled.ul`
//   list-style: none;
//   padding: 0;
// `;

interface CustomizedListItemProps extends ListItemProps {
  active?: string;
}

const setListItemStyle = ({ active }: CustomizedListItemProps) => ({
  padding: "5px 0",
  backgroundColor: active === "true" ? "orange" : "",
  color: "black",
});

//   const CustomListItem = styled(ListItem)<CustomizedListItemProps>((props:CustomizedListItemProps) => ({
//     padding: '5px 0',
//     backgroundColor: `${(props) => props.active === 'true' ? 'yellow' : ''}`,
//     color: 'Green',
// }));

// <CustomizedListItemProps> indicates the props that the styled component CustomListItem expects.
// This is a TypeScript syntax. It tells the TypeScript compiler the expected props interface for CustomListItem.
const CustomListItem = styled(ListItem)<CustomizedListItemProps>(
  ({ active }: CustomizedListItemProps) => ({
    padding: "5px 0",
    backgroundColor: active === "true" ? "yellow" : "",
    color: "green",
    "& .user-icon": {
      marginRight: "10px",
      color: active === "true" ? "red" : "inherit", // Use "inherit" to use the default color if not active
    },
  })
  // setListItemStyle      // This right here also works!
);

interface Item {
  id: number;
  name: string;
}

interface Props {
  items: Item[];
  heading: string;
  // here you are trying to pass a function as a prop, it reads it is fucntion
  // that receives an input of type string and retunrs 'void'
  onSelectItem: (item: Item) => void;
}

function ListGroupMaterialUI({ items, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = (item: Item) => {
    setSelectedIndex(item.id);
    console.log(item.name + " Clicked!");
  };

  return (
    <>
      <h1>{heading}</h1>
      {/* <ul className="list-group"> */}
      <nav>
        <List>
          {items.length === 0 && <p>No items available to show! </p>}
          {items.map((item) => (
            <CustomListItem
              active={(item.id === selectedIndex).toString()}
              key={item.id}
              onClick={() => {
                handleClick(item);
                onSelectItem(item);
              }}
            >
              <FaUserCircle
                className="user-icon"
                size={item.id === selectedIndex ? 40 : 20}
              />
              {item.name}
            </CustomListItem>
          ))}
          {/* </ul> */}
        </List>
      </nav>
    </>
  );
}

export default ListGroupMaterialUI;
