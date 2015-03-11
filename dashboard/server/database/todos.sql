select * from notes;


delete from notes;

INSERT INTO "notes" ("id","text") VALUES (DEFAULT,'orm');

delete from notes where id is null;

ALTER TABLE notes ALTER COLUMN id TYPE integer;
ALTER TABLE notes ADD COLUMN key_column BIGSERIAL PRIMARY KEY;

drop table notes;


CREATE TABLE notes(
	id serial PRIMARY KEY,
	text VARCHAR (50) UNIQUE NOT NULL
);

GRANT ALL PRIVILEGES ON notes TO michael;
GRANT ALL PRIVILEGES ON notes_id_seq to michael;

select * from users;