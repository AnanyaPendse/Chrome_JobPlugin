export type Profile = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  universityName: string;
  degree: string;
  major: string;
  graduationYear: string;
  gpa: string;
  currentCompany: string;
  currentTitle: string;
  yearsOfExperience: string;
  linkedIn: string;
  github: string;
  portfolio: string;
  resumeUrl: string;
};

export type FieldDescriptor = {
  elementType: string;
  name: string;
  id: string;
  placeholder: string;
  ariaLabel: string;
  labelText: string;
  nearbyText: string;
  inputType: string;
};

export type FieldMatch = {
  descriptor: FieldDescriptor;
  profileKey: keyof Profile | null;
  displayLabel: string;
  confidence: number;
  value: string;
};
