import { useContext } from "react";
import CartContext from "../../store/CartContext.jsx";

import { priceFormatter } from "../../util/priceFormatting.js";
import Button from "../Button.jsx";

export default function MealItem({ meal }) {
  const cartContext = useContext(CartContext);
  const formattedPrice = priceFormatter.format(meal.price);

  function addMealToCart() {
    cartContext.onAddToCart(meal);
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <h3>{meal.name}</h3>
        <div className="meal-item-price">{formattedPrice}</div>
        <div className="meal-item-description">{meal.description}</div>
        <div className="meal-item-actions">
          <Button onClick={addMealToCart}>Add to Cart</Button>
        </div>
      </article>
    </li>
  );
}
