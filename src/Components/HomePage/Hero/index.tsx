"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10 mx-5 md:mx-10 my-10 items-center">
            {/* Left Section */}
            <motion.div
                className="flex flex-col gap-5 justify-center"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Grow Smart, Harvest More.
                </h1>
                <p className="text-lg md:text-xl text-gray-700">
                    Effortlessly track crops, manage resources, and log activities—all in one place.
                </p>

                <motion.div
                    transition={{ duration: 0.3 }}
                >
                    <Link href="/profile">
                        <button className="bg-[#4CAF50] rounded-md text-white cursor-pointer w-48 py-2 text-lg">
                            Get Started
                        </button>
                    </Link>
                </motion.div>

                <p className="text-sm">
                    Have questions?{" "}
                    <span className="text-[#00897B] cursor-pointer underline">
                        <Link href="/">Get in Touch</Link>
                    </span>
                </p>
            </motion.div>

            {/* Right Section - Image */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Image
                    src="/images/hero.svg"
                    alt="Hero"
                    width={500}
                    height={500}
                    className="w-full max-w-md mx-auto md:max-w-lg"
                />
            </motion.div>
        </div>
    );
}
