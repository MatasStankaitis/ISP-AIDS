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
DROP TABLE IF EXISTS Room_reservations;

SET NAMES 'utf8mb4';
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
	year int NOT NULL,
	PRIMARY KEY(code),
	CONSTRAINT hasFaculty FOREIGN KEY(fk_Facultyid) REFERENCES Faculties (id)
);

CREATE TABLE Users
(
	username varchar (255) NOT NULL,
	password_hash varchar (255) NULL,
	name varchar (255) NOT NULL,
	surname varchar (255) NOT NULL,
	phone_number varchar (255) NOT NULL,
	email varchar (255) NOT NULL,
	home_address varchar (255) NOT NULL,
	photo_URL varchar (255) NULL,
	gender int NOT NULL,
	approved boolean NOT NULL DEFAULT false,
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
	capacity int NOT NULL,
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
	FOREIGN KEY(username) REFERENCES Users (username) ON DELETE CASCADE
);


CREATE TABLE Student_subjects
(
	passed boolean NOT NULL,
	id int NOT NULL AUTO_INCREMENT,
	fk_Studentusername varchar (255) NOT NULL,
	fk_SubjectTimeid int NOT NULL,
	PRIMARY KEY(id),
	CONSTRAINT Student FOREIGN KEY(fk_Studentusername) REFERENCES Students (username) ON DELETE CASCADE,
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
	id int NOT NULL AUTO_INCREMENT,
	date_created date NOT NULL,
	type int NOT NULL,
	status int NOT NULL,
	description TEXT,
	fk_Administratorusername varchar (255) NULL,
	fk_Studentusername varchar (255) NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(status) REFERENCES Request_statuses (id),
	FOREIGN KEY(type) REFERENCES Request_types (id),
	CONSTRAINT evaluates FOREIGN KEY(fk_Administratorusername) REFERENCES Administrators (username) ON DELETE CASCADE,
	CONSTRAINT creates FOREIGN KEY(fk_Studentusername) REFERENCES Students (username) ON DELETE CASCADE
);

CREATE TABLE Room_reservations
(
    id int NOT NULL AUTO_INCREMENT,
    fk_Roomid int NOT NULL,
    fk_Studentusername varchar(255) NOT NULL,
    reservation_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    canceled_date timestamp NULL,
    active boolean NOT NULL DEFAULT true,
    PRIMARY KEY(id),
    CONSTRAINT has_room FOREIGN KEY(fk_Roomid) REFERENCES Dorm_rooms(id),
    CONSTRAINT has_student FOREIGN KEY(fk_Studentusername) REFERENCES Students(username) ON DELETE CASCADE
);

-- INSERTIONS:
INSERT INTO Academic_groups (name, mentor_name, mentor_surname) 
VALUES 
('IFF-2/69', 'Jonas', 'Jonaitis'),
('IFF-2/5', 'Ignas', 'Ignaitis'),
('IFF-2/6', 'Petras', 'Petraitis');


INSERT INTO Faculties (name, address, dean_name, vice_dean_name, phone_number, email) 
VALUES 
('Informatikos', 'Studentų gatvė 1, Kaunas', 'Jonas', 'Kazys', '1111111', 'informatika@gmail.com'),
('Fizikos','Studentų gatvė 2, Kaunas', 'Jonas', 'Ignas', '22222222', 'fizika@gmail.com'),
('Matematikos', 'Studentų gatvė 3, Kaunas', 'Jonas', 'Skirmantas', '3333333', 'matematika@gmail.com');


INSERT INTO Users (username, password_hash, name, surname, phone_number, email, home_address, gender, approved)
VALUES 
('admin', '$argon2id$v=19$m=65536,t=3,p=4$CMKHXV1cxmO2eXWg7MeR2Q$AIgwZU11S2AU5Bj49U2pzFP7t6tEX1kLmD0Hgu7Leag', 'admin', 'Stankaitis', '863940537', 'matas.stankaitis@gmail.com', 'Medelyno g. 8', 1, 1),
('student', '$argon2id$v=19$m=65536,t=3,p=4$5ROgi7rzltKzEvkXfqBZJw$cdzpVoJfkHF9IKjJtOKOYqRhsbe4WCmmXpV/BJdh4U8', 'Jonas', 'Jonaitis', '863940537', 'matas.stankaitis@gmail.com', 'Medelyno g. 8', 1, 0),
('lecturer', '$argon2id$v=19$m=65536,t=3,p=4$l+MGF0ht25CHOuGjtBreQw$a01VufsNSYDoj7tAKa6KQRIuAhJHxaMLtDHGPuU5TDQ', 'Petras', 'Petraitis', '863940537', 'matas.stankaitis@gmail.com', 'Medelyno g. 8', 3, 0),
('student2', '$argon2id$v=19$m=65536,t=3,p=4$H7xpspJ7YAJDHX1NcpSN4w$Rk08QXfuFSoUmwXY+cWV7mYIE264Th1pc9M52GopRgE', 'Kazys', 'Kazimieras', '863940537', 'matas.stankaitis@gmail.com', 'Medelyno g. 8', 1, 0);

INSERT INTO Students (year, state_funded, username, fk_Facultyid, fk_Groupid)
VALUES
(1, TRUE, 'student', 1, 1),
(2, FALSE, 'student2', 1, 2);

-- Add admin to Administrators table
INSERT INTO Administrators (username)
VALUES ('admin');

INSERT INTO Lecturers (current_salary, experience, status, username)
VALUES (2000, 5, 1, 'lecturer');

INSERT INTO Dorms (number, address, room_count) 
VALUES 
(1, 'Test Street 1', 10),
(2, 'Test Street 2', 15);

INSERT INTO Dorm_rooms (room_number, floor_number, price, quality, status, fk_Dormid)
VALUES 
(101, 1, 200, 1, 1, 1),  -- free room in dorm 1
(102, 1, 200, 1, 2, 1),  -- taken room in dorm 1
(201, 2, 250, 2, 1, 2);  -- free room in dorm 2

-- Insert sample data
INSERT INTO Dorm_requests 
(fk_Studentusername, type, description, status, date_created) 
VALUES 
('student', 1, 'Need permission for weekend guest from Friday to Sunday', 1, CURRENT_TIMESTAMP),
('student', 2, 'Request room change to first floor due to leg injury', 1, CURRENT_TIMESTAMP),
('student2', 4, 'Broken heater in room 101, room is very cold', 1, CURRENT_TIMESTAMP);

-- Now insert requests with correct column name
INSERT INTO Dorm_requests 
(fk_Studentusername, type, description, status, fk_Administratorusername, date_created) 
VALUES
('student', 1, 'Room change request - current neighbors too noisy', 2, 'admin', CURRENT_DATE),
('student2', 2, 'Maintenance needed - bathroom faucet is leaking', 2, 'admin', CURRENT_DATE);


-- Subjects
INSERT INTO Subjects (code, name, credits, description, language, is_remote, fk_Facultyid, year)
VALUES
('INF101', 'Introduction to Computer Science', 6, 'An introductory course on computer science fundamentals.', 'English', false, 1, 1),
('PHY101', 'General Physics I', 5, 'An introductory course on classical mechanics and thermodynamics.', 'English', false, 2, 1),
('MAT101', 'Calculus I', 6, 'A course on differential and integral calculus.', 'English', false, 3, 2),
('INF102', 'Data Structures and Algorithms', 6, 'A course focusing on data structures and algorithms.', 'English', false, 1, 2),
('MAT102', 'Linear Algebra', 5, 'A course on vector spaces, matrices, and linear transformations.', 'English', false, 3, 1);

INSERT INTO Subject_times (hour, day, classroom, even_week, capacity, fk_Subjectcode)
VALUES
(9, 1, 'A101', true, 30, 'INF101'),
(11, 1, 'A101', true, 30, 'INF101'),
(11, 3, 'A102', false, 25, 'PHY101'),
(14, 5, 'A103', true, 20, 'MAT101'),
(10, 2, 'A104', false, 30, 'INF102'),
(13, 4, 'A105', true, 25, 'MAT102');

INSERT INTO Student_subjects (passed, fk_Studentusername, fk_SubjectTimeid)
VALUES
(true, 'student', 1),
(false, 'student2', 3),
(true, 'student', 2),
(false, 'student2', 4),
(true, 'student', 5),
(TRUE, 'alebal', 1),
(FALSE, 'alebal1', 2),
(TRUE, 'alebal', 3),
(FALSE, 'alebal1', 4);