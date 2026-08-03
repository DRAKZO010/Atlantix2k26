import React from 'react';
import { NavTab } from '../types';
import { useContent } from '../ContentContext';
import { Trophy, Award, Crown, Sparkles, Lightbulb, Users, Palette, CheckCircle2, Zap } from 'lucide-react';

interface PrizesViewProps {
  setActiveTab: (tab: NavTab) => void;
}

export const PrizesView: React.FC<PrizesViewProps> = ({ setActiveTab }) => {
  const { prizes, hero } = useContent();
  return (
    <div className="space-y-16 pb-16">
      
      {/* HEADER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 text-center space-y-4">
        <div className="inline-block bg-[#bb0013] text-white font-anton text-sm sm:text-base px-4 py-1 comic-border-thick transform -rotate-1">
          WIN BIG IN 2027
        </div>

        <h1 className="font-anton text-6xl sm:text-8xl lg:text-9xl text-[#1a1a1a] drop-shadow-[4px_4px_0px_#fddc00]">
          PRIZE POOL <span className="bg-[#fddc00] text-[#1a1a1a] px-4 py-1 inline-block transform -skew-x-3">{prizes?.pool || '₹50,000'}</span>
        </h1>

        <p className="font-bricolage text-lg sm:text-xl font-bold text-[#1a1a1a] max-w-3xl mx-auto">
          Battle across 24 intense hours to claim your share of the ultimate reward. Beyond cash, win mentorship, incubation, and industry recognition.
        </p>
      </section>

      {/* PODIUM PRIZES (3 COLUMNS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-6">
          
          {/* 2nd Place Card (Left) */}
          <div className="bg-white p-6 sm:p-8 comic-border-ultra shadow-comic-lg flex flex-col justify-between space-y-6 relative hover:-translate-y-1 transition-transform">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-[#1a1a1a] text-white font-anton text-lg px-3 py-1 comic-border-thick">
                  🥈 2ND PLACE
                </span>
                <span className="font-anton text-xs text-zinc-600">RUNNER UP</span>
              </div>

              <div className="font-anton text-5xl sm:text-6xl text-[#1a1a1a]">
                {prizes?.second?.amount || '₹15,000'}
              </div>

              <div className="font-anton text-xl text-[#bb0013] border-b-2 border-[#1a1a1a] pb-2">
                {prizes?.second?.title || 'RUNNER UP CHAMPION'}
              </div>

              <ul className="space-y-3 font-bricolage text-sm text-zinc-800 font-semibold">
                {(prizes?.second?.perks || []).map((perk: string, i: number) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#bb0013] shrink-0" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setActiveTab('register')}
              className="w-full bg-[#1a1a1a] hover:bg-[#bb0013] text-white font-anton text-lg py-3 comic-border-thick transition-colors uppercase cursor-pointer"
            >
              AIM FOR SECOND
            </button>
          </div>

          {/* 1st Place Card (CENTER CHAMPION HIGHLIGHT!) */}
          <div className="bg-[#bb0013] text-white p-6 sm:p-8 comic-border-ultra shadow-comic-xl flex flex-col justify-between space-y-6 relative transform lg:-translate-y-4 hover:-translate-y-6 transition-transform">
            
            {/* Winner Corner Sash */}
            <div className="absolute -top-4 -right-4 bg-[#fddc00] text-[#1a1a1a] font-anton text-sm px-4 py-1 comic-border-thick shadow-comic rotate-12">
              👑 WINNER
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-[#fddc00] text-[#1a1a1a] font-anton text-xl px-4 py-1 comic-border-thick">
                  CHAMPION BADGE
                </span>
                <Crown className="w-8 h-8 text-[#fddc00] animate-bounce" />
              </div>

              <div className="font-anton text-6xl sm:text-7xl text-[#fddc00]">
                {prizes?.first?.amount || '₹25,000'}
              </div>

              <div className="font-anton text-2xl text-white border-b-2 border-white pb-2 tracking-wide">
                {prizes?.first?.title || 'ROBOTRON KING'}
              </div>

              <ul className="space-y-3 font-bricolage text-sm sm:text-base font-bold text-white">
                {(prizes?.first?.perks || []).map((perk: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 bg-black/20 p-2.5 comic-border-thick">
                    {perk}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setActiveTab('register')}
              className="w-full bg-[#fddc00] hover:bg-white text-[#1a1a1a] font-anton text-2xl py-4 comic-border-thick shadow-comic-md transition-all uppercase cursor-pointer"
            >
              CLAIM THE THRONE 👑
            </button>
          </div>

          {/* 3rd Place Card (Right) */}
          <div className="bg-white p-6 sm:p-8 comic-border-ultra shadow-comic-lg flex flex-col justify-between space-y-6 relative hover:-translate-y-1 transition-transform">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-[#1a1a1a] text-white font-anton text-lg px-3 py-1 comic-border-thick">
                  🥉 3RD PLACE
                </span>
                <span className="font-anton text-xs text-zinc-600">BRONZE ELITE</span>
              </div>

              <div className="font-anton text-5xl sm:text-6xl text-[#1a1a1a]">
                {prizes?.third?.amount || '₹10,000'}
              </div>

              <div className="font-anton text-xl text-[#bb0013] border-b-2 border-[#1a1a1a] pb-2">
                {prizes?.third?.title || 'BRONZE CHAMPION'}
              </div>

              <ul className="space-y-3 font-bricolage text-sm text-zinc-800 font-semibold">
                {(prizes?.third?.perks || []).map((perk: string, i: number) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#bb0013] shrink-0" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setActiveTab('register')}
              className="w-full bg-[#1a1a1a] hover:bg-[#bb0013] text-white font-anton text-lg py-3 comic-border-thick transition-colors uppercase cursor-pointer"
            >
              SECURE BRONZE
            </button>
          </div>

        </div>
      </section>

      {/* SPECIAL AWARDS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <div className="flex items-center gap-3">
          <div className="bg-[#fddc00] text-[#1a1a1a] font-anton text-2xl sm:text-3xl px-4 py-1.5 comic-border-thick shadow-comic transform -skew-x-6">
            SPECIAL AWARDS
          </div>
          <h2 className="font-anton text-3xl sm:text-5xl text-[#1a1a1a]">BONUS REWARDS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(prizes?.special || []).map((award, idx) => (
            <div
              key={idx}
              className="bg-white p-6 comic-border-thick shadow-comic-md space-y-4 hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center justify-between">
                <div className={`${award.iconBg} p-3 comic-border-thick text-[#1a1a1a]`}>
                  {award.iconName === 'Lightbulb' && <Lightbulb className="w-7 h-7" />}
                  {award.iconName === 'Users' && <Users className="w-7 h-7 text-white" />}
                  {award.iconName === 'Palette' && <Palette className="w-7 h-7 text-white" />}
                </div>
                <span className="font-anton text-xl text-[#bb0013] bg-[#f4ead5] px-3 py-1 comic-border-thick">
                  {award.reward}
                </span>
              </div>

              <h3 className="font-anton text-2xl text-[#1a1a1a]">{award.title}</h3>
              <p className="font-bricolage text-sm text-zinc-700 leading-relaxed">
                {award.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#fddc00] p-8 sm:p-12 comic-border-ultra shadow-comic-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-[#bb0013] text-white font-anton text-xs px-3 py-1 comic-border-thick">
              {hero?.date || 'JANUARY 15-16, 2026'} • COIMBATORE
            </span>
            <h3 className="font-anton text-4xl sm:text-5xl text-[#1a1a1a]">
              READY TO COMPETE?
            </h3>
            <p className="font-bricolage text-sm font-bold text-zinc-800">
              Gather your crew. The {prizes?.pool || '₹50,000'} prize pool awaits your code.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 shrink-0">
            <button
              onClick={() => setActiveTab('register')}
              className="bg-[#bb0013] hover:bg-[#d90017] text-white font-anton text-xl px-8 py-4 comic-border-thick shadow-comic uppercase cursor-pointer"
            >
              REGISTER TEAM
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className="bg-white hover:bg-[#efe1c5] text-[#1a1a1a] font-anton text-xl px-8 py-4 comic-border-thick shadow-comic uppercase cursor-pointer"
            >
              VIEW EVENTS
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
