import '../styles/App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanelPage = () => {
  const [resources, setResources] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Obtener recursos
    axios.get('/api/resources')
      .then(response => {
        setResources(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los recursos:', error);
      });

    // Obtener usuarios
    axios.get('/api/auth')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los usuarios:', error);
      });
  }, []);

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>
      
      <h2>Recursos</h2>
      <ul>
        {resources.map(resource => (
          <li key={resource.id}>{resource.nombre}</li>
        ))}
      </ul>
      
      <h2>Usuarios</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanelPage;

