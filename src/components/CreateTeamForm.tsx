import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { createTeam } from '../services/team';
import { updateUserProfile } from '../services/userProfile';
import { Loader2, Phone, Building2, GraduationCap } from 'lucide-react';

interface CreateTeamFormProps {
  user: User;
  onTeamCreated: () => void;
}

export const CreateTeamForm: React.FC<CreateTeamFormProps> = ({ user, onTeamCreated }) => {
  const [phone, setPhone] = useState('');
  const [branch, setBranch] = useState('');
  const [college, setCollege] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) { setError('Phone number is required'); return; }
    setLoading(true);
    setError('');
    try {
      await createTeam(
        user.uid,
        user.displayName || user.email?.split('@')[0] || 'Leader',
        user.email || '',
        phone.trim(),
        branch.trim(),
        college.trim()
      );
      await updateUserProfile(user.uid, { phone: phone.trim(), branch: branch.trim(), college: college.trim() });
      onTeamCreated();
    } catch (err: any) {
      setError(err.message || 'Failed to create team');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 sm:p-8 comic-border-ultra shadow-comic-lg max-w-lg mx-auto space-y-6">
      <div className="border-b-4 border-[#1a1a1a] pb-3">
        <h3 className="font-anton text-2xl text-[#1a1a1a]">CREATE YOUR TEAM</h3>
        <p className="font-bricolage text-sm text-zinc-500 mt-1">Fill in your details as team leader</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 font-bricolage">
        <div className="bg-[#f4ead5] p-3 comic-border-thick">
          <p className="text-xs text-zinc-500 font-bold uppercase">TEAM LEADER</p>
          <p className="font-anton text-lg text-[#1a1a1a]">{user.displayName || user.email}</p>
          <p className="text-sm text-zinc-600">{user.email}</p>
        </div>

        <div className="space-y-1.5">
          <label className="block font-anton text-sm text-[#1a1a1a] uppercase">PHONE NUMBER *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 XXXX XXX XXX"
              className="w-full pl-10 pr-4 py-3 bg-[#f4ead5] comic-border-thick font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#bb0013]" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block font-anton text-sm text-[#1a1a1a] uppercase">BRANCH / STANDARD</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)}
              placeholder="B.E. Robotics / B.Tech CSE"
              className="w-full pl-10 pr-4 py-3 bg-[#f4ead5] comic-border-thick font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#bb0013]" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block font-anton text-sm text-[#1a1a1a] uppercase">COLLEGE / SCHOOL</label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input type="text" value={college} onChange={(e) => setCollege(e.target.value)}
              placeholder="Park College of Engineering"
              className="w-full pl-10 pr-4 py-3 bg-[#f4ead5] comic-border-thick font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#bb0013]" />
          </div>
        </div>

        {error && (
          <p className="text-[#bb0013] font-bricolage text-sm font-semibold bg-red-50 p-2 comic-border-thick">{error}</p>
        )}

        <button type="submit" disabled={loading}
          className="w-full bg-[#bb0013] hover:bg-[#d90017] text-white font-anton text-xl py-3 comic-border-thick shadow-comic uppercase cursor-pointer disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
          {loading ? 'CREATING...' : 'CREATE TEAM'}
        </button>
      </form>
    </div>
  );
};
