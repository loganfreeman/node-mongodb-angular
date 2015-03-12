create table stack (
	name varchar(40) not null,
	description text,
	id serial not null,
	CONSTRAINT stack_pkey PRIMARY KEY (id)


)

WITH (
  OIDS=FALSE
);

ALTER TABLE stack
  OWNER TO michael;