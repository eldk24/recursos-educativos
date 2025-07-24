CREATE DATABASE UsuariosDB;

USE UsuariosDB;

CREATE TABLE Usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role ENUM('admin', 'docente', 'estudiante') NOT NULL
);

USE UsuariosDB;

CREATE TABLE DocenteInfo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  profile_photo LONGBLOB,
  career VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES Usuarios(id) ON DELETE CASCADE
);

CREATE TABLE Cursos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  modalidad VARCHAR(100),
  docente_id INT,
  image_url TEXT,
  FOREIGN KEY (docente_id) REFERENCES Usuarios(id) ON DELETE CASCADE
);

CREATE TABLE ArchivosCurso (
  id INT AUTO_INCREMENT PRIMARY KEY,
  curso_id INT,
  semana INT,
  file_name VARCHAR(255),
  file_type VARCHAR(100),
  file_data LONGBLOB,
  FOREIGN KEY (curso_id) REFERENCES Cursos(id) ON DELETE CASCADE
);




