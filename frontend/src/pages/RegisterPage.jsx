import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/App.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/auth/register', { username, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        navigate('/profile');
      })
      .catch(error => {
        setErrorMessage('Error al registrarse, por favor intente de nuevo');
      });
  };

  return (
    <div className="register-page">
      <h1>Registrarse</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterPage;
