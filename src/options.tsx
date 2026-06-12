import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { ProfileForm } from './shared/ProfileForm';
import { defaultProfile } from './shared/profileDefaults';
import { getProfile, saveProfile } from './shared/storage';
import type { Profile } from './shared/types';

function App() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [statusMessage, setStatusMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProfile().then((stored) => {
      setProfile(stored);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setStatusMessage('Saving profile...');
    await saveProfile(profile);
    setStatusMessage('Profile saved successfully.');
    setSaving(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">Profile Settings</h1>
          <p className="mt-2 text-sm text-slate-600">Update the profile fields used by the autofill engine.</p>
        </header>

        <ProfileForm profile={profile} onChange={setProfile} />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving…' : 'Save Profile'}
          </button>
          {statusMessage && <p className="text-sm text-slate-600">{statusMessage}</p>}
        </div>
      </div>
    </main>
  );
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<App />);
}
