import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiPost } from '../api';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await apiPost('/login', { email, password });
      navigate('/');
    } catch (e) {
      setError('Login failed. ' + (e.message || ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-white py-5" style={{ maxWidth: 480 }}>
      <h2>Login</h2>
      {error && <div className="text-danger my-2">{error}</div>}
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="mt-3">
          <Link to="/password/forgot">Forgot password?</Link>
        </div>
        <div className="mt-2">
          New here? <Link to="/register">Create an account</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
