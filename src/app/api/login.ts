import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not set in .env.local");
}

// Define types for better TypeScript support
interface LoginResponse {
  user_id?: string;
  error?: string;
}

interface LoginError {
  success: false;
  error: string;
}

interface LoginSuccess {
  success: true;
  data: LoginResponse;
}

// Login user and store user ID in cookies for 7 days
export const loginUser = async (
  credentials: { identifier: string; password: string }
): Promise<LoginSuccess | LoginError> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_BASE_URL}/users/login/`,
      credentials
    );

    // Store user ID in cookies for 7 days
    if (response.data?.user_id) {
      Cookies.set("user_id", response.data.user_id, { expires: 7 });
    }

    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.error ||
        "Network error or server is unreachable. Check your internet connection.";

      // Handle specific error codes for better UX
      if (error.response?.status === 400) {
        if (error.response.data.error.includes("password")) {
          return {
            success: false,
            error: "Incorrect password. Please try again.",
          };
        }
        return {
          success: false,
          error: "Both identifier (email or username) and password are required.",
        };
      }

      if (error.response?.status === 404) {
        return {
          success: false,
          error: "No account found with this email or username.",
        };
      }

      return {
        success: false,
        error: errorMessage,
      };
    }

    // Network error or unexpected response
    return {
      success: false,
      error: "Network error or server is unreachable. Check your internet connection.",
    };
  }
};
