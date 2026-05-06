"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AuthPage = () => {
    const router = useRouter();
    const { login, signup } = useAuth();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Fill all fields before continue");
            return;
        }

        try {
            await login({ email, password });

            router.push("/me/books");
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleSignup = async () => {
        if (!name || !email || !password) {
            setError("Fill all fields before continue");
            return;
        }

        try {
            await signup({ name, email, password });

            router.push("/me/books");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="w-full flex-1 flex items-center justify-center flex-col gap-8">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm flex flex-col gap-4">

                <h2 className="text-2xl text-zinc-900 font-semibold text-center">
                    {isLogin ? "Login" : "Signup"}
                </h2>

                {!isLogin && <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition"
                />}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition"
                />

                <button
                    onClick={isLogin ? handleLogin : handleSignup}
                    className="bg-violet-500 text-white py-2 rounded-lg hover:bg-violet-600 cursor-pointer transition"
                >
                    {isLogin ? "Login" : "Sign up"}
                </button>

                <p className="text-sm text-center text-gray-500">
                    {isLogin ? "No account?" : "Already have an account?"}

                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="ml-1 text-violet-400 hover:text-violet-600 underline cursor-pointer transition"
                    >
                        {isLogin ? "Sign up" : "Login"}
                    </button>
                </p>

                {error && <span className="text-red-400 text-sm animate-pulse">{error}</span>}
            </div>
        </div>
    );
}

export default AuthPage;