import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import the cart context


const CategoryProducts = () => {
    const { category } = useParams(); // Get the category from the URL
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart(); // Get the addToCart function from the context
    //const navigate = useNavigate(); // Get navigate function to redirect to checkout

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products?category=${category}`);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [category]);

    const handleBuyNow = (product) => {
        if (product) {
            addToCart(product); // Add product to the cart
            
            //navigate('/checkout'); // Redirect to the checkout page
        } else {
            console.error("Product is undefined");
        }
    };

    return (
        <div className="category-products-container">
            <h2>{category} Watches</h2>
            <div className="grid-container">
                {products.map(product => (
                    <div key={product._id} className="grid-item">
                        <img src={product.imageUrl} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                        <button onClick={() => handleBuyNow(product)} className="btn-buy-now">Buy Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryProducts;
