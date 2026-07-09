import { useCallback, useEffect, useState } from 'react';
import { fetchMe, signInWithGoogle, signOut as apiSignOut } from '../api/auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetchMe()
      .then((u) => !cancelled && setUser(u))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const onCredential = useCallback(async (credential) => {
    setError('');
    try {
      const u = await signInWithGoogle(credential);
      setUser(u);
    } catch (e) {
      setError('Anmeldung fehlgeschlagen — versuch es nochmal.');
    }
  }, []);

  const signOut = useCallback(async () => {
    await apiSignOut();
    setUser(null);
  }, []);

  return { user, loading, error, onCredential, signOut };
}
