import React, { useState, useEffect } from 'react';
import { NavTab, SiteContent } from '../types';
import { loadContent, saveContent } from '../services/content';
import { ContentOverrideProvider } from '../ContentOverride';
import { ContentChangeProvider } from '../ContentChange';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { HomeView } from './HomeView';
import { AboutView } from './AboutView';
import { ScheduleView } from './ScheduleView';
import { EventsView } from './EventsView';
import { PrizesView } from './PrizesView';
import { Save, Loader2, CheckCircle2, Eye } from 'lucide-react';

interface AdminEditViewProps {
  setActiveTab: (tab: NavTab) => void;
  onSelectEvent: (id: string) => void;
}

export const AdminEditView: React.FC<AdminEditViewProps> = ({ setActiveTab, onSelectEvent }) => {
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadContent().then(c => { setSiteContent(c); setLoading(false); });
  }, []);

  const handleSave = async () => {
    if (!siteContent) return;
    setSaving(true);
    try {
      await saveContent(siteContent);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Failed to save.');
      console.error(err);
    }
    setSaving(false);
  };

  const handleContentChange = (path: string, value: string) => {
    if (!siteContent) return;
    const keys = path.split('.');
    const updated = JSON.parse(JSON.stringify(siteContent));
    let obj: any = updated;
    for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
    obj[keys[keys.length - 1]] = value;
    setSiteContent(updated);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="w-8 h-8 animate-spin text-[#bb0013]" />
    </div>
  );

  if (!siteContent) return <div className="text-center py-20 font-anton text-xl">Failed to load content</div>;

  return (
    <ContentOverrideProvider value={siteContent}>
      <ContentChangeProvider value={handleContentChange}>
        <div className="min-h-screen bg-[#f4ead5] pb-0">
          {/* Sticky Admin Bar */}
          <div className="sticky top-0 z-[60] bg-[#1a1a1a] border-b-4 border-[#bb0013] px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="bg-[#bb0013] text-white p-1.5 comic-border-thick">
                <Eye className="w-4 h-4" />
              </div>
              <h1 className="font-anton text-sm sm:text-base text-white tracking-wider">
                WEBSITE EDITOR <span className="text-[#fddc00]">— CLICK ANY TEXT TO EDIT</span>
              </h1>
            </div>
            <div className="flex gap-2 items-center">
              <button onClick={() => setActiveTab('home')}
                className="bg-transparent hover:bg-zinc-800 text-white font-anton text-xs px-3 py-1.5 border border-zinc-600 uppercase cursor-pointer">
                VIEW SITE
              </button>
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-1.5 bg-[#bb0013] hover:bg-[#d90017] text-white font-anton text-xs px-4 py-1.5 comic-border-thick shadow-comic uppercase cursor-pointer disabled:opacity-50">
                {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : saved ? <CheckCircle2 className="w-3 h-3" /> : <Save className="w-3 h-3" />}
                {saving ? 'SAVING...' : saved ? 'SAVED!' : 'SAVE ALL'}
              </button>
            </div>
          </div>

          {/* Editable Navbar */}
          <Navbar activeTab="home" setActiveTab={() => {}} editable />

          {/* Full Website - Editable */}
          <HomeView setActiveTab={() => {}} onSelectEvent={() => {}} editable />
          <AboutView setActiveTab={() => {}} editable />
          <ScheduleView setActiveTab={() => {}} editable />
          <EventsView setActiveTab={() => {}} onSelectEvent={() => {}} editable />
          <PrizesView setActiveTab={() => {}} editable />

          {/* Editable Footer */}
          <Footer setActiveTab={() => {}} editable />
        </div>
      </ContentChangeProvider>
    </ContentOverrideProvider>
  );
};
