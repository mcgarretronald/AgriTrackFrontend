"use client";
import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-white px-5 md:px-20 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

                {/* Left Section: Logo & Location */}
                <div className="flex flex-col items-start">
                    <div className="flex items-center space-x-2">
                        <Image src="/longlogo.svg" alt="AgriTrack Logo" width={200} height={200} />
                    </div>
                    <p className="text-gray-600 mt-2">Nairobi, Kenya</p>
                </div>

                {/* Center Section: Contact Info */}
                <div className="flex flex-col items-center">
                    <p className="text-gray-600">(434) 546-4356</p>
                    <Link href="mailto:contact@agritrack.com" className="text-[#4CAF50] hover:underline">
                        contact@agritrack.com
                    </Link>
                </div>

                {/* Right Section: Navigation & Socials */}
                <div className="grid grid-cols-2 gap-10 text-gray-600 text-sm">
                    <div className="flex flex-col space-y-2">
                        <Link href="#">About</Link>
                        <Link href="#">Growers</Link>
                        <Link href="#">Merchants</Link>
                        <Link href="#">Partners</Link>
                        <Link href="#">Contact</Link>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Link href="#" className="flex items-center gap-2 hover:text-blue-500">
                            <FaFacebookF /> Facebook
                        </Link>
                        <Link href="#" className="flex items-center gap-2 hover:text-blue-500">
                            <FaTwitter /> Twitter
                        </Link>
                        <Link href="#" className="flex items-center gap-2 hover:text-blue-500">
                            <FaLinkedinIn /> LinkedIn
                        </Link>
                        <Link href="#" className="flex items-center gap-2 hover:text-blue-500">
                            <FaInstagram /> Instagram
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex justify-between items-center mt-6 text-gray-500 text-sm">
                <p>© 2025 <span className="text-green-600">AgriTrack</span>. All rights reserved.</p>

                {/* Scroll to Top Button */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="bg-[#4CAF50] text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
                >
                    <FaArrowUp size={20} />
                </button>
            </div>
        </footer>
    );
}
