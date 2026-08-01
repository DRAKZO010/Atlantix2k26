import React from 'react';
import { EventItem, NavTab } from '../types';
import { X, Zap, Users, Clock, MapPin, CheckCircle2, ShieldAlert } from 'lucide-react';

interface EventDetailModalProps {
  event: EventItem;
  onClose: () => void;
  onSelectForRegistration: (eventId: string, category: 'technical' | 'civilian') => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ 
  event, 
  onClose, 
  onSelectForRegistration 
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#f4ead5] max-w-2xl w-full comic-border-ultra shadow-comic-xl relative my-8 p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white p-2 comic-border-thick hover:bg-[#bb0013] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#1a1a1a] text-white font-anton text-xs px-3 py-1 comic-border-thick">
              {event.code}
            </span>
            <span className={`font-anton text-xs px-3 py-1 comic-border-thick ${
              event.fee > 0 ? 'bg-[#fddc00] text-[#1a1a1a]' : 'bg-[#00c853] text-white'
            }`}>
              {event.fee > 0 ? `FEE: ₹${event.fee}` : 'VERIFIED FEE: FREE'}
            </span>
            <span className="bg-[#bb0013] text-white font-anton text-xs px-3 py-1 comic-border-thick uppercase">
              {event.category}
            </span>
          </div>

          <h2 className="font-anton text-4xl sm:text-5xl text-[#1a1a1a]">
            {event.title}
          </h2>

          <p className="font-bricolage text-base font-semibold text-zinc-800">
            {event.description}
          </p>
        </div>

        {/* Specs Box */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-bricolage text-xs font-bold">
          <div className="bg-white p-3 comic-border-thick flex items-center gap-2">
            <Users className="w-4 h-4 text-[#bb0013]" />
            <span>{event.teamSize || '1 - 4 Members'}</span>
          </div>
          <div className="bg-white p-3 comic-border-thick flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#bb0013]" />
            <span>{event.timing || 'Jan 15-16, 2026'}</span>
          </div>
          <div className="bg-white p-3 comic-border-thick flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#bb0013]" />
            <span>{event.venue || 'Main Arena'}</span>
          </div>
        </div>

        {/* Rules Checklist */}
        {event.rules && event.rules.length > 0 && (
          <div className="bg-white p-5 comic-border-thick space-y-3">
            <h3 className="font-anton text-xl text-[#1a1a1a] flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#bb0013]" />
              MISSION PROTOCOL & RULES
            </h3>
            <ul className="space-y-2 font-bricolage text-xs text-zinc-800 font-medium">
              {event.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#bb0013] shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => {
              onSelectForRegistration(event.id, event.category);
              onClose();
            }}
            className="flex-1 bg-[#bb0013] hover:bg-[#d90017] text-white font-anton text-xl py-3.5 comic-border-thick shadow-comic transition-all cursor-pointer uppercase flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5 text-[#fddc00] fill-[#fddc00]" />
            SELECT FOR TEAM REGISTRATION
          </button>
          <button
            onClick={onClose}
            className="bg-white hover:bg-[#efe1c5] text-[#1a1a1a] font-anton text-xl py-3.5 px-6 comic-border-thick shadow-comic cursor-pointer uppercase"
          >
            CLOSE
          </button>
        </div>

      </div>
    </div>
  );
};
