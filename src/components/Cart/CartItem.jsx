import { useContext, useRef, useState } from "react";
import CartContext from "../../store/CartContext";
import Button from "../Button";

import { priceFormatter } from "../../util/priceFormatting";

export default function CartItem({ item }) {
  const cartContext = useContext(CartContext);
  const quantityRef = useRef();
  const [quantity, setQuantity] = useState(item.quantity);
  const itemFormattedPrice = priceFormatter.format(item.price * item.quantity);

  function handleChange(event) {
    setQuantity(+event.target.value);

    if (event.key == "Enter") {
      handleBlur(event);
    }
  }

  function handleBlur(event) {
    cartContext.onUpdateCartItemQuantity(item, quantity);
  }

  function handleUpdate(item, amount) {
    cartContext.onUpdateCartItemQuantity(item, amount);
    setQuantity(amount);
  }
  function handleKeyPress(event) {
    if (event.key == "Enter") {
      handleBlur(event);
    }
  }

  return (
    <li className="cart-item">
      <div className="cart-item-div">
        <img src={`http://localhost:3000/${item.image}`} alt={item.name} />
        <p>
          {item.name} - {item.quantity} pz x {priceFormatter.format(item.price)}
        </p>
        <p>
          <strong>tot. {itemFormattedPrice}</strong>
        </p>
      </div>
      <div className="cart-item-actions">
        <Button onClick={() => handleUpdate(item, item.quantity + 1)}>+</Button>
        <span>
          <input
            ref={quantityRef}
            value={quantity}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
          />
        </span>
        <Button onClick={() => handleUpdate(item, item.quantity - 1)}>-</Button>
        <Button onClick={() => cartContext.onRemoveFromCart(item.id)}>x</Button>
      </div>
    </li>
  );
}
