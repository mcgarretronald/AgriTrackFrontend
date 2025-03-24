"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../api/profile";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Profile interface
interface Profile {
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
}

export default function Settings() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>({ first_name: "", last_name: "", username: "", email: "" });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true; // Prevent state updates if unmounted
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        if (isMounted) {
          setProfile({
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            username: data.username || "",
            email: data.email || "",
          });
        }
      } catch (error) {
        if (isMounted) setError(error instanceof Error ? error.message : "Failed to fetch profile");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const updatedProfile = await updateProfile(profile);
      setProfile(updatedProfile);
      toast.success("Profile updated successfully!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Update failed";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove("user_id"); // Remove user_id from cookies
    localStorage.removeItem("token"); // Remove token from localStorage
    router.push("/auth/login"); // Redirect to login page
  };

  if (isLoading) {
    return <div className="animate-pulse  text-center ">
     <h1>Loading...</h1>
    </div>
  }


  return (
    <div className=" lg:mx-50 mx-5 max-w-4xl">
      <h1 className="text-2xl mb-5 ">Account Settings</h1>
      {error && <div className="text-red-500 p-2 mb-4 bg-red-100 rounded-md">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={profile.first_name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500"
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={profile.last_name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={profile.username}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email (Cannot be changed)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 cursor-not-allowed rounded-lg lowed"
            disabled
          />
        </div>

        {/* Buttons Side by Side */}
        <div className="flex md:flex-row flex-col justify-between gap-4 lg:mx-20">
          <button
            type="submit"
            className="flex-1 bg-green-500 text-white px-5 py-2.5 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex-1 bg-red-500 text-white px-5 py-2.5 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  );
}
