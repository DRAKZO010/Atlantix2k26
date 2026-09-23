import React, { useState } from 'react';
import { NavTab } from '../types';
import { Menu, X, Zap } from 'lucide-react';
import { EditableText } from './EditableText';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  editable?: boolean;
  rightContent?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, editable, rightContent }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'schedule', label: 'SCHEDULE' },
    { id: 'events', label: 'EVENTS' },
    { id: 'prizes', label: 'PRIZES' },
  ];

  const handleNavClick = (tab: NavTab) => {
    if (editable) return;
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 transition-colors uppercase ${
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

          {/* Action Button: REGISTER NOW (or admin controls) */}
          <div className="hidden md:flex items-center gap-3">
            {rightContent ? (
              rightContent
            ) : (
              <button
                onClick={() => handleNavClick('register')}
                className={`flex items-center gap-2 bg-[#bb0013] hover:bg-[#d90017] text-white font-anton text-lg tracking-wider px-5 py-2.5 comic-border-thick shadow-comic transition-all active:translate-x-1 active:translate-y-1 active:shadow-none uppercase cursor-pointer ${
                  activeTab === 'register' ? 'ring-4 ring-[#fddc00]' : ''
                }`}
              >
                <Zap className="w-5 h-5 text-[#fddc00] fill-[#fddc00]" />
                REGISTER NOW
              </button>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden flex items-center gap-3">
            {rightContent ? (
              rightContent
            ) : (
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
            )}
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && !editable && (
        <div className="md:hidden bg-[#efe1c5] border-t-4 border-[#1a1a1a] px-4 pt-4 pb-6 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left py-2.5 px-4 font-anton text-xl tracking-wider comic-border-thick uppercase transition-colors ${
                activeTab === item.id 
                  ? 'bg-[#bb0013] text-white shadow-comic-sm' 
                  : 'bg-white text-[#1a1a1a] hover:bg-[#fddc00]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('register')}
            className="block w-full text-center py-3 px-4 font-anton text-xl tracking-wider bg-[#bb0013] text-white comic-border-thick shadow-comic uppercase mt-4"
          >
            ⚡ REGISTER NOW
          </button>
        </div>
      )}
    </header>
  );
};
