import { createContext, useEffect, useState } from "react";

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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, curr) => total + curr.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems])

  useEffect(() => {
    const newTotal = cartItems.reduce((total, curr) => total + curr.quantity * curr.price, 0);
    setCartTotal(newTotal);
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (product) => {
    setCartItems(removeCartItem(cartItems, product));
  }

  const clearItemFromCart = (product) => {
    setCartItems(clearCartItem(cartItems, product));
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