import { useEffect, useState } from 'react';
import '../styles/App.css';

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  if (!user) return <div className="container">Cargando perfil...</div>;

  return (
    <div className="container">
      <h2>Perfil de Usuario</h2>
      <p><strong>Nombre:</strong> {user.nombre}</p>
      <p><strong>Correo:</strong> {user.correo}</p>
      <p><strong>Rol:</strong> {user.rol}</p>
    </div>
  );
}
