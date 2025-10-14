import { useState } from "react"
// Functions
import { signup } from "../services/users"

// Components
import CustomTextField from "../components/Textfield"
import CustomButton from "../components/Button"

export default function Signup() {
    // States
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false);

    // Functions
    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!username || !email || !password || !confirmPassword) {
            setErrorMessage("Please fill in all fields");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            setLoading(false);
            return;
        }

        const userData = {
            username,
            email,
            password,
            initial: username.charAt(0).toUpperCase(),
        };

        try {
            const result = await signup(userData);
            console.log(result);
        } catch (error) {
            setErrorMessage(error.message);
            console.error("Signup failed:", error);
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
                <h1 className="text-xl font-semibold text-center">Sign Up</h1>
                <div className="flex flex-col gap-4">
                    <CustomTextField label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} />
                    <CustomTextField label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                    <CustomTextField label="Password" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)}/>
                    <CustomTextField label="Confirm Password" variant="outlined" type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                    {errorMessage && <p className="text-red-500 text-end">{errorMessage}</p>}
                </div>
                <div>
                    <CustomButton variant="contained" color="primary" title="Create Account" disabled={loading} loading={loading} onClick={handleSignup}/>
                    <p className="text-center mt-4">Already have an account? <a href="/login" className="text-blue-500">Sign In</a></p>
                </div>
            </form>
        </div>
    )
}