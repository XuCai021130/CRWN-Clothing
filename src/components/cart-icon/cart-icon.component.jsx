import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles.jsx';

import './cart-icon.styles.jsx'


const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  return (
    <CartIconContainer onClick={() => setIsCartOpen(!isCartOpen)}>
      <ShoppingIcon className='shopping-icon'/>
      <ItemCount className='item-count'>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}


export default CartIcon;