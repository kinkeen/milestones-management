CREATE TYPE types AS ENUM ('builder', 'subcontractor', 'client');

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  user_type types,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  phone text NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  country VARCHAR(50) NOT NULL,
  street VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  province VARCHAR(50) NOT NULL,
  post_code VARCHAR(50) NOT NULL
);