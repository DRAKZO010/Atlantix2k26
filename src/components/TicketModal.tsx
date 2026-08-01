import React from 'react';
import { RegistrationState } from '../types';
import { TECHNICAL_EVENTS, CIVILIAN_EVENTS } from '../data/events';
import { CheckCircle2, Download, QrCode, X, Zap, ShieldCheck, ExternalLink } from 'lucide-react';

interface TicketModalProps {
  registration: RegistrationState;
  regId: string;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ registration, regId, onClose }) => {
  const leader = registration.members[0];
  const techEvt = TECHNICAL_EVENTS.find(e => e.id === registration.selectedTechEventId);
  const nonTechEvt = CIVILIAN_EVENTS.find(e => e.id === registration.selectedNonTechEventId);

  const totalFee = registration.baseFee + (techEvt?.fee || 0);

  const passUrl = `https://atlantix2k26.vercel.app/pass.html?id=${regId}&team=${encodeURIComponent(leader.fullName || 'Team')}&event=${encodeURIComponent(techEvt?.title || 'Robotron 2027')}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${regId}`;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `Robotron_QR_${regId}.png`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#f4ead5] max-w-xl w-full comic-border-ultra shadow-comic-xl relative my-8 p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white p-2 comic-border-thick hover:bg-[#bb0013] hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Success Header */}
        <div className="text-center space-y-2">
          <div className="inline-block bg-[#00c853] text-white p-3 comic-border-thick rounded-full animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="font-anton text-4xl sm:text-5xl text-[#1a1a1a]">
            ASSEMBLY CONFIRMED!
          </h2>
          <p className="font-bricolage text-sm font-bold text-zinc-700">
            YOUR OFFICIAL ROBOTRON 2027 HACKATHON PASS HAS BEEN GENERATED.
          </p>
        </div>

        {/* PRINTABLE PASS BADGE */}
        <div className="bg-white comic-border-ultra p-6 shadow-comic space-y-5 relative overflow-hidden">
          
          {/* Top Pass Header */}
          <div className="flex justify-between items-center bg-[#bb0013] text-white p-3 comic-border-thick -mx-6 -mt-6">
            <span className="font-anton text-xl tracking-wider">ROBOTRON 2027 PASS</span>
            <span className="bg-[#fddc00] text-[#1a1a1a] font-anton text-xs px-2.5 py-0.5 comic-border-thick">
              {regId}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 items-center">
            
            <div className="sm:col-span-2 space-y-2 font-bricolage text-xs sm:text-sm">
              <div>
                <span className="text-zinc-500 font-bold block text-[10px]">TEAM LEADER</span>
                <span className="font-anton text-xl text-[#1a1a1a]">{leader.fullName || 'STARK INDUSTRIES'}</span>
              </div>

              <div>
                <span className="text-zinc-500 font-bold block text-[10px]">COLLEGE / SCHOOL</span>
                <span className="font-bold text-zinc-800">{leader.college || 'PARK COLLEGE OF ENG'}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-zinc-500 font-bold block text-[10px]">SQUAD SIZE</span>
                  <span className="font-anton text-base text-[#bb0013]">
                    {registration.members.filter(m => m.fullName.trim() !== '').length} MEMBERS
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 font-bold block text-[10px]">FEE PAID</span>
                  <span className="font-anton text-base text-[#00c853]">₹{totalFee} PAID</span>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-[#1a1a1a] text-white p-3 comic-border-thick text-center space-y-1 flex flex-col items-center justify-center">
              <img 
                src={qrUrl} 
                alt={`QR Code for ${regId}`}
                className="w-24 h-24 bg-white p-1"
              />
              <span className="font-anton text-[10px] text-zinc-300">ENTRY GATE SCAN</span>
            </div>

          </div>

          {/* Selected Events Box */}
          <div className="border-t-2 border-dashed border-[#1a1a1a] pt-3 text-xs font-bricolage space-y-1">
            <div className="font-anton text-sm text-[#1a1a1a]">REGISTERED CHALLENGES:</div>
            <div className="flex flex-wrap gap-2">
              {techEvt ? (
                <span className="bg-[#fddc00] text-[#1a1a1a] font-anton px-2 py-0.5 comic-border-thick">
                  {techEvt.title}
                </span>
              ) : (
                <span className="bg-zinc-100 text-zinc-600 px-2 py-0.5 border">No Tech Event Selected</span>
              )}
              {nonTechEvt ? (
                <span className="bg-[#3467ff] text-white font-anton px-2 py-0.5 comic-border-thick">
                  {nonTechEvt.title}
                </span>
              ) : (
                <span className="bg-zinc-100 text-zinc-600 px-2 py-0.5 border">No Non-Tech Event Selected</span>
              )}
            </div>
          </div>

          <div className="bg-[#f4ead5] p-2.5 comic-border-thick text-center text-[11px] font-bold text-zinc-700">
            PRESENT THIS PASS AT PARK COLLEGE ENTRY GATE ON JAN 15, 09:00 AM
          </div>

        </div>

        {/* Modal Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={passUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#bb0013] hover:bg-[#d90017] text-white font-anton text-lg py-3 comic-border-thick shadow-comic transition-colors flex items-center justify-center gap-2 cursor-pointer no-underline"
          >
            <ExternalLink className="w-5 h-5 text-[#fddc00]" />
            VIEW DIGITAL PASS
          </a>
          <button
            onClick={handleDownloadQR}
            className="flex-1 bg-[#1a1a1a] hover:bg-[#bb0013] text-white font-anton text-lg py-3 comic-border-thick shadow-comic transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-5 h-5 text-[#fddc00]" />
            DOWNLOAD QR
          </button>
          <button
            onClick={onClose}
            className="bg-white hover:bg-[#efe1c5] text-[#1a1a1a] font-anton text-lg py-3 px-6 comic-border-thick shadow-comic cursor-pointer"
          >
            CLOSE
          </button>
        </div>

      </div>
    </div>
  );
};
