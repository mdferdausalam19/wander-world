import SpotForm from "../../components/form/SpotForm";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

export default function AddTouristSpot() {
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();
  const navigate = useNavigate();

  const { mutateAsync: addSpot, isLoading } = useMutation({
    mutationFn: async (spotInfo) => {
      const { data } = await axiosCommon.post("/destinations", spotInfo);
      return data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        navigate("/all-tourist-spots");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });

  const handleAddSpot = async (spotData) => {
    const spotInfo = {
      ...spotData,
      likes: 0,
      createdAt: new Date().toISOString(),
      author: {
        uid: user?.uid,
        name: user?.displayName,
        email: user?.email,
        avatar: user?.photoURL,
      },
    };
    await addSpot(spotInfo);
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
        <SpotForm
          formType="add"
          btnText="Add Spot"
          btnLoadingText="Adding Spot..."
          onSubmit={handleAddSpot}
          isSpotAddLoading={isLoading}
        />
      </div>
    </div>
  );
}
