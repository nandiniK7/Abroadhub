// Mock adapter — simulates network latency and returns dev data.
// Marked clearly for development-only use.
import * as data from './mockData';

const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));

export const mockAdapter = {
  __isMock: true,

  // ---------- Auth ----------
  async login({ email, password }) {
    await delay(500);
    if (!email || !password) throw new Error('Email and password required');
    return {
      token: 'mock_dev_token_' + Date.now(),
      user: data.currentUser,
    };
  },
  async signup({ name, email, password }) {
    await delay(600);
    if (!name || !email || !password) throw new Error('All fields required');
    return {
      token: 'mock_dev_token_' + Date.now(),
      user: { ...data.currentUser, name, handle: '@' + name.split(' ')[0].toLowerCase() },
    };
  },
  async me() {
    await delay(200);
    return data.currentUser;
  },

  // ---------- Feed / Posts ----------
  async getStories() { await delay(); return data.stories; },
  async getFeed() { await delay(); return data.posts; },
  async getPost(id) { await delay(); return data.posts.find((p) => p.id === id); },
  async toggleLike(id) {
    await delay(150);
    const p = data.posts.find((x) => x.id === id);
    if (p) { p.liked = !p.liked; p.likes += p.liked ? 1 : -1; }
    return p;
  },

  // ---------- Explore ----------
  async getExplore() { await delay(); return data.explore; },

  // ---------- Jobs ----------
  async getJobs({ filter = 'All', q = '' } = {}) {
    await delay();
    let list = data.jobs;
    if (filter && filter !== 'All') {
      list = list.filter(
        (j) =>
          j.type === filter ||
          j.remote === filter ||
          j.tags.some((t) => t.toLowerCase() === filter.toLowerCase())
      );
    }
    if (q) {
      const s = q.toLowerCase();
      list = list.filter(
        (j) => j.title.toLowerCase().includes(s) || j.company.toLowerCase().includes(s)
      );
    }
    return list;
  },
  async getJobFilters() { await delay(100); return data.jobFilters; },
  async toggleSaveJob(id) {
    await delay(120);
    const j = data.jobs.find((x) => x.id === id);
    if (j) j.saved = !j.saved;
    return j;
  },

  // ---------- Nearby ----------
  async getNearbyCategories() { await delay(); return data.nearbyCategories; },
  async getPopularServices() { await delay(); return data.popularServices; },

  // ---------- Profile ----------
  async getProfile() { await delay(); return { user: data.currentUser, photos: data.profilePhotos, posts: data.posts.slice(0, 3) }; },
};
