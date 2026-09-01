// Real API adapter — stubs to be wired against the confirmed AbroadHub backend.
// Endpoint paths below are placeholders; they must be finalized once the AbroadHub
// Postman/Swagger or backend source is provided. See FINDINGS.md → Open Items.
import { http } from '../../services/api/httpClient';

const notImplemented = (name) => async () => {
  throw new Error(
    `[AbroadHub] Real API "${name}" not wired yet. See FINDINGS.md → Open Items.`
  );
};

export const realAdapter = {
  __isMock: false,

  // Auth — path/shape to match the mobile app once confirmed.
  async login({ email, password }) {
    const { data } = await http.post('/auth/login', { email, password });
    return data;
  },
  async signup({ name, email, password }) {
    const { data } = await http.post('/auth/signup', { name, email, password });
    return data;
  },
  async me() {
    const { data } = await http.get('/auth/me');
    return data;
  },

  // Feed / Posts
  async getStories() { const { data } = await http.get('/stories'); return data; },
  async getFeed() { const { data } = await http.get('/posts/feed'); return data; },
  async getPost(id) { const { data } = await http.get(`/posts/${id}`); return data; },
  async toggleLike(id) { const { data } = await http.post(`/posts/${id}/like`); return data; },

  // Explore
  async getExplore() { const { data } = await http.get('/explore'); return data; },

  // Jobs
  async getJobs(params) { const { data } = await http.get('/jobs', { params }); return data; },
  async getJobFilters() { const { data } = await http.get('/jobs/filters'); return data; },
  async toggleSaveJob(id) { const { data } = await http.post(`/jobs/${id}/save`); return data; },

  // Nearby — not confirmed
  getNearbyCategories: notImplemented('getNearbyCategories'),
  getPopularServices: notImplemented('getPopularServices'),

  // Profile
  async getProfile() { const { data } = await http.get('/profile/me'); return data; },
};
