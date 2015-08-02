create table instance_association (
	id serial not null,
	CONSTRAINT instance_association_pkey PRIMARY KEY (id),
	instance_id integer not null references instance(id),
	stack_id integer not null references stack(id)

)

WITH (
  OIDS=FALSE
);

ALTER TABLE instance_association
  OWNER TO michael;