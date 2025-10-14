import { useState } from "react"
// Functions
import { login } from "../services/users"

// Components
import CustomTextField from "../components/Textfield"
import CustomButton from "../components/Button"

export default function Login() {
    // States
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false);

    // Functions
    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);

        if (!email || !password) {
            setErrorMessage("Please fill in all fields");
            setLoading(false);
            return;
        }

        const loginData = {
            email,
            password,
        };

        try {
            const result = await login(loginData);
            console.log(result);
        } catch (error) {
            setErrorMessage(error.message);
            console.error("Login failed:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="sm:flex sm:justify-center sm:items-center sm:min-h-screen bg-animate-gradient">
            {/* Form */}
            <form
                className="bg-white mx-auto p-4 sm:p-8 sm:max-w-96 w-full flex flex-col gap-6 sm:shadow-lg sm:rounded-2xl sm:inset-shadow-xs"
                autoComplete="off"
            >
                <h1 className="text-xl font-semibold text-center">Sign In</h1>
                <div className="flex flex-col gap-4">
                    <CustomTextField label="Email" variant="outlined" type="email" onChange={(e) => setEmail(e.target.value)} />
                    <CustomTextField label="Password" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)}/>
                    {errorMessage && <p className="text-red-500 text-end">{errorMessage}</p>}
                </div>
                <div>
                    <CustomButton variant="contained" color="primary" title="Log In" disabled={loading} loading={loading} onClick={handleLogin}/>
                    <p className="text-center mt-4">Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a></p>
                </div>
            </form>
        </div>
    )
}