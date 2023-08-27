select * from Subjects

delete from Careers where Id = 9

select * from  Careers

update Careers
set ParentCareerId = 11
where Id = 12

select * from Careers c
left join Subjects s on s.CareerId = c.Id


select * from Careers c
where c.ParentCareerId = 1


insert into Careers values ('Ingeniería Industrial',1)

select * from AttendanceRecords

select * from Students

--Historic
select Title, count(Title) as Quantity
from Careers as c
join Students as s on s.CareerId = c.Id
group by Title

--Current
select Title, count(Title) as Quantity
from Careers as c
join Students as s on s.CareerId = c.Id
where s.IsActive = 1
group by Title





insert into CareerAreas values ('Ingeniería')

delete from __EFMigrationsHistory where MigrationId = '20230816161001_CareerArea'


INSERT INTO Students (Name, DateOfBirth, EnrollmentDate, IsActive, HasGraduated, CareerId)
VALUES
    ('Patricio Rosso', '1998-09-15', '2018-04-01', 1, 0, 2),
    ( 'María García', '2000-01-01', '2020-08-16', 1, 0, 2),
    ( 'Carlos Martínez', '2001-02-02', '2019-08-16', 1, 0, 3),
    ( 'Ana López', '2000-03-03', '2021-08-16', 1, 0, 3),
    ('Javier Rodríguez', '1996-04-04', '2016-08-16', 1, 1, 5),
    ('Emiliano Rodríguez', '1992-04-04', '2009-08-16', 1, 1, 4),
    ('Laura Fernández', '1997-05-05', '2010-10-19', 1, 1, 6);


INSERT INTO Students (Name, DateOfBirth, EnrollmentDate, IsActive, HasGraduated, CareerId)
VALUES
    ('Andrés Mendoza', '2002-06-06', '2022-09-01', 1, 0, 2),
    ('Valeria Torres', '1999-07-07', '2018-08-20', 1, 0, 3),
    ('Diego Sánchez', '2003-08-08', '2021-07-15', 1, 0, 4),
    ('Isabella Ramirez', '2001-09-09', '2023-01-10', 1, 0, 5),
    ('Santiago Herrera', '2002-10-10', '2022-03-18', 1, 0, 6),
    ('Camila Rios', '2000-11-11', '2020-12-05', 1, 0, 2),
    ('Juan Carlos Vargas', '2003-12-12', '2021-05-02', 1, 0, 3),
    ('Mariana Paredes', '2000-01-13', '2023-04-11', 1, 0, 4),
    ('Felipe Nunez', '2002-02-14', '2022-06-25', 1, 0, 5),
    ('Daniela Jimenez', '2001-03-15', '2020-09-08', 1, 0, 6),
    ('Hugo Montoya', '2003-04-16', '2023-02-28', 1, 0, 2),
    ('Natalia Silva', '2002-05-17', '2021-10-15', 1, 0, 3),
    ('Ricardo Ortega', '2000-06-18', '2020-07-22', 1, 0, 4),
    ('Fernanda Cruz', '2003-07-19', '2023-05-09', 1, 0, 5),
    ('Sebastián Vila', '2002-08-20', '2022-04-03', 1, 0, 6);




INSERT INTO Careers VALUES ('Medicina',15);

select * from Subjects
    
INSERT INTO Subjects VALUES ('Base de datos',2), ('Programación',2),('Gestión de las organizaciones',2);


select count(*) as cant from AttendanceRecords
where AttendanceDate = '2023-04-07'








INSERT INTO AttendanceRecords (AttendanceDate, StudentId, SubjectId, HasAttended)
VALUES
    ('2023-04-07', 14, 1, 1),
    ('2023-04-14', 14, 1, 1),
    ('2023-04-21', 14, 1, 0),
    ('2023-04-28', 14, 1, 1),
    ('2023-05-05', 14, 1, 1),
    ('2023-05-12', 14, 1, 0),
    ('2023-05-19', 14, 1, 1),
    ('2023-05-26', 14, 1, 1),
    ('2023-06-02', 14, 1, 0),
    ('2023-06-09', 14, 1, 0),
    ('2023-06-16', 14, 1, 1),
    ('2023-06-23', 14, 1, 1),
    ('2023-06-30', 14, 1, 1),
    ('2023-07-07', 14, 1, 1),
    ('2023-07-14', 14, 1, 1),
    ('2023-07-21', 14, 1, 1),
    ('2023-07-28', 14, 1, 1);
GO;
BEGIN TRANSACTION;
-- Create a temporary table to hold the dates
CREATE TABLE #DateRange (AttendanceDate DATE);

insert into #DateRange values
    ('2023-04-07'),
    ('2023-04-14'),
    ('2023-04-21'),
    ('2023-04-28'),
    ('2023-05-05'),
    ('2023-05-12'),
    ('2023-05-19'),
    ('2023-05-26'),
    ('2023-06-02'),
    ('2023-06-09'),
    ('2023-06-16'),
    ('2023-06-23'),
    ('2023-06-30'),
    ('2023-07-07'),
    ('2023-07-14'),
    ('2023-07-21'),
    ('2023-07-28');
                 
-- Insert all dates within the range into the temporary table


-- Insert attendance records for students 15 to 64 using a loop
DECLARE @StudentId INT = 1149;

WHILE @StudentId <= 1200
BEGIN
    INSERT INTO AttendanceRecords (AttendanceDate, StudentId, SubjectId, HasAttended)
    SELECT 
        d.AttendanceDate,
        @StudentId AS StudentId,
        3 AS SubjectId,
        CASE 
            WHEN CAST(CAST(CRYPT_GEN_RANDOM(1) AS INT) % 100 AS FLOAT) / 100 <= 0.90 THEN 1
            ELSE 0
        END AS HasAttended
    FROM #DateRange d;
    
    SET @StudentId = @StudentId + 1;
END;


-- Clean up: drop the temporary table
DROP TABLE #DateRange;

--commit;
rollback;

delete from AttendanceRecords where Id = 22;

select StudentId, count(StudentId) from AttendanceRecords
where HasAttended = 0
and SubjectId = 3
and AttendanceDate BETWEEN '2023-04-07' AND '2023-07-28'
group by StudentId
order by StudentId;


select AttendanceDate, count(HasAttended) as Qty from AttendanceRecords
where SubjectId = 1 and HasAttended = 1
group by AttendanceDate
order by AttendanceDate

select AttendanceDate from AttendanceRecords
where SubjectId = 1
group by AttendanceDate