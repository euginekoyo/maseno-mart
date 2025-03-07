import axios from "axios";

const BASE_URL = "https://maseno-server-cfelx7ww0-eugines-projects-3759cba1.vercel.app/api/";

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set token in headers
const setAuthToken = (token, role = null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
    if (role) localStorage.setItem("role", role); // Store role
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // Remove role too
  }
};

// Retrieve token on app load
const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}

// ✅ Authentication APIs
export const signupUser = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  if (response.data.token) {
    setAuthToken(response.data.token);
  }
  return response;
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);

    if (response.data.token) {
      setAuthToken(response.data.token);
      localStorage.setItem("role", response.data.role); // ✅ Store role
    }

    return response;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};

export const logoutUser = () => setAuthToken(null);

// ✅ User APIs
export const fetchUsers = () => api.get("/users");
export const updateUser = (userId, userData) =>
  api.put(`/users/${userId}`, userData);
export const deleteUser = (userId) => api.delete(`/users/${userId}`);

// ✅ Product APIs (Client)
export const fetchProducts = () => api.get("/products");
export const createProduct = (productData) =>
  api.post("/products", productData);
export const updateProduct = (productId, productData) =>
  api.put(`/products/${productId}`, productData);
export const deleteProduct = (productId) =>
  api.delete(`/products/${productId}`);

// ✅ Service APIs
// ✅ Fetch services with search & pagination
export const fetchServices = ({ page = 1, limit = 10, search = "" } = {}) =>
  api.get("/services", {
    params: { page, limit, search },
  });

// ✅ Create a new service (with file upload)
export const createService = async (formData) => {
  try {
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await api.post("/services", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", {
      response: error.response?.data,
      message: error.message,
      status: error.response?.status,
    });
    throw error;
  }
};

// ✅ Update a service by ID
export const updateService = (serviceId, serviceData) =>
  api.put(`/services/${serviceId}`, serviceData);

// ✅ Delete a service by ID
export const deleteService = (serviceId) =>
  api.delete(`/services/${serviceId}`);

// ✅ Admin-Specific Product APIs
// Admin-Specific Product APIs

// Fetch products with image handling
export const adminFetchProducts = async () => {
  try {
    const response = await api.get("/admin/products");

    // Assuming product images are stored in a 'thumbnail' or 'images' field in your product data
    const products = response.data.products.map((product) => {
      return {
        ...product,
        thumbnail: `${BASE_URL}/uploads/${product.thumbnail}`, // Update image URL
        images: product.images.map((image) => `${BASE_URL}/uploads/${image}`), // Update images array URLs
      };
    });

    return { ...response.data, products };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Create product (assuming image data will be handled via formData in frontend)
export const adminCreateProduct = (productData) =>
  api.post("/admin/products", productData);

// Update product (assuming image data will be handled via formData in frontend)
export const adminUpdateProduct = (productId, productData) =>
  api.put(`/admin/products/${productId}`, productData);

// Delete product
export const adminDeleteProduct = (productId) =>
  api.delete(`/admin/products/${productId}`);

// ✅ Admin-Specific User Management APIs
export const adminFetchUsers = () => api.get("/admin/users");
export const adminUpdateUser = (userId, userData) =>
  api.put(`/admin/users/${userId}`, userData);
export const adminDeleteUser = (userId) => api.delete(`/admin/users/${userId}`);

export { setAuthToken };
export default api;
