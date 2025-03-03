import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set token in headers
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token); // Store token
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token"); // Remove token
  }
};

// Retrieve token on app load
const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}

// Auth APIs
export const signupUser = async (userData) => {
  const response = await api.post("/signup", userData);
  if (response.data.token) {
    setAuthToken(response.data.token); // Store token
  }
  return response;
};
export const loginUser = async (credentials) => {
  const response = await api.post("/login", credentials);
  if (response.data.token) {
    setAuthToken(response.data.token); // Store token
  }
  return response;
};

export const logoutUser = () => setAuthToken(null);
// User APIs
export const fetchUsers = () => api.get("/users");
export const updateUser = (userId, userData) =>
  api.put(`/users/${userId}`, userData);
export const deleteUser = (userId) => api.delete(`/users/${userId}`);

// Product APIs
export const fetchProducts = () => api.get("/products");
export const createProduct = (productData) =>
  api.post("/products", productData);
export const updateProduct = (productId, productData) =>
  api.put(`/products/${productId}`, productData);
export const deleteProduct = (productId) =>
  api.delete(`/products/${productId}`);

// Service APIs
export const fetchServices = () => api.get("/services");
export const createService = (serviceData) =>
  api.post("/services", serviceData);
export const updateService = (serviceId, serviceData) =>
  api.put(`/services/${serviceId}`, serviceData);
export const deleteService = (serviceId) =>
  api.delete(`/services/${serviceId}`);

export { setAuthToken };
export default api;
