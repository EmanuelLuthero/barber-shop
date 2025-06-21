import { useState, useEffect, useCallback } from 'react';
import { saveSession, getSession, removeSession } from '../session';

export function useSession() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    setLoading(true);
    const t = await getSession();
    setToken(t);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const login = useCallback(async (newToken: string) => {
    await saveSession(newToken);
    setToken(newToken);
  }, []);

  const logout = useCallback(async () => {
    await removeSession();
    setToken(null);
  }, []);

  return {
    token,
    loading,
    login,
    logout,
    refreshSession,
  };
}
