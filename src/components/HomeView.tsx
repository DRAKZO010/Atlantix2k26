import React from 'react';
import { NavTab } from '../types';
import { TECHNICAL_EVENTS } from '../data/events';
import { Zap, Trophy, Flame, Users, Lightbulb, Clock, Calendar, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

interface HomeViewProps {
  setActiveTab: (tab: NavTab) => void;
  onSelectEvent: (eventId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab, onSelectEvent }) => {
  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-12 bg-comic-paper overflow-hidden border-b-4 border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Flash Badge */}
            <div className="inline-block bg-[#fddc00] text-[#1a1a1a] font-anton text-lg sm:text-xl px-5 py-1.5 comic-border-thick shadow-comic -rotate-1">
              ⚡ MISSION CRITICAL: JANUARY 15-16, 2026 • COIMBATORE
            </div>

            {/* Giant Title */}
            <div className="relative">
              <h1 className="font-anton text-6xl sm:text-8xl lg:text-9xl tracking-tight text-[#1a1a1a] drop-shadow-[4px_4px_0px_#bb0013]">
                ROBOTRON <span className="text-[#bb0013]">2027</span>
              </h1>
            </div>

            <p className="font-bricolage text-xl sm:text-2xl font-bold text-[#1a1a1a] max-w-2xl mx-auto leading-snug">
              24 HOURS. INFINITE POSSIBILITIES. ASSEMBLE YOUR SQUAD AND EXECUTE THE PLAN.
            </p>

            {/* Event Info Strip */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-bold pt-2">
              <div className="flex items-center gap-2 bg-white px-4 py-2 comic-border-thick shadow-comic-sm">
                <Calendar className="w-5 h-5 text-[#bb0013]" />
                JANUARY 15-16, 2026
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 comic-border-thick shadow-comic-sm">
                <MapPin className="w-5 h-5 text-[#bb0013]" />
                PARK COLLEGE OF ENGINEERING, COIMBATORE
              </div>
            </div>

            {/* Hero CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setActiveTab('register')}
                className="bg-[#bb0013] hover:bg-[#d90017] text-white font-anton text-2xl tracking-wider px-8 py-4 comic-border-thick shadow-comic-lg hover:scale-105 active:scale-100 transition-all cursor-pointer uppercase flex items-center gap-3"
              >
                <Zap className="w-7 h-7 text-[#fddc00] fill-[#fddc00]" />
                REGISTER TEAM
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className="bg-white hover:bg-[#efe1c5] text-[#1a1a1a] font-anton text-2xl tracking-wider px-8 py-4 comic-border-thick shadow-comic-lg hover:scale-105 active:scale-100 transition-all cursor-pointer uppercase"
              >
                VIEW EVENTS
              </button>
            </div>

          </div>

          {/* Key Stats Bar */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            <div className="bg-[#bb0013] text-white p-6 comic-border-thick shadow-comic-md transform -rotate-1 text-center">
              <div className="font-anton text-5xl sm:text-6xl text-[#fddc00]">24</div>
              <div className="font-anton text-xl tracking-wider mt-1">HOURS OF CODING</div>
              <p className="font-bricolage text-xs opacity-90 mt-1">Non-stop building & battle</p>
            </div>

            <div className="bg-[#fddc00] text-[#1a1a1a] p-6 comic-border-thick shadow-comic-md transform rotate-1 text-center">
              <div className="font-anton text-5xl sm:text-6xl text-[#bb0013]">₹50K</div>
              <div className="font-anton text-xl tracking-wider mt-1">PRIZE POOL</div>
              <p className="font-bricolage text-xs font-semibold mt-1">Cash, Mentorship & Incubation</p>
            </div>

            <div className="bg-white text-[#1a1a1a] p-6 comic-border-thick shadow-comic-md transform -rotate-1 text-center">
              <div className="font-anton text-5xl sm:text-6xl text-[#bb0013]">15+</div>
              <div className="font-anton text-xl tracking-wider mt-1">EVENTS</div>
              <p className="font-bricolage text-xs text-zinc-600 mt-1">Technical & Civilian Challenges</p>
            </div>

          </div>

        </div>
      </section>

      {/* BOOM! ABOUT ROBOTRON SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-[#bb0013] text-white font-anton text-2xl sm:text-3xl px-4 py-1.5 comic-border-thick shadow-comic transform -skew-x-6">
            BOOM!
          </div>
          <h2 className="font-anton text-3xl sm:text-5xl text-[#1a1a1a]">ABOUT ROBOTRON</h2>
        </div>

        {/* 3 Comic Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-6 comic-border-thick shadow-comic-md hover:-translate-y-1 transition-transform relative">
            <div className="bg-[#bb0013] text-white p-3 inline-block comic-border-thick mb-4">
              <Lightbulb className="w-8 h-8 text-[#fddc00]" />
            </div>
            <h3 className="font-anton text-2xl mb-2 text-[#1a1a1a]">INNOVATION HUB</h3>
            <p className="font-bricolage text-sm text-zinc-800 leading-relaxed">
              Join the most exciting hackathon in South India where brilliant minds come together to solve real-world problems through technology and creativity.
            </p>
          </div>

          <div className="bg-white p-6 comic-border-thick shadow-comic-md hover:-translate-y-1 transition-transform relative">
            <div className="bg-[#bb0013] text-white p-3 inline-block comic-border-thick mb-4">
              <Trophy className="w-8 h-8 text-[#fddc00]" />
            </div>
            <h3 className="font-anton text-2xl mb-2 text-[#1a1a1a]">COMPETE & WIN</h3>
            <p className="font-bricolage text-sm text-zinc-800 leading-relaxed">
              Compete for amazing prizes worth ₹50,000 while showcasing your technical skills in various categories from AI/ML to cybersecurity.
            </p>
          </div>

          <div className="bg-white p-6 comic-border-thick shadow-comic-md hover:-translate-y-1 transition-transform relative">
            <div className="bg-[#bb0013] text-white p-3 inline-block comic-border-thick mb-4">
              <Users className="w-8 h-8 text-[#fddc00]" />
            </div>
            <h3 className="font-anton text-2xl mb-2 text-[#1a1a1a]">NETWORK & LEARN</h3>
            <p className="font-bricolage text-sm text-zinc-800 leading-relaxed">
              Connect with industry experts, developers, mentors. Participate in workshops, tech talks, and gain valuable insights.
            </p>
          </div>

        </div>

      </section>

      {/* ZAP! EVENT SCHEDULE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#fddc00] text-[#1a1a1a] font-anton text-2xl sm:text-3xl px-4 py-1.5 comic-border-thick shadow-comic transform -skew-x-6">
              ZAP!
            </div>
            <h2 className="font-anton text-3xl sm:text-5xl text-[#1a1a1a]">EVENT SCHEDULE</h2>
          </div>
          <button
            onClick={() => setActiveTab('schedule')}
            className="flex items-center gap-2 font-anton text-lg text-[#bb0013] hover:underline"
          >
            VIEW FULL TIMELINE <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Day 1 Card */}
          <div className="bg-[#efe1c5] p-6 comic-border-thick shadow-comic-md space-y-4">
            <div className="bg-[#1a1a1a] text-white font-anton text-xl px-4 py-2 inline-block comic-border-thick">
              DAY 1 - JAN 15, 2026
            </div>
            
            <div className="space-y-3 font-bricolage text-sm">
              <div className="flex items-start gap-3 bg-white p-3 comic-border-thick">
                <span className="font-anton text-base text-[#bb0013] w-20 shrink-0">09:00 AM</span>
                <div>
                  <div className="font-bold">REGISTRATION & CHECK-IN</div>
                  <div className="text-xs text-zinc-600">Get your badges and welcome kit.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#bb0013] text-white p-3 comic-border-thick">
                <span className="font-anton text-base text-[#fddc00] w-20 shrink-0">12:00 PM</span>
                <div>
                  <div className="font-anton text-lg tracking-wider">HACKING BEGINS!</div>
                  <div className="text-xs opacity-90">Start building your innovative solutions</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3 comic-border-thick">
                <span className="font-anton text-base text-[#bb0013] w-20 shrink-0">03:00 PM</span>
                <div>
                  <div className="font-bold">MENTOR SESSIONS</div>
                  <div className="text-xs text-zinc-600">Guidance from industry experts.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Day 2 Card */}
          <div className="bg-[#efe1c5] p-6 comic-border-thick shadow-comic-md space-y-4">
            <div className="bg-[#bb0013] text-white font-anton text-xl px-4 py-2 inline-block comic-border-thick">
              DAY 2 - JAN 16, 2026
            </div>
            
            <div className="space-y-3 font-bricolage text-sm">
              <div className="flex items-start gap-3 bg-white p-3 comic-border-thick">
                <span className="font-anton text-base text-[#bb0013] w-20 shrink-0">08:00 AM</span>
                <div>
                  <div className="font-bold">BREAKFAST & REFRESHMENTS</div>
                  <div className="text-xs text-zinc-600">Morning energizers and coffee.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3 comic-border-thick">
                <span className="font-anton text-base text-[#bb0013] w-20 shrink-0">12:00 PM</span>
                <div>
                  <div className="font-bold text-[#bb0013]">SUBMISSION DEADLINE</div>
                  <div className="text-xs text-zinc-600">Final project repository lock.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#fddc00] text-[#1a1a1a] p-3 comic-border-thick">
                <span className="font-anton text-base text-[#bb0013] w-20 shrink-0">05:00 PM</span>
                <div>
                  <div className="font-anton text-lg tracking-wider">AWARDS CEREMONY</div>
                  <div className="text-xs font-semibold">Announcing winners and cash prizes!</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* POW! THE MAIN EVENTS TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#bb0013] text-white font-anton text-2xl sm:text-3xl px-4 py-1.5 comic-border-thick shadow-comic transform -skew-x-6">
              POW!
            </div>
            <h2 className="font-anton text-3xl sm:text-5xl text-[#1a1a1a]">FEATURED TECHNICAL EVENTS</h2>
          </div>
          <button
            onClick={() => setActiveTab('events')}
            className="flex items-center gap-2 font-anton text-lg text-[#bb0013] hover:underline"
          >
            SEE ALL 16 EVENTS <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECHNICAL_EVENTS.slice(0, 4).map((evt) => (
            <div
              key={evt.id}
              onClick={() => onSelectEvent(evt.id)}
              className="bg-white p-5 comic-border-thick shadow-comic hover:-translate-y-1 transition-transform cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-[#1a1a1a] text-white font-anton text-xs px-2.5 py-1 comic-border-thick">
                    {evt.code}
                  </span>
                  <span className="bg-[#fddc00] font-anton text-xs px-2.5 py-1 comic-border-thick">
                    FEE: ₹{evt.fee}
                  </span>
                </div>
                <h3 className="font-anton text-xl text-[#1a1a1a] mb-2">{evt.title}</h3>
                <p className="font-bricolage text-xs text-zinc-700 line-clamp-3">{evt.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t-2 border-zinc-200 flex justify-between items-center text-xs font-bold text-[#bb0013]">
                <span>{evt.teamSize}</span>
                <span>DETAILS →</span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#fddc00] p-8 sm:p-12 comic-border-ultra shadow-comic-xl text-center space-y-6 relative overflow-hidden">
          <div className="font-anton text-4xl sm:text-6xl text-[#1a1a1a]">
            ARE YOU READY TO ENTER THE ARENA?
          </div>
          <p className="font-bricolage text-lg sm:text-xl font-bold text-[#1a1a1a] max-w-2xl mx-auto">
            Limited slots remaining for teams across Tamil Nadu & South India! Secure your slot today.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('register')}
              className="bg-[#bb0013] hover:bg-[#d90017] text-white font-anton text-2xl tracking-wider px-10 py-4 comic-border-thick shadow-comic-lg hover:scale-105 transition-transform uppercase cursor-pointer"
            >
              ASSEMBLE YOUR TEAM NOW ⚡
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
