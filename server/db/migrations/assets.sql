
CREATE TYPE MineTypes AS ENUM ('image/gif', 'image/apng', 'image/flif', 'image/webp', 'image/x-mng', 'image/jpeg', 'image/png', 'application/pdf', 'application/msword (.doc)');

CREATE TABLE assets (
  id SERIAL PRIMARY KEY NOT NULL,
  milestone_id INTEGER REFERENCES milestons(id) ON DELETE CASCADE,
  description VARCHAR(255) NOT NULL,
  resurce_uri VARCHAR(255) NOT NULL,
  mine_type MineTypes,
  creation_date DATE
)