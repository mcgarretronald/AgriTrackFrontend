import { getUserIdFromCookies } from "../utils/cookies";

// ✅ Ensure API URL is set
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not set in .env.local");
}

const userId = getUserIdFromCookies(); // Ensure the user ID is fetched from cookies

// ✅ Define Activity Interface
export interface Activity {
  id: string;           // Backend generates this
  user: string;         // Required
  description: string;  // Required
  date: string;         // Auto-set by Django
}

// ✅ Fetch all activities for the logged-in user
export const fetchActivities = async (): Promise<Activity[]> => {
  if (!userId) throw new Error("User ID is not available.");

  try {
    // Send user_id as a query parameter in the URL for GET request
    const response = await fetch(`${API_URL}/activities/activities/?user_id=${userId}`, {
      method: "GET", // GET request to fetch data
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch activities:", errorData); // Log the full error data
      throw new Error(`Failed to fetch activities: ${errorData.detail || "Unknown error"}`);
    }

    const activities = await response.json();
    console.log("Fetched Activities:", activities); // Log the activities to inspect
    return activities;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
};

// ✅ Create a new activity
export const createActivity = async (activity: Omit<Activity, "id" | "date">): Promise<Activity> => {
  if (!userId) throw new Error("User ID is not available.");

  try {
    const response = await fetch(`${API_URL}/activities/activities/`, {
      method: "POST", // POST request to create data
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,  // Ensure user_id is sent in the request body
        description: activity.description,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error creating activity: ${errorData.detail || "Unknown error"}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating activity:", error.message);
    } else {
      console.error("Unexpected error creating activity:", error);
    }
    throw error;
  }
};


// ✅ Delete an activity
export const deleteActivity = async (id: string): Promise<void> => {
  if (!userId) throw new Error("User ID is not available.");

  try {
    const response = await fetch(`${API_URL}/activities/activities/${id}/?user_id=${userId}`, {  // Updated URL
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to delete activity: ${errorData.detail || "Unknown error"}`);
    }
  } catch (error) {
    console.error("Error deleting activity:", error);
    throw error;
  }
};
