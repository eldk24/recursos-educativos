import { useState } from 'react';
import { registerUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nombre: '', correo: '', password: '', rol: 'estudiante' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert('Registro exitoso, ahora puedes iniciar sesión.');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.msg || 'Error en el registro');
    }
  };

  return (
    <div className="container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
        <input type="email" name="correo" placeholder="Correo" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <select name="rol" onChange={handleChange}>
          <option value="estudiante">Estudiante</option>
          <option value="docente">Docente</option>
        </select>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
