/*
  # Create Naamstar Astrology Database Schema

  ## Overview
  This migration creates the core tables for the Naamstar astrology application to store user birth data, chart calculations, and daily insights.

  ## New Tables
  
  ### 1. `birth_charts`
  Stores user birth information and generated chart data
  - `id` (uuid, primary key) - Unique identifier for each chart
  - `birth_name` (text) - User's birth name
  - `date_of_birth` (date) - Date of birth
  - `time_of_birth` (time) - Time of birth
  - `place_of_birth` (text) - Place of birth for accurate calculations
  - `latitude` (numeric) - Location latitude
  - `longitude` (numeric) - Location longitude
  - `timezone` (text) - Timezone for birth time
  - `sun_sign` (text) - Western sun sign
  - `moon_sign` (text) - Vedic moon sign (Rashi)
  - `ascendant` (text) - Rising sign
  - `nakshatra` (text) - Birth star
  - `nakshatra_pada` (integer) - Nakshatra pada (1-4)
  - `dominant_planet` (text) - Chart ruler/dominant planet
  - `chart_data` (jsonb) - Complete planetary positions and house data
  - `created_at` (timestamptz) - When the chart was created
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `name_suggestions`
  Stores generated name suggestions for users
  - `id` (uuid, primary key) - Unique identifier
  - `birth_chart_id` (uuid, foreign key) - Links to birth chart
  - `suggested_name` (text) - The suggested name
  - `numerology_number` (integer) - Associated numerology number
  - `favorable_syllables` (text[]) - Auspicious syllables from nakshatra
  - `reasoning` (text) - Explanation of why this name is favorable
  - `created_at` (timestamptz) - Creation timestamp

  ### 3. `daily_insights`
  Caches daily horoscope readings and insights
  - `id` (uuid, primary key) - Unique identifier
  - `zodiac_sign` (text) - Zodiac sign this insight is for
  - `date` (date) - Date of the reading
  - `horoscope_text` (text) - Daily horoscope content
  - `lucky_numbers` (integer[]) - Lucky numbers for the day
  - `lucky_color` (text) - Lucky color
  - `affirmation` (text) - Daily affirmation
  - `dos` (text[]) - Do's for the day
  - `donts` (text[]) - Don'ts for the day
  - `remedies` (text[]) - Suggested remedies
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable Row Level Security on all tables
  - For MVP without authentication, allow public read/write access
  - These policies will be restricted when authentication is added in future versions

  ## Notes
  - Chart data stored as JSONB for flexibility with various astrological systems
  - Daily insights cached to reduce API calls and improve performance
  - Schema supports both Vedic and Western astrology principles
*/

-- Create birth_charts table
CREATE TABLE IF NOT EXISTS birth_charts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  birth_name text NOT NULL,
  date_of_birth date NOT NULL,
  time_of_birth time NOT NULL,
  place_of_birth text NOT NULL,
  latitude numeric(9, 6),
  longitude numeric(9, 6),
  timezone text,
  sun_sign text,
  moon_sign text,
  ascendant text,
  nakshatra text,
  nakshatra_pada integer CHECK (nakshatra_pada BETWEEN 1 AND 4),
  dominant_planet text,
  chart_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create name_suggestions table
CREATE TABLE IF NOT EXISTS name_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  birth_chart_id uuid REFERENCES birth_charts(id) ON DELETE CASCADE,
  suggested_name text NOT NULL,
  numerology_number integer,
  favorable_syllables text[] DEFAULT ARRAY[]::text[],
  reasoning text,
  created_at timestamptz DEFAULT now()
);

-- Create daily_insights table
CREATE TABLE IF NOT EXISTS daily_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  zodiac_sign text NOT NULL,
  date date NOT NULL,
  horoscope_text text,
  lucky_numbers integer[] DEFAULT ARRAY[]::integer[],
  lucky_color text,
  affirmation text,
  dos text[] DEFAULT ARRAY[]::text[],
  donts text[] DEFAULT ARRAY[]::text[],
  remedies text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now(),
  UNIQUE(zodiac_sign, date)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_birth_charts_created_at ON birth_charts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_name_suggestions_chart_id ON name_suggestions(birth_chart_id);
CREATE INDEX IF NOT EXISTS idx_daily_insights_sign_date ON daily_insights(zodiac_sign, date);

-- Enable Row Level Security
ALTER TABLE birth_charts ENABLE ROW LEVEL SECURITY;
ALTER TABLE name_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_insights ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for MVP (no authentication yet)
-- These will be updated when authentication is added

CREATE POLICY "Allow public read access to birth charts"
  ON birth_charts FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert to birth charts"
  ON birth_charts FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public read access to name suggestions"
  ON name_suggestions FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert to name suggestions"
  ON name_suggestions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public read access to daily insights"
  ON daily_insights FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert to daily insights"
  ON daily_insights FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public update to daily insights"
  ON daily_insights FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);