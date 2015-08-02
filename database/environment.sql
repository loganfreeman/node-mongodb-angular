create table environment (

	name varchar(40) not null,
	description text,
	id serial not null,
	CONSTRAINT envrionment_pkey PRIMARY KEY (id)


)
WITH (
  OIDS=FALSE
);


CREATE UNIQUE INDEX ON environment ((name));


ALTER TABLE environment
  OWNER TO michael;