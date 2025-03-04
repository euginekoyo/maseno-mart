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
  const response = await api.post("/auth/signup", userData);
  if (response.data.token) {
    setAuthToken(response.data.token);
  }
  return response;
};
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  if (response.data.token) {
    setAuthToken(response.data.token);
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

// Updated createProduct function with file upload
export const createProduct = async (formData) => {
  try {
    // Log FormData contents for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await api.post("/products", formData, {
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

export const updateProduct = (productId, productData) =>
  api.put(`/products/${productId}`, productData);
export const deleteProduct = (productId) =>
  api.delete(`/products/${productId}`);

// Service APIs
export const fetchServices = () => api.get("/services");
export const createService = async (formData) => {
  try {
    // Log FormData contents for debugging
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
export const updateService = (serviceId, serviceData) =>
  api.put(`/services/${serviceId}`, serviceData);
export const deleteService = (serviceId) =>
  api.delete(`/services/${serviceId}`);

export { setAuthToken };
export default api;
