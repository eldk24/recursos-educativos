import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css';

export default function ResourceFormPage() {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    tipo: 'documento',
    categoria_id: '',
  });
  const [archivo, setArchivo] = useState(null);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Cargar categorías
    axios.get('http://localhost:3001/api/categorias')
      .then(res => setCategorias(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('titulo', formData.titulo);
    data.append('descripcion', formData.descripcion);
    data.append('tipo', formData.tipo);
    data.append('categoria_id', formData.categoria_id);
    if (archivo) {
      data.append('archivo', archivo);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/api/resources', data, {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Recurso subido correctamente!');
    } catch (error) {
      alert('Error al subir recurso');
    }
  };

  return (
    <div className="container">
      <h2>Subir Recurso</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="titulo" placeholder="Título" onChange={handleChange} required />
        <input type="text" name="descripcion" placeholder="Descripción" onChange={handleChange} />
        <select name="tipo" onChange={handleChange}>
          <option value="documento">Documento</option>
          <option value="video">Video</option>
          <option value="enlace">Enlace</option>
          <option value="ejercicio">Ejercicio</option>
        </select>
        <select name="categoria_id" onChange={handleChange}>
          <option value="">Seleccione una Categoría</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Subir Recurso</button>
      </form>
    </div>
  );
}
