--
-- PostgreSQL database dump
--

\restrict zEjZF1ScV6zWP2hT7dLUs5gIygVaSWqIyyhTnrpPWVAfFFGDbWcB4lrioQReHHy

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-03-09 17:55:01

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 20828)
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- TOC entry 5902 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


--
-- TOC entry 3 (class 3079 OID 21910)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 5903 (class 0 OID 0)
-- Dependencies: 3
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 667 (class 1255 OID 21994)
-- Name: find_nearby_heroes(double precision, double precision, integer, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.find_nearby_heroes(patient_lat double precision, patient_lng double precision, radius_m integer DEFAULT 2000, required_specialty character varying DEFAULT NULL::character varying) RETURNS TABLE(hero_id uuid, full_name character varying, specialty character varying, hero_tier character varying, distance_m double precision, eta_seconds integer, average_rating numeric)
    LANGUAGE sql STABLE
    AS $$
    SELECT
        h.id,
        u.full_name,
        d.specialty,
        h.hero_tier,
        ST_Distance(
            h.standby_location,
            ST_MakePoint(patient_lng, patient_lat)::geography
        )                                                          AS distance_m,
        CAST(ST_Distance(
            h.standby_location,
            ST_MakePoint(patient_lng, patient_lat)::geography
        ) / 8 AS INTEGER)                                          AS eta_seconds,   -- dist ÷ 8 m/s ≈ 30 km/h
        h.average_rating
    FROM heroes h
    JOIN doctors d ON d.id = h.id
    JOIN users  u ON u.id  = h.id
    WHERE h.hero_status    = 'online'
      AND d.license_status = 'active'
      AND ST_DWithin(
            h.standby_location,
            ST_MakePoint(patient_lng, patient_lat)::geography,
            radius_m
          )
    ORDER BY
        distance_m ASC,
        CASE WHEN required_specialty IS NULL OR d.specialty = required_specialty THEN 0 ELSE 1 END,
        h.average_rating DESC;
$$;


ALTER FUNCTION public.find_nearby_heroes(patient_lat double precision, patient_lng double precision, radius_m integer, required_specialty character varying) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 230 (class 1259 OID 22001)
-- Name: doctor_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctor_requests (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    license_number character varying(100) NOT NULL,
    license_country character varying(10) NOT NULL,
    specialty character varying(100),
    hospital_name character varying(255),
    bio text,
    status character varying(20) DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT now(),
    reviewed_at timestamp without time zone,
    CONSTRAINT doctor_requests_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'approved'::character varying, 'rejected'::character varying])::text[])))
);


ALTER TABLE public.doctor_requests OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 21955)
-- Name: doctors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctors (
    user_id uuid CONSTRAINT doctors_id_not_null NOT NULL,
    license_number character varying(100) NOT NULL,
    license_country character varying(10) NOT NULL,
    license_status character varying(20) DEFAULT 'active'::character varying,
    specialty character varying(100),
    verified_at timestamp without time zone,
    verified_by character varying(100),
    is_probationary boolean DEFAULT true,
    hospital_name character varying(255),
    bio text,
    current_location public.geography(Point,4326),
    CONSTRAINT doctors_license_status_check CHECK (((license_status)::text = ANY ((ARRAY['active'::character varying, 'suspended'::character varying, 'expired'::character varying, 'revoked'::character varying])::text[])))
);


ALTER TABLE public.doctors OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 21973)
-- Name: heroes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.heroes (
    id uuid NOT NULL,
    hero_tier character varying(30) DEFAULT 'verified_hero'::character varying,
    hero_status character varying(20) DEFAULT 'offline'::character varying,
    total_responses integer DEFAULT 0,
    average_rating numeric(3,2) DEFAULT 0.00,
    cpd_credits integer DEFAULT 0,
    standby_location public.geography(Point,4326),
    last_online timestamp without time zone,
    CONSTRAINT heroes_hero_status_check CHECK (((hero_status)::text = ANY ((ARRAY['offline'::character varying, 'online'::character varying, 'responding'::character varying, 'suspended'::character varying])::text[]))),
    CONSTRAINT heroes_hero_tier_check CHECK (((hero_tier)::text = ANY ((ARRAY['verified_hero'::character varying, 'senior_hero'::character varying, 'critical_care_hero'::character varying])::text[])))
);


ALTER TABLE public.heroes OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 21941)
-- Name: patients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.patients (
    id uuid NOT NULL,
    blood_type character varying(5),
    allergies text,
    chronic_conditions text,
    surgery_date date,
    discharge_date date,
    hospital_name character varying(255),
    emergency_contact_name character varying(255),
    emergency_contact_phone character varying(30),
    current_location public.geography(Point,4326),
    location_updated_at timestamp without time zone,
    "heart_rate_AVG" integer,
    doctor_name character varying(255)
);


ALTER TABLE public.patients OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 22022)
-- Name: token_blocklist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.token_blocklist (
    id integer NOT NULL,
    jti character varying,
    create_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.token_blocklist OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 22021)
-- Name: token_blocklist_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.token_blocklist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.token_blocklist_id_seq OWNER TO postgres;

--
-- TOC entry 5904 (class 0 OID 0)
-- Dependencies: 231
-- Name: token_blocklist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.token_blocklist_id_seq OWNED BY public.token_blocklist.id;


--
-- TOC entry 226 (class 1259 OID 21921)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    fullname character varying(255) CONSTRAINT users_full_name_not_null NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(30),
    password_hash text NOT NULL,
    role character varying(20) NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['patient'::character varying, 'doctor'::character varying, 'hero'::character varying, 'admin'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 5713 (class 2604 OID 22025)
-- Name: token_blocklist id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token_blocklist ALTER COLUMN id SET DEFAULT nextval('public.token_blocklist_id_seq'::regclass);


--
-- TOC entry 5738 (class 2606 OID 22015)
-- Name: doctor_requests doctor_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_requests
    ADD CONSTRAINT doctor_requests_pkey PRIMARY KEY (id);


--
-- TOC entry 5733 (class 2606 OID 21967)
-- Name: doctors doctors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (user_id);


--
-- TOC entry 5735 (class 2606 OID 21987)
-- Name: heroes heroes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heroes
    ADD CONSTRAINT heroes_pkey PRIMARY KEY (id);


--
-- TOC entry 5731 (class 2606 OID 21948)
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (id);


--
-- TOC entry 5740 (class 2606 OID 22031)
-- Name: token_blocklist token_blocklist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.token_blocklist
    ADD CONSTRAINT token_blocklist_pkey PRIMARY KEY (id);


--
-- TOC entry 5724 (class 2606 OID 21938)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 5726 (class 2606 OID 21940)
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- TOC entry 5728 (class 2606 OID 21936)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 5736 (class 1259 OID 21993)
-- Name: idx_hero_standby_gist; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_hero_standby_gist ON public.heroes USING gist (standby_location) WHERE ((hero_status)::text = 'online'::text);


--
-- TOC entry 5729 (class 1259 OID 21954)
-- Name: idx_patient_location; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_patient_location ON public.patients USING gist (current_location) WHERE (current_location IS NOT NULL);


--
-- TOC entry 5744 (class 2606 OID 22016)
-- Name: doctor_requests doctor_requests_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_requests
    ADD CONSTRAINT doctor_requests_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 5742 (class 2606 OID 21968)
-- Name: doctors doctors_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 5743 (class 2606 OID 21988)
-- Name: heroes heroes_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heroes
    ADD CONSTRAINT heroes_id_fkey FOREIGN KEY (id) REFERENCES public.doctors(user_id) ON DELETE CASCADE;


--
-- TOC entry 5741 (class 2606 OID 21949)
-- Name: patients patients_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_id_fkey FOREIGN KEY (id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2026-03-09 17:55:01

--
-- PostgreSQL database dump complete
--

\unrestrict zEjZF1ScV6zWP2hT7dLUs5gIygVaSWqIyyhTnrpPWVAfFFGDbWcB4lrioQReHHy

