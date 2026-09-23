import React, { useState } from 'react';
import { AuthMode } from '../types';
import { signUpWithEmail, signInWithEmail, signInWithGoogle } from '../services/auth';
import { Loader2, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

interface AuthViewProps {
  onAuthSuccess?: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setDisplayName('');
    setError('');
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'signup') {
        if (!displayName.trim()) { setError('Name is required'); setLoading(false); return; }
        await signUpWithEmail(email, password, displayName.trim());
      } else {
        await signInWithEmail(email, password);
      }
      onAuthSuccess?.();
    } catch (err: any) {
      const code = err.code || '';
      if (code === 'auth/email-already-in-use') setError('Email already in use. Try logging in.');
      else if (code === 'auth/invalid-email') setError('Invalid email address.');
      else if (code === 'auth/weak-password') setError('Password must be at least 6 characters.');
      else if (code === 'auth/user-not-found') setError('No account found with this email.');
      else if (code === 'auth/wrong-password') setError('Incorrect password.');
      else if (code === 'auth/too-many-requests') setError('Too many attempts. Try again later.');
      else if (code === 'auth/account-exists-with-different-credential') {
        setError('An account exists with this email using a different sign-in method.');
      } else setError(err.message || 'Authentication failed.');
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
      onAuthSuccess?.();
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Google sign-in failed.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 sm:p-10 comic-border-ultra shadow-comic-lg max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="bg-[#1a1a1a] text-white p-4 comic-border-thick font-anton text-2xl tracking-wider">
            {mode === 'signup' ? 'CREATE ACCOUNT' : 'WELCOME BACK'}
          </div>
          <p className="font-bricolage text-sm text-zinc-600">
            {mode === 'signup'
              ? 'Sign up to assemble your team for Robotron 2027'
              : 'Log in to access your team and registration'}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-[#f4ead5] comic-border-thick overflow-hidden">
          <button
            onClick={() => switchMode('login')}
            className={`flex-1 py-2.5 font-anton text-sm uppercase cursor-pointer transition-colors ${
              mode === 'login' ? 'bg-[#bb0013] text-white' : 'text-[#1a1a1a] hover:bg-[#efe1c5]'
            }`}
          >
            LOG IN
          </button>
          <button
            onClick={() => switchMode('signup')}
            className={`flex-1 py-2.5 font-anton text-sm uppercase cursor-pointer transition-colors ${
              mode === 'signup' ? 'bg-[#bb0013] text-white' : 'text-[#1a1a1a] hover:bg-[#efe1c5]'
            }`}
          >
            SIGN UP
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-bricolage">
          {mode === 'signup' && (
            <div className="space-y-1.5">
              <label className="block font-anton text-sm text-[#1a1a1a] uppercase">FULL NAME</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Tony Stark"
                  className="w-full pl-10 pr-4 py-3 bg-[#f4ead5] comic-border-thick font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#bb0013]"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block font-anton text-sm text-[#1a1a1a] uppercase">EMAIL</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 bg-[#f4ead5] comic-border-thick font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#bb0013]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block font-anton text-sm text-[#1a1a1a] uppercase">PASSWORD</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 characters"
                minLength={6}
                className="w-full pl-10 pr-10 py-3 bg-[#f4ead5] comic-border-thick font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#bb0013]"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-[#bb0013] font-bricolage text-sm font-semibold bg-red-50 p-2 comic-border-thick">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading}
            className="w-full bg-[#bb0013] hover:bg-[#d90017] text-white font-anton text-xl py-3 comic-border-thick shadow-comic uppercase cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
            {loading ? 'PLEASE WAIT...' : mode === 'signup' ? 'CREATE ACCOUNT' : 'LOG IN'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-0.5 bg-zinc-300" />
          <span className="font-anton text-xs text-zinc-500 uppercase">OR</span>
          <div className="flex-1 h-0.5 bg-zinc-300" />
        </div>

        {/* Google Sign-In */}
        <button onClick={handleGoogle} disabled={loading}
          className="w-full bg-white hover:bg-zinc-50 text-[#1a1a1a] font-anton text-lg py-3 comic-border-thick shadow-comic-sm uppercase cursor-pointer disabled:opacity-50 transition-colors flex items-center justify-center gap-3">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};
