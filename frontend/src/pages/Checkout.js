import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process order logic
    console.log('Order placed:', { userDetails, cartItems, cartTotal });

    // Clear the cart
    clearCart();

    // Redirect to success page or home page
    navigate('/success');
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={userDetails.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            value={userDetails.city}
            onChange={handleChange}
            placeholder="Enter your city"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            name="state"
            value={userDetails.state}
            onChange={handleChange}
            placeholder="Enter your state"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="zip">Zip Code</label>
          <input
            type="text"
            name="zip"
            value={userDetails.zip}
            onChange={handleChange}
            placeholder="Enter your zip code"
            required
          />
        </div>

        <h3>Total: ${cartTotal}</h3>
        <button type="submit" className="btn-submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
