import { useState, useEffect } from 'react';
import { User, Session, AuthChangeEvent, Provider } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

interface AuthError {
  message: string;
  isInfo?: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const getUser = async () => {
    try {
      // 先尝试从本地存储获取会话信息
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      }
    } catch (error) {
      console.error('Error getting user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 立即从localStorage检查会话状态
    const localSession = localStorage.getItem('supabase.auth.token');
    if (localSession) {
      try {
        const parsedSession = JSON.parse(localSession);
        if (parsedSession?.currentSession?.user) {
          setUser(parsedSession.currentSession.user);
        }
      } catch (e) {
        console.error('Error parsing local session:', e);
      }
    }

    // 然后再获取最新的用户信息
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (event === 'SIGNED_IN') {
          if (session?.user) {
            setUser(session.user);
          } else {
            await getUser();
          }
          router.refresh();
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          router.refresh();
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth, router]);

  const getSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    } catch (error: any) {
      console.error('Error getting session:', error);
      setError({ message: error.message || '获取会话信息失败' });
      return null;
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.refresh();
      return true;
    } catch (error: any) {
      setError({ message: error.message || '登录过程中出现错误' });
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const redirectUrl = `${window.location.origin}/auth/callback`;
      console.log('Signup redirect URL:', redirectUrl);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });
      
      if (error) throw error;
      setError({ message: '请检查您的邮箱以验证账户', isInfo: true });
      return true;
    } catch (error: any) {
      setError({ message: error.message || '注册过程中出现错误' });
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signInWithProvider = async (provider: Provider) => {
    try {
      const redirectUrl = `${window.location.origin}/auth/callback`;
      console.log('OAuth redirect URL:', redirectUrl);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectUrl
        }
      });
      if (error) throw error;
      return true;
    } catch (error: any) {
      setError({ message: error.message || '社交登录过程中出现错误' });
      console.error(error);
      return false;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.refresh();
      return true;
    } catch (error: any) {
      setError({ message: error.message || '退出登录过程中出现错误' });
      console.error(error);
      return false;
    }
  };

  const clearError = () => setError(null);

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    signInWithProvider,
    clearError,
    getSession,
    supabase,
  };
}
