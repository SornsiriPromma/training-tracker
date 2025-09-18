-- Training Tracker Database Schema
-- MySQL Database Schema

CREATE DATABASE IF NOT EXISTS training_tracker;
USE training_tracker;

-- User roles enum
CREATE TABLE IF NOT EXISTS user_roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE
);

INSERT IGNORE INTO user_roles (name) VALUES ('ADMIN'), ('EMPLOYEE');

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  role ENUM('ADMIN', 'EMPLOYEE') DEFAULT 'EMPLOYEE',
  image VARCHAR(500),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Accounts table (for NextAuth)
CREATE TABLE IF NOT EXISTS accounts (
  id VARCHAR(255) PRIMARY KEY,
  userId VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  providerAccountId VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INT,
  token_type VARCHAR(255),
  scope VARCHAR(255),
  id_token TEXT,
  session_state VARCHAR(255),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_provider_account (provider, providerAccountId)
);

-- Sessions table (for NextAuth)
CREATE TABLE IF NOT EXISTS sessions (
  id VARCHAR(255) PRIMARY KEY,
  sessionToken VARCHAR(255) UNIQUE NOT NULL,
  userId VARCHAR(255) NOT NULL,
  expires DATETIME NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Verification tokens table (for NextAuth)
CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier VARCHAR(255) NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires DATETIME NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- Resource types enum
CREATE TABLE IF NOT EXISTS resource_types (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE
);

INSERT IGNORE INTO resource_types (name) VALUES ('VIDEO'), ('PDF'), ('QUIZ'), ('OTHER');

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id VARCHAR(255) PRIMARY KEY,
  category VARCHAR(255) NOT NULL,
  skillLevel VARCHAR(255) NOT NULL,
  mandatory BOOLEAN DEFAULT FALSE,
  title VARCHAR(255) NOT NULL,
  isActive BOOLEAN DEFAULT TRUE,
  resourceType ENUM('VIDEO', 'PDF', 'QUIZ', 'OTHER') NOT NULL,
  resourceName VARCHAR(255),
  durationMinutes INT,
  url VARCHAR(500),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Course assignments table
CREATE TABLE IF NOT EXISTS course_assignments (
  id VARCHAR(255) PRIMARY KEY,
  userId VARCHAR(255) NOT NULL,
  courseId VARCHAR(255) NOT NULL,
  dueDate DATETIME,
  assignedByUserId VARCHAR(255),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (assignedByUserId) REFERENCES users(id),
  UNIQUE KEY unique_user_course (userId, courseId),
  INDEX idx_due_date (dueDate)
);

-- Course progress table
CREATE TABLE IF NOT EXISTS course_progress (
  id VARCHAR(255) PRIMARY KEY,
  userId VARCHAR(255) NOT NULL,
  courseId VARCHAR(255) NOT NULL,
  status ENUM('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED') DEFAULT 'NOT_STARTED',
  startedAt DATETIME,
  completedAt DATETIME,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_course_progress (userId, courseId),
  INDEX idx_status (status)
);
