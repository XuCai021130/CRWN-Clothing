import { createContext, useReducer, useState } from "react";

import { createAction } from "../utils/reducer/reducer.util";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  cartCount: 0,
  total: 0,
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload, 
      }
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
}

export const CartProvider = ({ children }) => {
  const [{isCartOpen, cartItems, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, curr) => total + curr.quantity, 0);
    const newTotal = newCartItems.reduce((total, curr) => total + curr.quantity * curr.price, 0);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { 
        cartItems: newCartItems, 
        cartTotal: newTotal, 
        cartCount: newCartCount 
      })
    );
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemReducer(newCartItems)
  }

  const removeItemFromCart = (product) => {
    const newCartItems = removeCartItem(cartItems, product);
    updateCartItemReducer(newCartItems)
  }

  const clearItemFromCart = (product) => {
    const newCartItems = clearCartItem(cartItems, product);
    updateCartItemReducer(newCartItems)
  }

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal
  };

  return (<CartContext.Provider value={value}>{children}</CartContext.Provider>);
}