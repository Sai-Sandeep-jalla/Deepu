import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Lock,
  LogOut,
  Sparkles,
  Heart,
  Image as ImageIcon,
  Calendar,
  Mail,
  Star,
  Settings,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle,
  ExternalLink,
  Eye
} from 'lucide-react';
import { api } from '../services/api';

export default function AdminPage() {
  const [token, setToken] = useState(localStorage.getItem('deepuuu_admin_token') || '');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('settings');
  const [saveStatus, setSaveStatus] = useState('');

  // Editable Collections State
  const [settings, setSettings] = useState(null);
  const [memories, setMemories] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [appreciations, setAppreciations] = useState([]);
  const [letters, setLetters] = useState([]);
  const [stars, setStars] = useState([]);

  // Modal / Edit state
  const [editingItem, setEditingItem] = useState(null);
  const [editType, setEditType] = useState(''); // 'memory', 'gallery', 'letter', 'star'

  useEffect(() => {
    if (token) {
      loadAllData();
    }
  }, [token]);

  const loadAllData = async () => {
    try {
      const [s, m, g, a, l, st] = await Promise.all([
        api.getSettings(),
        api.getMemories(),
        api.getGallery(),
        api.getAppreciations(),
        api.getLetters(),
        api.getStars(),
      ]);
      setSettings(s);
      setMemories(m);
      setGallery(g);
      setAppreciations(a);
      setLetters(l);
      setStars(st);
    } catch (err) {
      console.error('Failed to load admin data', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await api.login(username, password);
      setToken(res.token);
    } catch (err) {
      setLoginError('Invalid username or password. (Hint: admin / deepu123)');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('deepuuu_admin_token');
    setToken('');
  };

  const showSaveSuccess = (msg = 'Changes saved successfully!') => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(''), 3000);
  };

  // Save Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    await api.updateSettings(settings, token);
    showSaveSuccess('Website settings and final dedication updated!');
  };

  // Memory Handlers
  const handleSaveMemory = async (memory) => {
    const updated = await api.saveMemory(memory, token);
    setMemories(updated);
    setEditingItem(null);
    showSaveSuccess('Memory milestone saved!');
  };

  const handleDeleteMemory = async (id) => {
    if (window.confirm('Delete this memory?')) {
      const updated = await api.deleteMemory(id, token);
      setMemories(updated);
      showSaveSuccess('Memory deleted!');
    }
  };

  // Gallery Handlers
  const handleSaveGalleryItem = async (item) => {
    const updated = await api.saveGalleryItem(item, token);
    setGallery(updated);
    setEditingItem(null);
    showSaveSuccess('Photo saved!');
  };

  const handleDeleteGallery = async (id) => {
    if (window.confirm('Delete this photo from the Polaroid Wall?')) {
      const updated = await api.deleteGalleryItem(id, token);
      setGallery(updated);
      showSaveSuccess('Photo removed!');
    }
  };

  // Letter Handlers
  const handleSaveLetter = async (letter) => {
    const updated = await api.updateLetter(letter, token);
    setLetters(updated);
    setEditingItem(null);
    showSaveSuccess('Digital letter updated!');
  };

  // Star Handlers
  const handleSaveStar = async (star) => {
    const updated = await api.updateStar(star, token);
    setStars(updated);
    setEditingItem(null);
    showSaveSuccess('Star whisper updated!');
  };

  // If Not Authenticated, show Login Form
  if (!token) {
    return (
      <div className="min-h-screen bg-[#FFFAF8] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-[#F6D9E4]">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#F6D9E4] text-[#C7839D] flex items-center justify-center mx-auto mb-3 shadow-xs">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="font-serif text-2xl font-semibold text-[#49364E]">
              Admin Portal
            </h1>
            <p className="text-xs text-[#49364E]/70 mt-1">
              Dear Deepuuu Website Control Center
            </p>
          </div>

          {loginError && (
            <div className="p-3 mb-4 rounded-xl bg-red-50 text-red-600 text-xs border border-red-200">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#49364E]/80 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#F6D9E4] focus:outline-none focus:ring-2 focus:ring-[#C7839D] text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#49364E]/80 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-2.5 rounded-xl border border-[#F6D9E4] focus:outline-none focus:ring-2 focus:ring-[#C7839D] text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C7839D] to-[#EBC6B5] text-white font-medium text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-[#C7839D] hover:underline">
              ← Return to Dear Deepuuu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFAF8] text-[#49364E]">
      {/* Top Admin Navbar */}
      <header className="bg-white border-b border-[#F6D9E4] sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="font-serif text-xl font-bold text-[#49364E] hover:text-[#C7839D] flex items-center gap-1.5"
          >
            <span>Dear Deepuuu</span>
            <span className="text-[#C7839D]">♡</span>
            <span className="text-xs font-sans font-normal px-2 py-0.5 rounded-full bg-[#F6D9E4] text-[#C7839D] ml-2">
              Admin
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {saveStatus && (
            <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full animate-fadeIn">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{saveStatus}</span>
            </div>
          )}

          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF5E9] text-xs font-medium text-[#49364E] hover:bg-[#EBC6B5]/30 border border-[#EBC6B5]"
          >
            <Eye className="w-3.5 h-3.5 text-[#C7839D]" />
            <span>Preview Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-500 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Dashboard Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-[#F6D9E4] pb-4">
          {[
            { id: 'settings', label: 'Site & Dedication', icon: Settings },
            { id: 'memories', label: `Memories (${memories.length})`, icon: Calendar },
            { id: 'gallery', label: `Polaroid Wall (${gallery.length})`, icon: ImageIcon },
            { id: 'letters', label: `Open When (${letters.length})`, icon: Mail },
            { id: 'stars', label: `Constellation Stars (${stars.length})`, icon: Star },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#C7839D] text-white shadow-xs'
                    : 'bg-white border border-[#F6D9E4] text-[#49364E] hover:bg-[#F6D9E4]/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: SETTINGS & FINAL LETTER */}
        {activeTab === 'settings' && settings && (
          <form onSubmit={handleSaveSettings} className="space-y-6 max-w-4xl">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F6D9E4] shadow-sm space-y-5">
              <h3 className="font-serif text-xl font-medium text-[#49364E] pb-3 border-b border-[#F6D9E4]">
                Hero & Dedication Settings
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#49364E]/80 mb-1">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    value={settings.recipientName || ''}
                    onChange={(e) => setSettings({ ...settings, recipientName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#F6D9E4] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#49364E]/80 mb-1">
                    Hero Eyebrow Text
                  </label>
                  <input
                    type="text"
                    value={settings.heroEyebrow || ''}
                    onChange={(e) => setSettings({ ...settings, heroEyebrow: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#F6D9E4] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#49364E]/80 mb-1">
                  Hero Subtitle
                </label>
                <input
                  type="text"
                  value={settings.heroSubtitle || ''}
                  onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#F6D9E4] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#49364E]/80 mb-1">
                  Hero Description
                </label>
                <input
                  type="text"
                  value={settings.heroDescription || ''}
                  onChange={(e) => setSettings({ ...settings, heroDescription: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#F6D9E4] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#49364E]/80 mb-1">
                  Optional Background Music URL (e.g. mp3 link)
                </label>
                <input
                  type="text"
                  value={settings.musicUrl || ''}
                  placeholder="Leave empty for pleasant procedural garden chimes"
                  onChange={(e) => setSettings({ ...settings, musicUrl: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#F6D9E4] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#49364E]/80 mb-1">
                  Final Climax Dedication Letter (Caveat font in the gift box)
                </label>
                <textarea
                  rows={9}
                  value={settings.finalLetter || ''}
                  onChange={(e) => setSettings({ ...settings, finalLetter: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#F6D9E4] text-sm font-handwriting text-2xl leading-relaxed"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C7839D] text-white font-medium text-sm shadow-md hover:bg-[#b06f88] cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Settings</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB 2: MEMORIES */}
        {activeTab === 'memories' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-medium">Memory Lane Milestones</h3>
              <button
                onClick={() => {
                  setEditingItem({
                    title: 'New Memory',
                    date: 'Special Day',
                    description: '',
                    imageUrl: '',
                    category: 'Milestone',
                    icon: 'Sparkles',
                    order: memories.length + 1
                  });
                  setEditType('memory');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C7839D] text-white text-xs font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Add Milestone</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {memories.map((m) => (
                <div
                  key={m.id || m._id}
                  className="bg-white p-5 rounded-2xl border border-[#F6D9E4] shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#C7839D] mb-1 font-semibold">
                      <span>{m.date}</span>
                      <span className="bg-[#E9DDF5] text-[#49364E] px-2 py-0.5 rounded-full">
                        {m.category}
                      </span>
                    </div>
                    <h4 className="font-serif text-lg font-medium text-[#49364E]">{m.title}</h4>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-3">{m.description}</p>
                    {m.imageUrl && (
                      <img
                        src={m.imageUrl}
                        alt={m.title}
                        className="mt-3 w-full h-32 object-cover rounded-xl"
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-4 mt-3 border-t border-[#F6D9E4]">
                    <button
                      onClick={() => {
                        setEditingItem({ ...m });
                        setEditType('memory');
                      }}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-blue-600 text-xs flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteMemory(m.id || m._id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-medium">Polaroid Gallery Photos</h3>
              <button
                onClick={() => {
                  setEditingItem({
                    caption: 'New Photo Caption ✨',
                    imageUrl: '',
                    thumbnailUrl: '',
                    category: 'Golden Moments',
                    rotation: 1,
                    order: gallery.length + 1
                  });
                  setEditType('gallery');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C7839D] text-white text-xs font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Add Polaroid</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((g) => (
                <div
                  key={g.id || g._id}
                  className="bg-white p-3 rounded-2xl border border-[#F6D9E4] shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={g.thumbnailUrl || g.imageUrl}
                      alt={g.caption}
                      className="w-full aspect-square object-cover rounded-xl bg-gray-50"
                    />
                    <p className="font-handwriting text-base text-[#49364E] mt-2 line-clamp-2">
                      {g.caption}
                    </p>
                    <span className="text-[10px] text-[#C7839D] uppercase tracking-wider font-semibold">
                      {g.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#F6D9E4]">
                    <button
                      onClick={() => {
                        setEditingItem({ ...g });
                        setEditType('gallery');
                      }}
                      className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteGallery(g.id || g._id)}
                      className="text-xs text-red-600 hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: LETTERS */}
        {activeTab === 'letters' && (
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-medium">Digital "Open When..." Letters</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {letters.map((l) => (
                <div
                  key={l.id || l._id}
                  className="bg-white p-5 rounded-2xl border border-[#F6D9E4] shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl">{l.emoji || '🌸'}</span>
                      <span className="text-xs font-semibold text-[#C7839D]">{l.trigger}</span>
                    </div>
                    <h4 className="font-serif text-lg font-medium text-[#49364E]">{l.title}</h4>
                    <p className="text-xs text-gray-600 mt-2 line-clamp-4 font-handwriting text-lg leading-relaxed">
                      {l.message}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#F6D9E4] flex justify-end">
                    <button
                      onClick={() => {
                        setEditingItem({ ...l });
                        setEditType('letter');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#FFF5E9] hover:bg-[#EBC6B5]/30 text-xs font-medium text-[#C7839D] flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Letter Text</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: STARS */}
        {activeTab === 'stars' && (
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-medium">Constellation Star Whispers</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stars.map((s) => (
                <div
                  key={s.id || s._id}
                  className="bg-white p-5 rounded-2xl border border-[#F6D9E4] shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1 text-xs text-[#C7839D] font-semibold">
                      <span>{s.type}</span>
                      <span className="text-gray-400">Position: ({s.x}%, {s.y}%)</span>
                    </div>
                    <h4 className="font-serif text-lg font-medium text-[#49364E]">{s.name}</h4>
                    <p className="font-handwriting text-xl text-[#49364E] mt-2">
                      "{s.message}"
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#F6D9E4] flex justify-end">
                    <button
                      onClick={() => {
                        setEditingItem({ ...s });
                        setEditType('star');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#FFF5E9] hover:bg-[#EBC6B5]/30 text-xs font-medium text-[#C7839D] flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Star Whisper</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* EDIT MODAL DIALOG */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#F6D9E4] max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-2xl font-medium text-[#49364E] mb-4">
              Edit {editType}
            </h3>

            {/* Form for Memory */}
            {editType === 'memory' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Title</label>
                  <input
                    type="text"
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Date / Milestone</label>
                  <input
                    type="text"
                    value={editingItem.date || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Image URL</label>
                  <input
                    type="text"
                    value={editingItem.imageUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Description</label>
                  <textarea
                    rows={4}
                    value={editingItem.description || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-sm"
                  />
                </div>
              </div>
            )}

            {/* Form for Gallery */}
            {editType === 'gallery' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Caption</label>
                  <input
                    type="text"
                    value={editingItem.caption || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Image URL</label>
                  <input
                    type="text"
                    value={editingItem.imageUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    value={editingItem.category || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-sm"
                  />
                </div>
              </div>
            )}

            {/* Form for Letter */}
            {editType === 'letter' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Trigger (When to open)</label>
                  <input
                    type="text"
                    value={editingItem.trigger || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, trigger: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Letter Heading</label>
                  <input
                    type="text"
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Letter Message Body</label>
                  <textarea
                    rows={8}
                    value={editingItem.message || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-base font-handwriting leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* Form for Star */}
            {editType === 'star' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Star Title</label>
                  <input
                    type="text"
                    value={editingItem.name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Type (Compliment / Inside Joke / Wish)</label>
                  <input
                    type="text"
                    value={editingItem.type || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Whisper Message</label>
                  <textarea
                    rows={4}
                    value={editingItem.message || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border text-base font-handwriting leading-relaxed"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-full border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (editType === 'memory') handleSaveMemory(editingItem);
                  if (editType === 'gallery') handleSaveGalleryItem(editingItem);
                  if (editType === 'letter') handleSaveLetter(editingItem);
                  if (editType === 'star') handleSaveStar(editingItem);
                }}
                className="px-5 py-2 rounded-full bg-[#C7839D] text-white text-xs font-medium shadow-xs hover:bg-[#b06f88]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
