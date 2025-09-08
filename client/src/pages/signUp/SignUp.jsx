import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import toast from "react-hot-toast";
import SocialSignIn from "../../components/auth/SocialSignIn";
import useAuth from "../../hooks/useAuth";
import useAxiosCommon from "../../hooks/useAxiosCommon";

export default function SignUp() {
  const [showPass, setShowPass] = useState(false);
  const { createUser, updateUserProfile, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const axiosCommon = useAxiosCommon();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSingUp = async (data) => {
    const { email, fullName, image, password } = data;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const lengthRegex = /^.{6,}$/;

    if (!lengthRegex.test(password)) {
      return toast.error("Password must be at least 6 characters long.");
    }
    if (!uppercaseRegex.test(password)) {
      return toast.error(
        "Password must include at least one uppercase letter."
      );
    }
    if (!lowercaseRegex.test(password)) {
      return toast.error(
        "Password must include at least one lowercase letter."
      );
    }

    try {
      setLoading(true);
      const { user } = await createUser(email, password);
      await updateUserProfile(fullName, image);

      const userData = {
        uid: user.uid,
        name: fullName.trim(),
        email: user.email,
        avatar: image || "https://i.ibb.co/9H2PJ7h2/d43801412989.jpg",
        role: "General",
        isHostRequest: false,
      };

      await axiosCommon.post("/users", userData);

      navigate("/");
      toast.success("Sign up successful!");
      reset();
    } catch (err) {
      console.error("Signup error:", err);
      setLoading(false);
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-emerald-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-900">
          Join WanderWorld
        </h2>
        <p className="mt-2 text-center text-sm text-emerald-600">
          Create your account to get started
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10 border border-emerald-100">
          <form onSubmit={handleSubmit(handleSingUp)} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  className="appearance-none block w-full px-3 py-2 border border-emerald-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors duration-200"
                />
                {errors.fullName && (
                  <p className="mt-2 text-sm text-emerald-600">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  className="appearance-none block w-full px-3 py-2 border border-emerald-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors duration-200"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-emerald-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Photo URL
                <span className="text-gray-500 text-xs ml-1">(Optional)</span>
              </label>
              <div className="mt-1">
                <input
                  {...register("image")}
                  type="url"
                  placeholder="Enter your photo URL"
                  className="appearance-none block w-full px-3 py-2 border border-emerald-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors duration-200"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPass ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  className="appearance-none block w-full px-3 py-2 border border-emerald-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-emerald-600"
                >
                  {showPass ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-2 text-sm text-emerald-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Password must be at least 6 characters with uppercase and
                lowercase letters
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin text-xl" />
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <SocialSignIn provider={"Google"} />
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link
                to={"/sign-in"}
                className="font-medium text-emerald-600 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
