import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(credentials.username, credentials.password);
    if (success) {
      navigate('/products');
    } else {
      setError('Credenciales inválidas. Intenta de nuevo.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="text-center mb-4">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto" style={{ width: '50px', height: '50px' }}>
                    <i className="bi bi-lock-fill fs-4"></i>
                  </div>
                  <h3 className="mt-3">Inicia sesión</h3>
                  <p className="text-muted">
                    Bienvenido a <strong>TechStore</strong>. Usa <strong>admin/admin</strong> para iniciar como administrador.
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Usuario</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="form-control"
                      placeholder="Ingresa tu usuario"
                      value={credentials.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="Ingresa tu contraseña"
                      value={credentials.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
                </form>
              </div>
            </div>
            <p className="text-center text-muted mt-3">
              © {new Date().getFullYear()} <strong>TechStore</strong>. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
