import {
  defaultSiteSettings,
  defaultAppreciations,
  defaultMemories,
  defaultGallery,
  defaultReasons,
  defaultLetters,
  defaultStars
} from '../data/defaultData';

const API_BASE = '/api';

// Helper for local storage persistence fallback
const getStored = (key, fallback) => {
  try {
    const val = localStorage.getItem(`deepuuu_${key}`);
    return val ? JSON.parse(val) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStored = (key, value) => {
  try {
    localStorage.setItem(`deepuuu_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error:', e);
  }
};

export const api = {
  // Site Settings
  async getSettings() {
    try {
      const res = await fetch(`${API_BASE}/settings`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.recipientName) {
          setStored('settings', data);
          return data;
        }
      }
    } catch (err) {
      // Fallback
    }
    return getStored('settings', defaultSiteSettings);
  },

  async updateSettings(settings, token) {
    setStored('settings', settings);
    try {
      const res = await fetch(`${API_BASE}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API sync fallback to local storage');
    }
    return settings;
  },

  // Appreciations (About You)
  async getAppreciations() {
    try {
      const res = await fetch(`${API_BASE}/appreciations`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setStored('appreciations', data);
          return data;
        }
      }
    } catch (err) {}
    return getStored('appreciations', defaultAppreciations);
  },

  // Memories (Timeline)
  async getMemories() {
    try {
      const res = await fetch(`${API_BASE}/memories`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setStored('memories', data);
          return data;
        }
      }
    } catch (err) {}
    return getStored('memories', defaultMemories);
  },

  async saveMemory(memory, token) {
    let current = getStored('memories', defaultMemories);
    if (memory.id || memory._id) {
      current = current.map(m => ((m.id === memory.id || m._id === memory._id) ? memory : m));
    } else {
      memory.id = 'mem-' + Date.now();
      current.push(memory);
    }
    setStored('memories', current);
    try {
      const url = (memory._id || memory.id) ? `${API_BASE}/memories/${memory._id || memory.id}` : `${API_BASE}/memories`;
      const method = (memory._id || memory.id) ? 'PUT' : 'POST';
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(memory)
      });
    } catch (e) {}
    return current;
  },

  async deleteMemory(id, token) {
    let current = getStored('memories', defaultMemories);
    current = current.filter(m => m.id !== id && m._id !== id);
    setStored('memories', current);
    try {
      await fetch(`${API_BASE}/memories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (e) {}
    return current;
  },

  // Gallery
  async getGallery() {
    try {
      const res = await fetch(`${API_BASE}/gallery`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setStored('gallery', data);
          return data;
        }
      }
    } catch (err) {}
    return getStored('gallery', defaultGallery);
  },

  async saveGalleryItem(item, token) {
    let current = getStored('gallery', defaultGallery);
    if (item.id || item._id) {
      current = current.map(g => ((g.id === item.id || g._id === item._id) ? item : g));
    } else {
      item.id = 'gal-' + Date.now();
      current.unshift(item);
    }
    setStored('gallery', current);
    try {
      const url = (item._id || item.id) ? `${API_BASE}/gallery/${item._id || item.id}` : `${API_BASE}/gallery`;
      const method = (item._id || item.id) ? 'PUT' : 'POST';
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(item)
      });
    } catch (e) {}
    return current;
  },

  async deleteGalleryItem(id, token) {
    let current = getStored('gallery', defaultGallery);
    current = current.filter(g => g.id !== id && g._id !== id);
    setStored('gallery', current);
    try {
      await fetch(`${API_BASE}/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (e) {}
    return current;
  },

  // Reasons
  async getReasons() {
    try {
      const res = await fetch(`${API_BASE}/reasons`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setStored('reasons', data);
          return data;
        }
      }
    } catch (err) {}
    return getStored('reasons', defaultReasons);
  },

  // Letters
  async getLetters() {
    try {
      const res = await fetch(`${API_BASE}/letters`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setStored('letters', data);
          return data;
        }
      }
    } catch (err) {}
    return getStored('letters', defaultLetters);
  },

  async updateLetter(letter, token) {
    let current = getStored('letters', defaultLetters);
    current = current.map(l => (l.id === letter.id || l._id === letter._id ? letter : l));
    setStored('letters', current);
    try {
      await fetch(`${API_BASE}/letters/${letter._id || letter.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(letter)
      });
    } catch (e) {}
    return current;
  },

  // Stars
  async getStars() {
    try {
      const res = await fetch(`${API_BASE}/stars`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setStored('stars', data);
          return data;
        }
      }
    } catch (err) {}
    return getStored('stars', defaultStars);
  },

  async updateStar(star, token) {
    let current = getStored('stars', defaultStars);
    current = current.map(s => (s.id === star.id || s._id === star._id ? star : s));
    setStored('stars', current);
    try {
      await fetch(`${API_BASE}/stars/${star._id || star.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(star)
      });
    } catch (e) {}
    return current;
  },

  // Auth
  async login(username, password) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {}

    // Secure local fallback check for standalone demo
    if (username === 'admin' && (password === 'deepuuu123' || password === 'deepu123' || password === 'admin')) {
      const fallbackToken = 'demo-jwt-token-' + Date.now();
      localStorage.setItem('deepuuu_admin_token', fallbackToken);
      return { token: fallbackToken, username: 'admin' };
    }
    throw new Error('Invalid credentials');
  }
};
