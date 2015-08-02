create table user_group (
	id serial not null,
	CONSTRAINT user_group_key PRIMARY KEY (id),
	user_id integer not null references users(id),
	group_id integer not null references groups(id)

)

WITH (
  OIDS=FALSE
);

ALTER TABLE user_group
  OWNER TO michael;