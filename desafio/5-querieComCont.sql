SELECT
  a.name as projects,
  COUNT(b.id) as numNavers
FROM
  projects a , projects_navers b
WHERE
  a.id = b.naver_id
  GROUP BY
  a.id