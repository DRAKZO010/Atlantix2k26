import React from 'react';
import { NavTab } from '../types';
import { Calendar, MapPin, Rocket, Trophy, Users, ShieldAlert, Cpu } from 'lucide-react';

interface AboutViewProps {
  setActiveTab: (tab: NavTab) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-12 pb-16">
      
      {/* SECTION 1: THE MISSION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white p-6 sm:p-10 comic-border-ultra shadow-comic-lg relative">
          
          {/* Top Badge */}
          <div className="bg-[#bb0013] text-white font-anton text-sm sm:text-base px-4 py-1 inline-block comic-border-thick mb-4 transform -skew-x-6">
            THE MISSION
          </div>

          {/* Headline */}
          <h1 className="font-anton text-5xl sm:text-7xl lg:text-8xl text-[#1a1a1a] leading-none mb-6">
            CODE. CREATE.<br />
            <span className="bg-[#bb0013] text-white px-3 py-1 inline-block transform -skew-x-3">
              COMPETE.
            </span>
          </h1>

          <p className="font-bricolage text-lg sm:text-xl text-zinc-800 font-medium leading-relaxed max-w-3xl mb-8">
            ROBOTRON 2027 is not just a hackathon. It is a 24-hour high-stakes arena where South India's brilliant minds converge to solve real-world problems through raw technology and creativity.
          </p>

          {/* Date & Location Bar */}
          <div className="bg-[#efe1c5] p-4 comic-border-thick flex flex-col sm:flex-row items-center justify-between gap-4 font-anton text-lg sm:text-xl">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[#bb0013]" />
              <span>JANUARY 15-16, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-[#bb0013]" />
              <span>COIMBATORE, INDIA</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: ABOUT ROBOTRON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Yellow Header Badge */}
        <div className="mb-8">
          <div className="bg-[#fddc00] text-[#1a1a1a] font-anton text-3xl sm:text-5xl px-6 py-2 inline-block comic-border-ultra shadow-comic transform -skew-x-6">
            ABOUT ROBOTRON
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Main Card: Mecha Artwork & Innovation Hub */}
          <div className="bg-[#1a1a1a] text-white comic-border-ultra shadow-comic-lg flex flex-col justify-between overflow-hidden relative group">
            
            <div className="relative h-64 sm:h-80 w-full overflow-hidden border-b-4 border-white bg-zinc-900">
              {/* Hotlinked / Styled Mecha Canvas Graphic */}
              <img 
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80" 
                alt="Robotron Origins Mecha" 
                className="w-full h-full object-cover grayscale contrast-125 opacity-80 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-[#bb0013] text-white font-anton text-xs sm:text-sm px-3 py-1 comic-border-thick tracking-widest">
                JT - ROBOTRON 2027
              </div>
              <div className="absolute bottom-2 right-3 text-zinc-400 font-anton text-xs tracking-wider">
                FIRST ORIGINS
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4 bg-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <Rocket className="w-7 h-7 text-[#bb0013]" />
                <h3 className="font-anton text-2xl sm:text-3xl text-white">INNOVATION HUB</h3>
              </div>
              <p className="font-bricolage text-sm sm:text-base text-zinc-300 leading-relaxed">
                Join the most exciting hackathon in South India. Our innovation hub is a pressure cooker for ideas, where cross-disciplinary teams forge the future of AI, ML, and sustainable technology.
              </p>
            </div>

          </div>

          {/* Right Column Stacked Cards */}
          <div className="space-y-6 flex flex-col justify-between">
            
            {/* Card 1: Compete & Win */}
            <div className="bg-[#efe1c5] p-6 sm:p-8 comic-border-ultra shadow-comic-lg flex-1 space-y-4">
              <div className="flex items-center gap-3 text-[#1a1a1a]">
                <Trophy className="w-8 h-8 text-[#bb0013]" />
                <h3 className="font-anton text-2xl sm:text-3xl">COMPETE & WIN</h3>
              </div>
              <p className="font-bricolage text-sm sm:text-base text-zinc-800 leading-relaxed">
                Compete for amazing prizes worth ₹50,000. Showcase your technical skills across categories from Cybersecurity to Robo Soccer.
              </p>
            </div>

            {/* Card 2: Network & Learn */}
            <div className="bg-[#efe1c5] p-6 sm:p-8 comic-border-ultra shadow-comic-lg flex-1 space-y-4">
              <div className="flex items-center gap-3 text-[#1a1a1a]">
                <Users className="w-8 h-8 text-[#bb0013]" />
                <h3 className="font-anton text-2xl sm:text-3xl">NETWORK & LEARN</h3>
              </div>
              <p className="font-bricolage text-sm sm:text-base text-zinc-800 leading-relaxed">
                Connect with industry experts and mentors. Participate in workshops and gain insights that redefine your career path.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* SECTION 3: RED STATS BANNER */}
      <section className="bg-[#bb0013] py-8 border-y-4 border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            
            <div className="bg-white p-6 comic-border-thick shadow-comic transform -rotate-2">
              <div className="font-anton text-6xl text-[#1a1a1a]">24</div>
              <div className="font-anton text-xl tracking-wider text-[#bb0013] mt-1">HOURS OF CODING</div>
            </div>

            <div className="bg-white p-6 comic-border-thick shadow-comic transform rotate-1">
              <div className="font-anton text-6xl text-[#1a1a1a]">50K</div>
              <div className="font-anton text-xl tracking-wider text-[#bb0013] mt-1">PRIZE POOL</div>
            </div>

            <div className="bg-white p-6 comic-border-thick shadow-comic transform -rotate-1">
              <div className="font-anton text-6xl text-[#1a1a1a]">15+</div>
              <div className="font-anton text-xl tracking-wider text-[#bb0013] mt-1">EVENTS</div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: DRIVE INNOVATION FORWARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Poster Image */}
          <div className="lg:col-span-5 bg-white p-3 comic-border-ultra shadow-comic-lg transform -rotate-1">
            <img 
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80" 
              alt="Engineers and Hackers in Lab" 
              className="w-full h-80 object-cover comic-border-thick grayscale contrast-125"
            />
            <div className="font-anton text-center text-sm py-2 tracking-widest text-[#1a1a1a]">
              ROBOTRON 2027 LAB SESSIONS
            </div>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-8 comic-border-ultra shadow-comic-lg space-y-4">
              <h2 className="font-anton text-4xl sm:text-5xl text-[#1a1a1a]">
                DRIVE INNOVATION<br />
                <span className="text-[#bb0013]">FORWARD.</span>
              </h2>
              <p className="font-bricolage text-base text-zinc-800 leading-relaxed">
                The world is facing unprecedented challenges. From environmental crises to systemic inefficiencies, the solutions of tomorrow are hidden in the lines of code written today.
              </p>
            </div>

            {/* Dashed Box Statement */}
            <div className="border-4 border-dashed border-[#1a1a1a] p-6 bg-[#f4ead5] font-bricolage text-sm text-zinc-800 leading-relaxed font-semibold">
              Robotron 2027 provides the platform, the community, and the resources to turn speculative ideas into functional prototypes. Whether you are building a line-follower robot or a complex AI model, your mission remains the same: Solve. Adapt. Evolve.
            </div>

            {/* Red Button CTA */}
            <div>
              <button
                onClick={() => setActiveTab('events')}
                className="bg-[#bb0013] hover:bg-[#d90017] text-white font-anton text-xl tracking-wider px-8 py-3.5 comic-border-thick shadow-comic uppercase cursor-pointer"
              >
                LEARN MORE ABOUT CHALLENGES
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* QUOTE BLOCK */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1a1a1a] text-white p-8 sm:p-12 comic-border-ultra shadow-comic-xl text-center space-y-4">
          <p className="font-anton text-2xl sm:text-4xl text-[#fddc00] tracking-wide leading-snug">
            "THE BEST WAY TO PREDICT THE FUTURE IS TO ASSEMBLE AND BUILD IT."
          </p>
          <p className="font-anton text-[#bb0013] text-lg tracking-widest">
            — ROBOTRON CORE 2027
          </p>
        </div>
      </section>

    </div>
  );
};
