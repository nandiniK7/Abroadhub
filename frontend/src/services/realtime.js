// Lightweight realtime bus — combines an in-app event emitter with a
// BroadcastChannel so multiple browser tabs stay in sync in real time.
// When the real AbroadHub API is connected, swap the emitter for a WS/Socket.IO client
// with the SAME publish/subscribe signature — nothing else in the UI has to change.

const CHANNEL = 'abroadhub-realtime';
const listeners = new Map(); // event -> Set<fn>
let bc = null;
try {
  if (typeof BroadcastChannel !== 'undefined') bc = new BroadcastChannel(CHANNEL);
} catch { /* ignore */ }

function fire(event, payload) {
  const fns = listeners.get(event);
  if (!fns) return;
  fns.forEach((fn) => { try { fn(payload); } catch { /* subscriber error */ } });
}

if (bc) {
  bc.onmessage = (m) => {
    const { event, payload } = m.data || {};
    if (event) fire(event, payload);
  };
}

export const realtime = {
  publish(event, payload) {
    fire(event, payload);
    try { bc?.postMessage({ event, payload }); } catch { /* ignore */ }
  },
  subscribe(event, fn) {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event).add(fn);
    return () => listeners.get(event)?.delete(fn);
  },
};

// Event vocabulary
export const RT = {
  POST_CREATED: 'post.created',
  POST_DELETED: 'post.deleted',
  POST_LIKED: 'post.liked',
  NOTIFICATION_NEW: 'notification.new',
  NOTIFICATION_READ_ALL: 'notification.read.all',
  MESSAGE_NEW: 'message.new',
  PROFILE_UPDATED: 'profile.updated',
};
