// Real auth API — always calls the backend, independent of the mock/real data switch.
// This is used for email/password login, registration and session refresh so we get
// real accounts even while non-auth data still comes from the mockAdapter.
import { http } from './httpClient';

function friendlyError(err) {
  const detail = err?.response?.data?.detail;
  if (typeof detail === 'string') return new Error(detail);
  if (Array.isArray(detail)) {
    return new Error(
      detail.map((e) => (e && typeof e.msg === 'string' ? e.msg : JSON.stringify(e))).join(' ')
    );
  }
  if (detail?.msg) return new Error(detail.msg);
  if (err?.message) return err;
  return new Error('Something went wrong.');
}

export const authApi = {
  async login({ email, password }) {
    try {
      const { data } = await http.post('/auth/login', { email, password });
      return data; // { token, user }
    } catch (e) { throw friendlyError(e); }
  },
  async register({ name, email, password }) {
    try {
      const { data } = await http.post('/auth/register', { name, email, password });
      return data;
    } catch (e) { throw friendlyError(e); }
  },
  async me() {
    try {
      const { data } = await http.get('/auth/me');
      return data;
    } catch (e) { throw friendlyError(e); }
  },
  async logout() {
    try { await http.post('/auth/logout'); } catch { /* ignore */ }
  },
};
