create table stack_association (
	id serial not null,
	CONSTRAINT stack_association_pkey PRIMARY KEY (id),
	envrionment_id integer not null references environment(id),
	stack_id integer not null references stack(id)
)
WITH (
  OIDS=FALSE
);

ALTER TABLE stack_association
  OWNER TO michael;