import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    onAddToCart: () => {},
    onUpdateCartItemQuantity: () => {},
    onRemoveFromCart: () => {}
});

function cartReducer(state, action) {
    if(action.type === 'ADD_ITEM'){
        const updatedItems = [...state.items];
    
          const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.product.id
          );
          const existingCartItem = updatedItems[existingCartItemIndex];
    
          if (existingCartItem) {
            const updatedItem = {
              ...existingCartItem,
              quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
          } else {
            // action.product
            
            updatedItems.push({
                ...action.product,
                quantity: 1
            });
          }
    
          return {
            ...state,
            items: updatedItems,
          };
    }

    if(action.type === 'UPDATE_ITEM'){
        const updatedItems = [...state.items];
          const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.product.id
          );
    
          const updatedItem = {
            ...updatedItems[updatedItemIndex],
          };
    
          updatedItem.quantity += action.amount;
    
          if (action.amount <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
          } else {
                updatedItem.quantity = action.amount;
                updatedItems[updatedItemIndex] = updatedItem;
          }

          return {
            ...state,
            items: updatedItems,
          };
    }

    if(action.type === 'REMOVE_ITEM'){
        const oldItems = [...state.items];
          const updatedItems = oldItems.filter(
            (item) => item.id !== action.id
          );
          
          return {
            ...state,
            items: updatedItems,
          };
    }
    return state;
}

export function CartContextProvider({children}){
    const [shoppingCartState, shoppingCartDispatch] = useReducer(
        cartReducer, {
        items: [], 
      }
    );

    const cartContext = {
        items: shoppingCartState.items,
        onAddToCart: onAddToCart,
        onUpdateCartItemQuantity: onUpdateCartItemQuantity,
        onRemoveFromCart: onRemoveFromCart
    }
    function onAddToCart(product) {
        shoppingCartDispatch({
            type: 'ADD_ITEM',
            product: product
        });
    }
    
      function onUpdateCartItemQuantity(product, amount) {
        shoppingCartDispatch({
            type: 'UPDATE_ITEM',
            product: product,
            amount: amount
        });
      }
    
      function onRemoveFromCart(id) {
        shoppingCartDispatch({
            type: 'REMOVE_ITEM',
            id: id
        });
    }

    return <CartContext.Provider value={cartContext} >{children}</CartContext.Provider>
}

export default CartContext;