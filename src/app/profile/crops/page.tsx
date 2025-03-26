"use client";
import React, { useState, useEffect } from 'react';
import { createCrop, getCrops, updateCrop, deleteCrop } from '../../api/crops';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons from react-icons

interface Crop {
  id: number;
  name: string;
  variety: string;
  planting_date: string;
  harvest_date: string;
  status: string;
  user: string; // Added user field to match the API response
}

const Crops = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [cropToDelete, setCropToDelete] = useState<number | null>(null);
  const [editCropId, setEditCropId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    variety: '',
    planting_date: '',
    harvest_date: '',
    status: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const data = await getCrops();
      setCrops(data);
    } catch (error) {
      console.error('Error fetching crops:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const cropData = {
        name: formData.name,
        variety: formData.variety,
        planting_date: formData.planting_date,
        harvest_date: formData.harvest_date,
        status: formData.status,
      };

      if (editCropId) {
        await updateCrop(editCropId.toString(), cropData);
        setEditCropId(null);
      } else {
        await createCrop(cropData); // Send cropData to createCrop
      }

      // Reset form after successful submission
      setFormData({
        name: '',
        variety: '',
        planting_date: '',
        harvest_date: '',
        status: '',
      });

      // Refresh the crops list
      await fetchCrops();
    } catch (error) {
      console.error('Error saving crop:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (crop: Crop) => {
    setFormData({
      name: crop.name,
      variety: crop.variety,
      planting_date: crop.planting_date,
      harvest_date: crop.harvest_date,
      status: crop.status,
    });
    setEditCropId(crop.id);
  };

  const handleDelete = (id: number) => {
    setCropToDelete(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      if (cropToDelete !== null) {
        await deleteCrop(cropToDelete.toString());
      }
      await fetchCrops();
    } catch (error) {
      console.error('Error deleting crop:', error);
    } finally {
      setShowDeletePopup(false);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crops Management</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Crop Name</label>
            <input
              type="text"
              name="name"
              placeholder="Crop Name"
              value={formData.name}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Variety</label>
            <input
              type="text"
              name="variety"
              placeholder="Variety"
              value={formData.variety}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Planted On</label>
            <input
              type="date"
              name="planting_date"
              value={formData.planting_date}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Expected Harvest</label>
            <input
              type="date"
              name="harvest_date"
              value={formData.harvest_date}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
              required
            >
              <option value="">Select Status</option>
              <option value="Planting">Planting</option>
              <option value="Growing">Growing</option>
              <option value="Harvesting">Harvesting</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-[#4CAF50] cursor-pointer text-white p-2 rounded flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <>
              <span>+</span>
              <span className="ml-2">{editCropId ? 'Update Crop' : 'Add Crop'}</span>
            </>
          )}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Crop Name</th>
              <th className="py-2 px-4 border">Variety</th>
              <th className="py-2 px-4 border">Planted On</th>
              <th className="py-2 px-4 border">Expected Harvest</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {crops.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-2 px-4 border rounded-md text-center">
                  No crops
                </td>
              </tr>
            ) : (
              crops.map((crop) => (
                <tr key={crop.id}>
                  <td className="py-2 px-4 border">{crop.name}</td>
                  <td className="py-2 px-4 border">{crop.variety}</td>
                  <td className="py-2 px-4 border">{crop.planting_date}</td>
                  <td className="py-2 px-4 border">{crop.harvest_date}</td>
                  <td className="py-2 px-4 border">{crop.status}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleEdit(crop)}
                      className="text-[#4CAF50] hover:text-[#45a049] cursor-pointer"
                    >
                      <FaEdit size={20} /> {/* Edit icon */}
                    </button>
                    <button
                      onClick={() => handleDelete(crop.id)}
                      className="text-red-500 hover:text-red-700 ml-2 cursor-pointer"
                    >
                      <FaTrash size={20} /> {/* Delete icon */}
                    </button>
                    {showDeletePopup && cropToDelete === crop.id && (
                      <div className="absolute bg-white p-4 border rounded shadow-lg top-[50%] right-[10%] mt-2 mx-3">
                        <p>Are you sure you want to delete this crop?</p>
                        <div className="mt-2 flex justify-end">
                          <button
                            onClick={confirmDelete}
                            className="bg-red-500 text-white px-2 cursor-pointer rounded mr-2"
                          >
                            Yes
                          </button>
                          <button
                            onClick={cancelDelete}
                            className="bg-gray-500 text-white px-2 cursor-pointer rounded"
                          >
                            No
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Crops;
