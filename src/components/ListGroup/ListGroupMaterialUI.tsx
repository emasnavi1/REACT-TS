import { useState } from "react";
import {List, ListItem, styled } from '@mui/material';
import {ListItemProps} from '@mui/material/ListItem'

// const List = styled.ul`
//   list-style: none;
//   padding: 0;
// `;

interface CustomizedListItemProps extends ListItemProps{
  active?: boolean;
}

const setListItemStyle = (props: CustomizedListItemProps) => {
    console.log("Executing")
    return props.active ? "Yellow" : ""; // or use an empty string
  };
 
//   const CustomListItem = styled(ListItem)<CustomizedListItemProps>((props:CustomizedListItemProps) => ({
//     padding: '5px 0',
//     backgroundColor: `${(props) => props.active === 'true' ? 'yellow' : ''}`,
//     color: 'Green',
// }));


const CustomListItem = styled(ListItem)<CustomizedListItemProps>(
    ({ active }) => ({
      padding: "5px 0",
      backgroundColor: active ? "yellow" : "",
      color: "green",
    })
  );

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
            active={(item.id === selectedIndex)}
            key={item.id}
            onClick={() => {
              handleClick(item);
              onSelectItem(item);
            }}
          >
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
