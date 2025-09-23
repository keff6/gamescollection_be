-- Migration m_0001
--
-- Add unique key values to prevent duplicates on tables

ALTER TABLE genre ADD UNIQUE (name);
ALTER TABLE brand ADD UNIQUE (name);
ALTER TABLE console ADD UNIQUE (id_brand, name);
ALTER TABLE game ADD UNIQUE (id_console, title);