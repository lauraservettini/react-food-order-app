import { useRef, useImperativeHandle, forwardRef } from "react";
import { createPortal } from "react-dom";
import Cart from "./Cart";
import Button from "../Button";

const CartModal = forwardRef(function CartModal({...props}, ref) {
        const cartModal = useRef();
    
        function closeCartModal() {
            cartModal.current.close();
        }
    
        function closeCartModalToCheckout() {
            cartModal.current.close();
        }
    
        useImperativeHandle(ref, () => {
            return {
              openCartModal: () => {
                cartModal.current.showModal();
              },
            };
          });
    
        return createPortal(
            <dialog ref={cartModal} className="modal" onClose={closeCartModal}>
                <Cart />
                <div className="modal-actions">
                    <Button textOnly onClick={closeCartModal}>Close</Button>
                    <Button onClick={closeCartModalToCheckout}>Checkout</Button>
                </div>
            </dialog>,
            document.getElementById('modal')
        );
    }
);

export default CartModal;