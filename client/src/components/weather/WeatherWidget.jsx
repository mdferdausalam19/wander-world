import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";

const getWeatherIcon = (condition = "") => {
  const conditionLower = condition.toLowerCase();

  if (conditionLower.includes("rain"))
    return <WiRain className="text-blue-500 text-4xl" />;
  if (conditionLower.includes("clouds"))
    return <WiCloudy className="text-gray-400 text-4xl" />;
  if (conditionLower.includes("snow"))
    return <WiSnow className="text-blue-200 text-4xl" />;
  if (conditionLower.includes("thunder"))
    return <WiThunderstorm className="text-yellow-500 text-4xl" />;
  if (conditionLower.includes("fog") || conditionLower.includes("mist"))
    return <WiFog className="text-gray-400 text-4xl" />;

  // Default to sunny
  return <WiDaySunny className="text-yellow-400 text-4xl" />;
};

export default function WeatherWidget({ location = "" }) {
  const axiosCommon = useAxiosCommon();
  const {
    data: weather = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["weather", location],
    enabled: !!location,
    queryFn: async () => {
      const { data } = await axiosCommon.get(
        `/weather?city=${location?.city}&lat=${location?.coordinates?.lat}&lon=${location?.coordinates?.lng}`
      );
      return data.data;
    },
  });

  if (isLoading) {
    return (
      <div className=" h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500 border-t-2"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-red-100 p-4">
        <div className="text-red-500 text-sm flex items-center justify-between">
          <span>Failed to load weather data</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-500">
              Current Weather
            </h3>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-5xl font-light text-gray-800">
              {weather?.temp}°
            </div>
            <div className="ml-2">
              <div className="text-sm text-gray-500">{weather?.condition}</div>
              <div className="text-xs text-gray-400">
                {location?.city || "Current Location"}
              </div>
            </div>
          </div>

          <div className="text-4xl">{getWeatherIcon(weather?.condition)}</div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
          <div className="text-gray-600">Humidity</div>
          <div className="text-right font-medium">{weather?.humidity}%</div>

          <div className="text-gray-600">Wind</div>
          <div className="text-right font-medium">
            {weather?.wind_speed} km/h
          </div>
        </div>
      </div>
    </div>
  );
}
