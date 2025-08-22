import { useState } from "react";
import { useForm } from "react-hook-form";

const continents = [
  "Africa",
  "Asia",
  "Australia",
  "Europe",
  "North America",
  "South America",
  "Antarctica",
];
const seasonalityOptions = ["Year-round", "Summer", "Winter"];

export default function SpotForm({ initialData = {}, onSubmit }) {
  console.log(initialData);
  const [imageValid, setImageValid] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: initialData.name || "",
      location: {
        city: initialData.location?.city || "",
        country: initialData.location?.country || "",
      },
      continent: initialData.continent || "",
      averageCost: initialData.averageCost || "",
      seasonality: initialData.seasonality || "",
      travelTime: {
        days: initialData.travelTime?.days || 0,
        hours: initialData.travelTime?.hours || 0,
      },
      visitorsPerYear: initialData.visitorsPerYear || "",
      description: initialData.description || "",
      imageUrl: initialData.imageUrl || "",
      author: {
        name: initialData.author?.name || "",
        userId: initialData.author?.userId || "",
      },
      likes: initialData.likes || 0,
      createdAt: initialData.createdAt || new Date().toISOString(),
    },
  });

  const imageUrl = watch("imageUrl");

  const handleImageError = () => setImageValid(false);
  const handleImageLoad = () => setImageValid(true);

  const onFormSubmit = (data) => {
    if (onSubmit) onSubmit(data);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onFormSubmit)}>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Tourist Spot Name
        </label>
        <input
          type="text"
          placeholder="e.g. Machu Picchu"
          className="w-full border-emerald-500 border rounded-lg px-3 py-2 focus:outline-emerald-500 focus:ring-emerald-500 focus:border-emerald-400"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-gray-700 font-medium mb-1">City</label>
          <input
            type="text"
            placeholder="e.g. Cusco"
            className="w-full border-emerald-500 border rounded-lg px-3 py-2 focus:outline-emerald-500 focus:ring-emerald-500 focus:border-emerald-400"
            {...register("location.city", { required: "City is required" })}
          />
          {errors.location?.city && (
            <p className="text-red-500 text-xs mt-1">
              {errors.location.city.message}
            </p>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 font-medium mb-1">
            Country/Region
          </label>
          <input
            type="text"
            placeholder="e.g. Peru"
            className="w-full border-emerald-500 border rounded-lg px-3 py-2 focus:outline-emerald-500 focus:ring-emerald-500 focus:border-emerald-400"
            {...register("location.country", {
              required: "Country/Region is required",
            })}
          />
          {errors.location?.country && (
            <p className="text-red-500 text-xs mt-1">
              {errors.location.country.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-gray-700 font-medium mb-1">
            Continent
          </label>
          <select
            className="w-full border-emerald-500 border rounded-lg px-3 py-2 focus:outline-emerald-500 focus:ring-emerald-500 focus:border-emerald-400"
            {...register("continent", { required: "Continent is required" })}
          >
            <option value="">Select Continent</option>
            {continents.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.continent && (
            <p className="text-red-500 text-xs mt-1">
              {errors.continent.message}
            </p>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 font-medium mb-1">
            Average Cost (USD)
          </label>
          <input
            type="number"
            placeholder="e.g. 1200"
            min="0"
            className="w-full border-emerald-500 border rounded-lg px-3 py-2 focus:outline-emerald-500 focus:ring-emerald-500 focus:border-emerald-400"
            {...register("averageCost", {
              required: "Average cost is required",
              min: { value: 0, message: "Cost cannot be negative" },
              valueAsNumber: true,
            })}
          />
          {errors.averageCost && (
            <p className="text-red-500 text-xs mt-1">
              {errors.averageCost.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-gray-700 font-medium mb-1">
            Seasonality
          </label>
          <select
            className="w-full border-emerald-500 border rounded-lg px-3 py-2 focus:outline-emerald-500 focus:ring-emerald-500 focus:border-emerald-400"
            {...register("seasonality", {
              required: "Seasonality is required",
            })}
          >
            <option value="">Select Seasonality</option>
            {seasonalityOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.seasonality && (
            <p className="text-red-500 text-xs mt-1">
              {errors.seasonality.message}
            </p>
          )}
        </div>
        <div className="flex-1 flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">
              Travel Days
            </label>
            <input
              type="number"
              placeholder="e.g. 2"
              min="0"
              className="w-full border-emerald-500 border rounded-lg px-3 py-2 focus:outline-emerald-500 focus:ring-emerald-500 focus:border-emerald-400"
              {...register("travelTime.days", {
                required: "Days required",
                min: { value: 0, message: "Cannot be negative" },
                valueAsNumber: true,
              })}
            />
            {errors.travelTime?.days && (
              <p className="text-red-500 text-xs mt-1">
                {errors.travelTime.days.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">
              Travel Hours
            </label>
            <input
              type="number"
              placeholder="e.g. 5"
              min="0"
              max="23"
              className="w-full border-emerald-500 border rounded-lg px-3 py-2 focus:outline-emerald-500 focus:ring-emerald-500 focus:border-emerald-400"
              {...register("travelTime.hours", {
                required: "Hours required",
                min: { value: 0, message: "Cannot be negative" },
                max: { value: 23, message: "Max 23 hours" },
                valueAsNumber: true,
              })}
            />
            {errors.travelTime?.hours && (
              <p className="text-red-500 text-xs mt-1">
                {errors.travelTime.hours.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Visitors Per Year
        </label>
        <input
          type="number"
          placeholder="e.g. 1500000"
          min="0"
          className="w-full border-emerald-500 border rounded-lg px-3 py-2 focus:outline-emerald-500 focus:ring-emerald-500 focus:border-emerald-400"
          {...register("visitorsPerYear", {
            required: "Visitors per year is required",
            min: { value: 0, message: "Cannot be negative" },
            valueAsNumber: true,
          })}
        />
        {errors.visitorsPerYear && (
          <p className="text-red-500 text-xs mt-1">
            {errors.visitorsPerYear.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Description
        </label>
        <textarea
          placeholder="Describe what makes this spot special, tips, best time to visit, etc."
          className="w-full border-emerald-500 border rounded-lg px-3 py-2 focus:outline-emerald-500 focus:ring-emerald-500 focus:border-emerald-400 min-h-[100px]"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">
            {errors.description.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Image URL
        </label>
        <input
          type="url"
          placeholder="e.g. https://images.unsplash.com/photo-..."
          className={`w-full border-emerald-500 border rounded-lg px-3 py-2 focus:outline-emerald-500 focus:ring-emerald-500 focus:border-emerald-400 ${
            imageValid ? "" : "border-red-500"
          }`}
          {...register("imageUrl", {
            required: "Image URL is required",
            pattern: {
              value: /^https?:\/\/.+/i,
              message: "Enter a valid image URL",
            },
            onChange: () => {
              setImageValid(true);
            },
          })}
        />
        {errors.imageUrl && (
          <p className="text-red-500 text-xs mt-1">{errors.imageUrl.message}</p>
        )}
        {imageUrl && (
          <div className="mt-2">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full max-w-xs rounded-xl border border-emerald-100 shadow"
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            {!imageValid && (
              <span className="text-red-500 text-xs">Invalid image URL</span>
            )}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-emerald-600 text-white rounded-xl py-3 font-semibold hover:bg-emerald-700 transition-colors"
      >
        Save Spot
      </button>
    </form>
  );
}
