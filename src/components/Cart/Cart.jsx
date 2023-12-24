import { useContext } from "react";
import CartContext from "../../store/CartContext";

import CartItem from "./CartItem";

import { priceFormatter } from "../../util/priceFormatting";

export default function Cart() {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.items;
  const cartTotal = cartItems.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <div className="cart-total">{priceFormatter.format(cartTotal)}</div>
    </div>
  );
}
