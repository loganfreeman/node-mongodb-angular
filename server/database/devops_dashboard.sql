--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

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
-- Name: notes; Type: TABLE; Schema: public; Owner: ops_dashboard; Tablespace: 
--

CREATE TABLE notes (
    id integer NOT NULL,
    text character varying(50) NOT NULL
);


ALTER TABLE notes OWNER TO ops_dashboard;

--
-- Name: notes_id_seq; Type: SEQUENCE; Schema: public; Owner: ops_dashboard
--

CREATE SEQUENCE notes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE notes_id_seq OWNER TO ops_dashboard;

--
-- Name: notes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ops_dashboard
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
-- Name: id; Type: DEFAULT; Schema: public; Owner: ops_dashboard
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
-- Data for Name: deploy; Type: TABLE DATA; Schema: public; Owner: ops_dashboard
--

COPY deploy (deploy_date, user_id, comments, instance_id, id) FROM stdin;
2015-03-16 10:33:52.637642-06	2	this is inserted manually	1	2
2015-03-18 17:01:27.164-06	2	\N	1	3
2015-03-18 17:02:03.903-06	2	this is inserted by test	1	4
2015-03-19 13:49:14.93-06	2	this is inserted by test	1	5
2015-03-19 13:49:30.43-06	2	this is inserted by test	1	6
2015-03-19 14:35:43.931-06	2	this is inserted by test	1	7
2015-03-19 14:43:20.827-06	2	this is inserted by test	1	8
2015-03-19 14:45:07.771-06	2	this is inserted by test	1	9
2015-03-19 14:57:32.808-06	2	this is inserted by test	1	10
2015-03-19 17:15:15.856-06	2	this is inserted by test	1	11
2015-03-19 17:24:15.531-06	2	this is inserted by test	1	12
2015-03-19 17:36:37.782-06	2	this is inserted by test	1	13
2015-03-19 17:39:05.998-06	2	this is inserted by test	1	14
2015-03-19 17:40:01.482-06	2	this is inserted by test	1	15
2015-03-19 17:41:00.566-06	2	this is inserted by test	1	16
2015-03-19 17:41:06.969-06	2	this is inserted by test	1	17
2015-03-19 17:45:04.243-06	2	this is inserted by test	1	18
2015-03-19 17:45:52.227-06	2	this is inserted by test	1	19
2015-03-19 17:50:08.472-06	2	this is inserted by test	1	20
2015-03-19 17:50:14.24-06	2	this is inserted by test	1	21
2015-03-19 17:51:07.791-06	2	this is inserted by test	1	22
2015-03-19 17:51:35.684-06	2	this is inserted by test	1	23
2015-03-19 17:52:10.686-06	2	this is inserted by test	1	24
2015-03-19 17:52:55.161-06	2	this is inserted by test	1	25
2015-03-19 17:54:26.964-06	2	this is inserted by test	1	26
2015-03-20 08:56:38.606-06	2	this is inserted by test	1	27
2015-03-20 08:59:39.477-06	2	this is inserted by test	1	28
2015-03-20 09:00:22.528-06	2	this is inserted by test	1	29
2015-03-20 09:22:29.235-06	2	this is inserted by test	1	30
2015-03-20 09:38:25.452-06	2	this is inserted by test	1	31
2015-03-20 09:39:11.526-06	2	this is inserted by test	1	32
2015-03-20 09:41:18.817-06	2	this is inserted by test	1	33
2015-03-20 09:43:28.814-06	2	this is inserted by test	1	34
2015-03-20 09:44:18.507-06	2	this is inserted by test	1	35
2015-03-20 09:44:38.774-06	2	this is inserted by test	1	36
2015-03-20 09:45:22.392-06	2	this is inserted by test	1	37
2015-03-20 09:45:32.251-06	2	this is inserted by test	1	38
2015-03-20 09:46:13.699-06	2	this is inserted by test	1	39
2015-03-20 09:47:19.833-06	2	this is inserted by test	1	40
2015-03-20 09:48:02.024-06	2	this is inserted by test	1	41
2015-03-20 09:49:58.746-06	2	this is inserted by test	1	42
2015-03-20 09:53:38.21-06	2	this is inserted by test	1	43
2015-03-20 09:53:44.338-06	2	this is inserted by test	1	44
2015-03-20 09:55:36.219-06	2	this is inserted by test	1	45
2015-03-20 09:57:40.452-06	2	this is inserted by test	1	46
2015-03-20 09:58:10.665-06	2	this is inserted by test	1	47
2015-03-20 09:58:16.013-06	2	this is inserted by test	1	48
2015-03-20 09:58:22.722-06	2	this is inserted by test	1	49
2015-03-20 10:00:06.58-06	2	this is inserted by test	1	50
2015-03-20 10:02:15.355-06	2	this is inserted by test	1	51
2015-03-20 10:05:12.786-06	2	this is inserted by test	1	52
2015-03-20 10:05:27.946-06	2	this is inserted by test	1	53
2015-03-20 10:05:40.705-06	2	this is inserted by test	1	54
2015-03-20 10:07:30.402-06	2	this is inserted by test	1	55
2015-03-20 10:08:51.054-06	2	this is inserted by test	1	56
2015-03-20 10:11:38.631-06	2	this is inserted by test	1	57
2015-03-20 10:19:07.211-06	2	this is inserted by test	1	58
2015-03-20 11:06:31.677-06	2	this is inserted by test	1	59
2015-03-20 11:21:14.689-06	2	this is inserted by test	1	60
2015-03-20 12:12:09.524-06	2	this is inserted by test	1	61
2015-03-20 14:10:10.773-06	2	this is inserted by test	1	62
2015-03-20 14:10:16.509-06	2	this is inserted by test	1	63
2015-03-20 14:42:53.38-06	2	this is inserted by test	1	64
2015-03-20 15:21:08.976-06	2	this is inserted by test	1	65
2015-03-20 15:21:24.216-06	2	this is inserted by test	1	66
2015-03-20 15:21:33.557-06	2	this is inserted by test	1	67
2015-03-20 15:21:41.665-06	2	this is inserted by test	1	68
2015-03-20 15:25:32.74-06	2	this is inserted by test	1	69
2015-03-20 15:25:38.359-06	2	this is inserted by test	1	70
2015-03-20 15:42:28.791-06	2	this is inserted by test	1	71
2015-03-20 15:43:05.785-06	2	this is inserted by test	1	72
2015-03-20 15:43:11.683-06	2	this is inserted by test	1	73
2015-03-20 15:43:16.308-06	2	this is inserted by test	1	74
2015-03-20 15:43:20.815-06	2	this is inserted by test	1	75
2015-03-20 15:44:19.689-06	2	this is inserted by test	1	76
2015-03-20 15:44:30.038-06	2	this is inserted by test	1	77
2015-03-20 17:18:36.466-06	2	this is inserted by test	1	78
2015-03-20 17:18:42.471-06	2	this is inserted by test	1	79
2015-03-20 17:20:05.416-06	2	this is inserted by test	1	80
2015-03-20 17:20:10.956-06	2	this is inserted by test	1	81
2015-03-20 17:30:12.925-06	2	this is inserted by test	1	82
\.


--
-- Name: deploy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ops_dashboard
--

SELECT pg_catalog.setval('deploy_id_seq', 82, true);


--
-- Data for Name: environment; Type: TABLE DATA; Schema: public; Owner: ops_dashboard
--

COPY environment (name, description, id) FROM stdin;
stage	stage environment	1
\.


--
-- Name: environment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ops_dashboard
--

SELECT pg_catalog.setval('environment_id_seq', 91, true);


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: ops_dashboard
--

COPY groups (name, description, id, "createdAt", "updatedAt") FROM stdin;
development	development group	1	\N	\N
stage	stage group	2	\N	\N
test	generated by test	3	\N	\N
\.


--
-- Name: groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ops_dashboard
--

SELECT pg_catalog.setval('groups_id_seq', 114, true);


--
-- Data for Name: instance; Type: TABLE DATA; Schema: public; Owner: ops_dashboard
--

COPY instance (name, ip, description, id, stack_id) FROM stdin;
michael	192.168.100.128/25	This is michael's test machine	1	1
\.


--
-- Data for Name: instance_association; Type: TABLE DATA; Schema: public; Owner: ops_dashboard
--

COPY instance_association (id, instance_id, stack_id) FROM stdin;
\.


--
-- Name: instance_association_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ops_dashboard
--

SELECT pg_catalog.setval('instance_association_id_seq', 1, false);


--
-- Name: instance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ops_dashboard
--

SELECT pg_catalog.setval('instance_id_seq', 1, true);


--
-- Data for Name: my_table; Type: TABLE DATA; Schema: public; Owner: ops_dashboard
--

COPY my_table (name, description) FROM stdin;
\.


--
-- Data for Name: notes; Type: TABLE DATA; Schema: public; Owner: ops_dashboard
--

COPY notes (id, text) FROM stdin;
1	web socket
3	gingerbreadman
2	ladmda function
5	orm
6	functional programming
18	redis-store
\.


--
-- Name: notes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ops_dashboard
--

SELECT pg_catalog.setval('notes_id_seq', 18, true);


--
-- Data for Name: stack; Type: TABLE DATA; Schema: public; Owner: ops_dashboard
--

COPY stack (name, description, id, environment_id) FROM stdin;
node stack	node stack	1	1
\.


--
-- Data for Name: stack_association; Type: TABLE DATA; Schema: public; Owner: ops_dashboard
--

COPY stack_association (id, envrionment_id, stack_id) FROM stdin;
\.


--
-- Name: stack_association_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ops_dashboard
--

SELECT pg_catalog.setval('stack_association_id_seq', 1, false);


--
-- Name: stack_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ops_dashboard
--

SELECT pg_catalog.setval('stack_id_seq', 1, false);


--
-- Data for Name: user_group; Type: TABLE DATA; Schema: public; Owner: ops_dashboard
--

COPY user_group (user_id, group_id, id, "createdAt", "updatedAt") FROM stdin;
2	2	\N	\N	\N
2	1	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
2	2	\N	\N	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: ops_dashboard
--

COPY users ("firstName", "lastName", name, password, email, id, "createdAt", "updatedAt") FROM stdin;
jelly	bean	jelly.bean	$2a$10$dnicAgRT.U2wFfElYv9IAeQp2qRSg8jEEg6j8Tm4Ds/JVDDT/fJ42	jelly.bean@contactpointsolutions.com	53	\N	\N
calos	castillo	ccastillo	$2a$10$eczSQhaHISNuoKsH080P4.WuFMpbL9CeBaBBR.5bsbZWdc4N6Qpzu	ccastillo@contactpointsolutions.com	3	\N	\N
Jackie	Chen	scheng	$2a$10$eczSQhaHISNuoKsH080P4.SJe0VoY1ucybcSiW/Ny.2FPD2zHfYyO	scheng@contactpointsolutions.com	2	2015-03-11 13:22:09-06	2015-03-11 13:57:12-06
jelly	beam	jelly bean	$2a$10$PHEh7P0EtzeVmlFFO50YruUGqMXhQv.VqptuGp/YsB06y3bQtMNl2	jelly-bean@example.com	4	\N	\N
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ops_dashboard
--

SELECT pg_catalog.setval('users_id_seq', 426, true);


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
-- Name: notes_pkey; Type: CONSTRAINT; Schema: public; Owner: ops_dashboard; Tablespace: 
--

ALTER TABLE ONLY notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (id);


--
-- Name: notes_text_key; Type: CONSTRAINT; Schema: public; Owner: ops_dashboard; Tablespace: 
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
-- Name: notes; Type: ACL; Schema: public; Owner: ops_dashboard
--

REVOKE ALL ON TABLE notes FROM PUBLIC;
REVOKE ALL ON TABLE notes FROM ops_dashboard;
GRANT ALL ON TABLE notes TO ops_dashboard;
GRANT ALL ON TABLE notes TO michael;


--
-- Name: notes_id_seq; Type: ACL; Schema: public; Owner: ops_dashboard
--

REVOKE ALL ON SEQUENCE notes_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE notes_id_seq FROM ops_dashboard;
GRANT ALL ON SEQUENCE notes_id_seq TO ops_dashboard;
GRANT ALL ON SEQUENCE notes_id_seq TO michael;


--
-- PostgreSQL database dump complete
--

