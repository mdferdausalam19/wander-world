import { FaTimes } from "react-icons/fa";
import SpotForm from "../form/SpotForm";
import useAuth from "../../hooks/useAuth";

export default function EditDestinationModal({
  open,
  destination,
  onSave,
  onCancel,
}) {
  const { user } = useAuth();
  if (!open || !destination) return null;

  const formData = {
    name: destination.name || "",
    location: {
      city: destination.location?.city || "",
      country: destination.location?.country || "",
      coordinates: {
        lat: destination.location?.coordinates?.lat || 0,
        lng: destination.location?.coordinates?.lng || 0,
      },
    },
    continent: destination.continent || "",
    averageCost: destination.averageCost || "",
    seasonality: destination.seasonality || "",
    travelTime: {
      days: destination.travelTime?.days || 0,
      hours: destination.travelTime?.hours || 0,
    },
    visitorsPerYear: destination.visitorsPerYear || "",
    description: destination.description || "",
    imageUrl: destination.imageUrl || "",
    author: {
      uid: destination.author?.uid || "",
      name: destination.author?.name || "",
      email: destination.author?.email || "",
      avatar: destination.author?.avatar || "",
    },
    likes: destination.likes?.length || 0,
    createdAt: destination.createdAt || new Date().toISOString(),
  };

  const handleFormSubmit = (formData) => {
    const updatedDestination = {
      ...destination,
      name: formData.name,
      location: {
        ...destination.location,
        city: formData.location.city,
        country: formData.location.country,
        coordinates: {
          lat: Number(formData.location.coordinates.lat) || 0,
          lng: Number(formData.location.coordinates.lng) || 0,
        },
      },
      continent: formData.continent,
      averageCost: Number(formData.averageCost),
      seasonality: formData.seasonality,
      travelTime: {
        days: Number(formData.travelTime.days) || 0,
        hours: Number(formData.travelTime.hours) || 0,
      },
      visitorsPerYear: Number(formData.visitorsPerYear),
      description: formData.description,
      imageUrl: formData.imageUrl,
      author: {
        uid: user?.uid,
        name: user?.displayName,
        email: user?.email,
        avatar: user?.photoURL,
      },
    };

    onSave(updatedDestination);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-emerald-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Destination
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          <SpotForm
            initialData={formData}
            onSubmit={handleFormSubmit}
            onCancel={onCancel}
            isEditing={true}
            formType="edit"
            btnText="Update Spot"
            btnLoadingText="Updating Spot..."
          />
        </div>
      </div>
    </div>
  );
}
