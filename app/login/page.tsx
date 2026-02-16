"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";

const actualEmail = "intern@demo.com";
const actualPassword = "intern123";

type MessageType = {
    type: "error" | "success",
    text: string
}

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<MessageType | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const login = useStore((state) => state.login);
    const router = useRouter();

    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => setMessage(null), 2000);
        return () => clearTimeout(timer);
    }, [message]);

    function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        if (email !== actualEmail || password !== actualPassword) {
            setMessage({ type: "error", text: "Invalid Credentials" });
            return;
        }

        setMessage({ type: "success", text: "Logged in Successfully" });
        login();

        setTimeout(() => {
            router.replace("/board");
        }, 2000)
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-neutral-900 px-4">

            {message && (
                <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md
                    text-white font-medium shadow-lg ${message.type === "error" ? "bg-red-600" : "bg-green-600"
                    } z-50`}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleLogin}
                className="flex flex-col items-center justify-center gap-6 py-8 px-8 border border-neutral-700 rounded-xl bg-neutral-800 w-full max-w-md shadow-lg"
            >
                <h1 className="text-2xl font-semibold text-white">Login to your Account</h1>

                <div className="flex flex-col items-start gap-3 w-full">
                    <label className="text-white font-medium">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="john34@gmail.com"
                        className="bg-neutral-900 p-3 rounded-lg text-lg text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />

                    <label className="text-white font-medium">Password:</label>
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••"
                            required
                            className="bg-neutral-900 p-3 rounded-lg text-lg text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                        <div className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-all duration-300" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <Eye /> : <EyeOff />}
                        </div>
                    </div>

                </div>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 w-full cursor-pointer text-lg rounded-lg py-3 text-white font-medium transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
}