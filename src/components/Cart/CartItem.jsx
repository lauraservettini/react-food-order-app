
import Button from "../Button";

export default function CartItem({item}) {
    
    return(
            <li className="cart-item">
                <p>{item.name} - {item.quantity}</p>
                <div className="cart-item-actions">
                    <Button>+</Button>
                    <Button>-</Button>
                    <Button>Delete</Button>
                </div>
            </li>
    );
}