import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  LayoutDashboard, ImageIcon, Settings, LogOut, UploadCloud, Loader2, Home as HomeIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Session } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';

export function WritersDesk() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState('Upload Quote');
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  const [bio, setBio] = useState('Vasu Neninthe, A FILM aspirant, Script writer, Story narrator, lyricist.');
  const [savingBio, setSavingBio] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setUploadMessage('');

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select at least one image to upload.');
      }

      const files = Array.from(event.target.files);

      const uploadPromises = files.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        // 1. Upload image to 'quotes' bucket
        const { error: uploadError } = await supabase.storage
          .from('quotes')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // 2. Get Public URL
        const { data: publicUrlData } = supabase.storage
          .from('quotes')
          .getPublicUrl(filePath);

        // 3. Save to 'quotes' table
        const { error: dbError } = await supabase
          .from('quotes')
          .insert([
            {
              image_url: publicUrlData.publicUrl,
              user_id: session?.user.id
            }
          ]);

        if (dbError) throw dbError;
      });

      await Promise.all(uploadPromises);

      setUploadMessage(`Successfully uploaded ${files.length} quote(s)!`);
    } catch (error: any) {
      setUploadMessage(error.message || 'Error uploading images');
    } finally {
      setUploading(false);
    }
  };

  const saveBio = async () => {
    setSavingBio(true);
    // Stub for saving bio - requires profile row to exist
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ id: session?.user.id, bio, updated_at: new Date().toISOString() });
      if (error) throw error;
      alert("Bio updated");
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSavingBio(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-ink-900 flex items-center justify-center p-4">
        <div className="aged-paper-card p-12 max-w-md w-full border border-ink-700/50 relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="font-logo text-4xl text-center text-white mb-2">vasu's verse</h1>
            <p className="font-meta text-xs tracking-[0.2em] text-gold-accent text-center mb-8">Writer's Desk</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-ink-900/50 border border-ink-700 p-4 text-white font-body focus:outline-none focus:border-gold-accent transition-colors"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-ink-900/50 border border-ink-700 p-4 text-white font-body focus:outline-none focus:border-gold-accent transition-colors"
                  required
                />
              </div>

              {error && <p className="text-red-400 text-sm text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-ink-800 text-gold-accent border border-gold-accent/50 hover:bg-gold-accent hover:text-ink-900 font-buttons tracking-[0.2em] text-xs transition-all flex justify-center items-center h-14"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Unlock Desk"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const sidebarLinks = [
    { name: 'Upload Quote', icon: UploadCloud },
    { name: 'Profile Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-ink-900 text-ink-light flex selection:bg-gold-accent selection:text-ink-900">

      {/* Sidebar */}
      <aside className="w-64 border-r border-ink-700/50 flex flex-col bg-ink-900/50 backdrop-blur-md">
        <div className="h-24 flex items-center justify-center border-b border-ink-700/50">
          <span className="font-logo text-2xl tracking-tight text-white">
            vasu's verse
          </span>
        </div>

        <div className="px-6 py-8">
          <div className="font-meta text-[10px] tracking-widest text-gold-accent/50 mb-6">
            Writer's Desk
          </div>

          <nav className="flex flex-col gap-2">
            {sidebarLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => setActiveTab(link.name)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-xs font-buttons tracking-wider transition-all text-left",
                  activeTab === link.name
                    ? "bg-gold-accent/10 text-gold-accent border-l-2 border-gold-accent"
                    : "text-ink-light/50 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                )}
              >
                <link.icon size={16} />
                {link.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-ink-700/50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-xs font-buttons tracking-wider text-ink-light/50 hover:text-white transition-colors w-full text-left"
          >
            <LogOut size={16} />
            Lock Desk
          </button>
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 mt-2 text-xs font-buttons tracking-wider text-ink-light/50 hover:text-white transition-colors w-full text-left"
          >
            <HomeIcon size={16} />
            Back to Home
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative paper-texture">
        <header className="h-24 border-b border-ink-700/50 flex items-center px-12 justify-between sticky top-0 z-10 bg-ink-900/80 backdrop-blur-md">
          <h1 className="font-hero text-2xl text-white">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <span className="font-meta text-xs tracking-widest text-white/50">{session.user.email}</span>
            <div className="w-8 h-8 rounded-full bg-gold-accent/20 flex items-center justify-center border border-gold-accent/50">
              <span className="font-logo text-gold-accent text-sm">V</span>
            </div>
          </div>
        </header>

        <div className="p-12 max-w-4xl mx-auto">
          {activeTab === 'Upload Quote' && (
            <div className="space-y-8">
              <div className="aged-paper-card p-12 text-center border border-ink-700/50 relative overflow-hidden group">
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <UploadCloud className="text-gold-accent w-16 h-16 mb-6" />
                  <h2 className="font-hero text-3xl text-white mb-2">Upload a Quote</h2>
                  <p className="font-body text-white/60 mb-8 max-w-md">
                    Upload an image.
                  </p>

                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <button
                      disabled={uploading}
                      className="px-8 py-4 bg-ink-900 text-gold-accent border border-gold-accent/50 hover:bg-gold-accent hover:text-ink-900 font-buttons tracking-widest text-xs transition-colors flex items-center gap-3"
                    >
                      {uploading ? <Loader2 className="animate-spin" size={16} /> : <ImageIcon size={16} />}
                      {uploading ? 'Uploading...' : 'Select Image File'}
                    </button>
                  </div>

                  {uploadMessage && (
                    <p className={cn("mt-6 text-sm font-body", uploadMessage.includes('Error') ? "text-red-400" : "text-green-400")}>
                      {uploadMessage}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Profile Settings' && (
            <div className="aged-paper-card p-12 border border-ink-700/50">
              <h2 className="font-hero text-3xl text-white mb-8">Author Bio</h2>
              <div className="space-y-6">
                <div>
                  <label className="font-buttons tracking-[0.2em] text-xs text-gold-accent mb-4 block">Bio Text</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full h-40 bg-ink-900/50 border border-ink-700 p-6 text-white font-body leading-relaxed focus:outline-none focus:border-gold-accent transition-colors"
                  />
                </div>
                <button
                  onClick={saveBio}
                  disabled={savingBio}
                  className="px-8 py-4 bg-ink-800 text-gold-accent border border-gold-accent/50 hover:bg-gold-accent hover:text-ink-900 font-buttons tracking-widest text-xs transition-colors"
                >
                  {savingBio ? 'Saving...' : 'Update Bio'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
