
SELECT a.id, a.name, b.name, b.birthdate, b.admission_date, b.job_role
FROM projects a, navers b, projects_navers c
WHERE a.id = c.id_projects AND c.id_navers = b.id;