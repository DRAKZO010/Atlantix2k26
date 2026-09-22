import React, { useRef, useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';
import { useContentChange } from '../ContentChange';

interface EditableTextProps {
  value: string;
  path: string;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p' | 'li';
  className?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value, path, as: Tag = 'span', className = '',
}) => {
  const ref = useRef<HTMLElement>(null);
  const [editing, setEditing] = useState(false);
  const onChange = useContentChange();

  useEffect(() => {
    if (ref.current && !editing) ref.current.textContent = value;
  }, [value, editing]);

  const startEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditing(true);
    setTimeout(() => {
      if (ref.current) {
        ref.current.focus();
        const range = document.createRange();
        range.selectNodeContents(ref.current);
        range.collapse(false);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }, 0);
  };

  const finishEdit = () => {
    setEditing(false);
    const text = ref.current?.textContent || '';
    if (text !== value) onChange(path, text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !path.includes('description')) { e.preventDefault(); finishEdit(); }
    if (e.key === 'Escape') { if (ref.current) ref.current.textContent = value; setEditing(false); }
  };

  return (
    <span className="relative group/et inline">
      <Tag
        ref={ref as any}
        contentEditable={editing}
        suppressContentEditableWarning
        className={`${className} ${editing ? 'outline-2 outline-[#bb0013] outline-offset-2 bg-white/80 cursor-text' : 'cursor-pointer hover:outline-2 hover:outline-dashed hover:outline-[#bb0013] hover:outline-offset-2 hover:bg-[#fddc00]/15'} transition-all rounded-sm`}
        onClick={startEdit}
        onBlur={finishEdit}
        onKeyDown={handleKeyDown}
        dangerouslySetInnerHTML={!editing ? { __html: value } : undefined}
      />
      {!editing && (
        <span className="absolute -top-2 -right-2 bg-[#bb0013] text-white p-0.5 opacity-0 group-hover/et:opacity-100 transition-opacity pointer-events-none">
          <Pencil className="w-2.5 h-2.5" />
        </span>
      )}
    </span>
  );
};
