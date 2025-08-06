<h1>📚 Student-Class-Teacher Management SQL Project</h1>

<p>This repository contains a complete SQL-based database project built using <strong>MySQL</strong> and tested on <strong>SQL Workbench</strong>. It models a basic school system with Students, Classes, Teachers, and Marks — and runs 20 meaningful queries for insights and CRUD operations.</p>

<hr>

<h2>🛠️ How to Run in SQL Workbench</h2>

<ol>
  <li>Open <strong>MySQL Workbench</strong>.</li>
  <li>Paste the full SQL script into a new SQL tab.</li>
  <li>Run the entire script or step-by-step.</li>
  <li>View query results in the result grid below.</li>
</ol>

<hr>

<h2>🗃️ Database Setup</h2>

<pre>
CREATE DATABASE SchoolDB;
USE SchoolDB;
</pre>

<hr>

<h2>🧱 Tables Created</h2>

<ul>
  <li><strong>Students</strong>: student_id, name, age, gender, class_id</li>
  <li><strong>Classes</strong>: class_id, class_name, teacher_id</li>
  <li><strong>Teachers</strong>: teacher_id, name, subject</li>
  <li><strong>Marks</strong>: mark_id, student_id, subject, marks</li>
</ul>

<hr>

<h2>🧪 Sample Data Inserted</h2>

<h3>Students</h3>
<pre>
Ahmed, Sara, Ali, Ayesha, Usman, Zara, Hassan
</pre>

<h3>Classes</h3>
<pre>
Class 10, Class 9, Class 8
</pre>

<h3>Teachers</h3>
<pre>
Mr. Khan (Math), Ms. Fatima (Science), Mr. Bilal (English)
</pre>

<h3>Marks</h3>
<pre>
Subjects: Math, Science, English — scores across multiple students
</pre>

<hr>

<h2>🔍 Queries & Explanations</h2>

<ol>
  <li><strong>Get all student names</strong> — Simple SELECT from Students table.</li>
  <li><strong>Get all male students</strong> — Filter gender = 'Male'.</li>
  <li><strong>Students older than 18</strong> — Use WHERE age > 18.</li>
  <li><strong>Students in class 2</strong> — WHERE class_id = 2.</li>
  <li><strong>Sort by youngest</strong> — ORDER BY age ASC.</li>
  <li><strong>Top 5 Math scorers</strong> — JOIN Marks & Students, filter subject = 'Math', sort marks DESC.</li>
  <li><strong>Student names + class names</strong> — JOIN Students and Classes.</li>
  <li><strong>Student names + teacher names</strong> — JOIN Students → Classes → Teachers.</li>
  <li><strong>Average marks per subject</strong> — GROUP BY subject + AVG().</li>
  <li><strong>Students per class</strong> — GROUP BY class_id + COUNT().</li>
  <li><strong>Highest in Science</strong> — MAX(marks) WHERE subject = 'Science'.</li>
  <li><strong>Students scoring above subject average</strong> — Subquery + JOIN.</li>
  <li><strong>Class of oldest student</strong> — ORDER BY age DESC LIMIT 1.</li>
  <li><strong>Insert new student Ali</strong> — INSERT INTO Students.</li>
  <li><strong>Update teacher subject</strong> — UPDATE Teachers SET subject = 'Computer Science'.</li>
  <li><strong>Delete students > 25</strong> — DELETE FROM Students WHERE age > 25.</li>
  <li><strong>Students without English marks</strong> — NOT IN subquery for subject = 'English'.</li>
  <li><strong>Male vs Female count per class</strong> — GROUP BY class_id + CASE WHEN.</li>
  <li><strong>Total marks per student</strong> — JOIN Marks + Students, GROUP BY student, ORDER BY total DESC.</li>
  <li><strong>Create temp table of student-teacher pairs</strong> — CREATE TEMPORARY TABLE + JOIN Students → Teachers.</li>
</ol>

<hr>

<h2>📂 File Structure</h2>

<pre>
├── README.md
└── school_db.sql      ← Full script to create DB, insert data, run all queries
</pre>

<hr>

<h2>🚀 Why This Project?</h2>
<p>This mini-project is perfect for:</p>
<ul>
  <li>Practicing JOINs and aggregate functions</li>
  <li>Understanding relational DBMS structure</li>
  <li>Learning how to build temp tables, subqueries, and data relationships</li>
</ul>

<hr>

<h2>🧠 Bonus Ideas</h2>
<ul>
  <li>Add constraints (FOREIGN KEYS, NOT NULL, CHECK)</li>
  <li>Expand with attendance or fees tables</li>
  <li>Export results to CSV in SQL Workbench</li>
</ul>

<p>Enjoy querying like a boss 😎</p>
