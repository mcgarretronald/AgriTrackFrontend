"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaSeedling, FaLeaf, FaTasks, FaUserCog } from "react-icons/fa";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const links = [
        { href: "/profile", label: "Dashboard", icon: <FaSeedling /> },
        { href: "/profile/crops", label: "Crops", icon: <FaLeaf /> },
        { href: "/profile/resources", label: "Resources", icon: <FaTasks /> },
        { href: "/profile/activity-logs", label: "Activity Logs", icon: <FaTasks /> },
        { href: "/profile/settings", label: "Profile", icon: <FaUserCog /> },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-16 left-0 z-50 text-white bg-green-700 p-2 rounded-lg shadow-lg"
                aria-label="Toggle Sidebar"
            >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Sidebar Container */}
            <aside
                className={`fixed top-0 left-0  w-64 bg-green-700  rounded-lg h-screen text-white p-5 transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform lg:translate-x-0 lg:static z-40 shadow-lg`}
            >
                {/* Sidebar Content */}
                <ul className="lg:mt-30 mt-50 space-y-3">
                    {links.map(({ href, label, icon }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                className={`flex items-center space-x-3 p-3 rounded-lg transition ${
                                    pathname === href
                                        ? "bg-green-500 font-bold"
                                        : "hover:bg-green-600"
                                }`}
                            >
                                {icon}
                                <span>{label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Overlay (for mobile) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;
