import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Team, UserProfile } from '../types';
import { subscribeToTeam, getTeamById } from '../services/team';

export function useTeam(user: User | null, userProfile: UserProfile | null) {
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !userProfile?.teamId) {
      setTeam(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToTeam(userProfile.teamId, (teamData) => {
      setTeam(teamData);
      setLoading(false);
    });

    return unsubscribe;
  }, [user, userProfile?.teamId]);

  const refresh = async () => {
    if (userProfile?.teamId) {
      const t = await getTeamById(userProfile.teamId);
      setTeam(t);
    }
  };

  return { team, loading, refresh };
}
