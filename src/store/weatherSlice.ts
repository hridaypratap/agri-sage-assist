import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { NasaPowerApiResponse } from "@/types/types";

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

interface WeatherState {
  location: GeoLocation | null;
  raw: NasaPowerApiResponse | null;
  updatedAt: string | null;
}

const initialState: WeatherState = {
  location: null,
  raw: null,
  updatedAt: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setLocation(state, action: PayloadAction<GeoLocation>) {
      state.location = action.payload;
    },
    setWeatherData(state, action: PayloadAction<NasaPowerApiResponse>) {
      state.raw = action.payload;
      state.updatedAt = new Date().toISOString();
    },
    resetWeather(state) {
      state.raw = null;
      state.updatedAt = null;
    },
  },
});

export const { setLocation, setWeatherData, resetWeather } =
  weatherSlice.actions;
export default weatherSlice.reducer;
