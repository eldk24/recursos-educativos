import React, { useState } from 'react';
import axios from 'axios';

const ResourceFormPage = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [usuarioId, setUsuarioId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/resources/add', { nombre, descripcion, categoria_id: categoriaId, usuario_id: usuarioId })
      .then(response => {
        alert('Recurso agregado exitosamente');
      })
      .catch(error => {
        console.error('Error al agregar recurso:', error);
      });
  };

  return (
    <div className="resource-form-page">
      <h1>Agregar Recurso</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nombre del recurso" 
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <textarea 
          placeholder="Descripción" 
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        ></textarea>
        <input 
          type="text" 
          placeholder="ID Categoría" 
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="ID Usuario" 
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
        />
        <button type="submit">Guardar Recurso</button>
      </form>
    </div>
  );
};

export default ResourceFormPage;
