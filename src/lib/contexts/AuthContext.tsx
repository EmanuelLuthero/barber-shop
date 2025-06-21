import { createContext, useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import { AppState } from 'react-native';
import { getTokenExpiration } from '@infra/jwt';
import { navigate } from '@navigations/NavigationRoot';
import { getSession, removeSession, saveSession } from '@lib/session';

interface AuthContextData {
  token: string | null;
  login: (newToken: string) => Promise<void>;
  logout: () => Promise<void>;
  checkingAuth: boolean;
}

export const AuthContext = createContext<AuthContextData>({
  token: null,
  login: async () => {},
  logout: async () => {},
  checkingAuth: true,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const logoutTimer = useRef<NodeJS.Timeout | null>(null);

  // Inicia sessão: guarda estado, agenda logout e redireciona
  const startSession = useCallback((newToken: string) => {
    setToken(newToken);
    setCheckingAuth(false);

    const expiresAt = getTokenExpiration(newToken);
    const msUntilExpiry = expiresAt - Date.now();

    if (msUntilExpiry <= 0) {
      logout();
    } else {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
      logoutTimer.current = setTimeout(logout, msUntilExpiry);
      navigate('home'); // ajuste para o nome da sua rota principal
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const stored = await getSession();
        if (stored) {
          startSession(stored);
        } else {
          setCheckingAuth(false);
          navigate('introduction');
        }
      } catch (e) {
        console.error('Erro ao ler token:', e);
        setCheckingAuth(false);
        navigate('introduction');
      }
    })();

    return () => {
      if (logoutTimer.current) {
        clearTimeout(logoutTimer.current);
      }
    };
  }, [startSession]);

  // Valida ao voltar do background
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active' && token) {
        const tokenExpiration = getTokenExpiration(token);
        if (Date.now() >= tokenExpiration) {
          logout();
        }
      }
    });
    return () => sub.remove();
  }, [token]);

  const login = async (newToken: string) => {
    await saveSession(newToken);
    startSession(newToken);
  };

  const logout = async () => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }

    setToken(null);
    await removeSession();

    navigate('introduction');
  };

  if (checkingAuth) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, checkingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
