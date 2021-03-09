create table projeto_navers(
	naver_id INT NOT NULL,
	projeto_id INT NOT NULL,
	
	FOREIGN KEY (naver_id) REFERENCES navers (id),
	FOREIGN KEY (projeto_id) REFERENCES projeto(id)
)