import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import useCart hook

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate(); // Get navigate function to redirect to checkout

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleCheckout = () => {
    navigate('/checkout'); // Navigate to the checkout page
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item._id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">${item.price}</p>
                <div className="cart-item-quantity-container">
                  <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>-</button>
                  <span className="cart-item-quantity">{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => removeFromCart(item._id)} className="remove-item-btn">Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ${cartTotal}</h3>
          </div>
          <button onClick={handleCheckout} className="btn-checkout">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
