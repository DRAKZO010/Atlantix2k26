import React, { useState } from 'react';
import { NavTab } from './types';
import { ALL_EVENTS } from './data/events';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { EventsView } from './components/EventsView';
import { ScheduleView } from './components/ScheduleView';
import { PrizesView } from './components/PrizesView';
import { RegisterView } from './components/RegisterView';
import { EventDetailModal } from './components/EventDetailModal';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [preselectedTechId, setPreselectedTechId] = useState<string>('');
  const [preselectedNonTechId, setPreselectedNonTechId] = useState<string>('');

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

  return (
    <div className="min-h-screen flex flex-col bg-[#f4ead5] text-[#1a1a1a] selection:bg-[#e71620] selection:text-white">
      
      {/* Sticky Pop-Art Header Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View Screen Content */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <HomeView 
            setActiveTab={setActiveTab} 
            onSelectEvent={handleSelectEventModal} 
          />
        )}

        {activeTab === 'about' && (
          <AboutView setActiveTab={setActiveTab} />
        )}

        {activeTab === 'events' && (
          <EventsView 
            setActiveTab={setActiveTab} 
            onSelectEvent={handleSelectEventModal} 
          />
        )}

        {activeTab === 'schedule' && (
          <ScheduleView setActiveTab={setActiveTab} />
        )}

        {activeTab === 'prizes' && (
          <PrizesView setActiveTab={setActiveTab} />
        )}

        {activeTab === 'register' && (
          <RegisterView 
            setActiveTab={setActiveTab} 
            preselectedTechId={preselectedTechId}
            preselectedNonTechId={preselectedNonTechId}
          />
        )}
      </main>

      {/* Pop-Art Footer */}
      <Footer setActiveTab={setActiveTab} />

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
