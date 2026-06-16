import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { authApi } from '../../api';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authApi.login(username, password);
      login(res.data.token, res.data.username);
      navigate('/admin');
    } catch {
      setError('Логин немесе пароль кате');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0d1117' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 font-bold text-white text-lg"
            style={{ background: 'var(--color-green)' }}
          >
            Q
          </div>
          <h1 className="text-xl font-bold text-white">Кіру</h1>
          <p className="text-sm mt-1" style={{ color: '#6b7280' }}>QamQor басказу панелі</p>
        </div>

        <form onSubmit={submit} className="space-y-4 rounded-xl p-8" style={{ background: '#161b22', border: '1px solid #21262d' }}>
          <div>
            <label className="block text-xs font-medium mb-1.5 text-gray-400">Логин</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg text-sm text-white outline-none transition"
              style={{ background: '#0d1117', border: '1px solid #30363d' }}
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5 text-gray-400">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg text-sm text-white outline-none transition"
              style={{ background: '#0d1117', border: '1px solid #30363d' }}
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-50"
            style={{ background: 'var(--color-green)' }}
          >
            {loading ? 'Кіруде...' : 'Кіру'}
          </button>
        </form>
      </div>
    </div>
  );
}
