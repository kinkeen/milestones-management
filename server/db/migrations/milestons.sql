CREATE TYPE StatusTypes AS ENUM ('init', 'waiting_to_accept', 'ask_modification', 'accepted', 'started', 'in_progress', 'finished', 'rejected', 'confirmed', 'end', 'cancelled');

CREATE TABLE mileston (

    id SERIALPRIMARY KEY NOT NULL
    project_id  INTEGER REFERENCES projects(id) ON DELETE CASCADE, 
    status_type StatusTypes,
    date_start DATE,
    estimate_date_end DATE,
    date_end DATE,
    actual_cost decimal(12,2), 
    estimate_cost decimal(12,2),
    creation_date DATE

);
