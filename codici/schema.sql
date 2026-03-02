CREATE TABLE greenhouse_stats (
  id int8 PRIMARY KEY GENERATED ALWAYS AS IDENTITY, -- BigInt per gestire milioni di log
  created_at timestamptz DEFAULT now(),             -- Timestamp automatico con fuso orario
  temp float8,                                      -- Precisione decimale per la temperatura
  humidity float8,                                  -- Umidità relativa
  soil_moisture float8                              -- Livello di idratazione del terreno
);
