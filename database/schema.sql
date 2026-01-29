-- =====================================================
-- Database Recovery Schema for maturitna_react
-- Generated from codebase analysis
-- =====================================================

-- 1. Users table (for authentication)
CREATE TABLE IF NOT EXISTS "Users" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(50) DEFAULT 'user',
    "active" BOOLEAN DEFAULT TRUE,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Kategoria (Categories) table
CREATE TABLE IF NOT EXISTS "Kategoria" (
    "id" SERIAL PRIMARY KEY,
    "nazov" VARCHAR(255) NOT NULL,
    "obrazok" BYTEA
);

-- 3. Produkty (Products) table
CREATE TABLE IF NOT EXISTS "Produkty" (
    "id" SERIAL PRIMARY KEY,
    "nazov" VARCHAR(255) NOT NULL,
    "popis" TEXT,
    "cena" DECIMAL(10, 2) NOT NULL,
    "dostupnost" BOOLEAN DEFAULT TRUE,
    "mnozstvo" INTEGER DEFAULT 0,
    "kategoria" INTEGER REFERENCES "Kategoria"("id"),
    "obrazok" BYTEA
);

-- 4. Objednavka (Orders) table
CREATE TABLE IF NOT EXISTS "Objednavka" (
    "id" SERIAL PRIMARY KEY,
    "meno" VARCHAR(255),
    "priezvisko" VARCHAR(255),
    "email" VARCHAR(255),
    "prefix" VARCHAR(10),
    "t_cislo" VARCHAR(50),
    "cena_objednavky" DECIMAL(10, 2),
    "ulica" VARCHAR(255),
    "mesto" VARCHAR(255),
    "psc" VARCHAR(20),
    "poznamka" TEXT,
    "nazov_spolocnost" VARCHAR(255),
    "ico" VARCHAR(50),
    "dic" VARCHAR(50),
    "icdph" VARCHAR(50),
    "proces" BOOLEAN DEFAULT TRUE,
    "date_created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "user_created" INTEGER REFERENCES "Users"("id")
);

-- 5. Produkt_skladania (Order Items / Product Assembly) table
CREATE TABLE IF NOT EXISTS "Produkt_skladania" (
    "id" SERIAL PRIMARY KEY,
    "id_objednavka" INTEGER REFERENCES "Objednavka"("id") ON DELETE CASCADE,
    "id_produkt" INTEGER REFERENCES "Produkty"("id"),
    "pocet_kusov" INTEGER NOT NULL
);

-- =====================================================
-- Create indexes for better performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_users_email ON "Users"("email");
CREATE INDEX IF NOT EXISTS idx_produkty_kategoria ON "Produkty"("kategoria");
CREATE INDEX IF NOT EXISTS idx_objednavka_user ON "Objednavka"("user_created");
CREATE INDEX IF NOT EXISTS idx_produkt_skladania_objednavka ON "Produkt_skladania"("id_objednavka");
