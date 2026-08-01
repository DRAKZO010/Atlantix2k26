import React, { useState, useEffect } from 'react';
import { NavTab, SiteContent } from '../types';
import { Clock, MapPin, Wifi, Zap, ShieldAlert, Navigation, Calendar } from 'lucide-react';

interface ScheduleViewProps {
  setActiveTab: (tab: NavTab) => void;
  siteContent: SiteContent;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ setActiveTab, siteContent }) => {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 56, seconds: 57 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentSchedule = activeDay === 1 ? siteContent.schedule.day1 : siteContent.schedule.day2;

  return (
    <div className="space-y-12 pb-16">
      
      {/* HEADER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-4 text-center">
        <div className="inline-block bg-[#bb0013] text-white font-anton text-sm sm:text-base px-4 py-1 comic-border-thick transform -rotate-1">
          MISSION CRITICAL
        </div>

        <h1 className="font-anton text-5xl sm:text-7xl lg:text-8xl text-[#1a1a1a]">
          ZAP! <span className="bg-[#fddc00] text-[#1a1a1a] px-4 py-1 inline-block transform -skew-x-3">EVENT SCHEDULE</span>
        </h1>

        <p className="font-bricolage text-lg sm:text-xl font-bold text-[#1a1a1a] max-w-3xl mx-auto">
          24 HOURS. INFINITE POSSIBILITIES. ASSEMBLE YOUR SQUAD AND EXECUTE THE PLAN.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => setActiveDay(1)}
            className={`px-8 py-3.5 font-anton text-xl tracking-wider comic-border-ultra shadow-comic uppercase cursor-pointer transition-all ${
              activeDay === 1 
                ? 'bg-[#bb0013] text-white scale-105' 
                : 'bg-white text-[#1a1a1a] hover:bg-[#efe1c5]'
            }`}
          >
            DAY 1 - JAN 15
          </button>
          <button
            onClick={() => setActiveDay(2)}
            className={`px-8 py-3.5 font-anton text-xl tracking-wider comic-border-ultra shadow-comic uppercase cursor-pointer transition-all ${
              activeDay === 2 
                ? 'bg-[#bb0013] text-white scale-105' 
                : 'bg-white text-[#1a1a1a] hover:bg-[#efe1c5]'
            }`}
          >
            DAY 2 - JAN 16
          </button>
        </div>
      </section>

      {/* SCHEDULE TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-[#1a1a1a] text-white p-4 comic-border-thick flex items-center justify-between">
              <span className="font-anton text-2xl text-[#fddc00]">
                {activeDay === 1 ? 'DAY 01: THE AWAKENING' : 'DAY 02: THE FINALE'}
              </span>
              <span className="font-bricolage text-xs font-bold text-zinc-400">
                {siteContent.hero.venue}
              </span>
            </div>

            <div className="space-y-4">
              {currentSchedule.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-5 comic-border-thick shadow-comic transition-transform hover:-translate-y-1 ${
                    item.isHighlight 
                      ? 'bg-[#bb0013] text-white' 
                      : 'bg-white text-[#1a1a1a]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-current pb-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`font-anton text-2xl ${item.isHighlight ? 'text-[#fddc00]' : 'text-[#bb0013]'}`}>
                        {item.time}
                      </span>
                      <h3 className="font-anton text-2xl tracking-wide">{item.title}</h3>
                    </div>
                  </div>

                  <p className={`font-bricolage text-sm ${item.isHighlight ? 'opacity-95 font-semibold' : 'text-zinc-700'}`}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Widgets */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-[#1a1a1a] text-white p-6 comic-border-ultra shadow-comic-lg text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-[#fddc00] font-anton text-lg">
                <Clock className="w-5 h-5 animate-pulse" />
                <span>TIME REMAINING</span>
              </div>

              <div className="font-anton text-5xl sm:text-6xl text-white tracking-widest bg-zinc-900 py-3 comic-border-thick">
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>

              <p className="font-bricolage text-xs text-zinc-400">
                24-HOUR CLOCK IS RUNNING IN REAL TIME
              </p>
            </div>

            <div className="bg-[#efe1c5] p-5 comic-border-thick shadow-comic space-y-3">
              <div className="font-anton text-xl text-[#1a1a1a] flex items-center justify-between">
                <span>{activeDay === 1 ? 'DAY 2 AT A GLANCE' : 'DAY 1 HIGHLIGHTS'}</span>
                <Calendar className="w-5 h-5 text-[#bb0013]" />
              </div>
              <ul className="font-bricolage text-xs font-semibold space-y-2 text-zinc-800">
                {(activeDay === 1 ? siteContent.schedule.day2 : siteContent.schedule.day1).slice(0, 4).map((item, i) => (
                  <li key={i} className={`flex items-center gap-2 ${item.isHighlight ? 'text-[#bb0013]' : ''}`}>
                    ⚡ {item.time} - {item.title}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setActiveDay(activeDay === 1 ? 2 : 1)}
                className="w-full bg-[#1a1a1a] text-white font-anton text-sm py-2 comic-border-thick hover:bg-[#bb0013] transition-colors"
              >
                SWITCH TO DAY {activeDay === 1 ? '2' : '1'} SCHEDULE
              </button>
            </div>

            <div className="bg-[#fddc00] p-6 comic-border-thick shadow-comic text-center space-y-2">
              <div className="font-anton text-3xl text-[#1a1a1a]">CODE THE FUTURE</div>
              <p className="font-bricolage text-xs font-bold text-zinc-800">
                "NO SLEEP TILL SUBMISSION!"
              </p>
            </div>

            <div className="bg-white p-4 comic-border-thick shadow-comic flex items-start gap-3">
              <ShieldAlert className="w-6 h-6 text-[#bb0013] shrink-0" />
              <div className="font-bricolage text-xs text-zinc-800">
                <strong className="block font-anton text-sm text-[#1a1a1a]">2027 PROTOCOL</strong>
                All teams must adhere to the official hacking guidelines. Fair play and original code are mandatory.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* VENUE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="space-y-6">
          
          <div className="flex items-center gap-3">
            <div className="bg-[#bb0013] text-white font-anton text-2xl sm:text-3xl px-4 py-1.5 comic-border-thick shadow-comic transform -skew-x-6">
              STRATEGIC MAP
            </div>
            <h2 className="font-anton text-3xl sm:text-5xl text-[#1a1a1a]">EVENT VENUE</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            <div className="lg:col-span-8 bg-[#1a1a1a] comic-border-ultra shadow-comic-lg p-3 relative min-h-[320px] flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#bb0013_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
              
              <div className="relative z-10 flex justify-between items-center bg-zinc-900 text-white p-3 comic-border-thick text-xs font-anton tracking-wider">
                <span className="text-[#fddc00]">COIMBATORE REGION • TAMIL NADU</span>
                <span>LAT: 11.0827° N | LON: 77.1436° E</span>
              </div>

              <div className="relative z-10 my-8 p-6 bg-[#2a2a2a] comic-border-thick text-center space-y-4 max-w-md mx-auto">
                <div className="inline-block bg-[#bb0013] text-white p-3 comic-border-thick animate-bounce">
                  <MapPin className="w-8 h-8 text-[#fddc00]" />
                </div>
                <div>
                  <h4 className="font-anton text-2xl text-[#fddc00]">PARK COLLEGE OF ENGINEERING</h4>
                  <p className="font-bricolage text-xs text-zinc-300 mt-1">
                    {siteContent.contact.address}
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex justify-between items-center text-xs text-zinc-400 font-bricolage px-2">
                <span>NEAR KARUMATHAMPATTI / ARASUR HIGHWAY</span>
                <a 
                  href="https://maps.google.com/?q=Park+College+of+Engineering+and+Technology+Coimbatore" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#fddc00] font-anton hover:underline flex items-center gap-1"
                >
                  OPEN IN GOOGLE MAPS <Navigation className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white p-6 comic-border-ultra shadow-comic-lg flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="bg-[#fddc00] font-anton text-xl px-3 py-1 inline-block comic-border-thick">
                  VENUE SPECS
                </div>
                <h3 className="font-anton text-3xl text-[#1a1a1a]">PARK COLLEGE CAMPUS</h3>
                
                <div className="space-y-3 font-bricolage text-sm text-zinc-800">
                  <div className="flex items-start gap-3 bg-[#f4ead5] p-3 comic-border-thick">
                    <Wifi className="w-5 h-5 text-[#bb0013] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-anton text-base text-[#1a1a1a]">HIGH-SPEED WI-FI</strong>
                      <span>SSID: <code className="bg-white px-1.5 py-0.5 comic-border-thick font-mono text-xs">ROBOTRON_2027</code></span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#f4ead5] p-3 comic-border-thick">
                    <Zap className="w-5 h-5 text-[#bb0013] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-anton text-base text-[#1a1a1a]">24/7 POWER BACKUP</strong>
                      <span>STATION X-Y Dedicated team sockets provided.</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('register')}
                className="w-full bg-[#bb0013] hover:bg-[#d90017] text-white font-anton text-xl py-3.5 comic-border-thick shadow-comic uppercase cursor-pointer"
              >
                CLAIM SQUAD SEATS ⚡
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
