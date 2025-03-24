export const getUserIdFromCookies = (): string | null => {
  try {
    // Split cookies into individual key-value pairs
    const cookies = document.cookie.split("; ");

    // Find the cookie that starts with "user_id="
    const userIdCookie = cookies.find((row) => row.startsWith("user_id="));

    // If the cookie is found, extract and return the value
    if (userIdCookie) {
      const userId = userIdCookie.split("=")[1];
      return userId || null; // Return null if the value is empty
    }

    // Return null if the cookie is not found
    return null;
  } catch (error) {
    console.error("Error retrieving user ID from cookies:", error);
    return null;
  }
};