import { getUserIdFromCookies } from "../utils/cookies";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not set in .env.local");
}

/**
 * Fetch the user's profile data.
 */
export const getProfile = async () => {
  const user_id = getUserIdFromCookies();
  if (!user_id) throw new Error("User ID not found in cookies");

  try {
    const response = await fetch(`${API_URL}/users/profile/${user_id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || `Failed to fetch profile: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw new Error("Network error: Unable to fetch profile. Please try again later.");
  }
};

/**
 * Update the user's profile data.
 * @param {Object} profile - The updated profile data.
 */
export const updateProfile = async (profile: Partial<{ first_name: string; last_name: string; username: string }>) => {
  const user_id = getUserIdFromCookies();
  if (!user_id) throw new Error("User ID not found in cookies");

  try {
    const response = await fetch(`${API_URL}/users/profile/${user_id}/`, {
      method: "PATCH", // Using PATCH to update only specified fields
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || `Failed to update profile: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Network error: Unable to update profile. Please try again later.");
  }
};
