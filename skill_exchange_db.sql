CREATE DATABASE IF NOT EXISTS skill_exchange_db;
USE skill_exchange_db;

CREATE TABLE student (
    StudentID INT PRIMARY KEY AUTO_INCREMENT,
    FullName VARCHAR(100) NOT NULL,
    UniversityEmail VARCHAR(150) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    AcademicDepartment VARCHAR(100) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE skills (
    SkillID INT PRIMARY KEY AUTO_INCREMENT,
    SkillCategory VARCHAR(100) NOT NULL,
    SkillName VARCHAR(100) NOT NULL
);

CREATE TABLE exchange_request (
    RequestID INT PRIMARY KEY AUTO_INCREMENT,
    StudentID INT,
    OfferedSkillID INT,
    RequestedSkillID INT,
    PeerConnectionID VARCHAR(100) NULL,
    RequestStatus ENUM('ACTIVE', 'MATCHED', 'CLOSED') DEFAULT 'ACTIVE',
    FOREIGN KEY (StudentID) REFERENCES student(StudentID) ON DELETE CASCADE,
    FOREIGN KEY (OfferedSkillID) REFERENCES skills(SkillID),
    FOREIGN KEY (RequestedSkillID) REFERENCES skills(SkillID)
);