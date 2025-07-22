import { FaGoogle } from "react-icons/fa";
export default function SocialSignIn({ provider }) {
  const handleSocialSignIn = async (socialProviderSignIn) => {
    console.log(socialProviderSignIn);
  };

  return (
    <div>
      <button
        onClick={() => handleSocialSignIn("googleSignIn")}
        className="group relative w-full flex justify-center items-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 space-x-2"
      >
        <FaGoogle size={16} className="text-blue-500" />
        <span>Continue with {provider}</span>
      </button>
    </div>
  );
}
