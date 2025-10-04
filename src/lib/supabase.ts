import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://wuelqixrnopzhyzybjhz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1ZWxxaXhybm9wemh5enliamh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MTA3OTMsImV4cCI6MjA3NTA4Njc5M30rTg2DcQcnXSPJY8PjqZaA1XXNB7DU0E2rqCQzQrL7Xo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type BirthChart = {
  id: string;
  birth_name: string;
  date_of_birth: string;
  time_of_birth: string;
  place_of_birth: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  sun_sign?: string;
  moon_sign?: string;
  ascendant?: string;
  nakshatra?: string;
  nakshatra_pada?: number;
  dominant_planet?: string;
  chart_data?: any;
  created_at: string;
};

export type NameSuggestion = {
  id: string;
  birth_chart_id: string;
  suggested_name: string;
  numerology_number?: number;
  favorable_syllables?: string[];
  reasoning?: string;
  created_at: string;
};

export type DailyInsight = {
  id: string;
  zodiac_sign: string;
  date: string;
  horoscope_text?: string;
  lucky_numbers?: number[];
  lucky_color?: string;
  affirmation?: string;
  dos?: string[];
  donts?: string[];
  remedies?: string[];
  created_at: string;
};
