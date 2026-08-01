import React, { useState } from 'react';
import { NavTab, RegistrationState, TeamMember } from '../types';
import { TECHNICAL_EVENTS, CIVILIAN_EVENTS } from '../data/events';
import { TicketModal } from './TicketModal';
import { generateRegistrationId, saveRegistration } from '../services/registration';
import { initEmailJS, sendReceiptEmail } from '../services/email';
import { Zap, AlertTriangle, ShieldCheck, CheckCircle2, UserPlus, UserCheck } from 'lucide-react';

interface RegisterViewProps {
  setActiveTab: (tab: NavTab) => void;
  preselectedTechId?: string;
  preselectedNonTechId?: string;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ 
  setActiveTab,
  preselectedTechId = '',
  preselectedNonTechId = ''
}) => {
  const [activeMemberTab, setActiveMemberTab] = useState<number>(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedRegId, setGeneratedRegId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [registration, setRegistration] = useState<RegistrationState>({
    baseFee: 50,
    selectedTechEventId: preselectedTechId,
    selectedNonTechEventId: preselectedNonTechId,
    activeMemberIndex: 0,
    members: [
      { id: 1, fullName: '', dob: '', phone: '', email: '', branch: '', college: '' },
      { id: 2, fullName: '', dob: '', phone: '', email: '', branch: '', college: '' },
      { id: 3, fullName: '', dob: '', phone: '', email: '', branch: '', college: '' },
      { id: 4, fullName: '', dob: '', phone: '', email: '', branch: '', college: '' },
    ]
  });

  const activeMember = registration.members[activeMemberTab];

  const handleMemberChange = (field: keyof TeamMember, value: string) => {
    setRegistration(prev => {
      const updated = [...prev.members];
      updated[activeMemberTab] = {
        ...updated[activeMemberTab],
        [field]: value
      };
      return { ...prev, members: updated };
    });
  };

  const selectedTechEvent = TECHNICAL_EVENTS.find(e => e.id === registration.selectedTechEventId);
  const selectedNonTechEvent = CIVILIAN_EVENTS.find(e => e.id === registration.selectedNonTechEventId);

  const techFee = selectedTechEvent ? selectedTechEvent.fee : 0;
  const nonTechFee = selectedNonTechEvent ? selectedNonTechEvent.fee : 0;
  const totalFee = registration.baseFee + techFee + nonTechFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const leader = registration.members[0];
    if (!leader.fullName || !leader.email || !leader.phone) {
      alert("Please fill in Member 1 (Team Leader) Full Name, Email, and Phone Number before proceeding.");
      setActiveMemberTab(0);
      return;
    }

    setIsSubmitting(true);

    try {
      const regId = generateRegistrationId();
      setGeneratedRegId(regId);

      await saveRegistration(regId, {
        members: registration.members,
        technicalEvent: selectedTechEvent?.title || '',
        nonTechnicalEvent: selectedNonTechEvent?.title || '',
        totalFee,
      });

      initEmailJS();

      const teamLead = leader.fullName;
      const passUrl = `https://atlantix2k26.vercel.app/pass.html?id=${regId}&team=${encodeURIComponent(teamLead)}&event=${encodeURIComponent(selectedTechEvent?.title || 'Robotron 2027')}`;
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${regId}`;

      const activeMembers = registration.members.filter(m => m.fullName.trim() !== '' && m.email.trim() !== '');
      for (const member of activeMembers) {
        try {
          await sendReceiptEmail({
            memberName: member.fullName,
            memberEmail: member.email,
            regId,
            teamLead,
            techEvent: selectedTechEvent?.title || 'None',
            nonTechEvent: selectedNonTechEvent?.title || 'None',
            totalFee,
            passUrl,
            qrUrl,
          });
        } catch (err) {
          console.error(`Email failed for ${member.email}:`, err);
        }
      }

      setShowSuccessModal(true);
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* HEADER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 text-center space-y-4">
        <div className="inline-block bg-[#bb0013] text-white font-anton text-sm sm:text-base px-4 py-1 comic-border-thick transform -rotate-1">
          BATTLE READY?
        </div>

        <h1 className="font-anton text-5xl sm:text-7xl lg:text-8xl text-[#1a1a1a]">
          ASSEMBLE <span className="bg-[#fddc00] text-[#1a1a1a] px-4 py-1 inline-block transform -skew-x-3">YOUR TEAM!</span>
        </h1>

        <p className="font-bricolage text-lg sm:text-xl font-bold text-[#1a1a1a] max-w-3xl mx-auto">
          Enter the arena for Robotron 2027. Code. Create. Compete. Join the most exciting 24-hour hackathon in South India.
        </p>
      </section>

      {/* REGISTRATION FORM & SIDEBAR GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Team Member Tabs Bar */}
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3].map((idx) => {
                const member = registration.members[idx];
                const isActive = activeMemberTab === idx;
                const isFilled = member.fullName.trim() !== '';

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveMemberTab(idx)}
                    className={`font-anton text-base sm:text-lg px-5 py-3 comic-border-thick transition-all cursor-pointer flex items-center gap-2 ${
                      isActive 
                        ? 'bg-[#bb0013] text-white shadow-comic-md scale-105 z-10' 
                        : isFilled 
                          ? 'bg-[#00c853] text-white shadow-comic-sm' 
                          : 'bg-white text-[#1a1a1a] hover:bg-[#efe1c5] shadow-comic-sm'
                    }`}
                  >
                    <span>MEMBER {idx + 1}{idx === 0 ? '*' : ''}</span>
                    {isFilled && <UserCheck className="w-4 h-4 text-[#fddc00]" />}
                  </button>
                );
              })}
            </div>

            {/* Member Form Card */}
            <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 comic-border-ultra shadow-comic-lg space-y-6">
              
              <div className="border-b-4 border-[#1a1a1a] pb-3 flex justify-between items-center">
                <h3 className="font-anton text-2xl sm:text-3xl text-[#1a1a1a]">
                  MEMBER {activeMemberTab + 1} DETAILS {activeMemberTab === 0 ? '(TEAM LEADER)' : '(OPTIONAL)'}
                </h3>
                <span className="font-anton text-xs bg-[#f4ead5] px-3 py-1 comic-border-thick">
                  SLOT #{activeMemberTab + 1}
                </span>
              </div>

              {/* Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-bricolage">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block font-anton text-sm text-[#1a1a1a] uppercase">
                    FULL NAME {activeMemberTab === 0 ? '*' : ''}
                  </label>
                  <input
                    type="text"
                    required={activeMemberTab === 0}
                    value={activeMember.fullName}
                    onChange={(e) => handleMemberChange('fullName', e.target.value)}
                    placeholder={activeMemberTab === 0 ? "STARK INDUSTRIES CEO" : "TEAM MATE NAME"}
                    className="w-full px-4 py-3 bg-[#f4ead5] comic-border-thick font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#bb0013]"
                  />
                </div>

                {/* Date of Birth */}
                <div className="space-y-1.5">
                  <label className="block font-anton text-sm text-[#1a1a1a] uppercase">
                    DATE OF BIRTH
                  </label>
                  <input
                    type="date"
                    value={activeMember.dob}
                    onChange={(e) => handleMemberChange('dob', e.target.value)}
                    className="w-full px-4 py-3 bg-[#f4ead5] comic-border-thick font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#bb0013]"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="block font-anton text-sm text-[#1a1a1a] uppercase">
                    PHONE NUMBER {activeMemberTab === 0 ? '*' : ''}
                  </label>
                  <input
                    type="tel"
                    required={activeMemberTab === 0}
                    value={activeMember.phone}
                    onChange={(e) => handleMemberChange('phone', e.target.value)}
                    placeholder="+91 XXXX XXX XXX"
                    className="w-full px-4 py-3 bg-[#f4ead5] comic-border-thick font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#bb0013]"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block font-anton text-sm text-[#1a1a1a] uppercase">
                    EMAIL ADDRESS {activeMemberTab === 0 ? '*' : ''}
                  </label>
                  <input
                    type="email"
                    required={activeMemberTab === 0}
                    value={activeMember.email}
                    onChange={(e) => handleMemberChange('email', e.target.value)}
                    placeholder="ironman@avengers.com"
                    className="w-full px-4 py-3 bg-[#f4ead5] comic-border-thick font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#bb0013]"
                  />
                </div>

                {/* Branch / Standard */}
                <div className="space-y-1.5">
                  <label className="block font-anton text-sm text-[#1a1a1a] uppercase">
                    BRANCH / STANDARD
                  </label>
                  <input
                    type="text"
                    value={activeMember.branch}
                    onChange={(e) => handleMemberChange('branch', e.target.value)}
                    placeholder="B.E. Robotics / B.Tech CSE"
                    className="w-full px-4 py-3 bg-[#f4ead5] comic-border-thick font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#bb0013]"
                  />
                </div>

                {/* College / School */}
                <div className="space-y-1.5">
                  <label className="block font-anton text-sm text-[#1a1a1a] uppercase">
                    COLLEGE / SCHOOL
                  </label>
                  <input
                    type="text"
                    value={activeMember.college}
                    onChange={(e) => handleMemberChange('college', e.target.value)}
                    placeholder="Park College of Engineering"
                    className="w-full px-4 py-3 bg-[#f4ead5] comic-border-thick font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#bb0013]"
                  />
                </div>

              </div>

              {/* Dashed Line Separator */}
              <div className="border-t-4 border-dashed border-[#1a1a1a] pt-6 space-y-4">
                <div className="bg-[#fddc00] text-[#1a1a1a] font-anton text-xl px-4 py-1.5 inline-block comic-border-thick">
                  EVENT SELECTION
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-bricolage">
                  
                  {/* Technical Event Selector */}
                  <div className="space-y-1.5">
                    <label className="block font-anton text-sm text-[#1a1a1a] uppercase">
                      TECHNICAL EVENTS (OPTIONAL)
                    </label>
                    <select
                      value={registration.selectedTechEventId}
                      onChange={(e) => setRegistration(prev => ({ ...prev, selectedTechEventId: e.target.value }))}
                      className="w-full px-4 py-3 bg-[#f4ead5] comic-border-thick font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#bb0013] cursor-pointer"
                    >
                      <option value="">-- NONE (HACKATHON ONLY) --</option>
                      {TECHNICAL_EVENTS.map((evt) => (
                        <option key={evt.id} value={evt.id}>
                          {evt.code} - {evt.title} (₹{evt.fee})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Non-Technical Event Selector */}
                  <div className="space-y-1.5">
                    <label className="block font-anton text-sm text-[#1a1a1a] uppercase">
                      NON-TECHNICAL EVENTS (OPTIONAL)
                    </label>
                    <select
                      value={registration.selectedNonTechEventId}
                      onChange={(e) => setRegistration(prev => ({ ...prev, selectedNonTechEventId: e.target.value }))}
                      className="w-full px-4 py-3 bg-[#f4ead5] comic-border-thick font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#bb0013] cursor-pointer"
                    >
                      <option value="">-- NONE --</option>
                      {CIVILIAN_EVENTS.map((evt) => (
                        <option key={evt.id} value={evt.id}>
                          {evt.code} - {evt.title} (FREE)
                        </option>
                      ))}
                    </select>
                  </div>

                </div>
              </div>

              {/* Submit Trigger inside form */}
              <button type="submit" className="hidden">Submit</button>

            </form>

          </div>

          {/* Right Column: Fee Summary Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* FEE SUMMARY CARD */}
            <div className="bg-white p-6 comic-border-ultra shadow-comic-lg space-y-5">
              
              <div className="bg-[#1a1a1a] text-white p-3 comic-border-thick text-center font-anton text-2xl tracking-wider">
                FEE SUMMARY
              </div>

              <div className="space-y-3 font-bricolage text-sm font-semibold">
                
                <div className="flex justify-between items-center py-2 border-b border-zinc-200">
                  <span className="text-zinc-700">BASE REGISTRATION</span>
                  <span className="font-anton text-lg text-[#1a1a1a]">₹50</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-zinc-200">
                  <span className="text-zinc-700">TECHNICAL EVENT</span>
                  <span className="font-anton text-lg text-[#bb0013]">
                    {selectedTechEvent ? `+ ₹${selectedTechEvent.fee}` : '₹0'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-zinc-200">
                  <span className="text-zinc-700">NON-TECHNICAL EVENT</span>
                  <span className="font-anton text-lg text-[#00c853]">FREE</span>
                </div>

                <div className="pt-2 border-t-4 border-[#1a1a1a] flex justify-between items-center">
                  <span className="font-anton text-2xl text-[#1a1a1a]">TOTAL</span>
                  <span className="font-anton text-4xl text-[#bb0013]">₹{totalFee}</span>
                </div>

              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-[#bb0013] hover:bg-[#d90017] text-white font-anton text-2xl py-4 comic-border-thick shadow-comic-lg hover:scale-105 active:scale-100 transition-all uppercase cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap className="w-6 h-6 text-[#fddc00] fill-[#fddc00]" />
                {isSubmitting ? 'SUBMITTING...' : 'PROCEED TO PAYMENT'}
              </button>

            </div>

            {/* Warning Alert Box */}
            <div className="bg-[#fddc00] p-4 comic-border-thick shadow-comic flex items-start gap-3 text-[#1a1a1a]">
              <AlertTriangle className="w-6 h-6 text-[#bb0013] shrink-0 mt-0.5" />
              <div className="font-bricolage text-xs font-extrabold leading-tight">
                LIMITED SLOTS REMAINING! COMPLETE YOUR ASSEMBLY BEFORE JAN 14 LOCKOUT.
              </div>
            </div>

            {/* Poster Graphic */}
            <div className="bg-[#1a1a1a] text-white p-6 comic-border-thick shadow-comic text-center space-y-3">
              <div className="font-anton text-3xl text-[#fddc00]">REGISTER NOW</div>
              <p className="font-bricolage text-xs text-zinc-300 font-semibold">
                JOIN THE REVOLUTION OF TOMORROW.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* TICKET SUCCESS MODAL */}
      {showSuccessModal && (
        <TicketModal
          registration={registration}
          regId={generatedRegId}
          onClose={() => setShowSuccessModal(false)}
        />
      )}

    </div>
  );
};
