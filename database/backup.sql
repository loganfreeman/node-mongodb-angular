--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.1
-- Dumped by pg_dump version 9.4.1
-- Started on 2015-03-20 11:51:10 MDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 192 (class 3079 OID 12123)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2387 (class 0 OID 0)
-- Dependencies: 192
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- TOC entry 205 (class 1255 OID 17005)
-- Name: create_if_not_exists(text, text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION create_if_not_exists(table_name text, schema_name text, create_stmt text) RETURNS text
    LANGUAGE plpgsql
    AS $$
BEGIN

IF EXISTS (
    SELECT *
    FROM   pg_catalog.pg_tables 
    WHERE    tablename  = table_name
    AND schemaname = schema_name
    ) THEN
   RETURN 'TABLE ' || '''' || table_name || '''' || ' ALREADY EXISTS';
ELSE
   EXECUTE create_stmt;
   RETURN 'CREATED';
END IF;

END;
$$;


ALTER FUNCTION public.create_if_not_exists(table_name text, schema_name text, create_stmt text) OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 179 (class 1259 OID 16841)
-- Name: deploy; Type: TABLE; Schema: public; Owner: michael; Tablespace: 
--

CREATE TABLE deploy (
    deploy_date timestamp with time zone NOT NULL,
    user_id integer NOT NULL,
    comments text,
    instance_id integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE deploy OWNER TO michael;

--
-- TOC entry 178 (class 1259 OID 16839)
-- Name: deploy_id_seq; Type: SEQUENCE; Schema: public; Owner: michael
--

CREATE SEQUENCE deploy_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE deploy_id_seq OWNER TO michael;

--
-- TOC entry 2388 (class 0 OID 0)
-- Dependencies: 178
-- Name: deploy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: michael
--

ALTER SEQUENCE deploy_id_seq OWNED BY deploy.id;


--
-- TOC entry 181 (class 1259 OID 16862)
-- Name: environment; Type: TABLE; Schema: public; Owner: michael; Tablespace: 
--

CREATE TABLE environment (
    name character varying(40) NOT NULL,
    description text,
    id integer NOT NULL
);


ALTER TABLE environment OWNER TO michael;

--
-- TOC entry 180 (class 1259 OID 16860)
-- Name: environment_id_seq; Type: SEQUENCE; Schema: public; Owner: michael
--

CREATE SEQUENCE environment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE environment_id_seq OWNER TO michael;

--
-- TOC entry 2389 (class 0 OID 0)
-- Dependencies: 180
-- Name: environment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: michael
--

ALTER SEQUENCE environment_id_seq OWNED BY environment.id;


--
-- TOC entry 190 (class 1259 OID 17808)
-- Name: groups; Type: TABLE; Schema: public; Owner: michael; Tablespace: 
--

CREATE TABLE groups (
    name text,
    description text,
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE groups OWNER TO michael;

--
-- TOC entry 189 (class 1259 OID 17806)
-- Name: groups_id_seq; Type: SEQUENCE; Schema: public; Owner: michael
--

CREATE SEQUENCE groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE groups_id_seq OWNER TO michael;

--
-- TOC entry 2390 (class 0 OID 0)
-- Dependencies: 189
-- Name: groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: michael
--

ALTER SEQUENCE groups_id_seq OWNED BY groups.id;


--
-- TOC entry 175 (class 1259 OID 16706)
-- Name: instance; Type: TABLE; Schema: public; Owner: michael; Tablespace: 
--

CREATE TABLE instance (
    name character varying(40) NOT NULL,
    ip cidr NOT NULL,
    description text,
    id integer NOT NULL,
    stack_id integer NOT NULL
);


ALTER TABLE instance OWNER TO michael;

--
-- TOC entry 187 (class 1259 OID 16903)
-- Name: instance_association; Type: TABLE; Schema: public; Owner: michael; Tablespace: 
--

CREATE TABLE instance_association (
    id integer NOT NULL,
    instance_id integer NOT NULL,
    stack_id integer NOT NULL
);


ALTER TABLE instance_association OWNER TO michael;

--
-- TOC entry 186 (class 1259 OID 16901)
-- Name: instance_association_id_seq; Type: SEQUENCE; Schema: public; Owner: michael
--

CREATE SEQUENCE instance_association_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE instance_association_id_seq OWNER TO michael;

--
-- TOC entry 2391 (class 0 OID 0)
-- Dependencies: 186
-- Name: instance_association_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: michael
--

ALTER SEQUENCE instance_association_id_seq OWNED BY instance_association.id;


--
-- TOC entry 174 (class 1259 OID 16704)
-- Name: instance_id_seq; Type: SEQUENCE; Schema: public; Owner: michael
--

CREATE SEQUENCE instance_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE instance_id_seq OWNER TO michael;

--
-- TOC entry 2392 (class 0 OID 0)
-- Dependencies: 174
-- Name: instance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: michael
--

ALTER SEQUENCE instance_id_seq OWNED BY instance.id;


--
-- TOC entry 188 (class 1259 OID 17022)
-- Name: my_table; Type: TABLE; Schema: public; Owner: michael; Tablespace: 
--

CREATE TABLE my_table (
    name text,
    description text
);


ALTER TABLE my_table OWNER TO michael;

--
-- TOC entry 173 (class 1259 OID 16437)
-- Name: notes; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE notes (
    id integer NOT NULL,
    text character varying(50) NOT NULL
);


ALTER TABLE notes OWNER TO postgres;

--
-- TOC entry 172 (class 1259 OID 16435)
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
-- TOC entry 2394 (class 0 OID 0)
-- Dependencies: 172
-- Name: notes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE notes_id_seq OWNED BY notes.id;


--
-- TOC entry 183 (class 1259 OID 16873)
-- Name: stack; Type: TABLE; Schema: public; Owner: michael; Tablespace: 
--

CREATE TABLE stack (
    name character varying(40) NOT NULL,
    description text,
    id integer NOT NULL,
    environment_id integer NOT NULL
);


ALTER TABLE stack OWNER TO michael;

--
-- TOC entry 185 (class 1259 OID 16885)
-- Name: stack_association; Type: TABLE; Schema: public; Owner: michael; Tablespace: 
--

CREATE TABLE stack_association (
    id integer NOT NULL,
    envrionment_id integer NOT NULL,
    stack_id integer NOT NULL
);


ALTER TABLE stack_association OWNER TO michael;

--
-- TOC entry 184 (class 1259 OID 16883)
-- Name: stack_association_id_seq; Type: SEQUENCE; Schema: public; Owner: michael
--

CREATE SEQUENCE stack_association_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stack_association_id_seq OWNER TO michael;

--
-- TOC entry 2396 (class 0 OID 0)
-- Dependencies: 184
-- Name: stack_association_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: michael
--

ALTER SEQUENCE stack_association_id_seq OWNED BY stack_association.id;


--
-- TOC entry 182 (class 1259 OID 16871)
-- Name: stack_id_seq; Type: SEQUENCE; Schema: public; Owner: michael
--

CREATE SEQUENCE stack_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stack_id_seq OWNER TO michael;

--
-- TOC entry 2397 (class 0 OID 0)
-- Dependencies: 182
-- Name: stack_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: michael
--

ALTER SEQUENCE stack_id_seq OWNED BY stack.id;


--
-- TOC entry 191 (class 1259 OID 17839)
-- Name: user_group; Type: TABLE; Schema: public; Owner: michael; Tablespace: 
--

CREATE TABLE user_group (
    user_id integer,
    group_id integer,
    id integer,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE user_group OWNER TO michael;

--
-- TOC entry 177 (class 1259 OID 16808)
-- Name: users; Type: TABLE; Schema: public; Owner: michael; Tablespace: 
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


ALTER TABLE users OWNER TO michael;

--
-- TOC entry 176 (class 1259 OID 16806)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: michael
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO michael;

--
-- TOC entry 2398 (class 0 OID 0)
-- Dependencies: 176
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: michael
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- TOC entry 2214 (class 2604 OID 16844)
-- Name: id; Type: DEFAULT; Schema: public; Owner: michael
--

ALTER TABLE ONLY deploy ALTER COLUMN id SET DEFAULT nextval('deploy_id_seq'::regclass);


--
-- TOC entry 2215 (class 2604 OID 16865)
-- Name: id; Type: DEFAULT; Schema: public; Owner: michael
--

ALTER TABLE ONLY environment ALTER COLUMN id SET DEFAULT nextval('environment_id_seq'::regclass);


--
-- TOC entry 2219 (class 2604 OID 17811)
-- Name: id; Type: DEFAULT; Schema: public; Owner: michael
--

ALTER TABLE ONLY groups ALTER COLUMN id SET DEFAULT nextval('groups_id_seq'::regclass);


--
-- TOC entry 2212 (class 2604 OID 16709)
-- Name: id; Type: DEFAULT; Schema: public; Owner: michael
--

ALTER TABLE ONLY instance ALTER COLUMN id SET DEFAULT nextval('instance_id_seq'::regclass);


--
-- TOC entry 2218 (class 2604 OID 16906)
-- Name: id; Type: DEFAULT; Schema: public; Owner: michael
--

ALTER TABLE ONLY instance_association ALTER COLUMN id SET DEFAULT nextval('instance_association_id_seq'::regclass);


--
-- TOC entry 2211 (class 2604 OID 16440)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY notes ALTER COLUMN id SET DEFAULT nextval('notes_id_seq'::regclass);


--
-- TOC entry 2216 (class 2604 OID 16876)
-- Name: id; Type: DEFAULT; Schema: public; Owner: michael
--

ALTER TABLE ONLY stack ALTER COLUMN id SET DEFAULT nextval('stack_id_seq'::regclass);


--
-- TOC entry 2217 (class 2604 OID 16888)
-- Name: id; Type: DEFAULT; Schema: public; Owner: michael
--

ALTER TABLE ONLY stack_association ALTER COLUMN id SET DEFAULT nextval('stack_association_id_seq'::regclass);


--
-- TOC entry 2213 (class 2604 OID 16811)
-- Name: id; Type: DEFAULT; Schema: public; Owner: michael
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- TOC entry 2367 (class 0 OID 16841)
-- Dependencies: 179
-- Data for Name: deploy; Type: TABLE DATA; Schema: public; Owner: michael
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
\.


--
-- TOC entry 2399 (class 0 OID 0)
-- Dependencies: 178
-- Name: deploy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: michael
--

SELECT pg_catalog.setval('deploy_id_seq', 60, true);


--
-- TOC entry 2369 (class 0 OID 16862)
-- Dependencies: 181
-- Data for Name: environment; Type: TABLE DATA; Schema: public; Owner: michael
--

COPY environment (name, description, id) FROM stdin;
stage	stage environment	1
\.


--
-- TOC entry 2400 (class 0 OID 0)
-- Dependencies: 180
-- Name: environment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: michael
--

SELECT pg_catalog.setval('environment_id_seq', 69, true);


--
-- TOC entry 2378 (class 0 OID 17808)
-- Dependencies: 190
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: michael
--

COPY groups (name, description, id, "createdAt", "updatedAt") FROM stdin;
development	development group	1	\N	\N
stage	stage group	2	\N	\N
test	generated by test	3	\N	\N
\.


--
-- TOC entry 2401 (class 0 OID 0)
-- Dependencies: 189
-- Name: groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: michael
--

SELECT pg_catalog.setval('groups_id_seq', 92, true);


--
-- TOC entry 2363 (class 0 OID 16706)
-- Dependencies: 175
-- Data for Name: instance; Type: TABLE DATA; Schema: public; Owner: michael
--

COPY instance (name, ip, description, id, stack_id) FROM stdin;
michael	192.168.100.128/25	This is michael's test machine	1	1
\.


--
-- TOC entry 2375 (class 0 OID 16903)
-- Dependencies: 187
-- Data for Name: instance_association; Type: TABLE DATA; Schema: public; Owner: michael
--

COPY instance_association (id, instance_id, stack_id) FROM stdin;
\.


--
-- TOC entry 2402 (class 0 OID 0)
-- Dependencies: 186
-- Name: instance_association_id_seq; Type: SEQUENCE SET; Schema: public; Owner: michael
--

SELECT pg_catalog.setval('instance_association_id_seq', 1, false);


--
-- TOC entry 2403 (class 0 OID 0)
-- Dependencies: 174
-- Name: instance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: michael
--

SELECT pg_catalog.setval('instance_id_seq', 1, true);


--
-- TOC entry 2376 (class 0 OID 17022)
-- Dependencies: 188
-- Data for Name: my_table; Type: TABLE DATA; Schema: public; Owner: michael
--

COPY my_table (name, description) FROM stdin;
\.


--
-- TOC entry 2361 (class 0 OID 16437)
-- Dependencies: 173
-- Data for Name: notes; Type: TABLE DATA; Schema: public; Owner: postgres
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
-- TOC entry 2404 (class 0 OID 0)
-- Dependencies: 172
-- Name: notes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('notes_id_seq', 18, true);


--
-- TOC entry 2371 (class 0 OID 16873)
-- Dependencies: 183
-- Data for Name: stack; Type: TABLE DATA; Schema: public; Owner: michael
--

COPY stack (name, description, id, environment_id) FROM stdin;
node stack	node stack	1	1
\.


--
-- TOC entry 2373 (class 0 OID 16885)
-- Dependencies: 185
-- Data for Name: stack_association; Type: TABLE DATA; Schema: public; Owner: michael
--

COPY stack_association (id, envrionment_id, stack_id) FROM stdin;
\.


--
-- TOC entry 2405 (class 0 OID 0)
-- Dependencies: 184
-- Name: stack_association_id_seq; Type: SEQUENCE SET; Schema: public; Owner: michael
--

SELECT pg_catalog.setval('stack_association_id_seq', 1, false);


--
-- TOC entry 2406 (class 0 OID 0)
-- Dependencies: 182
-- Name: stack_id_seq; Type: SEQUENCE SET; Schema: public; Owner: michael
--

SELECT pg_catalog.setval('stack_id_seq', 1, false);


--
-- TOC entry 2379 (class 0 OID 17839)
-- Dependencies: 191
-- Data for Name: user_group; Type: TABLE DATA; Schema: public; Owner: michael
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
\.


--
-- TOC entry 2365 (class 0 OID 16808)
-- Dependencies: 177
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: michael
--

COPY users ("firstName", "lastName", name, password, email, id, "createdAt", "updatedAt") FROM stdin;
jelly	bean	jelly.bean	$2a$10$dnicAgRT.U2wFfElYv9IAeQp2qRSg8jEEg6j8Tm4Ds/JVDDT/fJ42	jelly.bean@contactpointsolutions.com	53	\N	\N
calos	castillo	ccastillo	$2a$10$eczSQhaHISNuoKsH080P4.WuFMpbL9CeBaBBR.5bsbZWdc4N6Qpzu	ccastillo@contactpointsolutions.com	3	\N	\N
Jackie	Chen	scheng	$2a$10$eczSQhaHISNuoKsH080P4.SJe0VoY1ucybcSiW/Ny.2FPD2zHfYyO	scheng@contactpointsolutions.com	2	2015-03-11 13:22:09-06	2015-03-11 13:57:12-06
jelly	beam	jelly bean	$2a$10$PHEh7P0EtzeVmlFFO50YruUGqMXhQv.VqptuGp/YsB06y3bQtMNl2	jelly-bean@example.com	4	\N	\N
\.


--
-- TOC entry 2407 (class 0 OID 0)
-- Dependencies: 176
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: michael
--

SELECT pg_catalog.setval('users_id_seq', 382, true);


--
-- TOC entry 2230 (class 2606 OID 16849)
-- Name: deploy_pkey; Type: CONSTRAINT; Schema: public; Owner: michael; Tablespace: 
--

ALTER TABLE ONLY deploy
    ADD CONSTRAINT deploy_pkey PRIMARY KEY (id);


--
-- TOC entry 2233 (class 2606 OID 16870)
-- Name: envrionment_pkey; Type: CONSTRAINT; Schema: public; Owner: michael; Tablespace: 
--

ALTER TABLE ONLY environment
    ADD CONSTRAINT envrionment_pkey PRIMARY KEY (id);


--
-- TOC entry 2242 (class 2606 OID 17816)
-- Name: groups_pkey; Type: CONSTRAINT; Schema: public; Owner: michael; Tablespace: 
--

ALTER TABLE ONLY groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);


--
-- TOC entry 2239 (class 2606 OID 16908)
-- Name: instance_association_pkey; Type: CONSTRAINT; Schema: public; Owner: michael; Tablespace: 
--

ALTER TABLE ONLY instance_association
    ADD CONSTRAINT instance_association_pkey PRIMARY KEY (id);


--
-- TOC entry 2225 (class 2606 OID 16714)
-- Name: instance_pkey; Type: CONSTRAINT; Schema: public; Owner: michael; Tablespace: 
--

ALTER TABLE ONLY instance
    ADD CONSTRAINT instance_pkey PRIMARY KEY (id);


--
-- TOC entry 2221 (class 2606 OID 16442)
-- Name: notes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (id);


--
-- TOC entry 2223 (class 2606 OID 16444)
-- Name: notes_text_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY notes
    ADD CONSTRAINT notes_text_key UNIQUE (text);


--
-- TOC entry 2237 (class 2606 OID 16890)
-- Name: stack_association_pkey; Type: CONSTRAINT; Schema: public; Owner: michael; Tablespace: 
--

ALTER TABLE ONLY stack_association
    ADD CONSTRAINT stack_association_pkey PRIMARY KEY (id);


--
-- TOC entry 2235 (class 2606 OID 16881)
-- Name: stack_pkey; Type: CONSTRAINT; Schema: public; Owner: michael; Tablespace: 
--

ALTER TABLE ONLY stack
    ADD CONSTRAINT stack_pkey PRIMARY KEY (id);


--
-- TOC entry 2228 (class 2606 OID 16816)
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: michael; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2231 (class 1259 OID 17843)
-- Name: environment_name_idx; Type: INDEX; Schema: public; Owner: michael; Tablespace: 
--

CREATE UNIQUE INDEX environment_name_idx ON environment USING btree (name);


--
-- TOC entry 2240 (class 1259 OID 17842)
-- Name: groups_name_idx; Type: INDEX; Schema: public; Owner: michael; Tablespace: 
--

CREATE UNIQUE INDEX groups_name_idx ON groups USING btree (name);


--
-- TOC entry 2226 (class 1259 OID 17030)
-- Name: users_lower_idx; Type: INDEX; Schema: public; Owner: michael; Tablespace: 
--

CREATE UNIQUE INDEX users_lower_idx ON users USING btree (lower(email));


--
-- TOC entry 2245 (class 2606 OID 16855)
-- Name: deploy_instance_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: michael
--

ALTER TABLE ONLY deploy
    ADD CONSTRAINT deploy_instance_id_fkey FOREIGN KEY (instance_id) REFERENCES instance(id);


--
-- TOC entry 2244 (class 2606 OID 16850)
-- Name: deploy_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: michael
--

ALTER TABLE ONLY deploy
    ADD CONSTRAINT deploy_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- TOC entry 2249 (class 2606 OID 16909)
-- Name: instance_association_instance_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: michael
--

ALTER TABLE ONLY instance_association
    ADD CONSTRAINT instance_association_instance_id_fkey FOREIGN KEY (instance_id) REFERENCES instance(id);


--
-- TOC entry 2250 (class 2606 OID 16914)
-- Name: instance_association_stack_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: michael
--

ALTER TABLE ONLY instance_association
    ADD CONSTRAINT instance_association_stack_id_fkey FOREIGN KEY (stack_id) REFERENCES stack(id);


--
-- TOC entry 2243 (class 2606 OID 18146)
-- Name: instance_stack_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: michael
--

ALTER TABLE ONLY instance
    ADD CONSTRAINT instance_stack_id_fkey FOREIGN KEY (stack_id) REFERENCES stack(id);


--
-- TOC entry 2247 (class 2606 OID 16891)
-- Name: stack_association_envrionment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: michael
--

ALTER TABLE ONLY stack_association
    ADD CONSTRAINT stack_association_envrionment_id_fkey FOREIGN KEY (envrionment_id) REFERENCES environment(id);


--
-- TOC entry 2248 (class 2606 OID 16896)
-- Name: stack_association_stack_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: michael
--

ALTER TABLE ONLY stack_association
    ADD CONSTRAINT stack_association_stack_id_fkey FOREIGN KEY (stack_id) REFERENCES stack(id);


--
-- TOC entry 2246 (class 2606 OID 17864)
-- Name: stack_environment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: michael
--

ALTER TABLE ONLY stack
    ADD CONSTRAINT stack_environment_id_fkey FOREIGN KEY (environment_id) REFERENCES environment(id);


--
-- TOC entry 2386 (class 0 OID 0)
-- Dependencies: 5
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- TOC entry 2393 (class 0 OID 0)
-- Dependencies: 173
-- Name: notes; Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON TABLE notes FROM PUBLIC;
REVOKE ALL ON TABLE notes FROM postgres;
GRANT ALL ON TABLE notes TO postgres;
GRANT ALL ON TABLE notes TO michael;


--
-- TOC entry 2395 (class 0 OID 0)
-- Dependencies: 172
-- Name: notes_id_seq; Type: ACL; Schema: public; Owner: postgres
--

REVOKE ALL ON SEQUENCE notes_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE notes_id_seq FROM postgres;
GRANT ALL ON SEQUENCE notes_id_seq TO postgres;
GRANT ALL ON SEQUENCE notes_id_seq TO michael;


-- Completed on 2015-03-20 11:51:12 MDT

--
-- PostgreSQL database dump complete
--

