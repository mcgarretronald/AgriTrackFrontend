import axios from "axios";
import { getUserIdFromCookies } from "../utils/cookies";

// ✅ Ensure API URL is set
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not set in .env.local");
}

const RESOURCE_ENDPOINT = `${API_URL}/resources/resources/`;

/**
 * Type definitions for resources
 */
export interface Resource {
  id: number;
  resource_id: string;
  name: string;
  quantity: number;
  unit: string;
  resource_type: string;
  usage_status: string;
  created_at: string;
  updated_at: string;
  user: string;
}

/**
 * Fetch resources for the logged-in user.
 */
export const fetchResources = async (): Promise<Resource[]> => {
  try {
    const userId = getUserIdFromCookies();
    if (!userId) throw new Error("User ID is missing");

    const response = await axios.get<Resource[]>(RESOURCE_ENDPOINT, {
      params: { user: userId }, // ✅ Fetch resources only for the logged-in user
    });
    console.log("✅ Fetched Resources:", response.data); 
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching resources:", error);
    throw new Error("Failed to fetch resources. Please try again.");
  }
};

/**
 * Create a new resource.
 */
export const createResource = async (
  resourceData: Omit<Resource, "id" | "created_at" | "updated_at">
): Promise<Resource> => {
  try {
    const userId = getUserIdFromCookies();
    if (!userId) throw new Error("User ID is required");

    const response = await axios.post<Resource>(RESOURCE_ENDPOINT, {
      ...resourceData,
      user: userId, // ✅ Ensure the correct user is associated
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error creating resource:", error);
    throw new Error("Failed to create resource. Please try again.");
  }
};

/**
 * Update an existing resource.
 */
export const updateResource = async (
  resourceId: string,
  updatedData: Partial<Resource>
): Promise<Resource> => {
  try {
    console.log("🔍 Updating resource with ID:", resourceId); // 🔥 Debugging log

    const response = await axios.patch<Resource>(
      `${RESOURCE_ENDPOINT}${resourceId}/`, // Ensure correct endpoint
      updatedData
    );

    console.log("✅ Resource updated successfully:", response.data); // 🔥 Debugging log
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Error updating resource:", error.response?.data || error.message);
    } else {
      console.error("❌ Error updating resource:", error);
    }
    throw new Error("Failed to update resource. Please try again.");
  }
};


/**
 * Delete a resource.
 */
export const deleteResource = async (resourceId: string): Promise<{ message: string }> => {
  try {
    const userId = getUserIdFromCookies();
    if (!userId) throw new Error("User ID is missing");

    await axios.delete(`${RESOURCE_ENDPOINT}${resourceId}/`, {
      params: { user: userId }, // ✅ Pass user ID as query param to verify ownership
    });

    return { message: "✅ Resource deleted successfully" };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Error deleting resource:", error.response?.data || error.message);
    } else {
      console.error("❌ Error deleting resource:", error);
    }
    throw new Error("Failed to delete resource. Please try again.");
  }
};
