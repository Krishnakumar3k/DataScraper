/*
  # Create Companies Table for Data Scraping

  1. New Tables
    - `companies`
      - `id` (uuid, primary key) - Unique identifier for each company
      - `company_name` (text) - Name of the company
      - `phone_number` (text) - Contact phone number
      - `address` (text) - Company address
      - `search_query` (text) - The search query used to find this company
      - `location` (text) - Location searched (India, Noida, Delhi, Dubai, etc.)
      - `created_at` (timestamptz) - When the record was created
      - `updated_at` (timestamptz) - When the record was last updated

  2. Security
    - Enable RLS on `companies` table
    - Add policy for public read access (since this is scraped public data)
    - Add policy for public insert access (to allow saving scraped data)
*/

CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  phone_number text DEFAULT '',
  address text DEFAULT '',
  search_query text DEFAULT '',
  location text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view companies"
  ON companies
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert companies"
  ON companies
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update companies"
  ON companies
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete companies"
  ON companies
  FOR DELETE
  TO anon, authenticated
  USING (true);