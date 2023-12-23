import { useRef, useContext, useEffect } from "react";

import CartContext from "../../store/CartContext";
// import ModalCheckout from "./ModalCheckout";

import { priceFormatter } from "../../util/priceFormatting";
import Input from "./Input";
import Button from "../Button";

export default function Checkout({onClose}) {
    // const modal = useRef();
    const cartContext = useContext(CartContext);
    
    const totalAmount = priceFormatter.format(cartContext.items.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0));
    
    function handleSubmit(){
        
    }
    return (
        <div className="control">
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total amount: {totalAmount}</p>
                
                <Input type="text" id="full-name" label="Full name" />
                <Input type="email" id="email" label="Email" />
                <Input type="text" id="address" label="Address" />
                <div className="control-row">
                    <Input type="text" id="postal-code" label="Postal Code" />
                    <Input type="text" id="full-name" label="City" />
                </div>
                <p className="modal-actions">
                    <Button textOnly onClick={onClose}>Close</Button>
                    <Button>Confirm Order</Button>
                </p>
            </form>
        </div>
        );
    }