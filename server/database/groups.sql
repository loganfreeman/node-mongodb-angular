﻿



Create Table groups (
	name varchar(40) not null,
	description text,
	id serial not null,
	CONSTRAINT groups_key PRIMARY KEY (id)

)
WITH (
  OIDS=FALSE
);

CREATE UNIQUE INDEX ON groups ((name));

ALTER TABLE groups
  OWNER TO michael;