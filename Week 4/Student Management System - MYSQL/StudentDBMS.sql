-- Create the database
CREATE DATABASE SchoolDB;

-- Use the database
USE SchoolDB;

-- Create Tables
CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    gender VARCHAR(10),
    class_id INT
);

CREATE TABLE Classes (
    class_id INT PRIMARY KEY,
    class_name VARCHAR(50),
    teacher_id INT
);

CREATE TABLE Teachers (
    teacher_id INT PRIMARY KEY,
    name VARCHAR(50),
    subject VARCHAR(50)
);

CREATE TABLE Marks (
    mark_id INT PRIMARY KEY,
    student_id INT,
    subject VARCHAR(50),
    marks INT
);

-- Insert Data
-- Students
INSERT INTO Students (student_id, name, age, gender, class_id) VALUES
(1, 'Ahmed', 17, 'Male', 1),
(2, 'Sara', 18, 'Female', 2),
(3, 'Ali', 19, 'Male', 1),
(4, 'Ayesha', 17, 'Female', 3),
(5, 'Usman', 21, 'Male', 2),
(6, 'Zara', 22, 'Female', 3),
(7, 'Hassan', 20, 'Male', 1);

-- Classes
INSERT INTO Classes (class_id, class_name, teacher_id) VALUES
(1, 'Class 10', 101),
(2, 'Class 9', 102),
(3, 'Class 8', 103);

-- Teachers
INSERT INTO Teachers (teacher_id, name, subject) VALUES
(101, 'Mr. Khan', 'Math'),
(102, 'Ms. Fatima', 'Science'),
(103, 'Mr. Bilal', 'English');

-- Marks
INSERT INTO Marks (mark_id, student_id, subject, marks) VALUES
(1, 1, 'Math', 88),
(2, 2, 'Science', 75),
(3, 3, 'Math', 90),
(4, 4, 'English', 65),
(5, 5, 'Science', 95),
(6, 6, 'English', 85),
(7, 7, 'Math', 72),
(8, 1, 'Science', 70),
(9, 2, 'Math', 67),
(10, 4, 'Math', 78);

-- 1. Name of all students
SELECT name FROM Students;

-- 2. Names of all male students
SELECT name FROM Students WHERE gender = 'Male';

-- 3. Students older than 18
SELECT * FROM Students WHERE age > 18;

-- 4. Students in class_id = 2
SELECT * FROM Students WHERE class_id = 2;

-- 5. Students ordered by age (youngest first)
SELECT * FROM Students ORDER BY age ASC;

-- 6. Top 5 students with highest marks in "Math"
SELECT s.name, m.marks
FROM Marks m
JOIN Students s ON m.student_id = s.student_id
WHERE m.subject = 'Math'
ORDER BY m.marks DESC
LIMIT 5;

-- 7. Student names with class names
SELECT s.name, c.class_name
FROM Students s
JOIN Classes c ON s.class_id = c.class_id;

-- 8. Student names with their teacher’s name for each class
SELECT s.name AS student_name, t.name AS teacher_name
FROM Students s
JOIN Classes c ON s.class_id = c.class_id
JOIN Teachers t ON c.teacher_id = t.teacher_id;

-- 9. Average marks for each subject
SELECT subject, AVG(marks) AS average_marks
FROM Marks
GROUP BY subject;

-- 10. Count of students in each class
SELECT c.class_name, COUNT(s.student_id) AS total_students
FROM Students s
JOIN Classes c ON s.class_id = c.class_id
GROUP BY c.class_id;

-- 11. Highest marks scored in "Science"
SELECT MAX(marks) AS highest_science_marks
FROM Marks
WHERE subject = 'Science';

-- 12. Students who scored more than the average marks
SELECT s.name, m.subject, m.marks
FROM Marks m
JOIN Students s ON m.student_id = s.student_id
WHERE m.marks > (
    SELECT AVG(marks) FROM Marks WHERE subject = m.subject
);

-- 13. Class name where the oldest student studies
SELECT c.class_name
FROM Students s
JOIN Classes c ON s.class_id = c.class_id
ORDER BY s.age DESC
LIMIT 1;

-- 14. Insert a new student named "Ali", age 17, male, in class 3
INSERT INTO Students (student_id, name, age, gender, class_id)
VALUES (8, 'Ali', 17, 'Male', 3);

-- 15. Update teacher_id = 1 subject to "Computer Science"
UPDATE Teachers
SET subject = 'Computer Science'
WHERE teacher_id = 1;

-- 16. Delete all students who have age > 25
DELETE FROM Students WHERE age > 25;

-- 17. Names of students who have not received marks in "English"
SELECT name
FROM Students
WHERE student_id NOT IN (
    SELECT student_id FROM Marks WHERE subject = 'English'
);

-- 18. Each class with total number of male and female students
SELECT c.class_name,
       SUM(CASE WHEN s.gender = 'Male' THEN 1 ELSE 0 END) AS male_count,
       SUM(CASE WHEN s.gender = 'Female' THEN 1 ELSE 0 END) AS female_count
FROM Students s
JOIN Classes c ON s.class_id = c.class_id
GROUP BY c.class_id;

-- 19. Students with total marks across all subjects, ordered high to low
SELECT s.name, SUM(m.marks) AS total_marks
FROM Students s
JOIN Marks m ON s.student_id = m.student_id
GROUP BY s.student_id
ORDER BY total_marks DESC;

-- 20. Create a temp table and store Query #8 result in it
CREATE TEMPORARY TABLE StudentTeacherInfo AS
SELECT s.name AS student_name, t.name AS teacher_name
FROM Students s
JOIN Classes c ON s.class_id = c.class_id
JOIN Teachers t ON c.teacher_id = t.teacher_id;

-- Optional: View the temp table
SELECT * FROM StudentTeacherInfo;

