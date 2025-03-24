import { getUserIdFromCookies } from "../utils/cookies";

// Make sure you have the correct API URL from your .env
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not set in .env.local");
}

// Define an interface for the expected dashboard stats response
interface DashboardStats {
  total_crops: number;
  total_resources: number;
  upcoming_tasks: number;
  total_harvested: number;
}

// Function to fetch the dashboard data
export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const userId = getUserIdFromCookies(); // Get the user ID from cookies

  if (!userId) {
    throw new Error("User ID is not found in cookies.");
  }

  const response = await fetch(`${API_URL}/dashboard/stats/${userId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Add other necessary headers like Authorization if needed
    },
  });

  if (!response.ok) {
    // Handle error if the API call fails
    throw new Error("Failed to fetch dashboard stats.");
  }

  const data = await response.json();
  return data; // Assuming the data structure matches DashboardStats
};

// Function to update the dashboard (optional, if needed for dynamic updates)
export const updateDashboardStats = async (): Promise<void> => {
  const userId = getUserIdFromCookies(); // Get the user ID from cookies

  if (!userId) {
    throw new Error("User ID is not found in cookies.");
  }

  const response = await fetch(`${API_URL}/dashboard/stats/${userId}/`, {
    method: "GET", // You could use POST if you're updating data
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    // Handle error if the API call fails
    throw new Error("Failed to update dashboard.");
  }
};
