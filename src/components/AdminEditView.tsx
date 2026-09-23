import React, { useState, useEffect, useCallback } from 'react';
import { NavTab, SiteContent } from '../types';
import { loadContent, saveContent } from '../services/content';
import { ContentOverrideProvider } from '../ContentOverride';
import { ContentChangeProvider } from '../ContentChange';
import { useUndoRedo } from '../hooks/useUndoRedo';
import { Footer } from './Footer';
import { HomeView } from './HomeView';
import { AboutView } from './AboutView';
import { ScheduleView } from './ScheduleView';
import { EventsView } from './EventsView';
import { PrizesView } from './PrizesView';
import { Loader2 } from 'lucide-react';

interface AdminControls {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  historyLabel: string;
  onSave: () => void;
  saving: boolean;
  saved: boolean;
}

interface AdminEditViewProps {
  setActiveTab: (tab: NavTab) => void;
  onSelectEvent: (id: string) => void;
  onControlsReady?: (controls: AdminControls | null) => void;
}

export const AdminEditView: React.FC<AdminEditViewProps> = ({ setActiveTab, onSelectEvent, onControlsReady }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const undoRedo = useUndoRedo<SiteContent | null>(null);
  const siteContent = undoRedo.state;

  useEffect(() => {
    loadContent().then(c => {
      undoRedo.reset(c);
      setLoading(false);
    });
  }, []);

  const handleSave = useCallback(async () => {
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
  }, [siteContent]);

  // Expose controls to parent (App.tsx) for Navbar integration
  useEffect(() => {
    if (!onControlsReady) return;
    onControlsReady({
      onUndo: undoRedo.undo,
      onRedo: undoRedo.redo,
      canUndo: undoRedo.canUndo,
      canRedo: undoRedo.canRedo,
      historyLabel: `${undoRedo.currentIndex + 1}/${undoRedo.historyLength}`,
      onSave: handleSave,
      saving,
      saved,
    });
    return () => onControlsReady(null);
  }, [undoRedo.canUndo, undoRedo.canRedo, undoRedo.currentIndex, undoRedo.historyLength, saving, saved, handleSave]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;
      if (!isMod) return;

      if (e.key === 'z' && !e.shiftKey) { e.preventDefault(); undoRedo.undo(); }
      if (e.key === 'z' && e.shiftKey)  { e.preventDefault(); undoRedo.redo(); }
      if (e.key === 'y')                { e.preventDefault(); undoRedo.redo(); }
      if (e.key === 's')                { e.preventDefault(); handleSave(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undoRedo, siteContent, handleSave]);

  const handleContentChange = useCallback((path: string, value: string) => {
    if (!siteContent) return;
    const keys = path.split('.');
    const updated = JSON.parse(JSON.stringify(siteContent));
    let obj: any = updated;
    for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
    obj[keys[keys.length - 1]] = value;
    undoRedo.push(updated);
  }, [siteContent, undoRedo]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="w-8 h-8 animate-spin text-[#bb0013]" />
    </div>
  );

  if (!siteContent) return <div className="text-center py-20 font-anton text-xl">Failed to load content</div>;

  return (
    <ContentOverrideProvider value={siteContent}>
      <ContentChangeProvider value={handleContentChange}>
        <div className="min-h-screen bg-[#f4ead5]">
          {/* Full Website - Editable (no duplicate Navbar, no admin bar) */}
          <HomeView setActiveTab={() => {}} onSelectEvent={() => {}} editable />
          <AboutView setActiveTab={() => {}} editable />
          <ScheduleView setActiveTab={() => {}} editable />
          <EventsView setActiveTab={() => {}} onSelectEvent={() => {}} editable />
          <PrizesView setActiveTab={() => {}} editable />
          <Footer setActiveTab={() => {}} editable />
        </div>
      </ContentChangeProvider>
    </ContentOverrideProvider>
  );
};
