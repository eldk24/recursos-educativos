import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Firebase Config (proyecto: gestion-cursos-aae9a)
const firebaseConfig = {
  apiKey: "AIzaSyDqO93ej3x-bXnRbVVxQaF_E5sMrhiXXtI",
  authDomain: "gestion-cursos-aae9a.firebaseapp.com",
  projectId: "gestion-cursos-aae9a",
  storageBucket: "gestion-cursos-aae9a.appspot.com",
  messagingSenderId: "379369093405",
  appId: "1:379369093405:web:6be3458dcf9b1159e389f4",
  measurementId: "G-SFY35NS0W3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'estudiante' });
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Usuario registrado exitosamente');
        navigate('/login');
      } else {
        alert(data.message || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Hubo un error al conectar con el servidor');
    }
  };

  const generarContraseñaAleatoria = () => {
    return Math.random().toString(36).slice(-10); // cadena aleatoria de 10 caracteres
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        password: generarContraseñaAleatoria(), // Generamos una contraseña aleatoria
        role: 'estudiante', // rol por defecto
      };

      // Registrar en tu backend como cualquier usuario
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('metflixUser', JSON.stringify(userData));
        alert('Registro con Google exitoso');
        navigate('/alumno');
      } else {
        alert(data.message || 'Ya estás registrado. Inicia sesión.');
        // Si ya estaba registrado, igual puedes guardar en localStorage y redirigir si deseas
        localStorage.setItem('metflixUser', JSON.stringify(userData));
        navigate('/alumno');
      }
    } catch (error) {
      console.error('Error con Google Sign-In:', error);
      alert('No se pudo registrar con Google');
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        .register-page {
          display: flex;
          height: 100vh;
          font-family: 'Inter', sans-serif;
          background-color: #f4f7fe;
        }

        .left-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eef3fc;
        }

        .left-section img {
          max-width: 80%;
          height: auto;
        }

        .right-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          padding: 20px;
        }

        .register-box {
          background: #fff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0px 4px 20px rgba(0,0,0,0.08);
          width: 100%;
          max-width: 380px;
        }

        .logo {
          display: flex;
          justify-content: center;
          margin-bottom: 25px;
        }

        .logo img {
          max-width: 180px;
          height: auto;
        }

        h2 {
          text-align: center;
          font-size: 22px;
          margin-bottom: 25px;
          font-weight: 700;
          color: #000;
        }

        input, select {
          width: 100%;
          padding: 12px 15px;
          margin-bottom: 18px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 15px;
          outline: none;
          box-sizing: border-box;
        }

        select {
          cursor: pointer;
        }

        button[type="submit"], .google-btn {
          width: 100%;
          padding: 12px;
          background-color: #2c3cff;
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
        }

        button[type="submit"]:hover,
        .google-btn:hover {
          background-color: #1329e3;
        }

        .google-btn {
          background-color: #db4437;
        }

        .register-link {
          margin-top: 18px;
          text-align: center;
          font-size: 14px;
        }

        .register-link button {
          background: none;
          border: none;
          color: #2c3cff;
          font-weight: 600;
          text-decoration: underline;
          cursor: pointer;
          font-size: 14px;
          margin-left: 4px;
        }

        @media (max-width: 768px) {
          .left-section {
            display: none;
          }
          .right-section {
            flex: 1;
            padding: 20px;
          }
        }
      `}</style>

      <div className="register-page">
        <div className="left-section">
          <img src="https://sso.utp.edu.pe/auth/resources/4i3s1/login/utp-mas-portal/images/login_v2.svg" alt="Registro UTP" />
        </div>
        <div className="right-section">
          <form className="register-box" onSubmit={handleSubmit}>
            <div className="logo">
              <img src="https://sso.utp.edu.pe/auth/resources/4i3s1/login/utp-pao/images/logo-pao-class.png" alt="UTP+Class Logo" />
            </div>
            <h2>Registro de Usuario</h2>

            <input
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
            <input
              name="email"
              type="email"
              placeholder="Correo"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="estudiante">Estudiante</option>
              <option value="docente">Profesor</option>
              <option value="admin">Administrador</option>
            </select>

            <button type="submit">Registrarse</button>

            <button type="button" className="google-btn" onClick={handleGoogleRegister}>
              Registrarse con Google
            </button>

            <div className="register-link">
              ¿Ya tienes cuenta?
              <button type="button" onClick={() => navigate('/login')}>
                Inicia Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
