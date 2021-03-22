
CREATE TABLE digital_signatures (
  id SERIAL PRIMARY KEY NOT NULL,
  milestone_id INTEGER REFERENCES milestons(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  signature bytea  NOT NULL
  creation_date DATE
)