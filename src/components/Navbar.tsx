import React from "react";

interface Props {
  cartItemsCount: number;
}

export const Navbar = ({ cartItemsCount }: Props) => {
  return <div> Number of items in Shopping Cart: {cartItemsCount}</div>;
};
