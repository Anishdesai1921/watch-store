import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const ProductList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        const uniqueCategories = [
          ...new Set(data.map(product => product.category))
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="category-container">
      <h2>Available Categories</h2>
      <div className="category-list">
        {categories.map(category => (
          <div key={category} className="category-item">
            <Link to={`/category/${category}`}>
              <h3>{category} Watches</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
