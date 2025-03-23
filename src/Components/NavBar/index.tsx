"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiMenu } from "react-icons/hi";
import nookies from "nookies";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cookies = nookies.get(null);
        const storedUserId = cookies.user_id || null; // Ensure the key matches exactly
        setUserId(storedUserId);

        // Close menu when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="flex justify-between items-center px-5 py-2 relative">
            {/* Logo */}
            <div>
                <Link href="/">
                    <Image src="/longlogo.svg" alt="Logo" width={200} height={50} />
                </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-5 items-center">
                {userId ? (
                    <Link href="/profile">
                        <Image
                            src="/images/profile-icon.png"
                            alt="Profile"
                            width={40}
                            height={40}
                            className="rounded-full cursor-pointer border"
                        />
                    </Link>
                ) : (
                    <>
                        <Link href="/auth/login" className="text-[#8D6E63] underline">
                            Login
                        </Link>
                        <Link href="/auth/register">
                            <button className="px-3 py-2 text-sm bg-[#4CAF50] rounded-md text-white">
                                Register
                            </button>
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-3xl" onClick={() => setIsOpen(!isOpen)}>
                <HiMenu />
            </button>

            {/* Mobile Popup Menu */}
            {isOpen && (
                <div
                    ref={menuRef}
                    className="absolute top-14 right-5 bg-white p-4 shadow-lg rounded-md w-40"
                >
                    {userId ? (
                        <Link href="/profile" className="flex items-center space-x-2">
                            <Image
                                src="/images/profile-icon.png"
                                alt="Profile"
                                width={40}
                                height={40}
                                className="rounded-full border"
                            />
                            <span className="text-gray-700">Profile</span>
                        </Link>
                    ) : (
                        <>
                            <Link href="/auth/login" className="block text-[#8D6E63] mb-2">
                                Login
                            </Link>
                            <Link href="/auth/register">
                                <button className="px-3 py-2 text-sm bg-[#4CAF50] rounded-md text-white w-full">
                                    Register
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
