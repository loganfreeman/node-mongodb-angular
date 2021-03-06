/*


create environment table, change owner

*/


drop table IF EXISTS environment cascade;

create table if not exists environment (

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
  OWNER TO ops_dashboard;

  /*

  create stack table, change owner

  */
 

 drop table IF EXISTS stack cascade;

  create table if not exists stack (
  	name varchar(40) not null,
  	description text,
  	id serial not null,
    environment_id integer not null references environment(id),
  	CONSTRAINT stack_pkey PRIMARY KEY (id)


  )

  WITH (
    OIDS=FALSE
  );

  ALTER TABLE stack
    OWNER TO ops_dashboard;

    /*

    create instance table, change owner
    */
   
   drop table IF EXISTS instance cascade;

    Create Table if not exists instance (
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
      OWNER TO ops_dashboard;



/*

create stack_association table, change owner

*/

drop table IF EXISTS stack_association cascade;


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
  OWNER TO ops_dashboard;



/*

create instance_association table, change owner

*/


drop table IF EXISTS instance_association cascade;


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
  OWNER TO ops_dashboard;



/*

create group table, change owner
*/

drop table IF EXISTS groups cascade;


Create Table if not exists groups (
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
  OWNER TO ops_dashboard;


/*

create user table, change owner
*/

drop table IF EXISTS users cascade;


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
  OWNER TO ops_dashboard;




/*

create deploy table, change owner

*/

drop table IF EXISTS deploy cascade;


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
  OWNER TO ops_dashboard;

/**
 *
 * user and group are many to many relationship
 * 
 */

drop table IF EXISTS user_group cascade;


create table if not exists user_group (
  id serial not null,
  CONSTRAINT user_group_key PRIMARY KEY (id),
  user_id integer not null references users(id),
  group_id integer not null references groups(id)

)

WITH (
  OIDS=FALSE
);

ALTER TABLE user_group
  OWNER TO ops_dashboard;


