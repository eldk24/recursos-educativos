import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtener información del usuario logueado
    axios.get('/api/auth/profile', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error al obtener el perfil:', error);
      });
  }, []);

  if (!user) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="profile-page">
      <h1>Perfil de {user.username}</h1>
      <p>Correo electrónico: {user.email}</p>
      <p>Plan seleccionado: {user.plan}</p>
    </div>
  );
};

export default ProfilePage;
