import { useContext, useState } from "react";

import CartContext from "../../store/CartContext";

import Input from "./Input";
import Button from "../Button";

import { priceFormatter } from "../../util/priceFormatting";
import { isEmail, isNotEmpty } from "../../util/validation";

import useFetch from "../../hooks/useFetch";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout({ onClose }) {
  const [hasError, setHasError] = useState({
    name: false,
    email: false,
    address: false,
    "postal-code": false,
    city: false,
  });

  const cartContext = useContext(CartContext);

  const totalAmount = priceFormatter.format(
    cartContext.items.reduce(
      (totalPrice, item) => totalPrice + item.price * item.quantity,
      0
    )
  );

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
  } = useFetch("http://localhost:3000/orders", requestConfig, []);

  function handleClearCart() {
    cartContext.onClearCart();
  }

  async function saveData(customerData) {
    await sendRequest(
      JSON.stringify({
        order: {
          items: cartContext.items,
          customer: customerData,
        },
      })
    );
  }

  function handleChange(identifier, event) {
    setHasError((prevHasError) => ({
      ...prevHasError,
      [identifier]: false,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);

    const customerData = Object.fromEntries(data.entries());

    if (!isNotEmpty(customerData.name)) {
      setHasError((prevHasError) => ({
        ...prevHasError,
        name: true,
      }));

      return;
    }

    if (!isNotEmpty(customerData.email) || !isEmail(customerData.email)) {
      setHasError((prevHasError) => ({
        ...prevHasError,
        email: true,
      }));

      return;
    }

    if (!isNotEmpty(customerData.address)) {
      setHasError((prevHasError) => ({
        ...prevHasError,
        address: true,
      }));

      return;
    }

    if (!isNotEmpty(customerData["postal-code"])) {
      setHasError((prevHasError) => ({
        ...prevHasError,
        "postal-code": true,
      }));

      return;
    }

    if (!isNotEmpty(customerData.city)) {
      setHasError((prevHasError) => ({
        ...prevHasError,
        city: true,
      }));

      return;
    }

    saveData(customerData);
  }

  let actions = (
    <>
      <Button textOnly onClick={onClose}>
        Close
      </Button>
      <Button>Confirm Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order...</span>;
  }

  if (data.message === "Order created!" && !error) {
    handleClearCart();

    actions = <Button onClick={onClose}>Okay</Button>;

    return (
      <div className="control">
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via emai within the next few
          minutes
        </p>
        <p className="modal-actions">{actions}</p>
      </div>
    );
  }

  return (
    <div className="control">
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {totalAmount}</p>

        <Input
          type="text"
          id="name"
          label="Full name"
          onChange={(event) => handleChange("name", event)}
          withError={hasError.name}
        />
        <Input
          type="email"
          id="email"
          label="Email"
          onChange={(event) => handleChange("email", event)}
          withError={hasError.email}
        />
        <Input
          type="text"
          id="address"
          label="Address"
          onChange={(event) => handleChange("address", event)}
          withError={hasError.address}
        />
        <div className="control-row">
          <Input
            type="text"
            id="postal-code"
            label="Postal Code"
            onChange={(event) => handleChange("postal-code", event)}
            withError={hasError["postal-code"]}
          />
          <Input
            type="text"
            id="city"
            label="City"
            onChange={(event) => handleChange("city", event)}
            withError={hasError.city}
          />
        </div>
        {error && (
          <Error title="Failed to submit order" message={error.message} />
        )}
        <p className="modal-actions">{actions}</p>
      </form>
    </div>
  );
}
