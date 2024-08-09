import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin || isAdmin !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    imageUrl: '',
  });
  const [editProduct, setEditProduct] = useState(null);

  function shortenText(text, maxLength) {
    return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('http://localhost:5000/api/products');
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('http://localhost:5000/api/products', newProduct);
    setProducts([...products, data]);
    setNewProduct({
      name: '',
      category: '',
      price: '',
      description: '',
      imageUrl: '',
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    setProducts(products.filter((product) => product._id !== id));
  };

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleEditSubmit = async () => {
    const { data } = await axios.put(`http://localhost:5000/api/products/${editProduct._id}`, editProduct);
    setProducts(products.map(product => (product._id === data._id ? data : product)));
    setEditProduct(null); 
  };

  const handleCancelEdit = () => {
    setEditProduct(null); 
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            placeholder="Enter product category"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            placeholder="Enter product price"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            placeholder="Enter product description"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={newProduct.imageUrl}
            onChange={handleChange}
            placeholder="Enter product image URL"
            required
          />
        </div>

        <button type="submit" className="btn-submit">Add Product</button>
      </form>

      <div className="product-list">
        <h3>Product List</h3>
        <div className="grid-container">
          {products.map((product) => (
            <div key={product._id} className="grid-item">
              <h3>{shortenText(product.name, 25)}</h3>
              <p>{shortenText(product.description, 50)}</p>
              <p>${product.price}</p>
              <div className="img-container">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <button onClick={() => handleEdit(product)} className="btn-edit">Edit</button>
              <button onClick={() => handleDelete(product._id)} className="btn-delete">Delete</button>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Product Pop-Up */}
      {editProduct && (
        <div className="edit-popup">
          <div className="edit-popup-content">
            <h3>Edit Product</h3>
            <div className="form-group">
              <label htmlFor="editName">Product Name</label>
              <input
                type="text"
                name="name"
                value={editProduct.name}
                onChange={handleEditChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="editPrice">Price</label>
              <input
                type="number"
                name="price"
                value={editProduct.price}
                onChange={handleEditChange}
                placeholder="Enter product price"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="editDescription">Description</label>
              <textarea
                name="description"
                value={editProduct.description}
                onChange={handleEditChange}
                placeholder="Enter product description"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="editImageUrl">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={editProduct.imageUrl}
                onChange={handleEditChange}
                placeholder="Enter product image URL"
                required
              />
            </div>

            <button onClick={handleEditSubmit} className="btn-save">Save</button>
            <button onClick={handleCancelEdit} className="btn-cancel">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
