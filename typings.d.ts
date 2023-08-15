interface CurrentWeather {
  is_day: number;
  temperature: number;
  time: string;
  weathercode: number;
  winddirection: number;
  windspeed: number;
}

interface Daily {
  apparent_temperature_max: [number];
  apparent_temperature_min: [number];
  sunrise: [string];
  sunset: [string];
  temperature_2m_max: [number];
  temperature_2m_min: [number];
  time: [string];
  uv_index_clear_sky_max: [number];
  uv_index_max: [number];
  weathercode: [number];
  precipitation_probability_max: [number];
  precipitation_sum: [number];
  rain_sum: [number];
}

interface DailyUnits {
  apparent_temperature_max: string;
  apparent_temperature_min: string;
  sunrise: string;
  sunset: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  time: string;
  uv_index_clear_sky_max: string;
  uv_index_max: string;
  weathercode: string;
  precipitation_probability_max: string;
  precipitation_sum: string;
  rain_sum: string
}

interface Hourly {
  apparent_temperature: [number];
  precipitation: [number];
  precipitation_probability: [number];
  rain: [number];
  relativehumidity_2m: [number];
  showers: [number];
  snow_depth: [number];
  snowfall: [number];
  temperature_2m: [number];
  time: [number];
  uv_index: [number];
  uv_index_clear_sky: [number];
  windgusts_10m: [number];
  visibility: [number];
  weathercode: [number];
}

interface HourlyUnits {
  apparent_temperature: string;
  precipitation: string;
  precipitation_probability: string;
  rain: string;
  relativehumidity_2m: string;
  showers: string;
  snow_depth: string;
  snowfall: string;
  temperature_2m: string;
  time: string;
  uv_index: string;
  uv_index_clear_sky: string;
  windgusts_10m: string;
  visibility: string;
  weathercode: string;  
}

interface Root {
  current_weather: CurrentWeather;
  daily: Daily;
  daily_units: DailyUnits;
  elevation: number;
  generationtime_ms: number;
  hourly: Hourly;
  hourly_units: HourlyUnits;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
  temperature_unit: string;
  forecast_days: string;
  windspeed_unit: string;
}