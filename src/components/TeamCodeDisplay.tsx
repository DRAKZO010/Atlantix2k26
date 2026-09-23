import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface TeamCodeDisplayProps {
  code: string;
  size?: 'sm' | 'lg';
}

export const TeamCodeDisplay: React.FC<TeamCodeDisplayProps> = ({ code, size = 'lg' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (size === 'sm') {
    return (
      <button onClick={handleCopy}
        className="inline-flex items-center gap-1.5 bg-[#fddc00] text-[#1a1a1a] font-anton text-sm px-3 py-1 comic-border-thick cursor-pointer hover:bg-[#fce94d] transition-colors"
        title="Click to copy">
        {code}
        {copied ? <Check className="w-3 h-3 text-green-700" /> : <Copy className="w-3 h-3" />}
      </button>
    );
  }

  return (
    <div className="bg-[#1a1a1a] text-white p-6 comic-border-thick text-center space-y-3">
      <p className="font-bricolage text-xs text-zinc-400 font-bold uppercase">YOUR TEAM CODE</p>
      <div className="font-anton text-5xl sm:text-6xl text-[#fddc00] tracking-[0.15em]">
        {code}
      </div>
      <button onClick={handleCopy}
        className="inline-flex items-center gap-2 bg-[#bb0013] hover:bg-[#d90017] text-white font-anton text-sm px-5 py-2 comic-border-thick cursor-pointer transition-colors">
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? 'COPIED!' : 'COPY CODE'}
      </button>
    </div>
  );
};
