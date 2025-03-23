"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiMenu } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import nookies from "nookies";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cookies = nookies.get(null);
        setUserId(cookies.userId || null);

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
                <Image
                    src="/longlogo.svg"
                    alt="Logo"
                    width={200}
                    height={200}
                   
                    
                />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-5 items-center">
                {userId ? (
                    <FaUserCircle className="text-3xl text-gray-700" />
                ) : (
                    <>
                        <Link href="/login" className="text-[#8D6E63] underline">
                            Login
                        </Link>
                        <Link href="/register">
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
                    className="absolute top-14 right-5 bg-white p-4 shadow-lg rounded-md"
                >
                    {userId ? (
                        <FaUserCircle className="text-3xl text-gray-700" />
                    ) : (
                        <>
                            <Link href="/login" className="block text-[#8D6E63] mb-2">
                                Login
                            </Link>
                            <Link href="/register">
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
