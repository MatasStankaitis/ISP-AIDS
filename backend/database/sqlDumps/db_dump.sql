DROP TABLE IF EXISTS Student_subjects;
DROP TABLE IF EXISTS Students;
DROP TABLE IF EXISTS Grades;
DROP TABLE IF EXISTS Dorm_rooms;
DROP TABLE IF EXISTS Dorm_requests;
DROP TABLE IF EXISTS Paychecks;
DROP TABLE IF EXISTS lectures;
DROP TABLE IF EXISTS Subject_times;
DROP TABLE IF EXISTS Lecturers;
DROP TABLE IF EXISTS Administrators;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Subjects;
DROP TABLE IF EXISTS Room_statuses;
DROP TABLE IF EXISTS Room_qualities;
DROP TABLE IF EXISTS Request_types;
DROP TABLE IF EXISTS Request_statuses;
DROP TABLE IF EXISTS Lecturer_statuses;
DROP TABLE IF EXISTS Genders;
DROP TABLE IF EXISTS Academic_groups;
DROP TABLE IF EXISTS Faculties;
DROP TABLE IF EXISTS Dorms;
CREATE TABLE Dorms
(
	number int NOT NULL,
	address varchar (255) NOT NULL,
	room_count int NOT NULL,
	id int NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(id)
);

CREATE TABLE Faculties
(
	name varchar (255) NOT NULL,
	address varchar (255) NOT NULL,
	dean_name varchar (255) NOT NULL,
	vice_dean_name varchar (255) NOT NULL,
	phone_number varchar (255) NOT NULL,
	email varchar (255) NOT NULL,
	id int NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(id)
);

CREATE TABLE Academic_groups
(
	name varchar (255) NOT NULL,
	mentor_name varchar (255) NOT NULL,
	mentor_surname varchar (255) NOT NULL,
	id int NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(id)
);

CREATE TABLE Genders
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar (6) NOT NULL,
	PRIMARY KEY(id)
);
INSERT INTO Genders(id, name) VALUES(1, 'male');
INSERT INTO Genders(id, name) VALUES(2, 'female');
INSERT INTO Genders(id, name) VALUES(3, 'other');

CREATE TABLE Lecturer_statuses
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar (30) NOT NULL,
	PRIMARY KEY(id)
);
INSERT INTO Lecturer_statuses(id, name) VALUES(1, 'Instructor');
INSERT INTO Lecturer_statuses(id, name) VALUES(2, 'Assistant_professor');
INSERT INTO Lecturer_statuses(id, name) VALUES(3, 'Associate_professor');
INSERT INTO Lecturer_statuses(id, name) VALUES(4, 'Professor');
INSERT INTO Lecturer_statuses(id, name) VALUES(5, 'Associate_Professor');

CREATE TABLE Request_statuses
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar (11) NOT NULL,
	PRIMARY KEY(id)
);
INSERT INTO Request_statuses(id, name) VALUES(1, 'waiting');
INSERT INTO Request_statuses(id, name) VALUES(2, 'approved');
INSERT INTO Request_statuses(id, name) VALUES(3, 'disapproved');

CREATE TABLE Request_types
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar (16) NOT NULL,
	PRIMARY KEY(id)
);
INSERT INTO Request_types(id, name) VALUES(1, 'guest_permission');
INSERT INTO Request_types(id, name) VALUES(2, 'room_change');
INSERT INTO Request_types(id, name) VALUES(3, 'cancellation');
INSERT INTO Request_types(id, name) VALUES(4, 'maintenance');

CREATE TABLE Room_qualities
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar (7) NOT NULL,
	PRIMARY KEY(id)
);
INSERT INTO Room_qualities(id, name) VALUES(1, 'perfect');
INSERT INTO Room_qualities(id, name) VALUES(2, 'good');
INSERT INTO Room_qualities(id, name) VALUES(3, 'bad');

CREATE TABLE Room_statuses
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar (5) NOT NULL,
	PRIMARY KEY(id)
);
INSERT INTO Room_statuses(id, name) VALUES(1, 'free');
INSERT INTO Room_statuses(id, name) VALUES(2, 'taken');

CREATE TABLE Subjects
(
	code varchar (255) NOT NULL,
	name varchar (255) NOT NULL,
	credits int NOT NULL,
	description varchar (255) NOT NULL,
	language varchar (255) NOT NULL,
	is_remote boolean NOT NULL,
	fk_Facultyid int NOT NULL,
	PRIMARY KEY(code),
	CONSTRAINT hasFaculty FOREIGN KEY(fk_Facultyid) REFERENCES Faculties (id)
);

CREATE TABLE Users
(
	username varchar (255) NOT NULL,
	password_hash varchar (255) NOT NULL,
	name varchar (255) NOT NULL,
	surname varchar (255) NOT NULL,
	phone_number varchar (255) NOT NULL,
	email varchar (255) NOT NULL,
	home_address varchar (255) NOT NULL,
	photo_URL varchar (255) NULL,
	gender int NOT NULL,
	PRIMARY KEY(username),
	FOREIGN KEY(gender) REFERENCES Genders (id)
);

CREATE TABLE Administrators
(
	current_salary double NULL,
	username varchar (255) NOT NULL,
	PRIMARY KEY(username),
	FOREIGN KEY(username) REFERENCES Users (username)
);

CREATE TABLE Lecturers
(
	current_salary double precision NULL,
	experience int NOT NULL,
	status int NOT NULL,
	username varchar (255) NOT NULL,
	PRIMARY KEY(username),
	FOREIGN KEY(status) REFERENCES Lecturer_statuses (id),
	FOREIGN KEY(username) REFERENCES Users (username)
);

CREATE TABLE Subject_times
(
	hour int NOT NULL,
	day int NOT NULL,
	classroom varchar (255) NOT NULL,
	even_week boolean NOT NULL,
	id int NOT NULL AUTO_INCREMENT,
	fk_Subjectcode varchar (255) NOT NULL,
	PRIMARY KEY(id),
	CONSTRAINT hasSubject FOREIGN KEY(fk_Subjectcode) REFERENCES Subjects (code)
);

CREATE TABLE lectures
(
	fk_Subjectcode varchar (255) NOT NULL,
	fk_Lecturerusername varchar (255) NOT NULL,
	PRIMARY KEY(fk_Subjectcode, fk_Lecturerusername),
	CONSTRAINT lectures FOREIGN KEY(fk_Subjectcode) REFERENCES Subjects (code)
);

CREATE TABLE Paychecks
(
	working_rate double precision NOT NULL,
	student_review_score float NOT NULL,
	date date NOT NULL,
	gross_pay double precision NOT NULL,
	net_pay double precision NOT NULL,
	working_hours int NOT NULL,
	overtime_hours int NOT NULL,
	overtime_rate double precision NOT NULL,
	id int NOT NULL AUTO_INCREMENT,
	fk_Administratorusername varchar (255) NOT NULL,
	fk_Lecturerusername varchar (255) NOT NULL,
	PRIMARY KEY(id),
	CONSTRAINT hasAdministrator FOREIGN KEY(fk_Administratorusername) REFERENCES Administrators (username)
);

CREATE TABLE Dorm_rooms
(
	room_number int NOT NULL,
	floor_number int NOT NULL,
	price int NOT NULL,
	quality int NOT NULL,
	status int NOT NULL,
	id int NOT NULL AUTO_INCREMENT,
	fk_Dormid int NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(quality) REFERENCES Room_qualities (id),
	FOREIGN KEY(status) REFERENCES Room_statuses (id),
	CONSTRAINT hasDorm FOREIGN KEY(fk_Dormid) REFERENCES Dorms (id)
);


CREATE TABLE Students
(
	year int NOT NULL,
	state_funded boolean NOT NULL,
	username varchar (255) NOT NULL,
	fk_Facultyid int NOT NULL,
	fk_Groupid int NOT NULL,
	fk_Dorm_roomid int NULL,
	PRIMARY KEY(username),
	CONSTRAINT is_part_of FOREIGN KEY(fk_Facultyid) REFERENCES Faculties (id),
	CONSTRAINT is_in FOREIGN KEY(fk_Groupid) REFERENCES Academic_groups (id),
	CONSTRAINT rents FOREIGN KEY(fk_Dorm_roomid) REFERENCES Dorm_rooms (id),
	FOREIGN KEY(username) REFERENCES Users (username)
);


CREATE TABLE Student_subjects
(
	passed boolean NOT NULL,
	id int NOT NULL AUTO_INCREMENT,
	fk_Studentusername varchar (255) NOT NULL,
	fk_SubjectTimeid int NOT NULL,
	PRIMARY KEY(id),
	CONSTRAINT Student FOREIGN KEY(fk_Studentusername) REFERENCES Students (username),
	CONSTRAINT belongs_to FOREIGN KEY(fk_SubjectTimeid) REFERENCES Subject_times (id)
);

CREATE TABLE Grades
(
	value int NOT NULL,
	comment varchar (255) NULL,
	created_at date NOT NULL,
	updated_at date NOT NULL,
	is_exam boolean NOT NULL,
	importance int NOT NULL,
	id int NOT NULL AUTO_INCREMENT,
	fk_StudentSubjectid int NOT NULL,
	PRIMARY KEY(id),
	CONSTRAINT hasStudentSubject FOREIGN KEY(fk_StudentSubjectid) REFERENCES Student_subjects (id)
);


CREATE TABLE Dorm_requests
(
	date_created date NOT NULL,
	type int NOT NULL,
	status int NOT NULL,
	id int NOT NULL AUTO_INCREMENT,
	fk_Administratorusername varchar (255) NULL,
	fk_Studentusername varchar (255) NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(status) REFERENCES Request_statuses (id),
	FOREIGN KEY(type) REFERENCES Request_types (id),
	CONSTRAINT evaluates FOREIGN KEY(fk_Administratorusername) REFERENCES Administrators (username),
	CONSTRAINT creates FOREIGN KEY(fk_Studentusername) REFERENCES Students (username)
);

-- INSERTIONS:

INSERT INTO Academic_groups (name, mentor_name, mentor_surname) 
VALUES 
('IFF-2/4', 'Jonas', 'Jonaitis'),
('IFF-2/5', 'Ignas', 'Ignaitis'),
('IFF-2/6', 'Petras', 'Petraitis');


INSERT INTO Faculties (name, address, dean_name, vice_dean_name, phone_number, email) 
VALUES 
('Informatikos', 'Studentų gatvė 1, Kaunas', 'Jonas', 'Kazys', '1111111', 'informatika@gmail.com'),
('Fizikos','Studentų gatvė 2, Kaunas', 'Jonas', 'Ignas', '22222222', 'fizika@gmail.com'),
('Matematikos', 'Studentų gatvė 3, Kaunas', 'Jonas', 'Skirmantas', '3333333', 'matematika@gmail.com');


INSERT INTO Users (username, password_hash, name, surname, phone_number, email, home_address, gender)
VALUES 
('alebal', 'hashedpassword1', 'Aleksas', 'Balčiukynas', '1234567890', 'alebal@example.com', '123 Main St, Cityville', 1),
('alebal1', 'hashedpassword2', 'Alechas', 'Balčiūnas', '0987654321', 'alebal1@example.com', '456 Oak St, Townsville', 1);

INSERT INTO Students (year, state_funded, username, fk_Facultyid, fk_Groupid)
VALUES
(1, TRUE, 'alebal', 1, 1),
(2, FALSE, 'alebal1', 2, 2);