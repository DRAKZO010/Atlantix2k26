import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { getTeamByCode, joinTeamByCode } from '../services/team';
import { updateUserProfile } from '../services/userProfile';
import { Loader2, Search, Users, ArrowLeft } from 'lucide-react';

interface JoinTeamFormProps {
  user: User;
  onTeamJoined: () => void;
  onBack?: () => void;
}

export const JoinTeamForm: React.FC<JoinTeamFormProps> = ({ user, onTeamJoined, onBack }) => {
  const [teamCode, setTeamCode] = useState('');
  const [lookingUp, setLookingUp] = useState(false);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState('');
  const [teamPreview, setTeamPreview] = useState<any>(null);

  const formatCode = (val: string) => {
    const clean = val.toUpperCase().replace(/[^A-Z0-9-]/g, '');
    if (clean.length <= 2) return clean;
    if (clean.includes('-')) return clean;
    return clean.slice(0, 2) + '-' + clean.slice(2, 6);
  };

  const handleLookup = async () => {
    const code = teamCode.trim().toUpperCase();
    if (code.length < 3) { setError('Enter a valid team code (e.g. RX-7K2M)'); return; }
    setLookingUp(true);
    setError('');
    setTeamPreview(null);
    try {
      const team = await getTeamByCode(code);
      if (!team) { setError('No team found with this code. Check and try again.'); setLookingUp(false); return; }
      if (team.status !== 'forming') { setError('This team is no longer accepting members.'); setLookingUp(false); return; }
      if (team.members.length >= team.maxMembers) { setError('This team is full (4/4 members).'); setLookingUp(false); return; }
      if (team.members.some(m => m.uid === user.uid)) { setError('You are already on this team.'); setLookingUp(false); return; }
      setTeamPreview(team);
    } catch (err: any) {
      setError(err.message || 'Lookup failed');
    }
    setLookingUp(false);
  };

  const handleJoin = async () => {
    if (!teamPreview) return;
    setJoining(true);
    setError('');
    try {
      await joinTeamByCode(
        teamPreview.teamCode,
        user.uid,
        user.displayName || user.email?.split('@')[0] || 'Member',
        user.email || '',
        '',
        '',
        ''
      );
      await updateUserProfile(user.uid, {});
      onTeamJoined();
    } catch (err: any) {
      setError(err.message || 'Failed to join team');
    }
    setJoining(false);
  };

  return (
    <div className="bg-white p-6 sm:p-8 comic-border-ultra shadow-comic-lg max-w-lg mx-auto space-y-6">
      <div className="border-b-4 border-[#1a1a1a] pb-3">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="p-1 hover:bg-zinc-100 comic-border-thick cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <h3 className="font-anton text-2xl text-[#1a1a1a]">JOIN A TEAM</h3>
        </div>
        <p className="font-bricolage text-sm text-zinc-500 mt-1">Enter the team code shared by your team leader</p>
      </div>

      <div className="space-y-4 font-bricolage">
        <div className="space-y-1.5">
          <label className="block font-anton text-sm text-[#1a1a1a] uppercase">TEAM CODE</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={teamCode}
              onChange={(e) => { setTeamCode(formatCode(e.target.value)); setError(''); setTeamPreview(null); }}
              placeholder="RX-7K2M"
              maxLength={7}
              className="flex-1 px-4 py-3 bg-[#f4ead5] comic-border-thick font-anton text-xl text-center tracking-[0.2em] uppercase focus:outline-none focus:ring-2 focus:ring-[#bb0013]"
            />
            <button onClick={handleLookup} disabled={lookingUp || teamCode.length < 3}
              className="bg-[#1a1a1a] hover:bg-[#333] text-white font-anton text-sm px-5 py-3 comic-border-thick cursor-pointer disabled:opacity-50 transition-colors flex items-center gap-2">
              {lookingUp ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              LOOKUP
            </button>
          </div>
        </div>

        {error && (
          <p className="text-[#bb0013] font-bricolage text-sm font-semibold bg-red-50 p-2 comic-border-thick">{error}</p>
        )}

        {teamPreview && (
          <div className="bg-[#f4ead5] p-5 comic-border-thick space-y-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#bb0013]" />
              <span className="font-anton text-lg text-[#1a1a1a]">TEAM FOUND!</span>
            </div>
            <div className="space-y-1 font-bricolage text-sm">
              <p><span className="font-bold text-zinc-500">Team Name:</span> {teamPreview.teamName}</p>
              <p><span className="font-bold text-zinc-500">Leader:</span> {teamPreview.leader.displayName}</p>
              <p><span className="font-bold text-zinc-500">Members:</span> {teamPreview.members.length}/{teamPreview.maxMembers}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {teamPreview.members.map((m: any) => (
                <span key={m.uid} className="bg-white px-2 py-0.5 comic-border-thick font-bricolage text-xs font-bold">
                  {m.displayName} {m.role === 'leader' ? '(Leader)' : ''}
                </span>
              ))}
            </div>
            <button onClick={handleJoin} disabled={joining}
              className="w-full bg-[#00c853] hover:bg-[#00b248] text-white font-anton text-lg py-3 comic-border-thick shadow-comic uppercase cursor-pointer disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
              {joining ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              {joining ? 'JOINING...' : 'JOIN THIS TEAM'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
