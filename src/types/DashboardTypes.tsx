export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: Current;
  hourly_units: HourlyUnits;
  hourly: Hourly;
}

export interface CurrentUnits {
  temperature_2m: string;
  relative_humidity_2m: string;
  apparent_temperature: string;
  wind_speed_10m: string;
}

export interface Current {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  wind_speed_10m: number;
}

export interface HourlyUnits {
  temperature_2m: string;
}

export interface Hourly {
  time: string[];
  temperature_2m: number[];
}
