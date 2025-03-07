import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa'; // Importing trash icon
import { adminDeleteProduct } from '../../../../api/api';  // Assuming the delete function is imported from api
import './ListProduct.css';

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to load products from the API
  const loadProducts = async () => {
    setLoading(true); // Start loading when fetching data
    try {
      const response = await fetch('http://localhost:5000/api/products');
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.products || !Array.isArray(data.products)) {
        throw new Error('Expected products field to be an array');
      }

      const cleanedData = data.products.map((product) => ({
        ...product,
        images: product.images.map((image) =>
          image.startsWith('http') ? image : `https://res.cloudinary.com/diljnt1m3/image/upload/${image}`
        ),
        thumbnail: product.thumbnail.startsWith('http') ? product.thumbnail : `https://res.cloudinary.com/diljnt1m3/image/upload/${product.thumbnail}`,
      }));

      setProducts(cleanedData);
      setFilteredProducts(cleanedData); // Initialize filtered products
    } catch (error) {
      setError(`Error fetching products: ${error.message}`);
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false); // Stop loading after the data is fetched
    }
  };

  // Fetch the products when the component mounts
  useEffect(() => {
    loadProducts();
  }, []);

  // Function to handle product deletion with confirmation
  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return; // If user cancels, do nothing

    try {
      await adminDeleteProduct(productId);
      setProducts(products.filter((product) => product._id !== productId)); // Update the state after deletion
      setFilteredProducts(filteredProducts.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Function to handle search input change and filter products
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered);
  };

  // Function to paginate the data
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  // Paginate the products
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="container-fluid">
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Total Count */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4>Total Products: {filteredProducts.length}</h4>
        </div>

        {/* Sticky Search Bar */}
        <div className="sticky-top bg-light p-3 shadow-sm mb-3" style={{ zIndex: 1020 }}>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div> // Show loading text
      ) : currentProducts.length === 0 ? (
        <div className="alert alert-info">No products found.</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered table-sm">
              <thead className="thead-dark">
                <tr>
                  <th>#</th> {/* Column for row numbering */}
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Contact</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td> {/* Row numbering */}
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td>${product.price}</td>
                    <td>{product.stockQuantity}</td>
                    <td>{product.phoneNumber}</td>
                    <td>
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="img-fluid"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="btn btn-danger btn-sm"
                        title="Delete Product"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination justify-content-center">
            {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, index) => (
              <button
                key={index + 1}
                className={`btn btn-link ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handlePagination(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListProduct;
