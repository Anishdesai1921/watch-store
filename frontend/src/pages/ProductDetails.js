import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useCart } from '../context/CartContext'; // Import useCart hook

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart(); // Get addToCart function from CartContext

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(data);
    };

    const fetchRelatedProducts = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/products`);
      // Assuming related products have the same category
      setRelatedProducts(data.filter((p) => p.category === product?.category && p._id !== id));
    };

    fetchProduct();
    fetchRelatedProducts();
  }, [id, product?.category]);

  const handleBuyNow = () => {
    addToCart(product);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-details-container">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-info">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-price">${product.price}</p>
        <p className="product-category">Category: {product.category}</p>
        <p className="product-description">{product.description}</p>
        <button onClick={handleBuyNow} className="buy-now-btn">Buy Now</button>
      </div>

      <div className="related-products">
        <h3>Related Products</h3>
        <div className="grid-container">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct._id} className="grid-item">
              <h3>{relatedProduct.name}</h3>
              <img src={relatedProduct.imageUrl} alt={relatedProduct.name} />
              <p>{relatedProduct.description}</p>
              <p>${relatedProduct.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
