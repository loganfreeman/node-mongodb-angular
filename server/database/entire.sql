/*


create environment table, change owner

*/


create table if not exists environment (

	name varchar(40) not null,
	description text,
	id serial not null,
	CONSTRAINT envrionment_pkey PRIMARY KEY (id)


)
WITH (
  OIDS=FALSE
);

ALTER TABLE environment
  OWNER TO michael;

  /*

  create stack table, change owner

  */

  create table if not exists stack (
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

    /*

    create instance table, change owner
    */

    Create Table if not exists instance (
    	name varchar(40) not null,
    	ip cidr not null,
    	description text,
    	id serial not null,
    	CONSTRAINT instance_pkey PRIMARY KEY (id)

    )
    WITH (
      OIDS=FALSE
    );

    ALTER TABLE instance
      OWNER TO michael;



/*

create deploy table, change owner

*/


Create Table if not exists deploy (
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



/*

create stack_association table, change owner

*/


create table if not exists stack_association (
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



/*

create instance_association table, change owner

*/



create table if not exists instance_association (
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



/*

create group table, change owner
*/


Create Table if not exists groups (
	name varchar(40) not null,
	description text,
	id serial not null,
	CONSTRAINT groups_key PRIMARY KEY (id)

)
WITH (
  OIDS=FALSE
);

ALTER TABLE groups
  OWNER TO michael;


/*

create user table, change owner
*/


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