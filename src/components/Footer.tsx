import React from 'react';
import { NavTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#1a1a1a] text-white border-t-4 border-[#1a1a1a] pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b-2 border-zinc-700">
          
          {/* Brand Logo Box */}
          <div className="text-center md:text-left">
            <div className="inline-block bg-[#f4ead5] text-[#1a1a1a] px-5 py-2 font-anton text-3xl tracking-widest transform -skew-x-6 border-2 border-white shadow-[4px_4px_0px_#bb0013]">
              ROBOTRON <span className="text-[#bb0013]">2027</span>
            </div>
            <p className="mt-3 font-bricolage text-zinc-400 text-xs sm:text-sm tracking-wide">
              ORGANIZED BY PARK COLLEGE OF ENGINEERING AND TECHNOLOGY • COIMBATORE, INDIA
            </p>
          </div>

          {/* Nav Footer Links */}
          <div className="flex flex-wrap justify-center gap-6 font-bricolage text-xs sm:text-sm font-bold tracking-wider uppercase">
            <button 
              onClick={() => setActiveTab('about')} 
              className="text-zinc-300 hover:text-[#fddc00] underline underline-offset-4 decoration-2 decoration-[#bb0013]"
            >
              PRIVACY POLICY
            </button>
            <button 
              onClick={() => setActiveTab('about')} 
              className="text-zinc-300 hover:text-[#fddc00] underline underline-offset-4 decoration-2 decoration-[#bb0013]"
            >
              CODE OF CONDUCT
            </button>
            <button 
              onClick={() => setActiveTab('register')} 
              className="text-zinc-300 hover:text-[#fddc00] underline underline-offset-4 decoration-2 decoration-[#bb0013]"
            >
              SPONSOR US
            </button>
            <button 
              onClick={() => setActiveTab('schedule')} 
              className="text-zinc-300 hover:text-[#fddc00] underline underline-offset-4 decoration-2 decoration-[#bb0013]"
            >
              CONTACT
            </button>
          </div>

        </div>

        {/* Bottom Tagline */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-bricolage text-zinc-400">
          <p>© 2027 ROBOTRON HACKATHON. ASSEMBLE YOUR TEAM.</p>
          <p className="text-zinc-500">24 HOURS. INFINITE POSSIBILITIES.</p>
        </div>
      </div>
    </footer>
  );
};
