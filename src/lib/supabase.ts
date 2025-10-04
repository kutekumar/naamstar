import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
