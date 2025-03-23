"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import Image from "next/image";
import { registerUser } from "../../api/register";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                    Create an Account & Get Started Today
                </p>

                {/* Form */}
                <Formik
                    initialValues={{
                        username: "",
                        email: "",
                        first_name: "",
                        last_name: "",
                        password: "",
                        confirm_password: "",
                    }}
                    onSubmit={async (values, { resetForm }) => {
                        setLoading(true);
                        setError(null);
                        setSuccess(null);

                        if (values.password !== values.confirm_password) {
                            setError("Passwords do not match.");
                            setLoading(false);
                            return;
                        }

                        const response = await registerUser(values);

                        if (!response.success) {
                            setError(response.error); // Display backend error
                            setLoading(false);
                            return;
                        }

                        setSuccess("Registration successful.");
                        resetForm();
                        setTimeout(() => router.push("/profile"), 1500); // Redirect after success
                        setLoading(false);
                    }}
                >
                    {() => (
                        <Form className="mt-6 text-sm space-y-4">
                            {/* First Name & Last Name */}
                            <div className="grid grid-cols-2 gap-4">
                                <Field
                                    type="text"
                                    name="first_name"
                                    className="w-full border rounded-lg px-2 py-3 outline-none focus:border-[#4CAF50] transition"
                                    placeholder="First Name"
                                    required
                                />
                                <Field
                                    type="text"
                                    name="last_name"
                                    className="w-full border rounded-lg px-2 py-3 outline-none focus:border-[#4CAF50] transition"
                                    placeholder="Last Name"
                                    required
                                />
                            </div>

                            {/* Username */}
                            <Field
                                type="text"
                                name="username"
                                className="w-full border rounded-lg px-2 py-3 outline-none focus:border-[#4CAF50] transition"
                                placeholder="Username"
                                required
                            />

                            {/* Email */}
                            <Field
                                type="email"
                                name="email"
                                className="w-full border rounded-lg px-2 py-3 outline-none focus:border-[#4CAF50] transition"
                                placeholder="Email"
                                required
                            />

                            {/* Password & Confirm Password */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Password Field with Toggle */}
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

                                {/* Confirm Password Field with Toggle */}
                                <div className="relative">
                                    <Field
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirm_password"
                                        className="w-full border rounded-lg px-2 py-3 pr-10 outline-none focus:border-[#4CAF50] transition"
                                        placeholder="Confirm Password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                            {/* Success Message */}
                            {success && <p className="text-green-500 text-sm text-center">{success}</p>}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-2 mt-4 text-white bg-[#4CAF50] rounded-lg hover:bg-green-600 transition flex items-center justify-center"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    "Register"
                                )}
                            </button>

                            {/* Already Have an Account? */}
                            <p className="text-center text-gray-600 text-sm mt-4">
                                Already have an account?{" "}
                                <span
                                    className="text-[#4CAF50] font-medium cursor-pointer hover:underline"
                                    onClick={() => router.push("/auth/login")}
                                >
                                    Log in
                                </span>
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
