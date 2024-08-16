import { useState } from "react";
import Alert from "./components/Alert";
import { AppButton, AppButtonVanillaStyled } from "./components/Button";
import {
  ListGroup,
  ListGroupWithStyled,
  ListGroupMaterialUI,
} from "./components/ListGroup";

import { Like } from "./components/Like";
import { Navbar } from "./components/Navbar";
import Cart from "./components/Cart";
import { ExpandableText } from "./components/ExpandanbleText";

import {
  FormWithReactHookAndZod,
  FormWithReactHookForm,
  FormWithUseRef,
} from "./components/Form";
import ExpenseTrackerFrom from "./components/ExpenseTracker/ExpenseTrackerApp";
import UsersList from "./components/UsersList";

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

  const handleLikeClick = () => {
    console.log(
      "Like button has been clicked and it has been communicated to the App.tsx page"
    );
  };

  const [alertVisbile, setAlertVisibility] = useState(false);

  const [cartItems, setCartItems] = useState(["Product 1", "Prodcut 2"]);

  const clearCart = () => {
    setCartItems([]);
  };

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

      <Like onClick={handleLikeClick}></Like>

      <Navbar cartItemsCount={cartItems.length} />
      <Cart cartItems={cartItems} onClear={clearCart} />

      <ExpandableText>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas
        sapiente qui assumenda error ratione est asperiores amet necessitatibus
        quo, iure voluptatum corporis cum doloremque molestiae dolore?
        Blanditiis in soluta dignissimos! Nisi repellendus enim aspernatur
        dolorem quasi, fugiat, vitae dignissimos mollitia corporis alias
        consectetur maiores quam earum nam magnam illum. Dolor, harum fuga natus
        eos consequuntur odit! Aperiam illo minus fugiat ad harum distinctio
        illum amet, voluptatum magnam, corporis obcaecati consequuntur dolore
        numquam excepturi reprehenderit fugit recusandae fuga ut nemo nisi
        explicabo inventore expedita! Provident voluptates tempora eius
        voluptate, aspernatur optio eligendi praesentium sint cumque quo quidem
        excepturi rerum dolor vero?
      </ExpandableText>

      <ExpandableText>Lorem ipsum</ExpandableText>

      <FormWithUseRef></FormWithUseRef>

      <FormWithReactHookForm></FormWithReactHookForm>

      <FormWithReactHookAndZod></FormWithReactHookAndZod>

      <ExpenseTrackerFrom></ExpenseTrackerFrom>

      <UsersList />
    </>
  );
}

export default App;
