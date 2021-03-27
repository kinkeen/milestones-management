DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS project_users CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS milestones CASCADE;
DROP TABLE IF EXISTS assets CASCADE;
DROP TABLE IF EXISTS digital_signatures CASCADE;

DROP TYPE IF EXISTS RoleTypes  CASCADE;;
DROP TYPE IF EXISTS MineTypes CASCADE;;
DROP TYPE IF EXISTS MilestoneStatusTypes CASCADE;;

CREATE TYPE RoleTypes AS ENUM ('builder', 'subcontractor', 'client', 'owner', 'supplier');

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  role RoleTypes,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  phone text NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  country VARCHAR(50) NOT NULL,
  street VARCHAR(50) NOT NULL,
  home_number VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  province VARCHAR(50) NOT NULL,
  postl_code VARCHAR(50) NOT NULL
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(4000) NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  date_start DATE,
  estimate_date_end DATE,
  date_end DATE,
  estimate_cost decimal(12,2),
  actual_cost decimal(12,2)
);

CREATE TABLE project_users (
  id SERIAL PRIMARY KEY NOT NULL,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  role RoleTypes
);

CREATE TYPE MilestoneStatusTypes AS ENUM ('init', 'waiting_to_accept', 'ask_modification', 'accepted', 'started', 'in_progress', 'finished', 'rejected', 'confirmed', 'end', 'cancelled');

-- CREATE TABLE milestones_types (
--     id SERIAL PRIMARY KEY NOT NULL,
--     title VARCHAR(50) NOT NULL,
--     description VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE comunication_during_milestone (
--     id SERIAL PRIMARY KEY NOT NULL,
--     client_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--     supplier_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--     status MilestoneStatusTypes,
--     creation_date DATE,
--     description VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE milestones (
--     id SERIAL PRIMARY KEY NOT NULL,
--     project_id  INTEGER REFERENCES projects(id) ON DELETE CASCADE, 
--     milestone_type INTEGER REFERENCES milestones_types(id) ON DELETE CASCADE, 
--     date_start DATE,
--     estimate_date_end DATE,
--     date_end DATE,
--     estimate_cost decimal(12,2),
--     actual_cost decimal(12,2), 
--     creation_date DATE
-- );

CREATE TABLE milestones (
    id SERIAL PRIMARY KEY NOT NULL,
    project_id  INTEGER REFERENCES projects(id) ON DELETE CASCADE, 
    status MilestoneStatusTypes,
    date_start DATE,
    estimate_date_end DATE,
    date_end DATE,
    estimate_cost decimal(12,2),
    actual_cost decimal(12,2), 
    creation_date DATE,
    description VARCHAR(4000),
    name VARCHAR(50)
);

CREATE TYPE MineTypes AS ENUM ('image/gif', 'image/apng', 'image/flif', 'image/webp', 'image/x-mng', 'image/jpeg', 'image/png', 'application/pdf', 'application/msword (.doc)');

CREATE TABLE assets (
  id SERIAL PRIMARY KEY NOT NULL,
  milestone_id INTEGER REFERENCES milestones(id) ON DELETE CASCADE,
  description VARCHAR(255) NOT NULL,
  resurce_uri VARCHAR(255) NOT NULL,
  mine_type MineTypes,
  creation_date DATE
);

CREATE TABLE digital_signatures (
  id SERIAL PRIMARY KEY NOT NULL,
  milestone_id INTEGER REFERENCES milestones(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  signature TEXT  NOT NULL,
  creation_date DATE
);



-- -- CREATE TABLE community ( 
-- --   id SERIAL PRIMARY KEY NOT NULL,
-- --   name VARCHAR(50) NOT NULL,
-- --   area VARCHAR(50) NOT NULL,
-- --   phase phases,  
-- --   date_start DATE,
-- --   estimate_date_end DATE,
-- --   date_end DATE
-- -- );


-- -- CREATE TABLE model_home ( 
-- --   id SERIAL PRIMARY KEY NOT NULL,
-- --   name VARCHAR(50) NOT NULL,
-- -- );