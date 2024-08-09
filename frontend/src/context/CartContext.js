import React, { createContext, useState, useContext } from 'react';

// Create the CartContext
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => {
    return useContext(CartContext);
};

// CartProvider component to wrap around parts of the app that need access to the cart
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        if (!product) return; // Ensure the product is defined

        setCartItems((prevItems) => {
            if (!prevItems) prevItems = []; // Ensure prevItems is an array

            const itemExists = prevItems.find(item => item._id === product._id);
            if (itemExists) {
                return prevItems.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter(item => item._id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map(item =>
                item._id === productId
                    ? { ...item, quantity: quantity }
                    : item
            ).filter(item => item.quantity > 0) // Remove items with quantity 0
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
