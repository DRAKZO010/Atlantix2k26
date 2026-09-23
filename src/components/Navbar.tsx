import React, { useState } from 'react';
import { NavTab, Team, UserProfile } from '../types';
import { User as FirebaseUser } from 'firebase/auth';
import { Menu, X, Zap, LogOut, User as UserIcon } from 'lucide-react';
import { EditableText } from './EditableText';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  editable?: boolean;
  activeSection?: string;
  onNavClick?: (tab: NavTab) => void;
  rightContent?: React.ReactNode;
  user?: FirebaseUser | null;
  userProfile?: UserProfile | null;
  team?: Team | null;
  onSignOut?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab, setActiveTab, editable, activeSection, onNavClick, rightContent,
  user, userProfile, team, onSignOut
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'schedule', label: 'SCHEDULE' },
    { id: 'events', label: 'EVENTS' },
    { id: 'prizes', label: 'PRIZES' },
  ];

  const handleNavClick = (tab: NavTab) => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onNavClick) {
      onNavClick(tab);
    } else if (!editable) {
      setActiveTab(tab);
    }
  };

  const isSectionActive = (tab: NavTab) => {
    if (activeSection) return activeSection === tab;
    return activeTab === tab;
  };

  const renderDesktopAction = () => {
    if (rightContent) return rightContent;

    if (user) {
      return (
        <div className="flex items-center gap-3">
          {team && (
            <span className="bg-[#fddc00] text-[#1a1a1a] font-anton text-xs px-2.5 py-1 comic-border-thick hidden lg:inline">
              {team.teamCode}
            </span>
          )}
          <div className="flex items-center gap-2 bg-[#f4ead5] px-3 py-1.5 comic-border-thick">
            <div className="w-7 h-7 bg-[#bb0013] text-white font-anton text-xs flex items-center justify-center rounded-full">
              {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
            </div>
            <span className="font-bricolage text-xs font-bold text-[#1a1a1a] hidden sm:inline max-w-[100px] truncate">
              {user.displayName || user.email?.split('@')[0]}
            </span>
          </div>
          <button onClick={onSignOut}
            className="flex items-center gap-1 bg-transparent hover:bg-zinc-800 text-white font-anton text-xs px-3 py-1.5 border border-zinc-600 uppercase cursor-pointer transition-colors"
            title="Sign out">
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={() => handleNavClick('register')}
        className={`flex items-center gap-2 bg-[#bb0013] hover:bg-[#d90017] text-white font-anton text-lg tracking-wider px-5 py-2.5 comic-border-thick shadow-comic transition-all active:translate-x-1 active:translate-y-1 active:shadow-none uppercase cursor-pointer ${
          activeTab === 'register' ? 'ring-4 ring-[#fddc00]' : ''
        }`}
      >
        <Zap className="w-5 h-5 text-[#fddc00] fill-[#fddc00]" />
        REGISTER NOW
      </button>
    );
  };

  const renderMobileAction = () => {
    if (rightContent) return rightContent;

    if (user) {
      return (
        <div className="flex items-center gap-2">
          {team && (
            <span className="bg-[#fddc00] text-[#1a1a1a] font-anton text-[10px] px-2 py-0.5 comic-border-thick">
              {team.teamCode}
            </span>
          )}
          <button onClick={onSignOut}
            className="p-2 bg-white comic-border-thick shadow-comic-sm text-[#1a1a1a] cursor-pointer"
            title="Sign out">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      );
    }

    return (
      <>
        <button
          onClick={() => handleNavClick('register')}
          className="bg-[#bb0013] text-white font-anton text-xs px-3 py-2 comic-border-thick shadow-comic-sm active:translate-x-0.5 active:translate-y-0.5 uppercase"
        >
          REGISTER
        </button>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-white comic-border-thick shadow-comic-sm text-[#1a1a1a]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-[#f4ead5] border-b-4 border-[#1a1a1a] shadow-comic-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left group focus:outline-none"
          >
            <div className="bg-[#bb0013] text-white px-3 py-1 font-anton text-2xl tracking-wider transform -skew-x-6 border-2 border-[#1a1a1a] shadow-comic-sm group-hover:scale-105 transition-transform">
              {editable ? <EditableText value="ROBOTRON" path="footer.brand" as="span" className="inline" /> : 'ROBOTRON'}{' '}
              <span className="text-[#fddc00]">2027</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-bricolage font-bold text-sm tracking-wider">
            {navItems.map((item) => {
              const isActive = isSectionActive(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 transition-colors uppercase cursor-pointer ${
                    isActive 
                      ? 'text-[#bb0013] font-extrabold' 
                      : 'text-[#1a1a1a] hover:text-[#bb0013]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#bb0013]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-3">
            {renderDesktopAction()}
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            {mobileMenuOpen ? (
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 bg-white comic-border-thick shadow-comic-sm text-[#1a1a1a]"
              >
                <X className="w-6 h-6" />
              </button>
            ) : renderMobileAction()}
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#efe1c5] border-t-4 border-[#1a1a1a] px-4 pt-4 pb-6 space-y-3">
          {user && (
            <div className="bg-white p-3 comic-border-thick flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-[#bb0013] text-white font-anton text-sm flex items-center justify-center rounded-full">
                {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-anton text-sm text-[#1a1a1a] truncate">{user.displayName || 'User'}</p>
                <p className="font-bricolage text-xs text-zinc-500 truncate">{user.email}</p>
              </div>
              {team && (
                <span className="bg-[#fddc00] text-[#1a1a1a] font-anton text-[10px] px-2 py-0.5 comic-border-thick shrink-0">
                  {team.teamCode}
                </span>
              )}
            </div>
          )}
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left py-2.5 px-4 font-anton text-xl tracking-wider comic-border-thick uppercase transition-colors cursor-pointer ${
                isSectionActive(item.id)
                  ? 'bg-[#bb0013] text-white shadow-comic-sm' 
                  : 'bg-white text-[#1a1a1a] hover:bg-[#fddc00]'
              }`}
            >
              {item.label}
            </button>
          ))}
          {!editable && (
            <button
              onClick={() => handleNavClick('register')}
              className="block w-full text-center py-3 px-4 font-anton text-xl tracking-wider bg-[#bb0013] text-white comic-border-thick shadow-comic uppercase mt-4"
            >
              {user ? 'MY TEAM' : 'REGISTER NOW'}
            </button>
          )}
          {user && (
            <button onClick={onSignOut}
              className="block w-full text-center py-2.5 px-4 font-anton text-sm tracking-wider bg-white text-[#bb0013] comic-border-thick uppercase">
              SIGN OUT
            </button>
          )}
        </div>
      )}
    </header>
  );
};
