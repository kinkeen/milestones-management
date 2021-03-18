

CREATE TABLE projects (

  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255) NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  date_start DATE,
  estimate_date_end DATE,
  date_end DATE,
  estimate_cost decimal(12,2),
  actual_cost decimal(12,2)
  
);