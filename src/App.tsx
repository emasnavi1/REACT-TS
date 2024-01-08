import ListGroup from "./components/ListGroup";

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

  return (
    <>
      <ListGroup items={items} heading="Members" />
    </>
  );
}

export default App;
