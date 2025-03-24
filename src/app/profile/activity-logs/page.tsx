"use client";
import { getUserIdFromCookies } from "../../utils/cookies";
import React, { useEffect, useState } from "react";
import { fetchActivities, deleteActivity, createActivity } from "../../api/activities";
import { Activity } from "../../api/activities";
import { FaTrash, FaPlus, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import { format } from 'date-fns';

// Loader Component
const Loader: React.FC = () => (
  <div className="flex justify-center items-center">
    <FaSpinner className="animate-spin text-3xl" />
    <span className="ml-2">Loading...</span>
  </div>
);

const ActivityLogs: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newActivityDescription, setNewActivityDescription] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [deletingActivityId, setDeletingActivityId] = useState<string | null>(null);

  useEffect(() => {
    const loadActivities = async (): Promise<void> => {
      try {
        const data = await fetchActivities();
        setActivities(data);
      } catch (error: unknown) {
        setError("Error fetching activities.");
        console.error("Error fetching activities:", error);
        toast.error("Error fetching activities.");
      } finally {
        setLoading(false);
      }
    };
    loadActivities();
  }, []);

  const handleDelete = async (id: string): Promise<void> => {
    if (!id) {
      toast.error("Activity ID is missing.");
      return;
    }

    toast.promise(
      deleteActivity(id),
      {
        loading: "Deleting activity...",
        success: "Activity deleted successfully.",
        error: "There was an error deleting the activity.",
      },
      {
        style: { minWidth: "250px" },
      }
    );

    // Optimistically update UI for deletion
    setDeletingActivityId(id);
    const updatedActivities = activities.filter((activity) => activity.id !== id);
    setActivities(updatedActivities);
  };

  const handleCreate = async (): Promise<void> => {
    if (!newActivityDescription.trim()) {
      toast.error("Please enter an activity description.");
      return;
    }
  
    setIsCreating(true);
  
    try {
      console.log("Creating activity with description:", newActivityDescription); // Debugging log
  
      // Create the activity without passing the 'date' field, since Django will auto-set it
      const newActivity = await createActivity({
        user: getUserIdFromCookies() || "", // Get user ID
        description: newActivityDescription,
      });
  
      console.log("Created activity:", newActivity); // Debugging log
  
      // Optimistically update UI with the newly created activity
      setActivities((prevActivities) => [newActivity, ...prevActivities]);
      setNewActivityDescription(""); // Clear input
      toast.success("Activity created successfully.");
    } catch (error: unknown) {
      setError("Error creating activity.");
      console.error("Error creating activity:", error);
      toast.error("There was an error creating the activity.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">Activity Logs 📅</h2>

      {/* Inline Input for Adding New Activity */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <input
          type="text"
          value={newActivityDescription}
          onChange={(e) => setNewActivityDescription(e.target.value)}
          placeholder="Enter new activity..."
          className={`w-full md:w-1/2 p-2 border-2 rounded-md 
            ${newActivityDescription ? 'border-green-500' : 'border-gray-300'} 
            focus:ring-2 focus:ring-green-500 focus:border-green-500`}
        />
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center disabled:opacity-50"
          disabled={isCreating}
        >
          {isCreating ? <FaSpinner className="animate-spin" /> : <FaPlus />}
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : activities.length === 0 ? (
        <div className="text-center">
          <p>No activities found. Add your first activity!</p>
        </div>
      ) : (
        <div className="overflow-hidden">
          <ul className="divide-y divide-gray-400" aria-live="polite">
            {activities.map((activity) => (
              <li
                key={activity.id}
                className="p-4 flex justify-between items-center hover:rounded-md hover:bg-green-50 transition"
              >
                <div>
                  <p className="font-medium">{activity.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  {/* Format the activity date */}
                  <p className="text-sm text-gray-500">
                    {format(new Date(activity.date), "EEEE, MMMM d, yyyy")}
                  </p>
                  <button
                    onClick={() => handleDelete(activity.id)}
                    className={`text-red-500 hover:text-red-700 ${deletingActivityId === activity.id ? "opacity-50" : ""}`}
                    disabled={deletingActivityId === activity.id}
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActivityLogs;
