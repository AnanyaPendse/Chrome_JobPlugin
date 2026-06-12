import type { Profile } from './types';

type Props = {
  profile: Profile;
  onChange: (profile: Profile) => void;
};

const fieldClass = 'block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500';

export function ProfileForm({ profile, onChange }: Props) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Personal Information</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2 text-sm text-slate-700">
            <span>First Name</span>
            <input
              className={fieldClass}
              value={profile.firstName}
              onChange={(event) => onChange({ ...profile, firstName: event.target.value })}
            />
          </label>
          <label className="block space-y-2 text-sm text-slate-700">
            <span>Last Name</span>
            <input
              className={fieldClass}
              value={profile.lastName}
              onChange={(event) => onChange({ ...profile, lastName: event.target.value })}
            />
          </label>
          <label className="block space-y-2 text-sm text-slate-700 sm:col-span-2">
            <span>Full Name</span>
            <input
              className={fieldClass}
              value={profile.fullName}
              onChange={(event) => onChange({ ...profile, fullName: event.target.value })}
            />
          </label>
          <label className="block space-y-2 text-sm text-slate-700">
            <span>Email</span>
            <input
              type="email"
              className={fieldClass}
              value={profile.email}
              onChange={(event) => onChange({ ...profile, email: event.target.value })}
            />
          </label>
          <label className="block space-y-2 text-sm text-slate-700">
            <span>Phone Number</span>
            <input
              className={fieldClass}
              value={profile.phoneNumber}
              onChange={(event) => onChange({ ...profile, phoneNumber: event.target.value })}
            />
          </label>
          <label className="block space-y-2 text-sm text-slate-700 sm:col-span-2">
            <span>Location</span>
            <input
              className={fieldClass}
              value={profile.location}
              onChange={(event) => onChange({ ...profile, location: event.target.value })}
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Education</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2 text-sm text-slate-700 sm:col-span-2">
            <span>University Name</span>
            <input
              className={fieldClass}
              value={profile.universityName}
              onChange={(event) => onChange({ ...profile, universityName: event.target.value })}
            />
          </label>
          <label className="block space-y-2 text-sm text-slate-700">
            <span>Degree</span>
            <input
              className={fieldClass}
              value={profile.degree}
              onChange={(event) => onChange({ ...profile, degree: event.target.value })}
            />
          </label>
          <label className="block space-y-2 text-sm text-slate-700">
            <span>Major</span>
            <input
              className={fieldClass}
              value={profile.major}
              onChange={(event) => onChange({ ...profile, major: event.target.value })}
            />
          </label>
          <label className="block space-y-2 text-sm text-slate-700">
            <span>Graduation Year</span>
            <input
              className={fieldClass}
              value={profile.graduationYear}
              onChange={(event) => onChange({ ...profile, graduationYear: event.target.value })}
            />
          </label>
          <label className="block space-y-2 text-sm text-slate-700">
            <span>GPA</span>
            <input
              className={fieldClass}
              value={profile.gpa}
              onChange={(event) => onChange({ ...profile, gpa: event.target.value })}
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Professional</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2 text-sm text-slate-700">
            <span>Current Company</span>
            <input
              className={fieldClass}
              value={profile.currentCompany}
              onChange={(event) => onChange({ ...profile, currentCompany: event.target.value })}
            />
          </label>
          <label className="block space-y-2 text-sm text-slate-700">
            <span>Current Title</span>
            <input
              className={fieldClass}
              value={profile.currentTitle}
              onChange={(event) => onChange({ ...profile, currentTitle: event.target.value })}
            />
          </label>
          <label className="block space-y-2 text-sm text-slate-700 sm:col-span-2">
            <span>Years of Experience</span>
            <input
              className={fieldClass}
              value={profile.yearsOfExperience}
              onChange={(event) => onChange({ ...profile, yearsOfExperience: event.target.value })}
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Links</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2 text-sm text-slate-700">
            <span>LinkedIn</span>
            <input
              className={fieldClass}
              value={profile.linkedIn}
              onChange={(event) => onChange({ ...profile, linkedIn: event.target.value })}
            />
          </label>
          <label className="block space-y-2 text-sm text-slate-700">
            <span>GitHub</span>
            <input
              className={fieldClass}
              value={profile.github}
              onChange={(event) => onChange({ ...profile, github: event.target.value })}
            />
          </label>
          <label className="block space-y-2 text-sm text-slate-700">
            <span>Portfolio</span>
            <input
              className={fieldClass}
              value={profile.portfolio}
              onChange={(event) => onChange({ ...profile, portfolio: event.target.value })}
            />
          </label>
          <label className="block space-y-2 text-sm text-slate-700 sm:col-span-2">
            <span>Resume URL</span>
            <input
              className={fieldClass}
              value={profile.resumeUrl}
              onChange={(event) => onChange({ ...profile, resumeUrl: event.target.value })}
            />
          </label>
        </div>
      </section>
    </div>
  );
}
