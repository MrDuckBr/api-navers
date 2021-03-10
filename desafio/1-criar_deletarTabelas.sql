CREATE TABLE  "navers"(
    id  SERIAL PRIMARY KEY,
    name varchar(50) NOT NULL,
    birthdate date NOT NULL,
    admission_date date NOT NULL,
    job_role varchar(50) NOT NULL,
	created_at timestamp NOT NULL DEFAULT NOW(),
	updated_at timestamp NOT NULL DEFAULT NOW()
    );


DROP TABLE "navers"


CREATE TABLE "projects"(
    id SERIAl PRIMARY KEY,
    name varchar(250) NOT NULL,
	created_at timestamp NOT NULL DEFAULT NOW(),
	updated_at timestamp NOT NULL DEFAULT NOW()
);

DROP TABLE "projeto"




CREATE TABLE "projects_navers"(
	id SERIAL PRIMARY KEY,
	project_id INT NOT NULL,
	naver_id INT NOT NULL,
	
	FOREIGN KEY (naver_id) REFERENCES navers (id),
	FOREIGN KEY (project_id) REFERENCES projects(id)
)

DROP TABLE "projects_navers" ;



