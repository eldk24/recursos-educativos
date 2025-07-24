import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../Estilos/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const initialCareerOptions = ['Ing. Sistemas', 'Psicología', 'Arquitectura', 'Derecho'];

const DashboardPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const [careerOptions, setCareerOptions] = useState(() => {
    const storedCareers = JSON.parse(localStorage.getItem('careerOptions'));
    return storedCareers?.length ? storedCareers : initialCareerOptions;
  });

  const [coursesByCareer, setCoursesByCareer] = useState(() => {
    const storedCourses = JSON.parse(localStorage.getItem('coursesByCareer'));
    return storedCourses || {};
  });

  const [adminUsers, setAdminUsers] = useState(() => JSON.parse(localStorage.getItem('users')) || []);

  const [career, setCareer] = useState(user?.career || '');
  const [selectedCareer, setSelectedCareer] = useState(user?.career || '');
  const [courses, setCourses] = useState([]);

  const [newCareer, setNewCareer] = useState('');
  const [newCourseCareer, setNewCourseCareer] = useState('');
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseModality, setNewCourseModality] = useState('Virtual');
  const [newCourseImage, setNewCourseImage] = useState('');
  const [newCourseTeacher, setNewCourseTeacher] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('alumno');
  const [newUserCareer, setNewUserCareer] = useState('');

  const [courseBeingEdited, setCourseBeingEdited] = useState(null);
  const [editedCourseName, setEditedCourseName] = useState('');
  const [editedCourseModality, setEditedCourseModality] = useState('');
  const [editedCourseImage, setEditedCourseImage] = useState('');

  useEffect(() => {
    if (career && coursesByCareer[career]) {
      setCourses(coursesByCareer[career]);
    } else {
      setCourses([]);
    }
  }, [career, coursesByCareer]);

  if (!user) {
    return (
      <div className="dashboard-wrapper">
        <Navbar />
        <div className="dashboard-container">
          <h2 className="dashboard-title denied">Acceso denegado</h2>
          <p className="dashboard-text">No hay usuario autenticado. Por favor, inicia sesión.</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleCareerSelect = () => {
    if (!career) return alert('Selecciona una carrera');
    const updatedUser = { ...user, career };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setSelectedCareer(career);
  };

  const handleAddCareer = () => {
    if (!newCareer.trim()) return alert('Ingresa el nombre de la nueva carrera');
    if (careerOptions.includes(newCareer)) return alert('La carrera ya existe');

    const updatedCareers = [...careerOptions, newCareer];
    setCareerOptions(updatedCareers);
    localStorage.setItem('careerOptions', JSON.stringify(updatedCareers));

    const updatedCoursesByCareer = { ...coursesByCareer, [newCareer]: [] };
    setCoursesByCareer(updatedCoursesByCareer);
    localStorage.setItem('coursesByCareer', JSON.stringify(updatedCoursesByCareer));

    alert(`Carrera "${newCareer}" agregada.`);
    setNewCareer('');
  };

  const handleAddCourse = () => {
    if (!newCourseCareer || !newCourseName.trim()) return alert('Completa los datos del curso');

    const newCourse = {
      name: newCourseName,
      modality: newCourseModality,
      image: newCourseImage,
      teacher: newCourseTeacher
    };

    const updatedCourses = [...(coursesByCareer[newCourseCareer] || []), newCourse];
    const updatedCoursesByCareer = { ...coursesByCareer, [newCourseCareer]: updatedCourses };

    setCoursesByCareer(updatedCoursesByCareer);
    localStorage.setItem('coursesByCareer', JSON.stringify(updatedCoursesByCareer));

    alert(`Curso "${newCourseName}" agregado a "${newCourseCareer}".`);
    setNewCourseCareer('');
    setNewCourseName('');
    setNewCourseModality('Virtual');
    setNewCourseImage('');
    setNewCourseTeacher('');
  };

  const handleEditCourse = (course, index) => {
    setCourseBeingEdited({ ...course, index });
    setEditedCourseName(course.name);
    setEditedCourseModality(course.modality);
    setEditedCourseImage(course.image);
  };

  const handleSaveEditedCourse = () => {
    if (!courseBeingEdited) return;

    const updatedCourse = {
      ...courseBeingEdited,
      name: editedCourseName,
      modality: editedCourseModality,
      image: editedCourseImage
    };

    const updatedCourses = [...coursesByCareer[selectedCareer]];
    updatedCourses[courseBeingEdited.index] = updatedCourse;

    const updatedCoursesByCareer = {
      ...coursesByCareer,
      [selectedCareer]: updatedCourses
    };

    setCoursesByCareer(updatedCoursesByCareer);
    localStorage.setItem('coursesByCareer', JSON.stringify(updatedCoursesByCareer));

    alert('Curso actualizado correctamente');
    setCourseBeingEdited(null);
  };

  const handleAddUser = () => {
    if (!newUserName.trim()) return alert('Ingresa el nombre del usuario');
    if (!['admin', 'docente', 'alumno'].includes(newUserRole)) return alert('Rol inválido');
    if ((newUserRole === 'docente' || newUserRole === 'alumno') && !newUserCareer) {
      return alert('Selecciona la carrera para el usuario');
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.name === newUserName)) return alert('El usuario ya existe');

    const newUser = {
      name: newUserName,
      role: newUserRole,
      career: newUserCareer,
      courses: coursesByCareer[newUserCareer] || []
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert(`Usuario "${newUserName}" agregado.`);
    setNewUserName('');
    setNewUserRole('alumno');
    setNewUserCareer('');
    setAdminUsers(users);
  };

  const handleDeleteUser = (name) => {
    if (!window.confirm(`¿Seguro que quieres eliminar al usuario "${name}"?`)) return;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const filteredUsers = users.filter(u => u.name !== name);
    localStorage.setItem('users', JSON.stringify(filteredUsers));
    alert(`Usuario "${name}" eliminado.`);
    setAdminUsers(filteredUsers);
  };

  const docentes = adminUsers.filter(u => u.role === 'docente');

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="dashboard-container">
        <h2 className="dashboard-title">Bienvenido, {user.name}</h2>
        <p className="dashboard-role">Rol: {user.role}</p>

        {user.role === 'admin' && (
          <>
            <h3>Agregar nueva carrera</h3>
            <input type="text" placeholder="Nombre de la carrera" value={newCareer} onChange={(e) => setNewCareer(e.target.value)} />
            <button onClick={handleAddCareer}>Agregar carrera</button>

            <h3>Agregar nuevo curso</h3>
            <select value={newCourseCareer} onChange={(e) => setNewCourseCareer(e.target.value)}>
              <option value="">Selecciona una carrera</option>
              {careerOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="text" placeholder="Nombre del curso" value={newCourseName} onChange={(e) => setNewCourseName(e.target.value)} />
            <select value={newCourseModality} onChange={(e) => setNewCourseModality(e.target.value)}>
              <option value="Virtual">Virtual</option>
              <option value="Presencial">Presencial</option>
              <option value="Semipresencial">Semipresencial</option>
            </select>
            <input type="text" placeholder="URL de la imagen del curso" value={newCourseImage} onChange={(e) => setNewCourseImage(e.target.value)} />
            <select value={newCourseTeacher} onChange={(e) => setNewCourseTeacher(e.target.value)}>
              <option value="">Selecciona docente</option>
              {docentes.map((d) => <option key={d.name} value={d.name}>{d.name}</option>)}
            </select>
            <button onClick={handleAddCourse}>Agregar curso</button>

            <h3>Agregar usuario</h3>
            <input type="text" placeholder="Nombre de usuario" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
            <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)}>
              <option value="alumno">Alumno</option>
              <option value="docente">Docente</option>
              <option value="admin">Admin</option>
            </select>
            {(newUserRole === 'docente' || newUserRole === 'alumno') && (
              <select value={newUserCareer} onChange={(e) => setNewUserCareer(e.target.value)}>
                <option value="">Selecciona carrera</option>
                {careerOptions.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            )}
            <button onClick={handleAddUser}>Agregar usuario</button>

            <h3>Lista de usuarios</h3>
            {adminUsers.length === 0 ? <p>No hay usuarios registrados.</p> : (
              <ul>
                {adminUsers.map((u) => (
                  <li key={u.name}>
                    {u.name} - {u.role} {u.career && `- Carrera: ${u.career}`}
                    <button onClick={() => handleDeleteUser(u.name)} style={{ marginLeft: '10px' }}>Eliminar</button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {(user.role === 'docente' || user.role === 'alumno') && !selectedCareer && (
          <>
            <p>Selecciona tu carrera para continuar:</p>
            <select value={career} onChange={(e) => setCareer(e.target.value)}>
              <option value="">Selecciona una carrera</option>
              {careerOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <button onClick={handleCareerSelect}>Guardar carrera</button>
          </>
        )}

        {selectedCareer && (
          <>
            <p>Tu carrera: <strong>{selectedCareer}</strong></p>
            <h3>Cursos</h3>
            {courses.length === 0 ? <p>No hay cursos disponibles.</p> : (
              <ul>
                {courses.map((course, idx) => (
                  <li key={idx}>
                    {course.name} - {course.modality} - Docente: {course.teacher}
                    {user.role === 'admin' && (
                      <button onClick={() => handleEditCourse(course, idx)} style={{ marginLeft: '10px' }}>
                        Editar
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {courseBeingEdited && (
          <div className="edit-course-form">
            <h4>Editar Curso</h4>
            <input
              type="text"
              placeholder="Nuevo nombre"
              value={editedCourseName}
              onChange={(e) => setEditedCourseName(e.target.value)}
            />
            <select
              value={editedCourseModality}
              onChange={(e) => setEditedCourseModality(e.target.value)}
            >
              <option value="Virtual">Virtual</option>
              <option value="Presencial">Presencial</option>
              <option value="Semipresencial">Semipresencial</option>
            </select>
            <input
              type="text"
              placeholder="Nueva URL de imagen"
              value={editedCourseImage}
              onChange={(e) => setEditedCourseImage(e.target.value)}
            />
            <button onClick={handleSaveEditedCourse}>Guardar cambios</button>
            <button onClick={() => setCourseBeingEdited(null)} style={{ marginLeft: '10px' }}>
              Cancelar
            </button>
          </div>
        )}

        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default DashboardPage;
