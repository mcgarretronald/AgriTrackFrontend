"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import Image from "next/image";
import { loginUser } from "../../api/login";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md relative">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 transition"
                >
                    <FaArrowLeft size={20} />
                </button>

                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <Image src="/longlogo.svg" alt="Logo" width={200} height={50} />
                </div>

                {/* Title */}
                <p className="text-lg font-[400] text-center text-gray-700">
                    Welcome Back! Log in to Your Account
                </p>

                {/* Form */}
                <Formik
                    initialValues={{ identifier: "", password: "" }}
                    onSubmit={async (values) => {
                        setLoading(true);
                        setError(null);

                        const response = await loginUser(values);

                        if (!response.success) {
                            setError(response.error); // Display exact backend error
                            setLoading(false);
                            return;
                        }

                        // Redirect on successful login
                        router.push("/profile");
                        setLoading(false);
                    }}
                >
                    {() => (
                        <Form className="mt-6 text-sm space-y-4">
                            {/* Identifier (Username or Email) */}
                            <Field
                                type="text"
                                name="identifier"
                                className="w-full border rounded-lg px-2 py-3 outline-none focus:border-[#4CAF50] transition"
                                placeholder="Email or Username"
                                required
                            />

                            {/* Password */}
                            <div className="relative">
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="w-full border rounded-lg px-2 py-3 pr-10 outline-none focus:border-[#4CAF50] transition"
                                    placeholder="Password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            </div>

                            {/* Error Message */}
                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-2 mt-4 text-white bg-[#4CAF50] rounded-lg hover:bg-green-600 transition flex items-center justify-center"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    "Log In"
                                )}
                            </button>


                            <p className="text-center text-gray-600 text-sm mt-2">
                                Don&apos;t have an account?{" "}
                                <span
                                    className="text-[#4CAF50] font-medium cursor-pointer hover:underline"
                                    onClick={() => router.push("/auth/register")}
                                >
                                    Sign up
                                </span>
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
