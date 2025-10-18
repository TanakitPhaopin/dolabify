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

// Logout User
export const logout = async () => {
  try {
    await API.post('/api/logout');
    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
};