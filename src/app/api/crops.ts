import { getUserIdFromCookies } from "../utils/cookies";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Corrected typo

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not set in .env.local");
}

// Create a Crop
export const createCrop = async (cropData: {
  name: string;
  variety: string;
  planting_date: string;
  harvest_date: string;
  status: string;
}) => {
  const userId = getUserIdFromCookies();
  if (!userId) {
    throw new Error("User ID is missing from cookies.");
  }


  const payload = {
    ...cropData,
    user_id: userId, 
  };


  try {
    const response = await fetch(`${API_URL}/crops/crops/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error creating crop");
    }

    const data = await response.json();
    return data; // Returns the created crop data
  } catch (error) {
    console.error("Error creating crop:", error);
    throw error;
  }
};
// List Crops
export const getCrops = async () => {
  const userId = getUserIdFromCookies();
  if (!userId) {
    throw new Error("User ID is missing from cookies.");
  }

  try {
    const response = await fetch(`${API_URL}/crops/crops/?user_id=${userId}`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json(); // Parse error response for more details
      throw new Error(errorData.message || "Error fetching crops");
    }

    const data = await response.json();
    return data; // Returns the list of crops
  } catch (error) {
    console.error("Error fetching crops:", error);
    throw error;
  }
};

// Update a Crop
export const updateCrop = async (
  cropId: string,
  cropData: {
    name?: string;
    variety?: string;
    planting_date?: string;
    harvest_date?: string;
    status?: string;
  }
) => {
  const userId = getUserIdFromCookies();
  if (!userId) {
    throw new Error("User ID is missing from cookies.");
  }

  try {
    const response = await fetch(`${API_URL}/crops/crops/${cropId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...cropData,
        user_id: userId, // Attach user ID to the request body
      }),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Parse error response for more details
      throw new Error(errorData.message || "Error updating crop");
    }

    const data = await response.json();
    return data; // Returns the updated crop data
  } catch (error) {
    console.error("Error updating crop:", error);
    throw error;
  }
};

// Delete a Crop
export const deleteCrop = async (cropId: string) => {
  const userId = getUserIdFromCookies();
  if (!userId) {
    throw new Error("User ID is missing from cookies.");
  }

  try {
    const response = await fetch(
      `${API_URL}/crops/crops/${cropId}/?user_id=${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json(); // Parse error response for more details
      throw new Error(errorData.message || "Error deleting crop");
    }

    return true; // Returns true if deleted successfully
  } catch (error) {
    console.error("Error deleting crop:", error);
    throw error;
  }
};