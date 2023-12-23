import { useRef, useImperativeHandle, forwardRef, useContext, useState } from "react";
import { createPortal } from "react-dom";

import CartContext from "../../store/CartContext";

import Cart from "./Cart";
import Button from "../Button";
import Checkout from "../checkout/Checkout";

const CartModal = forwardRef(function CartModal({...props}, ref) {
        const [ show, setShow] = useState({
            cart: false,
            checkout: false
        });

        const modal = useRef();
        const cartContext = useContext(CartContext);
    
        function closeCartModal() {
            modal.current.close();
            setShow({
                    cart: false,
                    checkout: false
                });
        }
    
        function closeCartModalToCheckout() {
            setShow({
                cart: false,
                checkout: true
            });
        }
    
        useImperativeHandle(ref, () => {
            return {
              openCartModal: () => {
                modal.current.showModal();
                setShow({
                    cart: true,
                    checkout: false
                });
              },
            };
          });
    
        return createPortal(
            <dialog ref={modal} className="modal" onClose={closeCartModal}>
                {show.cart && <Cart />}
                {show.cart && <div className="modal-actions">
                    <Button textOnly onClick={closeCartModal}>Close</Button>
                    {cartContext.items.length >0 && <Button onClick={closeCartModalToCheckout}>Checkout</Button>}
                </div>}
                {show.checkout && <Checkout onClose={closeCartModal}/>}
            </dialog>,
            document.getElementById('modal')
        );
    }
);

export default CartModal;