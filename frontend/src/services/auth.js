import API from "../api";

// Check Authentication
export const checkAuth = async () => {
  try {
    await API.get('/api/check-auth');
    return true;
  } catch (error) {
    return false;
  }
};