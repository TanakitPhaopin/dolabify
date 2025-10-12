import API from "../api";

// Sign up
export const signup = async (userData) => {
  try {
    const response = await API.post('/signup', userData);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};