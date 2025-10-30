// Weather parameter values for each day (date string to value)
export type WeatherParameterValues = Record<string, number>;

// All weather parameters returned by NASA POWER API
export interface WeatherParameters {
  T2M: WeatherParameterValues;
  T2M_MIN: WeatherParameterValues;
  T2M_MAX: WeatherParameterValues;
  RH2M: WeatherParameterValues;
  PRECTOTCORR: WeatherParameterValues;
  WS2M: WeatherParameterValues;
  ALLSKY_SFC_SW_DWN: WeatherParameterValues;
  [key: string]: WeatherParameterValues;
}


fuuhnsdnfunurqu0 


// Metadata for each parameter
export interface WeatherParameterMeta {
  units: string;
  longname: string;
}

export type WeatherParametersMeta = Record<string, WeatherParameterMeta>;

// NASA POWER API response structure
export interface NasaPowerApiResponse {
  properties: {
    parameter: WeatherParameters;
  };
  parameters: WeatherParametersMeta;
  // ...other fields can be added as needed
}

// App domain types
export interface Expert {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  location: string;
  experience: number;
  price: string;
  avatar: string;
  available: boolean;
  tags: string[];
}

export interface AnalysisResult {
  disease: string;
  confidence: number; // percentage 0-100
  severity: string; // e.g., None | Mild | Moderate | Severe
  recommendations: string[];
}
