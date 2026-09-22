import React, { useState, useEffect, useRef } from 'react';
import { NavTab, SiteContent } from '../types';
import { loadContent, saveContent } from '../services/content';
import { ContentOverrideProvider } from '../ContentOverride';
import { HomeView } from './HomeView';
import { AboutView } from './AboutView';
import { ScheduleView } from './ScheduleView';
import { EventsView } from './EventsView';
import { PrizesView } from './PrizesView';
import { Pencil, X, Save, Loader2, CheckCircle2, Eye, ChevronDown, ChevronUp } from 'lucide-react';

interface AdminEditViewProps {
  setActiveTab: (tab: NavTab) => void;
  onSelectEvent: (id: string) => void;
}

type EditTarget =
  | 'hero' | 'about' | 'stats'
  | 'schedule-day1' | 'schedule-day2'
  | 'events-tech' | 'events-civ'
  | 'prizes' | 'prizes-special'
  | 'contact' | 'footer';

const SECTIONS: { id: EditTarget; label: string }[] = [
  { id: 'hero', label: 'HERO SECTION' },
  { id: 'about', label: 'ABOUT SECTION' },
  { id: 'stats', label: 'STATS' },
  { id: 'schedule-day1', label: 'SCHEDULE - DAY 1' },
  { id: 'schedule-day2', label: 'SCHEDULE - DAY 2' },
  { id: 'events-tech', label: 'TECHNICAL EVENTS' },
  { id: 'events-civ', label: 'CIVILIAN EVENTS' },
  { id: 'prizes', label: 'PRIZES' },
  { id: 'prizes-special', label: 'SPECIAL AWARDS' },
  { id: 'contact', label: 'CONTACT INFO' },
  { id: 'footer', label: 'FOOTER' },
];

const EditForm: React.FC<{
  target: EditTarget;
  content: SiteContent;
  updateField: (path: string, value: string) => void;
  updateArrayItem: (basePath: string, index: number, field: string, value: any) => void;
  setSiteContent: React.Dispatch<React.SetStateAction<SiteContent | null>>;
  siteContent: SiteContent;
}> = ({ target, content: c, updateField, updateArrayItem, setSiteContent, siteContent }) => {

  const Input = ({ label, value, path, multiline, customUpdate }: {
    label: string; value: string; path: string; multiline?: boolean; customUpdate?: (v: string) => void;
  }) => (
    <div className="space-y-1">
      <label className="block font-bricolage text-xs font-bold text-zinc-500 uppercase tracking-wide">{label}</label>
      {multiline ? (
        <textarea value={value} rows={3} onChange={e => customUpdate ? customUpdate(e.target.value) : updateField(path, e.target.value)}
          className="w-full px-3 py-2 bg-white border-2 border-zinc-300 focus:border-[#bb0013] font-bricolage text-sm outline-none transition-colors" />
      ) : (
        <input type="text" value={value} onChange={e => customUpdate ? customUpdate(e.target.value) : updateField(path, e.target.value)}
          className="w-full px-3 py-2 bg-white border-2 border-zinc-300 focus:border-[#bb0013] font-bricolage text-sm outline-none transition-colors" />
      )}
    </div>
  );

  return (
    <div className="space-y-3">
      {target === 'hero' && (<>
        <Input label="Badge Text" value={c.hero.badge} path="hero.badge" />
        <Input label="Main Title" value={c.hero.title} path="hero.title" />
        <Input label="Subtitle" value={c.hero.subtitle} path="hero.subtitle" multiline />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Date" value={c.hero.date} path="hero.date" />
          <Input label="Venue" value={c.hero.venue} path="hero.venue" />
        </div>
      </>)}

      {target === 'about' && (<>
        <Input label="Section Heading" value={c.about.heading} path="about.heading" />
        {c.about.cards.map((card, i) => (
          <div key={i} className="border-t border-zinc-200 pt-3 space-y-2">
            <p className="font-anton text-xs text-[#bb0013]">CARD {i + 1}</p>
            <Input label="Title" value={card.title} path={`about.cards.${i}.title`} />
            <Input label="Description" value={card.description} path={`about.cards.${i}.description`} multiline />
          </div>
        ))}
      </>)}

      {target === 'stats' && (
        <div className="grid grid-cols-3 gap-3">
          <Input label="Hours" value={c.stats.hours} path="stats.hours" />
          <Input label="Prize Pool" value={c.stats.prizePool} path="stats.prizePool" />
          <Input label="Events Count" value={c.stats.events} path="stats.events" />
        </div>
      )}

      {(target === 'schedule-day1' || target === 'schedule-day2') && (() => {
        const day = target === 'schedule-day1' ? 'day1' : 'day2';
        return (
          <div className="space-y-3">
            {c.schedule[day].map((item, i) => (
              <div key={i} className={`p-3 border-2 space-y-2 ${item.isHighlight ? 'border-[#bb0013] bg-red-50' : 'border-zinc-200 bg-zinc-50'}`}>
                <div className="grid grid-cols-2 gap-2">
                  <Input label="Time" value={item.time} path={`schedule.${day}.${i}.time`} />
                  <Input label="Title" value={item.title} path={`schedule.${day}.${i}.title`} />
                </div>
                <Input label="Description" value={item.description} path={`schedule.${day}.${i}.description`} multiline />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={item.isHighlight || false}
                    onChange={e => updateArrayItem(`schedule.${day}`, i, 'isHighlight', e.target.checked)}
                    className="w-4 h-4 accent-[#bb0013]" />
                  <span className="font-bricolage text-xs font-bold text-zinc-600 uppercase">Highlight</span>
                </label>
              </div>
            ))}
          </div>
        );
      })()}

      {target === 'events-tech' && (
        <div className="space-y-3">
          {c.events.technical.map((evt, i) => (
            <div key={i} className="p-3 border-2 border-zinc-200 bg-zinc-50 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Input label="Code" value={evt.code} path={`events.technical.${i}.code`} />
                <Input label="Title" value={evt.title} path={`events.technical.${i}.title`} />
              </div>
              <Input label="Description" value={evt.description} path={`events.technical.${i}.description`} multiline />
              <div className="grid grid-cols-2 gap-2">
                <Input label="Fee (₹)" value={String(evt.fee)} path={`events.technical.${i}.fee`}
                  customUpdate={v => updateArrayItem('events.technical', i, 'fee', parseInt(v) || 0)} />
                <Input label="Team Size" value={evt.teamSize || ''} path={`events.technical.${i}.teamSize`} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input label="Timing" value={evt.timing || ''} path={`events.technical.${i}.timing`} />
                <Input label="Venue" value={evt.venue || ''} path={`events.technical.${i}.venue`} />
              </div>
            </div>
          ))}
        </div>
      )}

      {target === 'events-civ' && (
        <div className="space-y-3">
          {c.events.civilian.map((evt, i) => (
            <div key={i} className="p-3 border-2 border-zinc-200 bg-zinc-50 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Input label="Code" value={evt.code} path={`events.civilian.${i}.code`} />
                <Input label="Title" value={evt.title} path={`events.civilian.${i}.title`} />
              </div>
              <Input label="Description" value={evt.description} path={`events.civilian.${i}.description`} multiline />
              <div className="grid grid-cols-2 gap-2">
                <Input label="Fee (₹)" value={String(evt.fee)} path={`events.civilian.${i}.fee`}
                  customUpdate={v => updateArrayItem('events.civilian', i, 'fee', parseInt(v) || 0)} />
                <Input label="Team Size" value={evt.teamSize || ''} path={`events.civilian.${i}.teamSize`} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input label="Timing" value={evt.timing || ''} path={`events.civilian.${i}.timing`} />
                <Input label="Venue" value={evt.venue || ''} path={`events.civilian.${i}.venue`} />
              </div>
            </div>
          ))}
        </div>
      )}

      {target === 'prizes' && (<>
        <Input label="Prize Pool Total" value={c.prizes.pool} path="prizes.pool" />
        {(['first', 'second', 'third'] as const).map(rank => (
          <div key={rank} className="border-t border-zinc-200 pt-3 space-y-2">
            <p className="font-anton text-xs text-[#bb0013]">{rank.toUpperCase()} PLACE</p>
            <div className="grid grid-cols-2 gap-2">
              <Input label="Title" value={c.prizes[rank].title} path={`prizes.${rank}.title`} />
              <Input label="Amount" value={c.prizes[rank].amount} path={`prizes.${rank}.amount`} />
            </div>
            <Input label="Perks (comma separated)" value={c.prizes[rank].perks.join(', ')} path={`prizes.${rank}.perks`}
              customUpdate={v => {
                const updated = JSON.parse(JSON.stringify(siteContent));
                updated.prizes[rank].perks = v ? v.split(',').map(s => s.trim()).filter(Boolean) : [];
                setSiteContent(updated);
              }} />
          </div>
        ))}
      </>)}

      {target === 'prizes-special' && (
        <div className="space-y-3">
          {c.prizes.special.map((award, i) => (
            <div key={i} className="p-3 bg-zinc-50 border-2 border-zinc-200 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Input label="Title" value={award.title} path={`prizes.special.${i}.title`} />
                <Input label="Reward" value={award.reward} path={`prizes.special.${i}.reward`} />
              </div>
              <Input label="Description" value={award.description} path={`prizes.special.${i}.description`} multiline />
            </div>
          ))}
        </div>
      )}

      {target === 'contact' && (<>
        <Input label="Address" value={c.contact.address} path="contact.address" multiline />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Email 1" value={c.contact.emails[0] || ''} path="contact.emails.0" />
          <Input label="Email 2" value={c.contact.emails[1] || ''} path="contact.emails.1" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Phone 1" value={c.contact.phones[0] || ''} path="contact.phones.0" />
          <Input label="Phone 2" value={c.contact.phones[1] || ''} path="contact.phones.1" />
        </div>
      </>)}

      {target === 'footer' && (<>
        <Input label="Brand Name" value={c.footer.brand} path="footer.brand" />
        <Input label="Tagline" value={c.footer.tagline} path="footer.tagline" />
        <Input label="Copyright" value={c.footer.copyright} path="footer.copyright" />
      </>)}
    </div>
  );
};

export const AdminEditView: React.FC<AdminEditViewProps> = ({ setActiveTab, onSelectEvent }) => {
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editTarget, setEditTarget] = useState<EditTarget | null>(null);
  const editFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadContent().then(c => { setSiteContent(c); setLoading(false); });
  }, []);

  useEffect(() => {
    if (editTarget && editFormRef.current) {
      setTimeout(() => {
        editFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [editTarget]);

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

  const updateField = (path: string, value: string) => {
    if (!siteContent) return;
    const keys = path.split('.');
    const updated = JSON.parse(JSON.stringify(siteContent));
    let obj: any = updated;
    for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
    obj[keys[keys.length - 1]] = value;
    setSiteContent(updated);
  };

  const updateArrayItem = (basePath: string, index: number, field: string, value: any) => {
    if (!siteContent) return;
    const keys = basePath.split('.');
    const updated = JSON.parse(JSON.stringify(siteContent));
    let obj: any = updated;
    for (const k of keys) obj = obj[k];
    obj[index][field] = value;
    setSiteContent(updated);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="w-8 h-8 animate-spin text-[#bb0013]" />
    </div>
  );

  if (!siteContent) return <div className="text-center py-20 font-anton text-xl">Failed to load content</div>;

  const toggle = (t: EditTarget) => setEditTarget(prev => prev === t ? null : t);

  const EditButton: React.FC<{ target: EditTarget; className?: string }> = ({ target, className = '' }) => {
    const isOpen = editTarget === target;
    return (
      <button
        onClick={(e) => { e.stopPropagation(); toggle(target); }}
        className={`absolute z-30 flex items-center gap-1.5 px-3 py-1.5 font-anton text-xs tracking-wider cursor-pointer transition-all shadow-comic comic-border-thick ${isOpen ? 'bg-[#fddc00] text-[#1a1a1a] hover:bg-[#ffe44d]' : 'bg-[#1a1a1a] text-white hover:bg-[#bb0013]'} ${className}`}
      >
        <Pencil className="w-3 h-3" />
        {isOpen ? 'CLOSE' : 'EDIT'}
      </button>
    );
  };

  const InlineEditForm: React.FC<{ target: EditTarget }> = ({ target }) => {
    if (editTarget !== target) return null;
    return (
      <div ref={editFormRef} className="border-y-4 border-[#bb0013] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-anton text-lg text-[#bb0013] tracking-wider">
              {SECTIONS.find(s => s.id === target)?.label}
            </h3>
            <div className="flex gap-2">
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-1.5 bg-[#bb0013] hover:bg-[#d90017] text-white font-anton text-xs px-4 py-2 comic-border-thick uppercase cursor-pointer disabled:opacity-50">
                {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : saved ? <CheckCircle2 className="w-3 h-3" /> : <Save className="w-3 h-3" />}
                {saving ? 'SAVING...' : saved ? 'SAVED!' : 'SAVE'}
              </button>
              <button onClick={() => setEditTarget(null)}
                className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-anton text-xs px-4 py-2 border-2 border-zinc-300 uppercase cursor-pointer">
                <X className="w-3 h-3 inline mr-1" />CLOSE
              </button>
            </div>
          </div>
          <EditForm
            target={target}
            content={siteContent}
            updateField={updateField}
            updateArrayItem={updateArrayItem}
            setSiteContent={setSiteContent}
            siteContent={siteContent}
          />
        </div>
      </div>
    );
  };

  return (
    <ContentOverrideProvider value={siteContent}>
      <div className="min-h-screen bg-[#f4ead5] pb-20">
        {/* Sticky Admin Bar */}
        <div className="sticky top-0 z-50 bg-[#1a1a1a] border-b-4 border-[#bb0013] px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="bg-[#bb0013] text-white p-1.5 comic-border-thick">
              <Eye className="w-4 h-4" />
            </div>
            <h1 className="font-anton text-sm sm:text-base text-white tracking-wider">WEBSITE EDITOR <span className="text-[#fddc00]">— LIVE PREVIEW</span></h1>
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

        {/* === WEBSITE PREVIEW + INLINE EDIT === */}

        {/* HERO */}
        <div className="relative group/section">
          <EditButton target="hero" className="top-6 right-6 sm:right-8" />
          <HomeView setActiveTab={() => {}} onSelectEvent={() => {}} />
        </div>
        <InlineEditForm target="hero" />

        {/* ABOUT */}
        <div className="relative group/section">
          <EditButton target="about" className="top-6 right-6 sm:right-8" />
          <AboutView setActiveTab={() => {}} />
        </div>
        <InlineEditForm target="about" />

        {/* STATS (inside About, separate edit) */}
        <div className="relative group/section">
          <EditButton target="stats" className="top-4 right-6 sm:right-8" />
        </div>
        <InlineEditForm target="stats" />

        {/* SCHEDULE */}
        <div className="relative group/section">
          <div className="absolute top-6 right-6 sm:right-8 z-30 flex gap-2">
            <button onClick={() => toggle('schedule-day1')}
              className={`flex items-center gap-1 px-3 py-1.5 font-anton text-xs tracking-wider cursor-pointer transition-all shadow-comic comic-border-thick ${editTarget === 'schedule-day1' ? 'bg-[#fddc00] text-[#1a1a1a]' : 'bg-[#1a1a1a] text-white hover:bg-[#bb0013]'}`}>
              <Pencil className="w-3 h-3" /> DAY 1
            </button>
            <button onClick={() => toggle('schedule-day2')}
              className={`flex items-center gap-1 px-3 py-1.5 font-anton text-xs tracking-wider cursor-pointer transition-all shadow-comic comic-border-thick ${editTarget === 'schedule-day2' ? 'bg-[#fddc00] text-[#1a1a1a]' : 'bg-[#1a1a1a] text-white hover:bg-[#bb0013]'}`}>
              <Pencil className="w-3 h-3" /> DAY 2
            </button>
          </div>
          <ScheduleView setActiveTab={() => {}} />
        </div>
        <InlineEditForm target="schedule-day1" />
        <InlineEditForm target="schedule-day2" />

        {/* EVENTS */}
        <div className="relative group/section">
          <div className="absolute top-6 right-6 sm:right-8 z-30 flex gap-2">
            <button onClick={() => toggle('events-tech')}
              className={`flex items-center gap-1 px-3 py-1.5 font-anton text-xs tracking-wider cursor-pointer transition-all shadow-comic comic-border-thick ${editTarget === 'events-tech' ? 'bg-[#fddc00] text-[#1a1a1a]' : 'bg-[#1a1a1a] text-white hover:bg-[#bb0013]'}`}>
              <Pencil className="w-3 h-3" /> TECH EVENTS
            </button>
            <button onClick={() => toggle('events-civ')}
              className={`flex items-center gap-1 px-3 py-1.5 font-anton text-xs tracking-wider cursor-pointer transition-all shadow-comic comic-border-thick ${editTarget === 'events-civ' ? 'bg-[#fddc00] text-[#1a1a1a]' : 'bg-[#1a1a1a] text-white hover:bg-[#bb0013]'}`}>
              <Pencil className="w-3 h-3" /> CIVILIAN EVENTS
            </button>
          </div>
          <EventsView setActiveTab={() => {}} onSelectEvent={() => {}} />
        </div>
        <InlineEditForm target="events-tech" />
        <InlineEditForm target="events-civ" />

        {/* PRIZES */}
        <div className="relative group/section">
          <div className="absolute top-6 right-6 sm:right-8 z-30 flex gap-2">
            <button onClick={() => toggle('prizes')}
              className={`flex items-center gap-1 px-3 py-1.5 font-anton text-xs tracking-wider cursor-pointer transition-all shadow-comic comic-border-thick ${editTarget === 'prizes' ? 'bg-[#fddc00] text-[#1a1a1a]' : 'bg-[#1a1a1a] text-white hover:bg-[#bb0013]'}`}>
              <Pencil className="w-3 h-3" /> PRIZES
            </button>
            <button onClick={() => toggle('prizes-special')}
              className={`flex items-center gap-1 px-3 py-1.5 font-anton text-xs tracking-wider cursor-pointer transition-all shadow-comic comic-border-thick ${editTarget === 'prizes-special' ? 'bg-[#fddc00] text-[#1a1a1a]' : 'bg-[#1a1a1a] text-white hover:bg-[#bb0013]'}`}>
              <Pencil className="w-3 h-3" /> SPECIAL AWARDS
            </button>
          </div>
          <PrizesView setActiveTab={() => {}} />
        </div>
        <InlineEditForm target="prizes" />
        <InlineEditForm target="prizes-special" />

        {/* CONTACT & FOOTER - at the bottom */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
          <div className="bg-white comic-border-thick shadow-comic p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-anton text-lg text-[#1a1a1a] tracking-wider">CONTACT INFO & FOOTER</h3>
              <div className="flex gap-2">
                <button onClick={() => toggle('contact')}
                  className={`flex items-center gap-1 px-3 py-1.5 font-anton text-xs tracking-wider cursor-pointer transition-all comic-border-thick ${editTarget === 'contact' ? 'bg-[#fddc00] text-[#1a1a1a]' : 'bg-[#1a1a1a] text-white hover:bg-[#bb0013]'}`}>
                  <Pencil className="w-3 h-3" /> CONTACT
                </button>
                <button onClick={() => toggle('footer')}
                  className={`flex items-center gap-1 px-3 py-1.5 font-anton text-xs tracking-wider cursor-pointer transition-all comic-border-thick ${editTarget === 'footer' ? 'bg-[#fddc00] text-[#1a1a1a]' : 'bg-[#1a1a1a] text-white hover:bg-[#bb0013]'}`}>
                  <Pencil className="w-3 h-3" /> FOOTER
                </button>
              </div>
            </div>
            {/* Quick preview of current values */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bricolage text-zinc-500">
              <div><span className="font-bold text-zinc-700">Email:</span> {siteContent.contact.emails[0]}</div>
              <div><span className="font-bold text-zinc-700">Phone:</span> {siteContent.contact.phones[0]}</div>
              <div><span className="font-bold text-zinc-700">Brand:</span> {siteContent.footer.brand}</div>
              <div><span className="font-bold text-zinc-700">©</span> {siteContent.footer.copyright}</div>
            </div>
          </div>
        </div>
        <InlineEditForm target="contact" />
        <InlineEditForm target="footer" />

      </div>
    </ContentOverrideProvider>
  );
};
