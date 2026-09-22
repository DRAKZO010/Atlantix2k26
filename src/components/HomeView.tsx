import React from 'react';
import { NavTab } from '../types';
import { useContent } from '../ContentContext';
import { Zap, Trophy, Users, Lightbulb, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { EditableText } from './EditableText';

interface HomeViewProps {
  setActiveTab: (tab: NavTab) => void;
  onSelectEvent: (eventId: string) => void;
  editable?: boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab, onSelectEvent, editable }) => {
  const { content } = useContent();
  const { hero, stats, about, schedule, events } = content;

  const E = EditableText;

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-12 bg-comic-paper overflow-hidden border-b-4 border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Flash Badge */}
            <div className="inline-block bg-[#fddc00] text-[#1a1a1a] font-anton text-lg sm:text-xl px-5 py-1.5 comic-border-thick shadow-comic -rotate-1">
              ⚡ {editable ? <E value={hero?.badge || ''} path="hero.badge" as="span" className="inline" /> : hero?.badge || 'MISSION CRITICAL: JANUARY 15-16, 2026 • COIMBATORE'}
            </div>

            {/* Giant Title */}
            <div className="relative">
              <h1 className="font-anton text-6xl sm:text-8xl lg:text-9xl tracking-tight text-[#1a1a1a] drop-shadow-[4px_4px_0px_#bb0013]">
                {editable ? (
                  <E value={hero?.title || ''} path="hero.title" as="span" />
                ) : (
                  <>{hero?.title?.split(' ').slice(0, -1).join(' ') || 'ROBOTRON'}{' '}<span className="text-[#bb0013]">{hero?.title?.split(' ').slice(-1) || '2027'}</span></>
                )}
              </h1>
            </div>

            <p className="font-bricolage text-xl sm:text-2xl font-bold text-[#1a1a1a] max-w-2xl mx-auto leading-snug">
              {editable ? <E value={hero?.subtitle || ''} path="hero.subtitle" as="span" /> : hero?.subtitle || '24 HOURS. INFINITE POSSIBILITIES. ASSEMBLE YOUR SQUAD AND EXECUTE THE PLAN.'}
            </p>

            {/* Event Info Strip */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-bold pt-2">
              <div className="flex items-center gap-2 bg-white px-4 py-2 comic-border-thick shadow-comic-sm">
                <Calendar className="w-5 h-5 text-[#bb0013]" />
                {editable ? <E value={hero?.date || ''} path="hero.date" as="span" /> : hero?.date || 'JANUARY 15-16, 2026'}
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 comic-border-thick shadow-comic-sm">
                <MapPin className="w-5 h-5 text-[#bb0013]" />
                {editable ? <E value={hero?.venue || ''} path="hero.venue" as="span" /> : hero?.venue || 'PARK COLLEGE OF ENGINEERING, COIMBATORE'}
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
              <div className="font-anton text-5xl sm:text-6xl text-[#fddc00]">
                {editable ? <E value={stats?.hours || ''} path="stats.hours" as="span" /> : stats?.hours || '24'}
              </div>
              <div className="font-anton text-xl tracking-wider mt-1">HOURS OF CODING</div>
              <p className="font-bricolage text-xs opacity-90 mt-1">Non-stop building & battle</p>
            </div>

            <div className="bg-[#fddc00] text-[#1a1a1a] p-6 comic-border-thick shadow-comic-md transform rotate-1 text-center">
              <div className="font-anton text-5xl sm:text-6xl text-[#bb0013]">
                {editable ? <E value={stats?.prizePool || ''} path="stats.prizePool" as="span" /> : stats?.prizePool || '₹50K'}
              </div>
              <div className="font-anton text-xl tracking-wider mt-1">PRIZE POOL</div>
              <p className="font-bricolage text-xs font-semibold mt-1">Cash, Mentorship & Incubation</p>
            </div>

            <div className="bg-white text-[#1a1a1a] p-6 comic-border-thick shadow-comic-md transform -rotate-1 text-center">
              <div className="font-anton text-5xl sm:text-6xl text-[#bb0013]">
                {editable ? <E value={stats?.events || ''} path="stats.events" as="span" /> : stats?.events || '15'}+
              </div>
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
          <h2 className="font-anton text-3xl sm:text-5xl text-[#1a1a1a]">
            {editable ? <E value={about?.heading || ''} path="about.heading" as="span" /> : about?.heading || 'ABOUT ROBOTRON'}
          </h2>
        </div>

        {/* 3 Comic Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(about?.cards || []).slice(0, 3).map((card, i) => (
            <div key={i} className="bg-white p-6 comic-border-thick shadow-comic-md hover:-translate-y-1 transition-transform relative">
              <div className="bg-[#bb0013] text-white p-3 inline-block comic-border-thick mb-4">
                {i === 0 && <Lightbulb className="w-8 h-8 text-[#fddc00]" />}
                {i === 1 && <Trophy className="w-8 h-8 text-[#fddc00]" />}
                {i === 2 && <Users className="w-8 h-8 text-[#fddc00]" />}
              </div>
              <h3 className="font-anton text-2xl mb-2 text-[#1a1a1a]">
                {editable ? <E value={card.title} path={`about.cards.${i}.title`} as="span" /> : card.title}
              </h3>
              <p className="font-bricolage text-sm text-zinc-800 leading-relaxed">
                {editable ? <E value={card.description} path={`about.cards.${i}.description`} as="span" /> : card.description}
              </p>
            </div>
          ))}
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
              {(schedule?.day1 || []).slice(0, 3).map((item, idx) => (
                <div key={idx} className={`flex items-start gap-3 p-3 comic-border-thick ${item.isHighlight ? 'bg-[#bb0013] text-white' : 'bg-white'}`}>
                  <span className={`font-anton text-base w-20 shrink-0 ${item.isHighlight ? 'text-[#fddc00]' : 'text-[#bb0013]'}`}>
                    {editable ? <E value={item.time} path={`schedule.day1.${idx}.time`} as="span" /> : item.time}
                  </span>
                  <div>
                    <div className={item.isHighlight ? 'font-anton text-lg tracking-wider' : 'font-bold'}>
                      {editable ? <E value={item.title} path={`schedule.day1.${idx}.title`} as="span" /> : item.title}
                    </div>
                    <div className={`text-xs ${item.isHighlight ? 'opacity-90' : 'text-zinc-600'}`}>
                      {editable ? <E value={item.description} path={`schedule.day1.${idx}.description`} as="span" /> : item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Day 2 Card */}
          <div className="bg-[#efe1c5] p-6 comic-border-thick shadow-comic-md space-y-4">
            <div className="bg-[#bb0013] text-white font-anton text-xl px-4 py-2 inline-block comic-border-thick">
              DAY 2 - JAN 16, 2026
            </div>
            
            <div className="space-y-3 font-bricolage text-sm">
              {(schedule?.day2 || []).slice(0, 3).map((item, idx) => (
                <div key={idx} className={`flex items-start gap-3 p-3 comic-border-thick ${item.isHighlight ? 'bg-[#fddc00] text-[#1a1a1a]' : 'bg-white'}`}>
                  <span className={`font-anton text-base text-[#bb0013] w-20 shrink-0`}>
                    {editable ? <E value={item.time} path={`schedule.day2.${idx}.time`} as="span" /> : item.time}
                  </span>
                  <div>
                    <div className={item.isHighlight ? 'font-anton text-lg tracking-wider text-[#bb0013]' : 'font-bold'}>
                      {editable ? <E value={item.title} path={`schedule.day2.${idx}.title`} as="span" /> : item.title}
                    </div>
                    <div className={`text-xs ${item.isHighlight ? 'font-semibold' : 'text-zinc-600'}`}>
                      {editable ? <E value={item.description} path={`schedule.day2.${idx}.description`} as="span" /> : item.description}
                    </div>
                  </div>
                </div>
              ))}
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
            SEE ALL {(events?.technical?.length || 0) + (events?.civilian?.length || 0)} EVENTS <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(events?.technical || []).slice(0, 4).map((evt) => (
            <div
              key={evt.id}
              onClick={() => onSelectEvent(evt.id)}
              className="bg-white p-5 comic-border-thick shadow-comic hover:-translate-y-1 transition-transform cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-[#1a1a1a] text-white font-anton text-xs px-2.5 py-1 comic-border-thick">
                    {editable ? <E value={evt.code} path={`events.technical.${events!.technical.indexOf(evt)}.code`} as="span" /> : evt.code}
                  </span>
                  <span className="bg-[#fddc00] font-anton text-xs px-2.5 py-1 comic-border-thick">
                    {evt.feeText || `FEE: ₹${evt.fee}`}
                  </span>
                </div>
                <h3 className="font-anton text-xl text-[#1a1a1a] mb-2">
                  {editable ? <E value={evt.title} path={`events.technical.${events!.technical.indexOf(evt)}.title`} as="span" /> : evt.title}
                </h3>
                <p className="font-bricolage text-xs text-zinc-700 line-clamp-3">
                  {editable ? <E value={evt.description} path={`events.technical.${events!.technical.indexOf(evt)}.description`} as="span" /> : evt.description}
                </p>
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
