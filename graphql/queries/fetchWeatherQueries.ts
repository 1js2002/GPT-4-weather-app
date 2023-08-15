import { gql } from "@apollo/client";
//Needs to match index.graphql queries EXACTLY (daily, hourly, Root, etc...)
const fetchWeatherQuery = gql`
  query MyQuery(
    $current_weather: String
    $daily: String = "weathercode,precipitation_probability_max,precipitation_sum,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max"
    $hourly: String = "temperature_2m,visibility,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,windgusts_10m,uv_index,uv_index_clear_sky"
    $latitude: String!
    $longitude: String!
    $timezone: String!
    $temperature_unit: String!
    $forecast_days: String!
    $windspeed_unit: String!
  ) {
    myQuery(
      current_weather: $current_weather
      daily: $daily
      hourly: $hourly
      latitude: $latitude
      longitude: $longitude
      timezone: $timezone
      temperature_unit: $temperature_unit
      forecast_days: $forecast_days
      windspeed_unit: $windspeed_unit

    ) {
      elevation
      generationtime_ms
      latitude
      longitude
      timezone
      timezone_abbreviation
      utc_offset_seconds
      temperature_unit
      windspeed_unit
      forecast_days
      hourly {
        apparent_temperature
        precipitation
        precipitation_probability
        rain
        relativehumidity_2m
        showers
        snow_depth
        snowfall
        temperature_2m
        time
        uv_index
        uv_index_clear_sky
        windgusts_10m
        visibility
        weathercode
      }
      hourly_units {
        apparent_temperature
        precipitation
        precipitation_probability
        rain
        relativehumidity_2m
        showers
        snow_depth
        snowfall
        temperature_2m
        time
        uv_index
        uv_index_clear_sky
        windgusts_10m
        visibility
        weathercode        
      }
      daily_units {
        precipitation_probability_max
        precipitation_sum
        rain_sum        
        apparent_temperature_max
        apparent_temperature_min
        sunrise
        sunset
        temperature_2m_max
        temperature_2m_min
        time
        uv_index_clear_sky_max
        uv_index_max
        weathercode
      }
      daily {
        precipitation_probability_max
        precipitation_sum
        rain_sum        
        apparent_temperature_max
        apparent_temperature_min
        sunrise
        sunset
        temperature_2m_max
        temperature_2m_min
        time
        uv_index_clear_sky_max
        uv_index_max
        weathercode
      }
      current_weather {
        is_day
        temperature
        time
        weathercode
        winddirection
        windspeed
      }
    }
  }
`;

export default fetchWeatherQuery;