import { useState } from "react";
import Alert from "./components/Alert";
import { AppButton, AppButtonVanillaStyled } from "./components/Button";
import {
  ListGroup,
  ListGroupWithStyled,
  ListGroupMaterialUI,
} from "./components/ListGroup";

interface Item {
  id: number;
  name: string;
}

function App() {
  let items = [
    {
      id: 1,
      name: "Ehsan Masnavi",
    },
    {
      id: 2,
      name: "Laleh Ghojoughy",
    },
    {
      id: 3,
      name: "Aynova Masnavi",
    },
  ];

  const handleSelectItem = (item: Item) => {
    console.log(
      item.name + " with the id of " + item.id + " has been clicked!"
    );
  };

  const handleButtonClick = () => {
    setAlertVisibility(true);
    console.log("Button Pressed!");
  };

  const handleAlertClose = () => {
    setAlertVisibility(false);
  };

  const [alertVisbile, setAlertVisibility] = useState(false);

  return (
    <>
      <ListGroupMaterialUI
        items={items}
        heading="Members"
        onSelectItem={handleSelectItem}
      />

      {alertVisbile && (
        <Alert onClose={handleAlertClose}>
          <h1> Alert! </h1>
          <p> Ahoyy! </p>
        </Alert>
      )}

      <AppButton onButtonClick={handleButtonClick} buttonColor="success">
        This is your button
      </AppButton>

      <AppButtonVanillaStyled
        onButtonClick={handleButtonClick}
        buttonColor="success"
      >
        This is your vanilla styled button
      </AppButtonVanillaStyled>
    </>
  );
}

export default App;
