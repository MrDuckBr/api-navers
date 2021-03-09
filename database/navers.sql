CREATE TABLE  "navers"(
    id  SERIAL PRIMARY KEY,
    name varchar(50) NOT NULL,
    birthdate date NOT NULL,
    admission_date date NOT NULL,
    job_role varchar(50) NOT NULL
    );