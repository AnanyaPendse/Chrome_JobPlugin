import type { FieldDescriptor, FieldMatch, Profile } from './types';

const ruleMap: Record<string, keyof Profile> = {
  college: 'universityName',
  university: 'universityName',
  school: 'universityName',
  github: 'github',
  linkedin: 'linkedIn',
  phone: 'phoneNumber',
  mobile: 'phoneNumber',
  email: 'email',
  resume: 'resumeUrl',
  cv: 'resumeUrl',
  company: 'currentCompany',
  employer: 'currentCompany',
  manager: 'currentCompany',
  role: 'currentTitle',
  title: 'currentTitle',
  major: 'major',
  degree: 'degree',
  gpa: 'gpa',
  graduation: 'graduationYear',
  year: 'graduationYear',
  location: 'location',
  address: 'location',
  portfolio: 'portfolio',
  website: 'portfolio'
};

const profileLabels: Record<keyof Profile, string> = {
  firstName: 'First Name',
  lastName: 'Last Name',
  fullName: 'Full Name',
  email: 'Email',
  phoneNumber: 'Phone Number',
  location: 'Location',
  universityName: 'University Name',
  degree: 'Degree',
  major: 'Major',
  graduationYear: 'Graduation Year',
  gpa: 'GPA',
  currentCompany: 'Current Company',
  currentTitle: 'Current Title',
  yearsOfExperience: 'Years of Experience',
  linkedIn: 'LinkedIn',
  github: 'GitHub',
  portfolio: 'Portfolio',
  resumeUrl: 'Resume URL'
};

function normalize(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[\s\u00A0]+/g, ' ')
    .replace(/["'“”‘’]/g, '');
}

function getTextCandidates(descriptor: FieldDescriptor): string[] {
  return [
    descriptor.labelText,
    descriptor.placeholder,
    descriptor.name,
    descriptor.id,
    descriptor.ariaLabel,
    descriptor.nearbyText
  ]
    .filter(Boolean)
    .map(normalize);
}

function findProfileKey(descriptor: FieldDescriptor): { key: keyof Profile | null; confidence: number } {
  const candidates = getTextCandidates(descriptor);
  const combined = candidates.join(' ');

  let bestMatch: { key: keyof Profile | null; confidence: number } = {
    key: null,
    confidence: 0
  };

  for (const [keyword, profileKey] of Object.entries(ruleMap)) {
    for (const candidate of candidates) {
      if (candidate.includes(keyword)) {
        const baseConfidence = candidate === keyword ? 92 : 82;
        const bonus = descriptor.labelText.toLowerCase().includes(keyword) ? 8 : 0;
        const confidence = Math.min(100, baseConfidence + bonus);
        if (confidence > bestMatch.confidence) {
          bestMatch = { key: profileKey, confidence };
        }
      }
    }
  }

  if (!bestMatch.key) {
    if (descriptor.inputType === 'email') {
      return { key: 'email', confidence: 78 };
    }
    if (descriptor.inputType === 'tel') {
      return { key: 'phoneNumber', confidence: 78 };
    }
    if (descriptor.inputType === 'url') {
      return { key: 'portfolio', confidence: 70 };
    }
    if (descriptor.elementType === 'select' && combined.includes('year')) {
      return { key: 'graduationYear', confidence: 75 };
    }
  }

  return bestMatch;
}

export function matchField(descriptor: FieldDescriptor, profile: Profile): FieldMatch {
  const { key, confidence } = findProfileKey(descriptor);
  const value = key ? profile[key] : '';

  return {
    descriptor,
    profileKey: key,
    displayLabel: key ? profileLabels[key] : 'Unmapped field',
    confidence,
    value
  };
}
