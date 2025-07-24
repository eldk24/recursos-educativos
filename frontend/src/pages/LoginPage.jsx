// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const loginImage = "https://sso.utp.edu.pe/auth/resources/4i3s1/login/utp-pao/images/web-login-pao.svg";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`¡Bienvenido, ${data.name}!`);
        localStorage.setItem('currentUser', JSON.stringify(data));

        switch (data.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'docente':
            navigate('/docente');
            break;
          case 'estudiante':
            navigate('/alumno');
            break;
          default:
            alert('Rol no reconocido');
        }
      } else {
        setErrorMessage(data.message || 'Credenciales inválidas');
      }
    } catch (error) {
      setErrorMessage('Error de conexión con el servidor');
      console.error(error);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        .page {
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
        }
        .login-box {
          background: #fff;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0px 4px 20px rgba(0,0,0,0.08);
          width: 100%;
          max-width: 380px;
        }
        .logo {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 25px;
        }
        .logo img {
          max-width: 180px;
          height: auto;
        }
        .login-box h2 {
          text-align: center;
          font-size: 22px;
          margin-bottom: 25px;
        }
        .login-box input {
          width: 100%;
          padding: 12px 15px;
          margin-bottom: 18px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 15px;
          outline: none;
        }
        .login-box button {
          width: 100%;
          padding: 12px;
          background-color: #2c3cff;
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
        }
        .login-box button:hover {
          background-color: #1329e3;
        }
        .login-box .register {
          margin-top: 18px;
          text-align: center;
          font-size: 14px;
        }
        .login-box .register a {
          color: #2c3cff;
          font-weight: 600;
          text-decoration: none;
          margin-left: 4px;
          cursor: pointer;
        }
        .error-message {
          color: red;
          font-size: 14px;
          margin-top: -10px;
          margin-bottom: 12px;
          text-align: center;
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

      <div className="page">
        <div className="left-section">
          <img src={loginImage} alt="Login Illustration" />
        </div>
        <div className="right-section">
          <form className="login-box" onSubmit={handleSubmit}>
            <div className="logo">
              <img src="https://sso.utp.edu.pe/auth/resources/4i3s1/login/utp-pao/images/logo-pao-class.png" alt="UTP+Class Logo" />
            </div>
            <h2>Iniciar Sesión</h2>

            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit">Ingresar</button>

            <div className="register">
              ¿No tienes una cuenta?
              <a onClick={() => navigate('/register')} role="button">Crear cuenta</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
