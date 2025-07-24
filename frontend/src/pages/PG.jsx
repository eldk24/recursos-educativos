import React from "react";
import { Link } from "react-router-dom";

function PG() {
  return (
    <>

<header className="bg-white py-3 shadow-sm text-center">
  <img
    src="https://sso.utp.edu.pe/auth/resources/4i3s1/login/utp-pao/images/logo-pao-class.png"
    alt="UTP+Class"
    style={{ height: "45px" }}
  />
</header>


      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

        /* Animaciones suaves */
.info-card {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease forwards;
}

.info-card:nth-child(1) { animation-delay: 0.2s; }
.info-card:nth-child(2) { animation-delay: 0.4s; }
.info-card:nth-child(3) { animation-delay: 0.6s; }
.info-card:nth-child(4) { animation-delay: 0.8s; }
.info-card:nth-child(5) { animation-delay: 1s; }
.info-card:nth-child(6) { animation-delay: 1.2s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


        .pg-container {
          font-family: 'Inter', sans-serif;
          background-color: #f4f7fe;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .carousel-caption {
          background: rgba(0,0,0,0.5);
          padding: 1.5rem;
          border-radius: 12px;
        }

        .main-header {
          text-align: center;
          padding: 60px 20px 30px;
          background-color: #fff;
        }

        .main-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2c3cff;
        }

        .main-header p {
          max-width: 900px;
          margin: 20px auto 0;
          color: #444;
          font-size: 1.1rem;
        }

        .btn-primary,
        .btn-success {
          padding: 12px 24px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 8px;
          transition: 0.3s ease;
        }

        .btn-primary:hover {
          background-color: #1329e3;
        }

        .btn-success:hover {
          background-color: #1c7f36;
        }

        .section {
          padding: 60px 20px;
        }

        .section h2 {
          font-weight: 700;
          font-size: 2rem;
          margin-bottom: 20px;
          color: #2c3cff;
          text-align: center;
        }

        .section p {
          max-width: 1000px;
          margin: 0 auto;
          font-size: 1.05rem;
          color: #444;
          line-height: 1.7;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-top: 40px;
        }

        .info-card {
          background: #fff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          transition: 0.3s ease;
        }

        .info-card:hover {
          transform: translateY(-5px);
        }

        footer {
          background-color: #b30000;
          color: white;
          text-align: center;
          padding: 20px 0;
          margin-top: auto;
        }

        @media (max-width: 768px) {
          .carousel-caption h5 {
            font-size: 1.2rem;
          }
          .carousel-caption p {
            font-size: 0.9rem;
          }
        }
      `}</style>

      <div className="pg-container">

        {/* Carrusel */}
        <div id="carouselUTP" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://ecoperu.tv/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-27-at-10.18.30.jpeg"
                style={{ height: "600px", objectFit: "cover" }}
                className="d-block w-100"
                alt="Campus UTP"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Conectamos tu educación con el futuro</h5>
                <p>Formación profesional con tecnología, innovación y visión global.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://www.utp.edu.pe/noticias/sites/default/files/noticias/Estudiantes%20UTP%20UNESCO%20-CIDH_Mesa%20de%20trabajo%201.jpg"
                style={{ height: "600px", objectFit: "cover" }}
                className="d-block w-100"
                alt="Docentes UTP"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Docentes altamente capacitados</h5>
                <p>Profesionales con experiencia real en el campo laboral.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://portalestudiante.utp.edu.pe/Images/portal_estudiante.png"
                style={{ height: "600px", objectFit: "cover" }}
                className="d-block w-100"
                alt="Carreras profesionales"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Más de 40 carreras profesionales</h5>
                <p>Adaptadas a las necesidades del mercado laboral actual.</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselUTP" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselUTP" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>

        {/* Bienvenida */}
        <div className="main-header">
          <h1>Bienvenid@ a la UTP</h1>
          <p>
            La Universidad Tecnológica del Perú te da la bienvenida a su plataforma de recursos educativos digitales. Explora, comparte y gestiona contenidos académicos diseñados para enriquecer tu enseñanza.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
            <Link to="/login" className="btn btn-primary shadow">Iniciar Sesión</Link>
            <Link to="/register" className="btn btn-success shadow">Registrarse</Link>
          </div>
        </div>

        {/* Secciones informativas */}
        <div className="section">
          <h2>Sobre la UTP</h2>
          <p>
            Fundada en 1997, la Universidad Tecnológica del Perú es una institución educativa que forma profesionales altamente competitivos, innovadores y comprometidos con el desarrollo del país. Con sedes en Lima, Arequipa, Trujillo, Chiclayo, Piura y Huancayo, ofrece carreras de pregrado, carreras técnicas y programas de posgrado.
          </p>

          <div className="cards-grid mt-5">
            <div className="info-card">
              <div className="mb-2">
                <i className="bi bi-lightbulb-fill text-warning fs-3"></i>
              </div>
              <h5>Misión</h5>
              <p>Formar profesionales líderes con una sólida base académica y tecnológica, preparados para enfrentar los desafíos globales.</p>
            </div>
            <div className="info-card">
              <div className="mb-2">
                <i className="bi bi-lightbulb-fill text-warning fs-3"></i>
              </div>
              <h5>Visión</h5>
              <p>Ser la universidad tecnológica líder del país, reconocida por su innovación educativa y su impacto en la sociedad.</p>
            </div>
            <div className="info-card">
              <div className="mb-2">
                <i className="bi bi-lightbulb-fill text-warning fs-3"></i>
              </div>
              <h5>Acreditaciones</h5>
              <p>Contamos con carreras acreditadas nacional e internacionalmente, garantizando calidad educativa.</p>
            </div>
            <div className="info-card">
              <div className="mb-2">
                <i className="bi bi-lightbulb-fill text-warning fs-3"></i>
              </div>
              <h5>Plataformas digitales</h5>
              <p>Accede a recursos como UTP Class, Blackboard y plataformas de biblioteca virtual desde cualquier dispositivo.</p>
            </div>
            <div className="info-card">
              <div className="mb-2">
                <i className="bi bi-lightbulb-fill text-warning fs-3"></i>
              </div>
              <h5>Convenios internacionales</h5>
              <p>La UTP tiene convenios con universidades de más de 20 países, promoviendo intercambios y pasantías.</p>
            </div>
            <div className="info-card">
              <div className="mb-2">
                <i className="bi bi-lightbulb-fill text-warning fs-3"></i>
              </div>
              <h5>Sedes a nivel nacional</h5>
              <p>Más de 6 sedes con infraestructura moderna y laboratorios especializados en todo el Perú.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer>
          <small>
            © {new Date().getFullYear()} Universidad Tecnológica del Perú — Todos los derechos reservados.
          </small>
        </footer>
      </div>
    </>
  );
}

export default PG;
