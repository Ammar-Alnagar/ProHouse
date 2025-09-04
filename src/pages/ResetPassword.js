import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiPut } from '../api';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await apiPut(`/password/reset/${token}`, { password });
      navigate('/login');
    } catch (e) {
      setError('Failed to reset password. ' + (e.message || ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-white py-5" style={{ maxWidth: 480 }}>
      <h2>Reset Password</h2>
      {error && <div className="text-danger my-2">{error}</div>}
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
