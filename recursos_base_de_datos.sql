CREATE DATABASE IF NOT EXISTS recursos_educativos;
USE recursos_educativos;

-- Tabla de usuarios (incluye rol y herencia implícita para administrador)
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  contrasena VARCHAR(255) NOT NULL,
  rol ENUM('estudiante', 'profesor', 'admin') DEFAULT 'estudiante',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de cursos
CREATE TABLE IF NOT EXISTS cursos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT
);

-- Tabla de recursos (vinculados a cursos)
CREATE TABLE IF NOT EXISTS recursos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  tipo ENUM('pdf', 'video', 'link', 'imagen', 'otros') NOT NULL,
  categoria VARCHAR(100),
  autor VARCHAR(100),
  fecha_subida DATE,
  curso_id INT,
  FOREIGN KEY (curso_id) REFERENCES cursos(id)
    ON DELETE SET NULL ON UPDATE CASCADE
);

-- Relación muchos a muchos entre recursos y cursos (por si un recurso pertenece a varios cursos)
CREATE TABLE IF NOT EXISTS recurso_curso (
  recurso_id INT,
  curso_id INT,
  PRIMARY KEY (recurso_id, curso_id),
  FOREIGN KEY (recurso_id) REFERENCES recursos(id) ON DELETE CASCADE,
  FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
);

-- Tabla para historial de preguntas frecuentes si se desea loguear uso del chatbot (opcional)
CREATE TABLE IF NOT EXISTS chatbot_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  pregunta TEXT,
  respuesta TEXT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);



