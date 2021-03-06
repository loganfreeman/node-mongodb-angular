﻿Create Table instance (
	name varchar(40) not null,
	ip cidr not null,
	description text,
	id serial not null,
	CONSTRAINT instance_pkey PRIMARY KEY (id),
	stack_id integer not null references stack(id)

)
WITH (
  OIDS=FALSE
);

ALTER TABLE instance
  OWNER TO michael;
