SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;


-- Criação da tabela "Users"
CREATE TABLE Users (
                       id SERIAL PRIMARY KEY,
                       username VARCHAR(255) NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       role VARCHAR(50) NOT NULL
);

-- Criação da tabela "Candidates"
CREATE TABLE Candidates (
                            id SERIAL PRIMARY KEY,
                            user_id INT NOT NULL,
                            first_name VARCHAR(255) NOT NULL,
                            last_name VARCHAR(255) NOT NULL,
                            email VARCHAR(255) NOT NULL,
                            phone_number VARCHAR(20) NOT NULL,
                            address VARCHAR(255) NOT NULL,
                            FOREIGN KEY (user_id) REFERENCES Users (id)
);

-- Criação da tabela "Recruiters"
CREATE TABLE Recruiters (
                            id SERIAL PRIMARY KEY,
                            user_id INT NOT NULL,
                            first_name VARCHAR(255) NOT NULL,
                            last_name VARCHAR(255) NOT NULL,
                            email VARCHAR(255) NOT NULL,
                            phone_number VARCHAR(20) NOT NULL,
                            address VARCHAR(255) NOT NULL,
                            FOREIGN KEY (user_id) REFERENCES Users (id)
);

-- Criação da tabela "Opportunities"
CREATE TABLE Opportunities (
                               id SERIAL PRIMARY KEY,
                               title VARCHAR(255) NOT NULL,
                               description TEXT NOT NULL,
                               start_date DATE NOT NULL,
                               end_date DATE NOT NULL
);

-- Criação da tabela "Resumes"
CREATE TABLE Resumes (
                         id SERIAL PRIMARY KEY,
                         candidate_id INT NOT NULL,
                         opportunity_id INT NOT NULL,
                         resume_data TEXT NOT NULL,
                         FOREIGN KEY (candidate_id) REFERENCES Candidates (id),
                         FOREIGN KEY (opportunity_id) REFERENCES Opportunities (id)
);
