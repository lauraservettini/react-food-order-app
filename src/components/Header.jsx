import { useContext } from 'react';
import CartContext from '../store/CartContext.jsx';

import logoImg from '../assets/logo.jpg';
import Button from './Button';

export default function Header() {
    const cartContext = useContext(CartContext);
    const cartItemsNo = cartContext.items.reduce((total, item) => {
        return total + item.quantity
    }, 0);

    return (
        <header id="main-header">
            <div id="title" >
                <img src={logoImg} alt='logo REACTFOOD' />
                <h1>REACTFOOD</h1>
            </div>
            <nav>
                <Button textOnly>Cart ({cartItemsNo})</Button>
            </nav>
        </header>
    );
}