

-- CREATE TYPE types AS ENUM ('builder', 'subcontractor', 'client', 'owner');
-- CREATE TYPE StatusTypes AS ENUM ('init', 'waiting_to_accept', 'ask_modification', 'accepted', 'started', 'in_progress', 'finished', 'rejected', 'confirmed', 'end', 'cancelled');
-- CREATE TYPE MineTypes AS ENUM ('image/gif', 'image/apng', 'image/flif', 'image/webp', 'image/x-mng', 'image/jpeg', 'image/png', 'application/pdf', 'application/msword (.doc)');


INSERT INTO users (role, first_name, last_name, phone, email, password, country , street, home_number ,city , province , postl_code)
VALUES 
  ('builder', 'Arel', 'Elbaz', '613-123456', 'arel.elbaz@gmail.com', '123456', 'Canada', 'Toronro','256' ,'Toren Hill', 'ON' , 'KH503H');
  --('owner', 'Liam', 'Martinez', '613-456321' , 'liam.martinez@gmail.com', '123456', 'Canada' ,'Toronro','25645', 'Toren Hill', 'ON', '0KV9F5'),
  -- ('owner', 'Richard', 'Martinez', '613-456321', 'richard.martinez@yahoo.com', '123456', 'Canada' 'Ottawa','25680', 'Gallantery Way', 'ON', 'K2V0R6'), 
  -- ('owner', 'Liam', 'Wong', '613-456321', 'Liam.Wong@gmail.com', '123456', 'Canada' , 'Ottawa','25600', 'Gallantery Way' , 'ON' , 'J80F5J'), 
  -- ('owner', 'Lydia', 'Miller', '613-456321', 'Lydia.Miller.yahoo.com', '123456', 'Canada' , 'Ottawa','25786', 'Gallantery Way' , 'ON' , 'K2B0FR'),
  -- ('owner', 'Archie', 'Cohen' , '613-458821', 'Archie.Cohen@yahoo.com', '123456', 'Canada' , 'Vancouver','25346', 'lingland', 'BC' , 'KD0P7R'), 
  -- ('owner', 'Chad' 'Takahashi', '613-456001', 'Chad.Takahashi@yahoo.com', '123456', 'Canada' , 'Vancouver','25996', 'lingland' , 'BC', 'FJ70IS'),
  -- ('owner', 'Leopold', 'Silvers', '613-4599921', 'Leopold.Silvers@gmail.com', '123456', 'Canada' , 'Ottawa','25566', 'Gallantery Way' , 'ON', 'D78H34'),  
  -- ('owner', 'Maria', 'Boucher', '613-456345', 'Maria.Boucher@yahoo.com', '123456', 'Canada' , 'Ottawa','25456', 'Gallantery Way' , 'ON', '8H6FB8'),  
  -- ('owner', 'Jamal', 'Jordan', '613-489021', 'Jamal.Jordan@gmail.com', '123456', 'Canada' , 'Ottawa','25556', 'Gallantery Way' , 'ON' , '23D5Y0'),  
  -- ('owner', 'Michael', 'Montoya', '613-456889', 'Michael.Montoya@yahoo.com', '123456', 'Canada', 'Ottawa','29056', 'Gallantery Way' , 'ON', 'KF7B4K'),  
  -- ('owner', 'Yuko', 'Smith', '613-439021', 'Yuko.Smith@gmail.com', '123456', 'Canada' , 'Ottawa','22356', 'Gallantery Way' , 'ON' , '2E4H8M');

-- INSERT INTO milestones_types (title, description)
-- VALUES 
-- ('Step 1', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!'),
-- ('Step 2', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!'),
-- ('Step 3', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!'),
-- ('Step 4', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!'),
-- ('Step 5', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!'),
-- ('Step 6', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!'),
-- ('Step 7', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!');

/*INSERT INTO projects(name , description , owner_id , date_start , estimate_date_end , date_end , estimate_cost , actual_cost)
VALUES 
  ( name , description , owner_id , date_start , estimate_date_end , date_end , estimate_cost , actual_cost),
  ( name , description , owner_id , date_start , estimate_date_end , date_end , estimate_cost , actual_cost);


INSERT INTO project_users (project_id, user_id , role)
VALUES 
  ( project_id, user_id , role)
  ( project_id, user_id , role);


INSERT INTO mileston( project_id , status_type , date_start , estimate_date_end , date_end , estimate_cost , actual_cost , creation_date)
VALUES 
  ( project_id , status_type , date_start , estimate_date_end , date_end , estimate_cost , actual_cost , creation_date), 
  ( project_id , status_type , date_start , estimate_date_end , date_end , estimate_cost , actual_cost , creation_date);


INSERT INTO assets ( milestone_id , description ,resurce_uri , mine_type , creation_date)
VALUES 
  ( milestone_id , description ,resurce_uri , mine_type , creation_date),
  ( milestone_id , description ,resurce_uri , mine_type , creation_date);


INSERT INTO digital_signatures ( milestone_id , user_id ,signature, creation_date)
VALUES 
  ( milestone_id , user_id ,signature, creation_date), 
  ( milestone_id , user_id ,signature, creation_date); */






-- INSERT INTO available_interviewers (day_id, interviewer_id)
-- SELECT 1 as day_id, interviewers.interviewer_id FROM ( SELECT id AS interviewer_id FROM interviewers ORDER BY RANDOM() LIMIT 5 ) interviewers;

-- INSERT INTO available_interviewers (day_id, interviewer_id)
-- SELECT 2 as day_id, interviewers.interviewer_id FROM ( SELECT id AS interviewer_id FROM interviewers ORDER BY RANDOM() LIMIT 5 ) interviewers;

-- INSERT INTO available_interviewers (day_id, interviewer_id)
-- SELECT 3 as day_id, interviewers.interviewer_id FROM ( SELECT id AS interviewer_id FROM interviewers ORDER BY RANDOM() LIMIT 5 ) interviewers;

-- INSERT INTO available_interviewers (day_id, interviewer_id)
-- SELECT 4 as day_id, interviewers.interviewer_id FROM ( SELECT id AS interviewer_id FROM interviewers ORDER BY RANDOM() LIMIT 5 ) interviewers;

-- INSERT INTO available_interviewers (day_id, interviewer_id)
-- SELECT 5 as day_id, interviewers.interviewer_id FROM ( SELECT id AS interviewer_id FROM interviewers ORDER BY RANDOM() LIMIT 5 ) interviewers;

-- WITH
-- appointments AS (
--   SELECT id as appointment_id, day_id FROM appointments ORDER BY RANDOM() LIMIT 10
-- ),
-- students(name) AS(
--   VALUES
--     ('Liam Martinez'),
--     ('Richard Wong'),
--     ('Lydia Miller-Jones'),
--     ('Archie Cohen'),
--     ('Chad Takahashi'),
--     ('Leopold Silvers'),
--     ('Maria Boucher'),
--     ('Jamal Jordan'),
--     ('Michael Chan-Montoya'),
--     ('Yuko Smith')
-- )


-- INSERT INTO interviews (student, appointment_id, interviewer_id)
-- SELECT
--   DISTINCT ON 
--   (s.name) name,
--   a.appointment_id AS appointment_id,
--   available_interviewers.interviewer_id AS interviewer_id
-- FROM (
--   SELECT
--     *, row_number() OVER(ORDER BY appointment_id) AS rnum
--   FROM appointments
-- ) AS a
-- JOIN (
--   SELECT
--     *, row_number() OVER(ORDER BY name) AS rnum
--   FROM students
-- ) AS s
-- ON a.rnum = s.rnum
-- JOIN available_interviewers
-- ON a.day_id = available_interviewers.day_id;