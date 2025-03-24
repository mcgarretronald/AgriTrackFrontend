"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchDashboardStats } from "../api/dashboard";
import Link from "next/link"; // Import Link for navigation

interface DashboardStats {
    total_crops: number;
    total_resources: number;
    upcoming_tasks: number;
    total_harvested: number;
}

export default function ProfilePage() {
    const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isBrowser, setIsBrowser] = useState<boolean>(false);

    const router = useRouter(); // Initialize useRouter

    useEffect(() => {
        setIsBrowser(typeof window !== "undefined"); // Check if running in browser
    }, []);

    useEffect(() => {
        if (isBrowser) {
            // Check if user_id exists in cookies
            const userId = document.cookie.split(';').find(c => c.trim().startsWith('user_id='));

            if (!userId) {
                router.push("/auth/login"); // Redirect to login if user_id not found
                return; // Prevent further execution
            }

            // Proceed to load the dashboard stats if user_id exists
            const loadDashboardStats = async () => {
                try {
                    const data = await fetchDashboardStats();
                    setDashboardStats(data);
                } catch (error) {
                    if (error instanceof Error) {
                        setError(error.message);
                    } else {
                        setError("An error occurred");
                    }
                } finally {
                    setLoading(false);
                }
            };

            loadDashboardStats();
        }
    }, [isBrowser, router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <span className="text-xl text-gray-700">Loading your dashboard...</span>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center mt-5">{`Oops! ${error}`}</div>;
    }

    return (
        <div className="px-5">
            <h1 className="text-2xl font-bold mb-4">Your Farm Dashboard</h1>
            <div className="w-full h-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
                    {/* Total Crops Card */}
                    <div className="bg-green-50 p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
                        <div className="text-5xl text-green-600 mb-4">🌱</div>
                        <h3 className="text-lg text-gray-800 mb-2">Total Crops</h3>
                        <p className="text-2xl text-green-600 font-bold">{dashboardStats?.total_crops}</p>
                    </div>

                    {/* Total Resources Card */}
                    <div className="bg-green-50 p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
                        <div className="text-5xl text-green-600 mb-4">🌾</div>
                        <h3 className="text-lg text-gray-800 mb-2">Total Resources</h3>
                        <p className="text-2xl text-green-600 font-bold">{dashboardStats?.total_resources}</p>
                    </div>

                    {/* Upcoming Tasks Card */}
                    <div className="bg-green-50 p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
                        <div className="text-5xl text-green-600 mb-4">⏳</div>
                        <h3 className="text-lg text-gray-800 mb-2">Upcoming Tasks</h3>
                        <p className="text-2xl text-green-600 font-bold">{dashboardStats?.upcoming_tasks}</p>
                    </div>

                    {/* Total Harvested Card */}
                    <div className="bg-green-50 p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
                        <div className="text-5xl text-green-600 mb-4">🍅</div>
                        <h3 className="text-lg text-gray-800 mb-2">Total Harvested</h3>
                        <p className="text-2xl text-green-600 font-bold">{dashboardStats?.total_harvested}</p>
                    </div>
                </div>

                {/* Quick Call Buttons */}
                <div className="flex justify-center gap-4 flex-wrap">
                    <Link href="/profile/activity-logs">
                        <button className="bg-green-600 text-white px-8 py-2 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 text-sm">
                            + Add Activity
                        </button>
                    </Link>
                    <Link href="/profile/resources">
                        <button className="bg-green-600 text-white px-8 py-2 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 text-sm">
                            + Add Resource
                        </button>
                    </Link>
                    <Link href="/profile/crops">
                        <button className="bg-green-600 text-white px-8 py-2 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 text-sm">
                            + Add Crop
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
