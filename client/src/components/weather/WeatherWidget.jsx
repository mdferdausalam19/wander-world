import { useState, useEffect } from "react";
import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";
import { FiRefreshCw } from "react-icons/fi";

const getWeatherIcon = (condition) => {
  const conditionLower = condition.toLowerCase();

  if (conditionLower.includes("rain"))
    return <WiRain className="text-blue-500 text-4xl" />;
  if (conditionLower.includes("cloud"))
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

export default function WeatherWidget({ location = "", onRefresh }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");

  // Mock weather data - in a real app, this would be an API call
  const fetchWeather = () => {
    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      try {
        const mockWeather = {
          temperature: Math.floor(Math.random() * 30) + 10, // 10-40°C
          condition: [
            "Sunny",
            "Partly Cloudy",
            "Rainy",
            "Cloudy",
            "Thunderstorm",
            "Foggy",
          ][Math.floor(Math.random() * 6)],
          humidity: Math.floor(Math.random() * 50) + 30, // 30-80%
          wind: (Math.random() * 20).toFixed(1), // 0-20 km/h
        };

        setWeather(mockWeather);
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (err) {
        setError("Failed to load weather data");
        console.error("Weather API error:", err);
      } finally {
        setLoading(false);
      }
    }, 800); // Simulate network delay
  };

  useEffect(() => {
    fetchWeather();

    // Refresh weather every 5 minutes
    const interval = setInterval(fetchWeather, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [location]);

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      fetchWeather();
    }
  };

  if (loading && !weather) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-4">
        <div className="animate-pulse flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-red-100 p-4">
        <div className="text-red-500 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={handleRefresh}
            className="text-emerald-600 hover:text-emerald-800 p-1 rounded-full hover:bg-emerald-50 transition-colors"
            title="Retry"
          >
            <FiRefreshCw
              className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
          </button>
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
            <p className="text-xs text-gray-400">Last updated: {lastUpdated}</p>
          </div>
          <button
            onClick={handleRefresh}
            className="text-gray-400 hover:text-emerald-600 p-1 rounded-full hover:bg-gray-50 transition-colors"
            disabled={loading}
            title="Refresh"
          >
            <FiRefreshCw
              className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-5xl font-light text-gray-800">
              {weather.temperature}°
            </div>
            <div className="ml-2">
              <div className="text-sm text-gray-500">{weather.condition}</div>
              <div className="text-xs text-gray-400">
                {location || "Current Location"}
              </div>
            </div>
          </div>

          <div className="text-4xl">{getWeatherIcon(weather.condition)}</div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
          <div className="text-gray-600">Humidity</div>
          <div className="text-right font-medium">{weather.humidity}%</div>

          <div className="text-gray-600">Wind</div>
          <div className="text-right font-medium">{weather.wind} km/h</div>
        </div>
      </div>
    </div>
  );
}
