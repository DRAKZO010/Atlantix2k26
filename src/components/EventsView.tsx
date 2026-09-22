import React, { useState } from 'react';
import { NavTab } from '../types';
import { useContent } from '../ContentContext';
import { Search, Zap } from 'lucide-react';
import { EditableText } from './EditableText';

interface EventsViewProps {
  setActiveTab: (tab: NavTab) => void;
  onSelectEvent: (eventId: string) => void;
  editable?: boolean;
}

export const EventsView: React.FC<EventsViewProps> = ({ setActiveTab, onSelectEvent, editable }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'technical' | 'civilian'>('all');
  const { content } = useContent();
  const TECHNICAL_EVENTS = content?.events?.technical || [];
  const CIVILIAN_EVENTS = content?.events?.civilian || [];
  const E = EditableText;

  const filteredTech = TECHNICAL_EVENTS.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCivilian = CIVILIAN_EVENTS.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-16">
      
      {/* HEADER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 text-center space-y-4">
        <div className="inline-block bg-[#bb0013] text-white font-anton text-sm sm:text-base px-4 py-1 comic-border-thick transform -rotate-1">
          24 HOUR BATTLEFIELD
        </div>

        <h1 className="font-anton text-5xl sm:text-7xl lg:text-8xl text-[#1a1a1a]">
          MISSION: <span className="bg-[#bb0013] text-white px-4 py-1 inline-block transform -skew-x-3">EVENTS</span>
        </h1>

        <p className="font-bricolage text-lg sm:text-xl font-bold text-[#1a1a1a] tracking-wider uppercase">
          CHOOSE YOUR TECHNOLOGY. DEFEND YOUR DOMAIN.
        </p>

        {/* Filter & Search Bar */}
        <div className="max-w-2xl mx-auto pt-4 flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search event title or code (e.g. CTF, Robo Soccer)..."
              className="w-full pl-11 pr-4 py-3 bg-white comic-border-thick font-bricolage text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#bb0013]"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto justify-center">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-4 py-3 font-anton text-sm tracking-wider comic-border-thick shadow-comic-sm uppercase cursor-pointer ${
                categoryFilter === 'all' ? 'bg-[#bb0013] text-white' : 'bg-white text-[#1a1a1a]'
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setCategoryFilter('technical')}
              className={`px-4 py-3 font-anton text-sm tracking-wider comic-border-thick shadow-comic-sm uppercase cursor-pointer ${
                categoryFilter === 'technical' ? 'bg-[#bb0013] text-white' : 'bg-white text-[#1a1a1a]'
              }`}
            >
              TECHNICAL
            </button>
            <button
              onClick={() => setCategoryFilter('civilian')}
              className={`px-4 py-3 font-anton text-sm tracking-wider comic-border-thick shadow-comic-sm uppercase cursor-pointer ${
                categoryFilter === 'civilian' ? 'bg-[#bb0013] text-white' : 'bg-white text-[#1a1a1a]'
              }`}
            >
              CIVILIAN
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORY 1: TECHNICAL OPERATIONS */}
      {(categoryFilter === 'all' || categoryFilter === 'technical') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="border-b-4 border-[#1a1a1a] pb-3 flex items-center justify-between">
            <h2 className="font-anton text-3xl sm:text-5xl text-[#bb0013] italic tracking-wide">
              TECHNICAL OPERATIONS
            </h2>
            <span className="font-anton text-lg text-[#1a1a1a] bg-[#fddc00] px-3 py-1 comic-border-thick">
              {filteredTech.length} MISSIONS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTech.map((item) => {
              const idx = TECHNICAL_EVENTS.indexOf(item);
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectEvent(item.id)}
                  className="bg-white comic-border-thick shadow-comic-md hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="bg-[#1a1a1a] text-white font-anton text-xs px-2.5 py-1 comic-border-thick">
                        {editable ? <E value={item.code} path={`events.technical.${idx}.code`} as="span" /> : item.code}
                      </span>
                      <span className="bg-[#fddc00] text-[#1a1a1a] font-anton text-xs px-2.5 py-1 comic-border-thick flex items-center gap-1">
                        <Zap className="w-3 h-3 text-[#bb0013] fill-[#bb0013]" />
                        {item.feeText || `FEE: ₹${item.fee}`}
                      </span>
                    </div>

                    <h3 className="font-anton text-2xl text-[#1a1a1a] group-hover:text-[#bb0013] transition-colors">
                      {editable ? <E value={item.title} path={`events.technical.${idx}.title`} as="span" /> : item.title}
                    </h3>

                    <p className="font-bricolage text-xs text-zinc-700 leading-relaxed line-clamp-3">
                      {editable ? <E value={item.description} path={`events.technical.${idx}.description`} as="span" /> : item.description}
                    </p>
                  </div>

                  <div className="p-4 bg-[#f4ead5] border-t-2 border-[#1a1a1a] flex items-center justify-between text-xs font-bold">
                    <span className="text-zinc-700">{item.teamSize}</span>
                    <span className="bg-[#bb0013] text-white px-2.5 py-1 comic-border-thick font-anton tracking-wider group-hover:bg-[#fddc00] group-hover:text-[#1a1a1a] transition-colors">
                      VIEW RULES →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* MID-BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#bb0013] text-white p-6 sm:p-8 comic-border-ultra shadow-comic-lg text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h3 className="font-anton text-3xl sm:text-4xl text-[#fddc00]">
              BATTLE READY? SELECT YOUR MISSION
            </h3>
            <p className="font-bricolage text-sm font-medium opacity-90">
              Pick your technical or non-technical events during team assembly.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('register')}
            className="bg-[#fddc00] hover:bg-white text-[#1a1a1a] font-anton text-xl px-8 py-3.5 comic-border-thick shadow-comic shrink-0 uppercase cursor-pointer"
          >
            REGISTER SQUAD NOW
          </button>
        </div>
      </section>

      {/* CATEGORY 2: CIVILIAN ENGAGEMENT */}
      {(categoryFilter === 'all' || categoryFilter === 'civilian') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="border-b-4 border-[#1a1a1a] pb-3 flex items-center justify-between">
            <h2 className="font-anton text-3xl sm:text-5xl text-[#bb0013] italic tracking-wide">
              CIVILIAN ENGAGEMENT
            </h2>
            <span className="font-anton text-lg text-[#1a1a1a] bg-[#fddc00] px-3 py-1 comic-border-thick">
              {filteredCivilian.length} EVENTS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCivilian.map((item) => {
              const idx = CIVILIAN_EVENTS.indexOf(item);
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectEvent(item.id)}
                  className="bg-white comic-border-thick shadow-comic-md hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="bg-[#1a1a1a] text-white font-anton text-xs px-2.5 py-1 comic-border-thick">
                        {editable ? <E value={item.code} path={`events.civilian.${idx}.code`} as="span" /> : item.code}
                      </span>
                      <span className="bg-[#00c853] text-white font-anton text-xs px-2.5 py-1 comic-border-thick">
                        {item.feeText || 'VERIFIED FEE: FREE'}
                      </span>
                    </div>

                    <h3 className="font-anton text-2xl text-[#1a1a1a] group-hover:text-[#bb0013] transition-colors">
                      {editable ? <E value={item.title} path={`events.civilian.${idx}.title`} as="span" /> : item.title}
                    </h3>

                    <p className="font-bricolage text-xs text-zinc-700 leading-relaxed line-clamp-3">
                      {editable ? <E value={item.description} path={`events.civilian.${idx}.description`} as="span" /> : item.description}
                    </p>
                  </div>

                  <div className="p-4 bg-[#efe1c5] border-t-2 border-[#1a1a1a] flex items-center justify-between text-xs font-bold">
                    <span className="text-zinc-700">{item.teamSize}</span>
                    <span className="bg-[#1a1a1a] text-white px-2.5 py-1 comic-border-thick font-anton tracking-wider group-hover:bg-[#bb0013] transition-colors">
                      VIEW DETAILS →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
};
