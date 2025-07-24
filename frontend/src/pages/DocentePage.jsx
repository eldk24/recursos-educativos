import React, { useState, useEffect } from 'react';
import PG from "./PG";
import '../Estilos/DocentePage.css';

const DocentePage = () => {
  const storedUser = JSON.parse(localStorage.getItem('currentUser'));
  const [user, setUser] = useState(storedUser);

  const careerOptions = JSON.parse(localStorage.getItem('careerOptions')) || [];
  const coursesByCareer = JSON.parse(localStorage.getItem('coursesByCareer')) || {};
  const allCourses = JSON.parse(localStorage.getItem('courses')) || [];
  const savedData = JSON.parse(localStorage.getItem(`docenteData_${user?.email}`)) || {};


  const [career, setCareer] = useState(savedData.career || '');
  const [askingForPassword, setAskingForPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [photo, setPhoto] = useState(savedData.photo || null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseContent, setCourseContent] = useState(savedData.courseContent || {});

  useEffect(() => {
  if (user && user.email) {
    localStorage.setItem(
      `docenteData_${user.email}`,
      JSON.stringify({ career, photo, courseContent })
    );
  }
}, [career, photo, courseContent, user]);


  const handleSelectCareer = () => {
    if (!career) {
      alert('Por favor, selecciona una carrera primero');
      return;
    }
    setAskingForPassword(false);
    setErrorPass('');
  };

  const tryChangeCareer = () => {
    setAskingForPassword(true);
    setPasswordInput('');
    setErrorPass('');
  };

  const verifyPasswordAndChangeCareer = () => {
    if (passwordInput === user.password) {
      setCareer('');
      setAskingForPassword(false);
      setErrorPass('');
      setSelectedCourse(null);
      setCourseContent({});
      alert('Puedes elegir una nueva carrera ahora');
    } else {
      setErrorPass('Contraseña incorrecta');
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  // Reemplaza handleFileChange por esta versión:
const handleFileChange = (courseName, week, e) => {
  const files = Array.from(e.target.files);
  if (!files.length) return;

  const newFilesPromises = files.map(file => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          name: file.name,
          type: file.type,
          base64: reader.result,
        });
      };
      reader.readAsDataURL(file);
    });
  });

  Promise.all(newFilesPromises).then(newFiles => {
    setCourseContent(prev => {
      const existingFiles = prev[courseName]?.[week] || [];
      return {
        ...prev,
        [courseName]: {
          ...(prev[courseName] || {}),
          [week]: [...existingFiles, ...newFiles],
        }
      };
    });
  });
};

// Nueva función para eliminar archivo por índice:
const handleRemoveFile = (courseName, week, fileIndex) => {
  setCourseContent(prev => {
    const updatedFiles = [...(prev[courseName]?.[week] || [])];
    updatedFiles.splice(fileIndex, 1);
    return {
      ...prev,
      [courseName]: {
        ...(prev[courseName] || {}),
        [week]: updatedFiles,
      }
    };
  });
};


  const handleDownload = (fileData) => {
    if (!fileData) return;
    const link = document.createElement('a');
    link.href = fileData.base64;
    link.download = fileData.name;
    link.click();
  };

 const handleLogout = () => {
  localStorage.removeItem('currentUser');
  setUser(null); // Esto actualiza el estado y fuerza el re-render
};


  const closeModal = () => setSelectedCourse(null);

  if (!user || user.role !== 'docente') return <PG />;


  const selectedCourseInfo = (coursesByCareer[career] || []).find(
  (c) => c.name === selectedCourse
);



  return (
    <div className="docente-page">
      <nav className="navbar">
        <img src="https://sso.utp.edu.pe/auth/resources/4i3s1/login/utp-pao/images/logo-pao-class.png" alt="UTP Class Logo" className="logo" />
        <div className="nav-links">
          <span>Inicio</span>
          <span>Perfil</span>
          <button onClick={handleLogout}>Salir</button>
        </div>
      </nav>

      <main className="main-content">
        <h2>Bienvenido, Profesor {user.name}</h2>

        <section className="profile-photo">
          <h3>Foto de perfil</h3>
          {photo ? (
            <img src={photo} alt="Foto de perfil" />
          ) : (
            <div className="photo-placeholder">Sin foto</div>
          )}
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </section>

        {!career ? (
          <section className="career-select">
            <h3>Selecciona la carrera que enseñas</h3>
            <select value={career} onChange={e => setCareer(e.target.value)}>
              <option value="">-- Seleccionar --</option>
              {careerOptions.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
            <button onClick={handleSelectCareer}>Confirmar Carrera</button>
          </section>
        ) : (
          <section className="career-info">
            <h3>Tu carrera asignada: <span>{career}</span></h3>
            <button onClick={tryChangeCareer}>Cambiar carrera</button>
            {askingForPassword && (
              <div className="password-verify">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  placeholder="Contraseña"
                />
                <button onClick={verifyPasswordAndChangeCareer}>Verificar</button>
                {errorPass && <div className="error">{errorPass}</div>}
              </div>
            )}
          </section>
        )}

        {career && (
          <section className="courses">
            <h3>Mis cursos</h3>
            <div className="course-cards">
              {(coursesByCareer[career] || []).map((courseObj, index) => {
  if (!courseObj || typeof courseObj !== 'object') return null;

  const courseInfo = {
    name: courseObj.name || 'Sin nombre',
    modalidad: courseObj.modality || 'Desconocida',
    docente: courseObj.teacher || user.name,
    image: courseObj.image || 'https://via.placeholder.com/250x150?text=Curso'
  };

  return (
    <div
      key={index}
      className="course-card"
      onClick={() => setSelectedCourse(courseInfo.name)}
    >
      <img
        src={courseInfo.image}
        alt={courseInfo.name}
      />
      <h4>{courseInfo.name}</h4>
      <p>Modalidad: {courseInfo.modalidad}</p>
      <p>Profesor: {courseInfo.docente}</p>
    </div>
  );
})}


            </div>
          </section>
        )}

        {selectedCourse && selectedCourseInfo && (
  <div className="modal-overlay" onClick={closeModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={closeModal}>×</button>
      <h2 className="modal-title">{selectedCourseInfo.name}</h2>
      <div className="weeks-grid">
        {[...Array(18)].map((_, week) => (
  <div key={week + 1} className="week-card">
    <strong>Semana {week + 1}</strong>
    <label className="custom-upload">
      Subir archivos
      <input
        type="file"
        multiple
        onChange={(e) => handleFileChange(selectedCourse, week + 1, e)}
        accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,image/*,video/*"
      />
    </label>

    {Array.isArray(courseContent[selectedCourse]?.[week + 1]) &&
      courseContent[selectedCourse][week + 1].map((file, index) => (
        <div key={index} className="file-info">
          <span>{file.name}</span>
          <button onClick={() => handleDownload(file)}>Descargar</button>
          <button onClick={() => handleRemoveFile(selectedCourse, week + 1, index)}>Eliminar</button>
        </div>
      ))}
  </div>
))}

      </div>
    </div>
  </div>
)}

      </main>
    </div>
  );
};

export default DocentePage;