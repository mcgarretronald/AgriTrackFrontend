import React from "react";

export default function About() {
    return (
        <div className="py-10 text-center">
            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-bold">
                About Agri<span className="text-[#4CAF50]">Track</span>
            </h1>

            {/* About Section with Background Image */}
            <div
                className="text-lg md:text-xl text-white mt-5  py-50 rounded-lg bg-cover bg-center"
                style={{ backgroundImage: "url('images/about.png')" }}
            >
                <p className="text-2xl lg:px-50 px-10">
                    Agri<span className="text-[#4CAF50]">Track</span> is your digital farm assistant,
                    helping you monitor crops, manage inventory, and optimize farm productivity with ease.
                </p>
            </div>
        </div>
    );
}
