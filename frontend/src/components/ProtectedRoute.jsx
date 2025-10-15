import { useState, useEffect } from "react"
import { useNavigate } from "react-router";

// Functions
import API from "../api"

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    // State
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    // Functions
    const isAuthenticated = async () => {
        try {
            await API.get("/api/check-auth");
            setIsAuth(true);
        } catch (error) {
            try {
                await API.post("/api/refresh-token");
                setIsAuth(true);
            } catch (refreshError) {
                setIsAuth(false);
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        isAuthenticated();
    }, [navigate]);

    if (loading) {
        return null;
    }

    if (!isAuth) {
        return null;
    }

    return children;
}