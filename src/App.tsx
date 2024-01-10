import Alert from "./components/Alert";
import AppButton from "./components/AppButton";
import ListGroup from "./components/ListGroup";
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
    console.log("Button Pressed!");
  };

  return (
    <>
      {/* <ListGroup
        items={items}
        heading="Members"
        onSelectItem={handleSelectItem}
      /> */}

      {/* <Alert>
        <h1> Alert! </h1>
        <p> Ahoyy! </p>
      </Alert> */}

      <AppButton onButtonClick={handleButtonClick} buttonColor="success">
        This is your button
      </AppButton>
    </>
  );
}

export default App;
