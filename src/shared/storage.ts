import type { Profile } from './types';
import { defaultProfile } from './profileDefaults';

const STORAGE_KEY = 'userProfile';

export async function getProfile(): Promise<Profile> {
  return new Promise((resolve) => {
    chrome.storage.local.get({ [STORAGE_KEY]: defaultProfile }, (result) => {
      resolve(result[STORAGE_KEY] as Profile);
    });
  });
}

export async function saveProfile(profile: Profile): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [STORAGE_KEY]: profile }, () => {
      resolve();
    });
  });
}
