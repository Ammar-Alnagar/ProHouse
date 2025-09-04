import { useState } from 'react';
import { apiPost } from '../api';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await apiPost('/password/forgot', { email });
      setMessage('If this email is registered, a reset link has been sent.');
    } catch (e) {
      setError('Failed to send reset email. ' + (e.message || ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-white py-5" style={{ maxWidth: 480 }}>
      <h2>Forgot Password</h2>
      {message && <div className="text-success my-2">{message}</div>}
      {error && <div className="text-danger my-2">{error}</div>}
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button className="btn btn-primary" disabled={loading}>
          {loading ? 'Sending...' : 'Send reset link'}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
