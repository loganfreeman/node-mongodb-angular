Create Table IF NOT EXISTS users (
	name varchar(40) not null,
	firstName varchar(40) not null,
	lastName varchar(40) not null,
	password varchar(40) not null,
	email text not null,
	id serial not null,
	CONSTRAINT users_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);


CREATE UNIQUE INDEX ON users ((lower(email)));




ALTER TABLE users
  OWNER TO michael;

  insert into users ( name, firstname, lastname, password, email)
  values
  (
'michael collin', 'michael', 'collin', 'test', 'michael.collin@contactpointsolutions.com'
); 