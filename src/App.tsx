import React, { useState, useEffect } from 'react';
import { NavTab, SiteContent } from './types';
import { loadContent } from './services/content';
import { ALL_EVENTS } from './data/events';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { EventsView } from './components/EventsView';
import { ScheduleView } from './components/ScheduleView';
import { PrizesView } from './components/PrizesView';
import { RegisterView } from './components/RegisterView';
import { AdminView } from './components/AdminView';
import { EventDetailModal } from './components/EventDetailModal';

const ADMIN_PASSWORD = 'robotron2027';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [preselectedTechId, setPreselectedTechId] = useState<string>('');
  const [preselectedNonTechId, setPreselectedNonTechId] = useState<string>('');
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPassInput, setAdminPassInput] = useState('');
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    loadContent().then(c => setSiteContent(c));
  }, []);

  useEffect(() => {
    if (activeTab !== 'admin') {
      loadContent().then(c => setSiteContent(c));
    }
  }, [activeTab]);

  const content = siteContent || {} as SiteContent;

  const selectedEvent = ALL_EVENTS.find(e => e.id === selectedEventId);

  const handleSelectEventModal = (eventId: string) => {
    setSelectedEventId(eventId);
  };

  const handleSelectEventForRegistration = (eventId: string, category: 'technical' | 'civilian') => {
    if (category === 'technical') {
      setPreselectedTechId(eventId);
    } else {
      setPreselectedNonTechId(eventId);
    }
    setActiveTab('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminNav = () => {
    if (adminUnlocked) {
      setActiveTab('admin');
    } else {
      setActiveTab('admin');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4ead5] text-[#1a1a1a] selection:bg-[#e71620] selection:text-white">
      
      {/* Sticky Pop-Art Header Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={(tab) => {
        if (tab === 'admin') {
          handleAdminNav();
        } else {
          setActiveTab(tab);
        }
      }} />

      {/* Main View Screen Content */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <HomeView 
            setActiveTab={setActiveTab} 
            onSelectEvent={handleSelectEventModal} 
            siteContent={content}
          />
        )}

        {activeTab === 'about' && (
          <AboutView setActiveTab={setActiveTab} siteContent={content} />
        )}

        {activeTab === 'events' && (
          <EventsView 
            setActiveTab={setActiveTab} 
            onSelectEvent={handleSelectEventModal} 
            siteContent={content}
          />
        )}

        {activeTab === 'schedule' && (
          <ScheduleView setActiveTab={setActiveTab} siteContent={content} />
        )}

        {activeTab === 'prizes' && (
          <PrizesView setActiveTab={setActiveTab} siteContent={content} />
        )}

        {activeTab === 'register' && (
          <RegisterView 
            setActiveTab={setActiveTab} 
            preselectedTechId={preselectedTechId}
            preselectedNonTechId={preselectedNonTechId}
          />
        )}

        {activeTab === 'admin' && (
          adminUnlocked ? (
            <AdminView setActiveTab={setActiveTab} />
          ) : (
            <div className="flex items-center justify-center min-h-[60vh] px-4">
              <div className="bg-white p-8 comic-border-ultra shadow-comic-lg max-w-md w-full text-center space-y-6">
                <div className="bg-[#1a1a1a] text-white p-4 comic-border-thick font-anton text-2xl tracking-wider">
                  ADMIN ACCESS
                </div>
                <p className="font-bricolage text-sm text-zinc-600">Enter the admin password to access the content manager.</p>
                <input
                  type="password"
                  value={adminPassInput}
                  onChange={(e) => setAdminPassInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (adminPassInput === ADMIN_PASSWORD) {
                        setAdminUnlocked(true);
                      } else {
                        alert('Wrong password');
                      }
                    }
                  }}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 bg-[#f4ead5] comic-border-thick font-bricolage text-sm focus:outline-none focus:ring-2 focus:ring-[#bb0013] text-center"
                />
                <button
                  onClick={() => {
                    if (adminPassInput === ADMIN_PASSWORD) {
                      setAdminUnlocked(true);
                    } else {
                      alert('Wrong password');
                    }
                  }}
                  className="w-full bg-[#bb0013] hover:bg-[#d90017] text-white font-anton text-xl py-3 comic-border-thick shadow-comic uppercase cursor-pointer"
                >
                  UNLOCK
                </button>
              </div>
            </div>
          )
        )}
      </main>

      {/* Pop-Art Footer */}
      <Footer setActiveTab={setActiveTab} siteContent={content} />

      {/* Event Details Popup Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEventId(null)}
          onSelectForRegistration={handleSelectEventForRegistration}
        />
      )}

    </div>
  );
}

export default App;
