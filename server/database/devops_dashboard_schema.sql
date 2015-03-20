--
-- Name: deploy; Type: TABLE; Schema: public; Owner: ops_dashboard; Tablespace: 
--

CREATE TABLE deploy (
    deploy_date timestamp with time zone NOT NULL,
    user_id integer NOT NULL,
    comments text,
    instance_id integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE deploy OWNER TO ops_dashboard;

--
-- Name: deploy_id_seq; Type: SEQUENCE; Schema: public; Owner: ops_dashboard
--

CREATE SEQUENCE deploy_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE deploy_id_seq OWNER TO ops_dashboard;

--
-- Name: deploy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ops_dashboard
--

ALTER SEQUENCE deploy_id_seq OWNED BY deploy.id;


--
-- Name: environment; Type: TABLE; Schema: public; Owner: ops_dashboard; Tablespace: 
--

CREATE TABLE environment (
    name character varying(40) NOT NULL,
    description text,
    id integer NOT NULL
);


ALTER TABLE environment OWNER TO ops_dashboard;

--
-- Name: environment_id_seq; Type: SEQUENCE; Schema: public; Owner: ops_dashboard
--

CREATE SEQUENCE environment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE environment_id_seq OWNER TO ops_dashboard;

--
-- Name: environment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ops_dashboard
--

ALTER SEQUENCE environment_id_seq OWNED BY environment.id;


--
-- Name: groups; Type: TABLE; Schema: public; Owner: ops_dashboard; Tablespace: 
--

CREATE TABLE groups (
    name text,
    description text,
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE groups OWNER TO ops_dashboard;

--
-- Name: groups_id_seq; Type: SEQUENCE; Schema: public; Owner: ops_dashboard
--

CREATE SEQUENCE groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE groups_id_seq OWNER TO ops_dashboard;

--
-- Name: groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ops_dashboard
--

ALTER SEQUENCE groups_id_seq OWNED BY groups.id;


--
-- Name: instance; Type: TABLE; Schema: public; Owner: ops_dashboard; Tablespace: 
--

CREATE TABLE instance (
    name character varying(40) NOT NULL,
    ip cidr NOT NULL,
    description text,
    id integer NOT NULL,
    stack_id integer NOT NULL
);


ALTER TABLE instance OWNER TO ops_dashboard;

--
-- Name: instance_association; Type: TABLE; Schema: public; Owner: ops_dashboard; Tablespace: 
--

CREATE TABLE instance_association (
    id integer NOT NULL,
    instance_id integer NOT NULL,
    stack_id integer NOT NULL
);


ALTER TABLE instance_association OWNER TO ops_dashboard;

--
-- Name: instance_association_id_seq; Type: SEQUENCE; Schema: public; Owner: ops_dashboard
--

CREATE SEQUENCE instance_association_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE instance_association_id_seq OWNER TO ops_dashboard;

--
-- Name: instance_association_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ops_dashboard
--

ALTER SEQUENCE instance_association_id_seq OWNED BY instance_association.id;


--
-- Name: instance_id_seq; Type: SEQUENCE; Schema: public; Owner: ops_dashboard
--

CREATE SEQUENCE instance_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE instance_id_seq OWNER TO ops_dashboard;

--
-- Name: instance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ops_dashboard
--

ALTER SEQUENCE instance_id_seq OWNED BY instance.id;


--
-- Name: my_table; Type: TABLE; Schema: public; Owner: ops_dashboard; Tablespace: 
--

CREATE TABLE my_table (
    name text,
    description text
);


ALTER TABLE my_table OWNER TO ops_dashboard;

--
-- Name: notes; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE notes (
    id integer NOT NULL,
    text character varying(50) NOT NULL
);


ALTER TABLE notes OWNER TO postgres;

--
-- Name: notes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE notes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE notes_id_seq OWNER TO postgres;

--
-- Name: notes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE notes_id_seq OWNED BY notes.id;


--
-- Name: stack; Type: TABLE; Schema: public; Owner: ops_dashboard; Tablespace: 
--

CREATE TABLE stack (
    name character varying(40) NOT NULL,
    description text,
    id integer NOT NULL,
    environment_id integer NOT NULL
);


ALTER TABLE stack OWNER TO ops_dashboard;

--
-- Name: stack_association; Type: TABLE; Schema: public; Owner: ops_dashboard; Tablespace: 
--

CREATE TABLE stack_association (
    id integer NOT NULL,
    envrionment_id integer NOT NULL,
    stack_id integer NOT NULL
);


ALTER TABLE stack_association OWNER TO ops_dashboard;

--
-- Name: stack_association_id_seq; Type: SEQUENCE; Schema: public; Owner: ops_dashboard
--

CREATE SEQUENCE stack_association_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stack_association_id_seq OWNER TO ops_dashboard;

--
-- Name: stack_association_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ops_dashboard
--

ALTER SEQUENCE stack_association_id_seq OWNED BY stack_association.id;


--
-- Name: stack_id_seq; Type: SEQUENCE; Schema: public; Owner: ops_dashboard
--

CREATE SEQUENCE stack_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stack_id_seq OWNER TO ops_dashboard;

--
-- Name: stack_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ops_dashboard
--

ALTER SEQUENCE stack_id_seq OWNED BY stack.id;


--
-- Name: user_group; Type: TABLE; Schema: public; Owner: ops_dashboard; Tablespace: 
--

CREATE TABLE user_group (
    user_id integer,
    group_id integer,
    id integer,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE user_group OWNER TO ops_dashboard;

--
-- Name: users; Type: TABLE; Schema: public; Owner: ops_dashboard; Tablespace: 
--

CREATE TABLE users (
    "firstName" text,
    "lastName" text,
    name text,
    password text,
    email text,
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE users OWNER TO ops_dashboard;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: ops_dashboard
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO ops_dashboard;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ops_dashboard
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ops_dashboard
--

ALTER TABLE ONLY deploy ALTER COLUMN id SET DEFAULT nextval('deploy_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ops_dashboard
--

ALTER TABLE ONLY environment ALTER COLUMN id SET DEFAULT nextval('environment_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ops_dashboard
--

ALTER TABLE ONLY groups ALTER COLUMN id SET DEFAULT nextval('groups_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ops_dashboard
--

ALTER TABLE ONLY instance ALTER COLUMN id SET DEFAULT nextval('instance_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ops_dashboard
--

ALTER TABLE ONLY instance_association ALTER COLUMN id SET DEFAULT nextval('instance_association_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY notes ALTER COLUMN id SET DEFAULT nextval('notes_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ops_dashboard
--

ALTER TABLE ONLY stack ALTER COLUMN id SET DEFAULT nextval('stack_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ops_dashboard
--

ALTER TABLE ONLY stack_association ALTER COLUMN id SET DEFAULT nextval('stack_association_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ops_dashboard
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: deploy_pkey; Type: CONSTRAINT; Schema: public; Owner: ops_dashboard; Tablespace: 
--

ALTER TABLE ONLY deploy
    ADD CONSTRAINT deploy_pkey PRIMARY KEY (id);


--
-- Name: envrionment_pkey; Type: CONSTRAINT; Schema: public; Owner: ops_dashboard; Tablespace: 
--

ALTER TABLE ONLY environment
    ADD CONSTRAINT envrionment_pkey PRIMARY KEY (id);


--
-- Name: groups_pkey; Type: CONSTRAINT; Schema: public; Owner: ops_dashboard; Tablespace: 
--

ALTER TABLE ONLY groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);


--
-- Name: instance_association_pkey; Type: CONSTRAINT; Schema: public; Owner: ops_dashboard; Tablespace: 
--

ALTER TABLE ONLY instance_association
    ADD CONSTRAINT instance_association_pkey PRIMARY KEY (id);


--
-- Name: instance_pkey; Type: CONSTRAINT; Schema: public; Owner: ops_dashboard; Tablespace: 
--

ALTER TABLE ONLY instance
    ADD CONSTRAINT instance_pkey PRIMARY KEY (id);


--
-- Name: notes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (id);


--
-- Name: notes_text_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY notes
    ADD CONSTRAINT notes_text_key UNIQUE (text);


--
-- Name: stack_association_pkey; Type: CONSTRAINT; Schema: public; Owner: ops_dashboard; Tablespace: 
--

ALTER TABLE ONLY stack_association
    ADD CONSTRAINT stack_association_pkey PRIMARY KEY (id);


--
-- Name: stack_pkey; Type: CONSTRAINT; Schema: public; Owner: ops_dashboard; Tablespace: 
--

ALTER TABLE ONLY stack
    ADD CONSTRAINT stack_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: ops_dashboard; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: environment_name_idx; Type: INDEX; Schema: public; Owner: ops_dashboard; Tablespace: 
--

CREATE UNIQUE INDEX environment_name_idx ON environment USING btree (name);


--
-- Name: groups_name_idx; Type: INDEX; Schema: public; Owner: ops_dashboard; Tablespace: 
--

CREATE UNIQUE INDEX groups_name_idx ON groups USING btree (name);


--
-- Name: users_lower_idx; Type: INDEX; Schema: public; Owner: ops_dashboard; Tablespace: 
--

CREATE UNIQUE INDEX users_lower_idx ON users USING btree (lower(email));


--
-- Name: deploy_instance_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ops_dashboard
--

ALTER TABLE ONLY deploy
    ADD CONSTRAINT deploy_instance_id_fkey FOREIGN KEY (instance_id) REFERENCES instance(id);


--
-- Name: deploy_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ops_dashboard
--

ALTER TABLE ONLY deploy
    ADD CONSTRAINT deploy_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: instance_association_instance_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ops_dashboard
--

ALTER TABLE ONLY instance_association
    ADD CONSTRAINT instance_association_instance_id_fkey FOREIGN KEY (instance_id) REFERENCES instance(id);


--
-- Name: instance_association_stack_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ops_dashboard
--

ALTER TABLE ONLY instance_association
    ADD CONSTRAINT instance_association_stack_id_fkey FOREIGN KEY (stack_id) REFERENCES stack(id);


--
-- Name: instance_stack_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ops_dashboard
--

ALTER TABLE ONLY instance
    ADD CONSTRAINT instance_stack_id_fkey FOREIGN KEY (stack_id) REFERENCES stack(id);


--
-- Name: stack_association_envrionment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ops_dashboard
--

ALTER TABLE ONLY stack_association
    ADD CONSTRAINT stack_association_envrionment_id_fkey FOREIGN KEY (envrionment_id) REFERENCES environment(id);


--
-- Name: stack_association_stack_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ops_dashboard
--

ALTER TABLE ONLY stack_association
    ADD CONSTRAINT stack_association_stack_id_fkey FOREIGN KEY (stack_id) REFERENCES stack(id);


--
-- Name: stack_environment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ops_dashboard
--

ALTER TABLE ONLY stack
    ADD CONSTRAINT stack_environment_id_fkey FOREIGN KEY (environment_id) REFERENCES environment(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: notes; Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON TABLE notes FROM PUBLIC;
REVOKE ALL ON TABLE notes FROM postgres;
GRANT ALL ON TABLE notes TO postgres;
GRANT ALL ON TABLE notes TO ops_dashboard;


--
-- Name: notes_id_seq; Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON SEQUENCE notes_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE notes_id_seq FROM postgres;
GRANT ALL ON SEQUENCE notes_id_seq TO postgres;
GRANT ALL ON SEQUENCE notes_id_seq TO ops_dashboard;


--
-- PostgreSQL database dump complete
--

