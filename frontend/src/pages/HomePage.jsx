import { Link } from 'react-router-dom';
import '../styles/App.css';

export default function HomePage() {
  return (
    <div>
      <div className="navbar">
        <Link to="/">Inicio</Link>
        <Link to="/login">Iniciar Sesión</Link>
        <Link to="/register">Registrarse</Link>
      </div>
      <div className="container">
        <h1>Bienvenido a Recursos Educativos</h1>
        <p>Accede a todos los recursos educativos que necesitas.</p>
      </div>
    </div>
  );
}
