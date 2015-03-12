Create Table deploy (
	deploy_date timestamp with time zone not null,
	user_id integer not null references users(id),
	comments text,
	instance_id integer not null references instance(id),
	id serial not null,
	CONSTRAINT deploy_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);

ALTER TABLE deploy
  OWNER TO michael;
