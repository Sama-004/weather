"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const [name, setName] = useState("");
  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
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
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

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

  return (
    <div>
      <h2>Weather App</h2>
      {error && <p>{error}</p>}
      {weather ? (
        <pre>{JSON.stringify(weather, null, 2)}</pre>
      ) : (
        <p>Fetching weather data...</p>
      )}
    </div>
  );
}

// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   try {
//     const response = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`
//     );
//     if (!response.ok) {
//       throw new Error("City not found");
//     }
//     const data = await response.json();
//     setWeather(data);
//     setError("");
//   } catch (err) {
//     if (err instanceof Error) {
//       setError(err.message);
//       console.log(err);
//     } else {
//       setError("Not working");
//     }
//     setWeather(null);
//   }
// };

//   return (
//     <div>
//       <div className="flex justify-center mt-4">
//         <h1 className="text-4xl">Weather App</h1>
//       </div>
//       <div className="flex flex-col justify-center h-screen">
//         <div className="flex justify-center">
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               className="text-black"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter city name"
//             />
//             <button className="bg-blue-700 ml-2" type="submit">
//               Get Weather
//             </button>
//           </form>
//         </div>
//       </div>
//       {error && <p>{error}</p>}
//       {weather && <pre>{JSON.stringify(weather, null, 2)}</pre>}
//       {/* <h3>Weather in {weather.name}</h3>
//           <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
//           <p>Max Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
//           <p>Weather: {weather.weather[0].description}</p> */}
//     </div>
//   );
// }
