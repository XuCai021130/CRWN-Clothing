import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.util";


export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems, product) => {
  const newCartItems = removeCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const clearItemFromCart = (cartItems, product) => {
  const newCartItems = clearCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

const addCartItem = (cartItems, productToAdd) => {
  const exist = cartItems.find(item => item.id === productToAdd.id);
  if (exist) {
    return cartItems.map(item =>
      item.id === productToAdd.id
        ? {...item, quantity: item.quantity + 1}
        : item
    );
  } else {
    return [...cartItems, {...productToAdd, quantity: 1}];
  }
}

const removeCartItem = (cartItems, product) => {
  if (product.quantity === 1) {
    return cartItems.filter(item => item.id !== product.id);
  } else {
    return cartItems.map(item =>
      item.id === product.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }
}

const clearCartItem = (cartItems, product) => {
  return cartItems.filter(item => item.id !== product.id);
}