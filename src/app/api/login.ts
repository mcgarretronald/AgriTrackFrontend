import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not set in .env.local");
}

// Login user and store user ID in cookies for 7 days
export const loginUser = async (credentials: {
  identifier: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/login/`,
      credentials
    );

    // Store user ID in cookies for 7 days
    if (response.data?.user?.id) {
      Cookies.set("user_id", response.data.user.id, { expires: 7 });
    }

    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: error.response?.data?.error || "Invalid credentials.",
      };
    }
    return { success: false, error: "Something went wrong." };
  }
};
