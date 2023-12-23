import { useContext, useRef } from 'react';
import CartContext from '../store/CartContext.jsx';

import logoImg from '../assets/logo.jpg';
import Button from './Button';
import CartModal from './Cart/CartModal.jsx';

export default function Header() {
    const cartContext = useContext(CartContext);
    const cartModal = useRef();
    const cartItemsNo = cartContext.items.reduce((total, item) => {
        return total + item.quantity
    }, 0);

    function openCart() {
        cartModal.current.openCartModal();
    }

    return (
        <>
            <CartModal 
            ref={cartModal} 
            />
            <header id="main-header">
                <div id="title" >
                    <img src={logoImg} alt='logo REACTFOOD' />
                    <h1>REACTFOOD</h1>
                </div>
                <nav>
                    <Button textOnly onClick={openCart}>Cart ({cartItemsNo})</Button>
                </nav>
            </header>
        </>
    );
}