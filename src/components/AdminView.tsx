import React, { useState, useEffect } from 'react';
import { NavTab, SiteContent } from '../types';
import { loadContent, saveContent } from '../services/content';
import { Save, Loader2, CheckCircle2, ChevronDown, ChevronUp, Settings } from 'lucide-react';

interface AdminViewProps {
  setActiveTab: (tab: NavTab) => void;
}

type Section = 'hero' | 'about' | 'stats' | 'schedule' | 'prizes' | 'contact' | 'footer';

export const AdminView: React.FC<AdminViewProps> = ({ setActiveTab }) => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [openSection, setOpenSection] = useState<Section | null>('hero');

  useEffect(() => {
    loadContent().then(c => {
      setContent(c);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    try {
      await saveContent(content);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Failed to save. Check console.');
      console.error(err);
    }
    setSaving(false);
  };

  const update = (path: string, value: string) => {
    if (!content) return;
    const keys = path.split('.');
    const updated = JSON.parse(JSON.stringify(content));
    let obj: any = updated;
    for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
    obj[keys[keys.length - 1]] = value;
    setContent(updated);
  };

  const toggleSection = (s: Section) => setOpenSection(openSection === s ? null : s);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="w-8 h-8 animate-spin text-[#bb0013]" />
    </div>
  );

  if (!content) return <div className="text-center py-20 font-anton text-xl">Failed to load content</div>;

  const SectionHeader = ({ section, title }: { section: Section; title: string }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between bg-[#1a1a1a] text-white p-4 comic-border-thick font-anton text-lg tracking-wider uppercase cursor-pointer hover:bg-[#bb0013] transition-colors"
    >
      <span>{title}</span>
      {openSection === section ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
    </button>
  );

  const Input = ({ label, value, path, multiline }: { label: string; value: string; path: string; multiline?: boolean }) => (
    <div className="space-y-1">
      <label className="block font-bricolage text-xs font-bold text-zinc-600 uppercase">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => update(path, e.target.value)}
          rows={3}
          className="w-full px-3 py-2 bg-[#f4ead5] comic-border-thick font-bricolage text-sm focus:outline-none focus:ring-2 focus:ring-[#bb0013]"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => update(path, e.target.value)}
          className="w-full px-3 py-2 bg-[#f4ead5] comic-border-thick font-bricolage text-sm focus:outline-none focus:ring-2 focus:ring-[#bb0013]"
        />
      )}
    </div>
  );

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 pt-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#bb0013] text-white p-3 comic-border-thick">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-anton text-4xl sm:text-5xl text-[#1a1a1a]">ADMIN DASHBOARD</h1>
            <p className="font-bricolage text-sm text-zinc-600">Edit website content. Changes save to Firestore and go live instantly.</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#bb0013] hover:bg-[#d90017] text-white font-anton text-lg px-6 py-3 comic-border-thick shadow-comic uppercase cursor-pointer disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : saved ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {saving ? 'SAVING...' : saved ? 'SAVED!' : 'SAVE ALL'}
          </button>
          <button
            onClick={() => setActiveTab('home')}
            className="bg-white hover:bg-[#efe1c5] text-[#1a1a1a] font-anton text-lg px-6 py-3 comic-border-thick uppercase cursor-pointer"
          >
            VIEW SITE
          </button>
        </div>
      </section>

      {/* Sections */}
      <section className="max-w-4xl mx-auto px-4 space-y-4">

        {/* HERO */}
        <SectionHeader section="hero" title="HERO SECTION" />
        {openSection === 'hero' && (
          <div className="bg-white p-6 comic-border-thick shadow-comic space-y-4">
            <Input label="Badge Text" value={content.hero.badge} path="hero.badge" />
            <Input label="Main Title" value={content.hero.title} path="hero.title" />
            <Input label="Subtitle" value={content.hero.subtitle} path="hero.subtitle" multiline />
            <Input label="Date" value={content.hero.date} path="hero.date" />
            <Input label="Venue" value={content.hero.venue} path="hero.venue" />
          </div>
        )}

        {/* ABOUT */}
        <SectionHeader section="about" title="ABOUT SECTION" />
        {openSection === 'about' && (
          <div className="bg-white p-6 comic-border-thick shadow-comic space-y-4">
            <Input label="Section Heading" value={content.about.heading} path="about.heading" />
            {content.about.cards.map((card, i) => (
              <div key={i} className="border-t-2 border-dashed border-zinc-200 pt-4 space-y-3">
                <p className="font-anton text-sm text-[#bb0013]">CARD {i + 1}</p>
                <Input label="Title" value={card.title} path={`about.cards.${i}.title`} />
                <Input label="Description" value={card.description} path={`about.cards.${i}.description`} multiline />
              </div>
            ))}
          </div>
        )}

        {/* STATS */}
        <SectionHeader section="stats" title="STATS" />
        {openSection === 'stats' && (
          <div className="bg-white p-6 comic-border-thick shadow-comic grid grid-cols-3 gap-4">
            <Input label="Hours" value={content.stats.hours} path="stats.hours" />
            <Input label="Prize Pool" value={content.stats.prizePool} path="stats.prizePool" />
            <Input label="Events Count" value={content.stats.events} path="stats.events" />
          </div>
        )}

        {/* SCHEDULE */}
        <SectionHeader section="schedule" title="SCHEDULE" />
        {openSection === 'schedule' && (
          <div className="bg-white p-6 comic-border-thick shadow-comic space-y-6">
            {(['day1', 'day2'] as const).map(day => (
              <div key={day} className="space-y-3">
                <p className="font-anton text-lg text-[#bb0013] border-b-2 border-[#1a1a1a] pb-2">{day === 'day1' ? 'DAY 1' : 'DAY 2'}</p>
                {content.schedule[day].map((item, i) => (
                  <div key={i} className={`p-3 border-2 border-[#1a1a1a] space-y-2 ${item.isHighlight ? 'bg-[#bb0013] text-white' : 'bg-[#f4ead5]'}`}>
                    <div className="grid grid-cols-2 gap-3">
                      <Input label="Time" value={item.time} path={`schedule.${day}.${i}.time`} />
                      <Input label="Title" value={item.title} path={`schedule.${day}.${i}.title`} />
                    </div>
                    <Input label="Description" value={item.description} path={`schedule.${day}.${i}.description`} multiline />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* PRIZES */}
        <SectionHeader section="prizes" title="PRIZES" />
        {openSection === 'prizes' && (
          <div className="bg-white p-6 comic-border-thick shadow-comic space-y-6">
            <Input label="Prize Pool Total" value={content.prizes.pool} path="prizes.pool" />
            {(['first', 'second', 'third'] as const).map(rank => (
              <div key={rank} className="border-t-2 border-dashed border-zinc-200 pt-4 space-y-3">
                <p className="font-anton text-lg text-[#bb0013]">{rank.toUpperCase()} PLACE</p>
                <Input label="Title" value={content.prizes[rank].title} path={`prizes.${rank}.title`} />
                <Input label="Amount" value={content.prizes[rank].amount} path={`prizes.${rank}.amount`} />
                <Input label="Perks (comma separated)" value={content.prizes[rank].perks.join(', ')} path={`_temp.${rank}`} />
              </div>
            ))}
            <div className="border-t-2 border-dashed border-zinc-200 pt-4 space-y-3">
              <p className="font-anton text-lg text-[#bb0013]">SPECIAL AWARDS</p>
              {content.prizes.special.map((award, i) => (
                <div key={i} className="p-3 bg-[#f4ead5] border-2 border-[#1a1a1a] space-y-2">
                  <Input label="Title" value={award.title} path={`prizes.special.${i}.title`} />
                  <Input label="Reward" value={award.reward} path={`prizes.special.${i}.reward`} />
                  <Input label="Description" value={award.description} path={`prizes.special.${i}.description`} multiline />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT */}
        <SectionHeader section="contact" title="CONTACT INFO" />
        {openSection === 'contact' && (
          <div className="bg-white p-6 comic-border-thick shadow-comic space-y-4">
            <Input label="Address" value={content.contact.address} path="contact.address" multiline />
            <Input label="Email 1" value={content.contact.emails[0] || ''} path="contact.emails.0" />
            <Input label="Email 2" value={content.contact.emails[1] || ''} path="contact.emails.1" />
            <Input label="Phone 1" value={content.contact.phones[0] || ''} path="contact.phones.0" />
            <Input label="Phone 2" value={content.contact.phones[1] || ''} path="contact.phones.1" />
          </div>
        )}

        {/* FOOTER */}
        <SectionHeader section="footer" title="FOOTER" />
        {openSection === 'footer' && (
          <div className="bg-white p-6 comic-border-thick shadow-comic space-y-4">
            <Input label="Brand Name" value={content.footer.brand} path="footer.brand" />
            <Input label="Tagline" value={content.footer.tagline} path="footer.tagline" />
            <Input label="Copyright" value={content.footer.copyright} path="footer.copyright" />
          </div>
        )}

      </section>
    </div>
  );
};
