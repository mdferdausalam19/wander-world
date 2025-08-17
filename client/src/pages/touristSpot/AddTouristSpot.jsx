import SpotForm from "../../components/form/SpotForm";
import { toast } from "react-hot-toast";

export default function AddTouristSpot() {
  const handleAddSpot = (data) => {
    console.log(data);
    toast.success("Spot added!");
  };

  return (
    <div className="min-h-screen bg-emerald-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl flex flex-col items-center mb-8">
        <h1 className="text-4xl font-extrabold text-emerald-700 mb-3 text-center drop-shadow-sm">
          Add a Tourist Spot
        </h1>
        <p className="text-lg text-gray-600 mb-2 text-center max-w-2xl">
          Share your favorite destination with the WanderWorld community.
          <br className="hidden sm:block" /> Fill out the details below to
          inspire fellow travelers!
        </p>
      </div>
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 border border-emerald-100">
        <SpotForm onSubmit={handleAddSpot} />
      </div>
    </div>
  );
}
