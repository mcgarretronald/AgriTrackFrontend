import React from "react";
import Image from "next/image";
import Link from "next/link";

const features = [
    {
        id: 1,
        image: "/images/crop-management.svg",
        title: "🌾  Crop Management",
        description: "Monitor crop growth, track planting schedules, and manage harvest cycles efficiently.",
    },
    {
        id: 2,
        image: "/images/resource-tracking.svg",
        title: "Resource Tracking",
        description: "Keep an inventory of seeds, fertilizers, and other essential farming resources.",
    },
    {
        id: 3,
        image: "/images/activity-logs.svg",
        title: "Activity Logging",
        description: "Log daily farming activities like irrigation, pest control, and fertilization.",
    },
    {
        id: 4,
        image: "/images/analytics-reports.svg",
        title: "Analytics & Reports",
        description: "Get insights on farm productivity with detailed reports and analytics.",
    },
];

export default function Features() {
    return (
        <div className="px-5 md:px-20 py-10 text-center">
            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-bold">Key Features</h1>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {features.map((feature) => (
                    <div key={feature.id} className="bg-white p-5 shadow-lg rounded-xl">
                        {/* Image */}
                        <div className="flex justify-center">
                            <Image src={feature.image} alt={feature.title} width={300} height={100} className="w-32 h-32" />
                        </div>

                        {/* Heading */}
                        <h2 className="text-lg font-semibold mt-4">{feature.title}</h2>

                        {/* Description */}
                        <p className="text-gray-600 mt-2 text-sm">{feature.description}</p>
                    </div>
                ))}
            </div>
            <div className="flex flex-col items-center mt-10 gap-3">
                <p className="font-normal">Take control of your farm today with Agri<span className="text-[#4CAF50]">Track</span>!</p>
                <Link href="/register">
                <button className="bg-[#8D6E63] rounded-md text-white cursor-pointer w-48 py-2 text-sm">Sign Up for Free</button>
                </Link>
            </div>
        </div>
    );
}
