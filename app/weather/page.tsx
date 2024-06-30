"use client";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function WeatherPage() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const [name, setName] = useState("");
  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (!session) {
        // window.location.href = "/api/auth/signin";
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  useEffect(() => {
    if (!loading && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
        },
        (err) => {
          setError(
            "Geolocation permission denied. Unable to retrieve weather data."
          );
        }
      );
    } else if (!loading) {
      setError("Geolocation is not supported by this browser.");
    }
  }, [loading]);

  useEffect(() => {
    if (location.lat && location.lon) {
      fetchWeather();
    }
  }, [location]);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data.");
      }
      const data = await response.json();
      setWeather(data);
      setError("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.log(err);
      } else {
        setError("Not working");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Weather App</h2>
      {error && <p>{error}</p>}
      {weather ? (
        <pre>{JSON.stringify(weather, null, 2)}</pre>
      ) : (
        <p>Fetching weather data...</p>
      )}
      <button onClick={() => router.push("/api/auth/signin")}>Sign In</button>
      <button onClick={() => router.push("/signup")}>Sign Up</button>
    </div>
  );
}
