import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Axios instance setup (using the API you've already written)
const BASE_URL = 'http://localhost:5000/api';
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch products from the API
const fetchProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data.products; // Assuming the products are returned in this format
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Function to delete a product
const deleteProduct = async (productId) => {
  try {
    await api.delete(`/products/${productId}`);
    alert('Product deleted successfully');
  } catch (error) {
    console.error('Error deleting product:', error);
    alert('Failed to delete product');
  }
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch products when component mounts
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        setError('Failed to load products');
      }
    };

    loadProducts();
  }, []);

  const handleDelete = async (productId) => {
    await deleteProduct(productId);
    setProducts(products.filter((product) => product._id !== productId)); // Remove deleted product from state
  };

  return (
    <div className="product-list">
      {error && <div className="error">{error}</div>}

      {products.length === 0 ? (
        <div>No products found.</div>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img src={product.thumbnail} alt={product.title} className="product-thumbnail" />
                </td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.phoneNumber}</td>
                <td>
                  <button onClick={() => handleDelete(product._id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
