// AlumnoPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Estilos/alumno.css';

const AlumnoPage = () => {
  const [user, setUser] = useState(null);
  const [career, setCareer] = useState('');
  const [photo, setPhoto] = useState('');
  const [careerOptions, setCareerOptions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [contentByCourse, setContentByCourse] = useState({});
  const [filterCourse, setFilterCourse] = useState('');
  const [filterWeek, setFilterWeek] = useState('');
  const [filterFileName, setFilterFileName] = useState('');
  const [filterFileType, setFilterFileType] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'estudiante') {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    const options = JSON.parse(localStorage.getItem('careerOptions')) || [];
    setCareerOptions(options);
    const alumnoData = JSON.parse(localStorage.getItem(`alumnoData_${currentUser.email}`)) || {};
    if (alumnoData.career) {
      setCareer(alumnoData.career);
      const coursesByCareer = JSON.parse(localStorage.getItem('coursesByCareer')) || {};
      setCourses(coursesByCareer[alumnoData.career] || []);
      loadContent(alumnoData.career);
    }
    if (alumnoData.photo) setPhoto(alumnoData.photo);
  }, [navigate]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`alumnoData_${user.email}`, JSON.stringify({ career, photo }));
    }
  }, [career, photo, user]);

  const handleCareerSelect = (e) => {
    const selected = e.target.value;
    setCareer(selected);
    const updatedUser = { ...user, career: selected };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u => u.email === updatedUser.email ? updatedUser : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    const coursesByCareer = JSON.parse(localStorage.getItem('coursesByCareer')) || {};
    setCourses(coursesByCareer[selected] || []);
    loadContent(selected);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setPhoto(base64);
      const updatedUser = { ...user, photo: base64 };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = users.map(u => u.email === updatedUser.email ? updatedUser : u);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    };
    if (file) reader.readAsDataURL(file);
  };

  const loadContent = (selectedCareer) => {
    const content = {};
    for (let key in localStorage) {
      if (key.startsWith('docenteData_')) {
        const docenteData = JSON.parse(localStorage.getItem(key));
        if (docenteData?.career === selectedCareer && docenteData.courseContent) {
          Object.entries(docenteData.courseContent).forEach(([course, weeks]) => {
            if (!content[course]) content[course] = {};
            Object.entries(weeks).forEach(([week, files]) => {
              if (!content[course][week]) content[course][week] = [];
              content[course][week].push(...files);
            });
          });
        }
      }
    }
    setContentByCourse(content);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/');
  };

  const getFilteredFiles = () => {
    const filtered = [];
    Object.entries(contentByCourse).forEach(([course, weeks]) => {
      if (filterCourse && !course.toLowerCase().includes(filterCourse.toLowerCase())) return;
      Object.entries(weeks).forEach(([week, files]) => {
        if (filterWeek && !week.toLowerCase().includes(filterWeek.toLowerCase())) return;
        files.forEach(file => {
          const nameMatch = !filterFileName || (file.name && file.name.toLowerCase().includes(filterFileName.toLowerCase()));
          const typeMatch = !filterFileType || (file.type && file.type.toLowerCase().includes(filterFileType.toLowerCase()));
          if (nameMatch && typeMatch) {
            filtered.push({ course, week, ...file });
          }
        });
      });
    });
    return filtered;
  };

  const filteredCourses = courses.map(c => c.name || c);
  const filteredFiles = getFilteredFiles();

  // ✅ Asegurar que user no sea null
  if (!user) return <p className="loading">Cargando datos del alumno...</p>;

  return (
    <div className="alumno-container">
      <div className="alumno-card">
        <div className="alumno-header">
          <div>
            <h1>🎓 Bienvenido, {user.name}</h1>
            <p>{user.email}</p>
          </div>
          <button onClick={cerrarSesion}>Cerrar Sesión</button>
        </div>

        <div className="alumno-profile">
          <div className="alumno-photo">
            <label>Foto de perfil:</label>
            {photo ? <img src={photo} alt="Perfil" /> : <div className="alumno-placeholder">Sin foto</div>}
            <input type="file" onChange={handlePhotoUpload} accept="image/*" />
          </div>
          <div className="alumno-career">
            <label>Carrera:</label>
            {career ? (
              <div className="career-name">{career}</div>
            ) : (
              <select onChange={handleCareerSelect} defaultValue="">
                <option value="" disabled>Selecciona tu carrera</option>
                {careerOptions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            )}
          </div>
        </div>

        <div className="alumno-courses">
          <h2>📘 Mis Cursos</h2>
          <div className="filters">
            <input type="text" placeholder="Filtrar por curso" value={filterCourse} onChange={e => setFilterCourse(e.target.value)} />
            <input type="text" placeholder="Filtrar por semana" value={filterWeek} onChange={e => setFilterWeek(e.target.value)} />
            <input type="text" placeholder="Filtrar por nombre de archivo" value={filterFileName} onChange={e => setFilterFileName(e.target.value)} />
            <input type="text" placeholder="Filtrar por tipo de archivo" value={filterFileType} onChange={e => setFilterFileType(e.target.value)} />
          </div>
          <div className="course-grid">
            {filteredCourses.map((name, i) => (
              <div key={i} className="course-card" onClick={() => setSelectedCourse(name)}>
                <h3>{name}</h3>
                {contentByCourse[name] && (
                  <p>{Object.keys(contentByCourse[name]).length} semanas con contenido</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {filteredFiles.length > 0 && (
          <div className="filtered-files">
            <h2>📂 Archivos encontrados</h2>
            <ul>
              {filteredFiles.map((file, i) => (
                <li key={i}>
                  <strong>{file.course}</strong> - Semana {file.week} -{' '}
                  <a href={file.base64} download={file.name} target="_blank" rel="noopener noreferrer">
                    {file.name}
                  </a>{' '}
                  <span className="file-type">({file.type})</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedCourse && (
          <div className="modal-overlay" onClick={() => setSelectedCourse(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h2>{selectedCourse}</h2>
              <ul>
                {Object.entries(contentByCourse[selectedCourse] || {}).map(([week, files]) => (
                  <li key={week}>
                    <strong>Semana {week}:</strong>
                    <ul>
                      {files.map((f, idx) => (
                        <li key={idx}>
                          <a href={f.base64} download={f.name} target="_blank" rel="noopener noreferrer">
                            {f.name}
                          </a> <span className="file-type">({f.type})</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <button onClick={() => setSelectedCourse(null)}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumnoPage;
