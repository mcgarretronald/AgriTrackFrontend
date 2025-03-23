import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not set in .env.local");
}

// Register a new user and store user ID in cookies for 7 days
export const registerUser = async (userData: {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/register/`, userData);

    // Store user ID in cookies for 7 days
    if (response.data?.id) {
      Cookies.set("user_id", response.data.id, { expires: 7 });
    }

    return { success: true, data: response.data }; // Return success response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { success: false, error: error.response?.data?.error || "Failed to register." };
    }
    return { success: false, error: "Something went wrong." };
  }
};
