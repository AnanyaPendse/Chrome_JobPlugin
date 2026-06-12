import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { defaultProfile } from './shared/profileDefaults';
import type { FieldMatch, Profile } from './shared/types';

type ScanResponse = { matches: FieldMatch[] };

type Status = 'idle' | 'scanning' | 'ready' | 'filling' | 'error';

function sendMessageToActiveTab(message: unknown): Promise<unknown> {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab?.id) {
        reject(new Error('No active tab found.'));
        return;
      }
      chrome.tabs.sendMessage(tab.id, message, (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(response);
        }
      });
    });
  });
}

function App() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('Ready to scan this page.');
  const [matches, setMatches] = useState<FieldMatch[]>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<Set<number>>(new Set());
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    chrome.storage.local.get({ userProfile: defaultProfile }, (result) => {
      setProfileLoaded(true);
    });
  }, []);

  const scanPage = async () => {
    setStatus('scanning');
    setMessage('Scanning fields...');

    try {
      const response = (await sendMessageToActiveTab({ type: 'scanFields' })) as ScanResponse;
      setMatches(response.matches);
      setSelectedIndexes(new Set(response.matches.map((_, index) => index)));
      setStatus('ready');
      setMessage(`${response.matches.length} field(s) detected.`);
    } catch (error) {
      setStatus('error');
      setMessage(`Scan failed: ${(error as Error).message}`);
    }
  };

  const toggleSelection = (index: number) => {
    setSelectedIndexes((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const fillPage = async () => {
    setStatus('filling');
    setMessage('Filling selected fields...');

    const selectedFields = Array.from(selectedIndexes).map((index) => {
      const match = matches[index];
      return {
        descriptor: match.descriptor,
        profileKey: match.profileKey,
        value: match.value
      };
    });

    try {
      const response = (await sendMessageToActiveTab({ type: 'fillFields', selectedFields })) as { results: Array<{ label: string; profileKey: string | null; success: boolean }> };
      const successCount = response.results.filter((result) => result.success).length;
      setStatus('ready');
      setMessage(`Filled ${successCount} of ${response.results.length} selected fields.`);
    } catch (error) {
      setStatus('error');
      setMessage(`Fill failed: ${(error as Error).message}`);
    }
  };

  return (
    <main className="min-w-[320px] max-w-[420px] p-4">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <header className="mb-4">
          <h1 className="text-xl font-semibold text-slate-900">Job Autofill</h1>
          <p className="mt-1 text-sm text-slate-600">Scan the current page for application fields and autofill them using your saved profile.</p>
        </header>

        <div className="space-y-3">
          <button
            className="w-full rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
            type="button"
            onClick={scanPage}
          >
            Scan Page
          </button>
          <button
            className="w-full rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            type="button"
            onClick={() => chrome.runtime.openOptionsPage?.()}
          >
            Open Profile Settings
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
          <div className="mb-2 font-medium text-slate-900">Status</div>
          <div>{message}</div>
        </div>

        {matches.length > 0 && (
          <section className="mt-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Detected Fields</h2>
              <button
                type="button"
                className="text-sm text-sky-600 hover:underline"
                onClick={() => setSelectedIndexes(new Set(matches.map((_, index) => index)))}
              >
                Select All
              </button>
            </div>
            <div className="space-y-3">
              {matches.map((match, index) => (
                <label key={index} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                  <input
                    type="checkbox"
                    checked={selectedIndexes.has(index)}
                    onChange={() => toggleSelection(index)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900">{match.descriptor.labelText || match.descriptor.placeholder || match.descriptor.name || 'Unknown field'}</div>
                    <div className="text-xs text-slate-500">Mapped to {match.displayLabel} ({match.confidence}%)</div>
                  </div>
                </label>
              ))}
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              onClick={fillPage}
            >
              Fill Selected Fields
            </button>
          </section>
        )}

        {!profileLoaded && <p className="mt-4 text-sm text-slate-500">Loading profile data...</p>}
      </div>
    </main>
  );
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<App />);
}
