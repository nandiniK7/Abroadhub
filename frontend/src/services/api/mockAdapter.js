import * as data from './mockData';
import { realtime, RT } from '../realtime';

let _feed = null;
let _notifs = null;
let _convos = null;
let _messages = null;
let _providers = null;
let _profile = null;
const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

const init = () => {
  if (!_feed) _feed = [...data.posts];
  if (!_notifs) _notifs = data.notifications.map((n) => ({ ...n }));
  if (!_convos) _convos = data.conversations.map((c) => ({ ...c }));
  if (!_messages) _messages = { ...data.chatMessages };
  if (!_providers) _providers = data.providers.map((p) => ({ ...p }));
  if (!_profile) _profile = { ...data.currentUser };
};

export const mockAdapter = {
  __isMock: true,

  async login({ email, password }) { await delay(400); if (!email || !password) throw new Error('required'); return { token: 't_'+Date.now(), user: data.currentUser }; },
  async signup({ name, email, password }) { await delay(500); return { token: 't_'+Date.now(), user: { ...data.currentUser, name } }; },
  async me() { await delay(150); return _profile || data.currentUser; },

  // Feed
  async getStories() { init(); await delay(); return data.stories; },
  async getFeed() { init(); await delay(); return _feed; },
  async toggleLike(id) {
    init(); await delay(120);
    const p = _feed.find((x) => x.id === id);
    if (p) { p.liked = !p.liked; p.likes += p.liked ? 1 : -1; }
    realtime.publish(RT.POST_LIKED, { id, liked: p?.liked, likes: p?.likes });
    return p;
  },
  async createPost(post) {
    init(); await delay(200);
    _feed = [post, ..._feed];
    realtime.publish(RT.POST_CREATED, post);
    // Also fire a notification event so the bell badge lights up in real time.
    const n = { id: 'n_'+Date.now(), kind: 'like', title: 'Post published', description: 'Your post is live on the feed.', time: 'now', read: false };
    _notifs = [n, ...(_notifs || [])];
    realtime.publish(RT.NOTIFICATION_NEW, n);
    return post;
  },
  async deletePost(id) {
    init(); await delay(200);
    _feed = _feed.filter((p) => p.id !== id);
    realtime.publish(RT.POST_DELETED, { id });
    return true;
  },
  async updatePost(id, patch) { init(); await delay(200); _feed = _feed.map((p) => p.id === id ? { ...p, ...patch } : p); return _feed.find((p) => p.id === id); },

  // Explore
  async getExplore() { await delay(); return data.explore; },

  // Jobs
  async getJobs({ q = '' } = {}) {
    await delay();
    if (!q) return data.jobs;
    const s = q.toLowerCase();
    return data.jobs.filter((j) => j.title.toLowerCase().includes(s) || j.company.toLowerCase().includes(s));
  },
  async createJob(job) { await delay(300); data.jobs.unshift({ id: 'j_'+Date.now(), saved: false, ...job }); return job; },
  async toggleSaveJob(id) { await delay(); const j = data.jobs.find((x) => x.id === id); if (j) j.saved = !j.saved; return j; },

  // Nearby
  async getNearbyCategories() { await delay(); return data.nearbyCategories; },
  async getBusinessCategories() { await delay(); return data.businessCategories; },
  async getServiceProviders() { await delay(); return data.serviceProviders; },

  // Notifications
  async getNotifications() { init(); await delay(); return _notifs; },
  async markNotificationRead(id) { init(); await delay(80); const n = _notifs.find((x) => x.id === id); if (n) n.read = true; return n; },
  async markAllNotificationsRead() { init(); await delay(120); _notifs = _notifs.map((n) => ({ ...n, read: true })); realtime.publish(RT.NOTIFICATION_READ_ALL); return _notifs; },

  // Inbox
  async getConversations() { init(); await delay(); return _convos; },
  async getMessages(cid) { init(); await delay(); return _messages[cid] || []; },
  async sendMessage(cid, text) {
    init(); await delay(120);
    const msg = { id: 'm_'+Date.now(), from: 'me', text, time: 'now' };
    _messages[cid] = [...(_messages[cid] || []), msg];
    const c = _convos.find((x) => x.id === cid);
    if (c) { c.last = text; c.time = 'now'; }
    realtime.publish(RT.MESSAGE_NEW, { cid, msg });
    return msg;
  },

  // Search
  async searchPosts(q) { init(); await delay(); if (!q) return []; return _feed.filter((p) => p.text?.toLowerCase().includes(q.toLowerCase())); },
  async searchAccounts(q) { init(); await delay(); if (!q) return []; return [_profile].filter((u) => u.name.toLowerCase().includes(q.toLowerCase())); },
  async searchProviders(q) { init(); await delay(); return _providers.filter((p) => !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.username.toLowerCase().includes(q.toLowerCase())); },
  async toggleFollowProvider(id) { init(); await delay(); const p = _providers.find((x) => x.id === id); if (p) p.following = !p.following; return p; },

  // Profile
  async getProfile() { init(); await delay(); return { user: _profile, photos: data.profilePhotos, posts: _feed.filter((p) => p.author.mine).slice(0, 6) }; },
  async updateProfile(patch) { init(); await delay(200); _profile = { ..._profile, ...patch }; realtime.publish(RT.PROFILE_UPDATED, _profile); return _profile; },
};
