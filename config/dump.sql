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
-- Name: opportunities; Type: TABLE; Schema: public; Owner: MrMaksimize; Tablespace: 
--

CREATE TABLE opportunities (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    purpose text NOT NULL,
    "eligibleBusinessLocation" character varying(255)[] NOT NULL,
    "paperworkRequired" text[] NOT NULL,
    "applicationCost" integer NOT NULL,
    "applicationDeadline" timestamp with time zone NOT NULL,
    "avgApplicationTime" character varying(255) NOT NULL,
    "benefitType" character varying(255) NOT NULL,
    "benefitDescription" text NOT NULL,
    "agencyName" character varying(255) NOT NULL,
    "agencyContactName" character varying(255) NOT NULL,
    "agencyContactEmail" character varying(255) NOT NULL,
    "agencyContactPhone" character varying(255) NOT NULL,
    "minimumYearsInBusiness" integer NOT NULL,
    "eligibleEntityTypes" character varying(255)[] NOT NULL,
    "currentEmployeesRequired" character varying(255)[] NOT NULL,
    "annualRevenue" character varying(255) NOT NULL,
    "eligibleIndustries" character varying(255)[] NOT NULL,
    gender character varying(255) NOT NULL,
    age integer NOT NULL,
    "additionalDemographics" character varying(255)[] NOT NULL,
    "additionalGeneralInformation" character varying(255) NOT NULL,
    "investingOwnMoney" boolean NOT NULL,
    "moneyInvested" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.opportunities OWNER TO "MrMaksimize";

--
-- Name: opportunities_id_seq; Type: SEQUENCE; Schema: public; Owner: MrMaksimize
--

CREATE SEQUENCE opportunities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.opportunities_id_seq OWNER TO "MrMaksimize";

--
-- Name: opportunities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: MrMaksimize
--

ALTER SEQUENCE opportunities_id_seq OWNED BY opportunities.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: MrMaksimize; Tablespace: 
--

CREATE TABLE users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "firstName" character varying(255),
    "lastName" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO "MrMaksimize";

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: MrMaksimize
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO "MrMaksimize";

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: MrMaksimize
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: MrMaksimize
--

ALTER TABLE ONLY opportunities ALTER COLUMN id SET DEFAULT nextval('opportunities_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: MrMaksimize
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: opportunities; Type: TABLE DATA; Schema: public; Owner: MrMaksimize
--

COPY opportunities (id, title, purpose, "eligibleBusinessLocation", "paperworkRequired", "applicationCost", "applicationDeadline", "avgApplicationTime", "benefitType", "benefitDescription", "agencyName", "agencyContactName", "agencyContactEmail", "agencyContactPhone", "minimumYearsInBusiness", "eligibleEntityTypes", "currentEmployeesRequired", "annualRevenue", "eligibleIndustries", gender, age, "additionalDemographics", "additionalGeneralInformation", "investingOwnMoney", "moneyInvested", "createdAt", "updatedAt") FROM stdin;
1	Test opp	start_business	{anywhere_in_pr}	{"No paperwork"}	0	1995-02-06 16:00:00-08	8 years	incentive	No description	Christian's Agency	christian	christian.etpr10@gmail.com	7875663317	8	{any}	{1}	{2}	{2}	any	18	{any,student}	More general information	t	0	2014-06-25 16:28:28.143-07	2014-06-25 16:28:28.143-07
4	Test opp	start_business	{anywhere_in_pr}	{"No paperwork"}	0	1995-02-06 16:00:00-08	8 years	incentive	No description	Christian's Agency	christian	christian.etpr10@gmail.com	7875663317	8	{any}	{1}	{2}	{2}	any	18	{veteran}	More general information	t	0	2014-06-25 16:30:44.408-07	2014-06-25 16:30:44.408-07
5	Tourism	anything	{municipality_in_pr}	{None}	150	2039-12-31 16:00:00-08	30 days	loan	Construccion de parador	EDB	Jorge Marti	jmarti@bde.pr.gov	7876414300	1	{any}	{0}	{0}	{0}	any	18	{any}	None	f	0	2014-06-26 10:25:40.546-07	2014-06-26 10:25:40.546-07
6	Tax Incentive Code	relocate_business	{municipality_in_pr}	{None}	-1	2016-12-31 16:00:00-08	2 months	incentive	The new Incentives Code provides fiscal benefits for activities developed in specific areas such as the special development zone of the Traditional Urban Center and the Special Development Corridors, among others which due to their potential for growth and their impact on the economy as a whole are considered a priority. In addition, it provides benefits to more than 21 types of eligible units or businesses.	Secretary of Economic Development Caguas	Zamia Baerga	zamia.baerga@caguas.pr.gov	7876538833	1	{any}	{0}	{0}	{0}	any	18	{any}	Once companies submit all the information required, the Municipality of Caguas must give an answer in 30 days.	f	0	2014-06-26 10:30:21.884-07	2014-06-26 10:30:21.884-07
7	Seminars	start_business	{municipality_in_pr}	{None}	0	2015-06-29 17:00:00-07	Depends on when courses are provided	expertise	Elegible units can apply for tax break.	PROMOCAGUAS	Zamia Baerga	zamia.baerga@caguas.pr.gov	7876538833	1	{any}	{0}	{0}	{0}	any	18	{any}	None	f	0	2014-06-26 10:32:37.089-07	2014-06-26 10:32:37.089-07
8	FINANCING FOR RECYCLING ENTERPRISES IN CONJUCTION WITH THE SOLID WASTE AUTHORITY	anything	{anywhere_in_pr}	{None}	25	2014-12-30 16:00:00-08	90 days	other	Interest •\t10% Commitment fee •\t1% or 1.5% as determined by EDB Service fee •\tTo be determined by the EDB in accordance with its policies and regulations Initial fee •\t$25 Terms •\tWorking capital up to 5 years •\tEquipment and machinery up to 8 years •\tImprovements up to 10 years 	ECONOMIC DEVELOPMENT BANK FOR PUERTO RICO	Jorge Marti	jmarti@bde.pr.gov	7876414300	1	{any}	{0}	{0}	{0}	any	18	{any}	Collateral •\tAssignment of all incentives to be received from the Puerto Rico Department of Treasury •\tEquipment to be financed •\tAny other collateral the EDB deems necessary	f	0	2014-06-26 10:35:24.684-07	2014-06-26 10:35:24.684-07
9	THE DEPARTMENT OF STATE AND THE EDB’S SOCIAL CREDIT PROGRAM	anything	{anywhere_in_pr}	{None}	25	2014-12-30 16:00:00-08	90 days	incentive	Incentives •\tInterest shall be set by the Department of State •\t$25 initial fee •\t$0 late fee •\t$0 service fee •\t$0 commitment fee Amount •\tUp to $25,000 or 80% of the project cost, whichever is less Terms •\tMaximum term up to one year, or until applicant receives the funds approved for the NGO, whichever is less	Economic Development Bank for Puerto Rico	Jorge Marti	jmarti@bde.pr.gov	7876414300	1	{non_profit}	{0}	{0}	{0}	any	18	{any}	None	f	0	2014-06-26 10:38:15.583-07	2014-06-26 10:38:15.583-07
10	FINANCING FOR THE SPORTS INDUSTRY	anything	{anywhere_in_pr}	{None}	25	2014-12-30 16:00:00-08	90 days	incentive	Amount •\tUp to $25,000 Incentives •\tFixed interest rate of 8% •\tNo minimum contribution required •\t$25 initial fee •\t$0 service fee •\t$0 commitment fee Terms •\tMaximum term up to 5 years	Economic Development Bank for Puerto Rico	Jorge Marti	jmarti@bde.pr.gov	7876414300	1	{any}	{0}	{0}	{0}	any	18	{any}	None	f	0	2014-06-26 10:40:31.82-07	2014-06-26 10:40:31.82-07
11	MICROENTERPRISES: OFFICE OF YOUTH AFFAIRS	other	{anywhere_in_pr}	{None}	25	2014-12-30 16:00:00-08	90 days	incentive	Incentives •\tFixed interest rate of 8% •\tNo minimum contribution required •\t$25 initial fee •\t$0 service fee •\t$0 commitment fee Amount •\tUp to $10,000 	Economic Development Bank for Puerto Rico	Jorge Marti	jmarti@bde.pr.gov	7876414300	1	{any}	{0}	{0}	{0}	any	21	{any}	None	f	0	2014-06-26 10:43:58.849-07	2014-06-26 10:43:58.849-07
12	Expansion Financing or Inventory Cycle Support PHARMACY INDUSTRY 	anything	{anywhere_in_pr}	{None}	0	2014-01-30 16:00:00-08	90 days	incentive	Terms •\tRevolving line of credit •\tAnnual review Interest •\t2% over prime rate with a 6.5% floor Other conditions •\tFinancing may be subject to federal and state guarantees or loan participations. The terms and conditions of the financing will be adjusted as determined by the agency providing the guaranty.	Economic Development Bank for Puerto Rico	Jorge Marti	jmarti@bde.pr.gov	7876414300	1	{any}	{0}	{0}	{0}	any	18	{any}	Licenses o\tDrug Enforcement Administration (DEA) o\tHealth Services and Addiction Administration (“ASSMCA” by its Spanish acronym) certification o\tDepartment of Health o\tDepartment of Environmental Health	f	0	2014-06-26 10:47:27.099-07	2014-06-26 10:47:27.099-07
\.


--
-- Name: opportunities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: MrMaksimize
--

SELECT pg_catalog.setval('opportunities_id_seq', 12, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: MrMaksimize
--

COPY users (id, email, password, "firstName", "lastName", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: MrMaksimize
--

SELECT pg_catalog.setval('users_id_seq', 1, false);


--
-- Name: opportunities_pkey; Type: CONSTRAINT; Schema: public; Owner: MrMaksimize; Tablespace: 
--

ALTER TABLE ONLY opportunities
    ADD CONSTRAINT opportunities_pkey PRIMARY KEY (id);


--
-- Name: users_email_key; Type: CONSTRAINT; Schema: public; Owner: MrMaksimize; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: MrMaksimize; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: public; Type: ACL; Schema: -; Owner: MrMaksimize
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM "MrMaksimize";
GRANT ALL ON SCHEMA public TO "MrMaksimize";
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

