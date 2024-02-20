import { useState } from "react";
import produce from "immer";

const customer = {
  name: "John",
  address: {
    city: "Tehran",
    zipCode: 64111,
  },
};

const newCustomer = {
  ...customer,
  addresse: {
    ...customer.address,
    zipCode: 94112,
  },
};

const [bugs, setBugs] = useState([
  { id: 1, title: "Bug 1", fixed: false },
  { id: 2, title: "Bug2", fixed: false },
]);

const newBugs = bugs.map((bug) =>
  bug.id === 1 ? { ...bug, fixed: true } : bug
);
setBugs(newBugs);

// using immer, draft is a copy iof the bugs array where you can make changes to it
setBugs(
  produce(bugs, (draft) => {
    const bug = draft.find((bug) => bug.id === 1); // here you find the bug item with the id of 1, rememebr draft is a copy of the bugs array.
    if (bug) bug.fixed = true; // if the bug is found, then we set bug.fixed = true
  })
);

const array = ["a", "b", "c"];
const newArray = [...array, "d"];

const cart = {
  discount: 0.1,
  items: [
    { id: 1, title: "Product 1", quantity: 1 },
    { id: 2, title: "Product 2", quantity: 1 },
  ],
};

// upon pressing a puttin, the item with id of a shall be increments in it quantity:
const newCart = {
  ...cart,
  items: cart.items.map((item) =>
    item.id === 1 ? { ...item, quantity: item.quantity + 1 } : item
  ),
};
