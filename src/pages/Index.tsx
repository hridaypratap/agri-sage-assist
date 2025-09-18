import { useState, useEffect } from "react";
import type { NasaPowerApiResponse } from "@/types/types";
import { useDispatch } from "react-redux";
import {
  setLocation as setGlobalLocation,
  setWeatherData as storeSetWeatherData,
} from "@/store/weatherSlice";

import { HeroSection } from "@/components/HeroSection";
import { ChatInterface } from "@/components/ChatInterface";
import { ImageUpload } from "@/components/ImageUpload";
import { ExpertConnect } from "@/components/ExpertConnect";

// No UI rendering of weather data here; we store in Redux for later use.

const Index = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [weatherData, setWeatherDataState] =
    useState<NasaPowerApiResponse | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const dispatch = useDispatch();

  // Fetch weather data from NASA POWER API when location is available
  useEffect(() => {
    if (location) {
      setWeatherLoading(true);
      setWeatherError(null);
      const { latitude, longitude } = location;
      // Build YYYYMMDD for today's local date
      const pad = (n: number) => String(n).padStart(2, "0");
      const now = new Date();
      const today = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
        now.getDate()
      )}`;
      const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,T2M_MIN,T2M_MAX,RH2M,PRECTOTCORR,WS2M,ALLSKY_SFC_SW_DWN&community=AG&longitude=${longitude}&latitude=${latitude}&start=${today}&end=${today}&format=JSON`;
      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch weather data");
          return res.json();
        })
        .then((data: NasaPowerApiResponse) => {
          setWeatherDataState(data);
          dispatch(storeSetWeatherData(data));
          setWeatherLoading(false);
        })
        .catch((err) => {
          setWeatherError("Could not fetch weather data.");
          setWeatherLoading(false);
        });
    }
  }, [location, dispatch]);

  useEffect(() => {
    if (!location) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setLocation(coords);
            dispatch(setGlobalLocation(coords));
            setLocationError(null);
          },
          (error) => {
            setLocationError("Location permission denied or unavailable.");
          }
        );
      } else {
        setLocationError("Geolocation is not supported by this browser.");
      }
    }
  }, [location, dispatch]);

  const handleStartChat = () => setActiveComponent("chat");
  const handleImageUpload = () => setActiveComponent("image");
  const handleVoiceInput = () => setActiveComponent("chat"); // Opens chat with voice capability
  const handleExpertConnect = () => setActiveComponent("expert");

  const handleClose = () => setActiveComponent(null);

  return (
    <div className="min-h-screen bg-background">
      {locationError && (
        <div className="bg-red-100 text-red-700 p-2 text-center">
          {locationError}
        </div>
      )}

      <HeroSection
        onStartChat={handleStartChat}
        onImageUpload={handleImageUpload}
        onVoiceInput={handleVoiceInput}
        onExpertConnect={handleExpertConnect}
      />
      {/* Weather data stored in Redux; nothing to show here for now */}
      {activeComponent === "chat" && <ChatInterface onClose={handleClose} />}
      {activeComponent === "image" && <ImageUpload onClose={handleClose} />}
      {activeComponent === "expert" && <ExpertConnect onClose={handleClose} />}
    </div>
  );
};

export default Index;
