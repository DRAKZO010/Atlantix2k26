import { useState, useCallback, useRef } from 'react';

const MAX_HISTORY = 100;

export function useUndoRedo<T>(initial: T) {
  const [history, setHistory] = useState<T[]>([initial]);
  const [index, setIndex] = useState(0);
  const skipPush = useRef(false);

  const state = history[index];
  const canUndo = index > 0;
  const canRedo = index < history.length - 1;

  const push = useCallback((newState: T) => {
    if (skipPush.current) { skipPush.current = false; return; }
    setHistory(prev => {
      const trimmed = prev.slice(0, index + 1);
      const next = [...trimmed, newState];
      return next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next;
    });
    setIndex(prev => {
      const trimmedLen = Math.min(prev + 1, MAX_HISTORY - 1);
      return trimmedLen;
    });
  }, [index]);

  const undo = useCallback(() => {
    setIndex(prev => {
      if (prev <= 0) return prev;
      skipPush.current = true;
      return prev - 1;
    });
  }, []);

  const redo = useCallback(() => {
    setIndex(prev => {
      if (prev >= history.length - 1) return prev;
      skipPush.current = true;
      return prev + 1;
    });
  }, [history.length]);

  const reset = useCallback((newInitial: T) => {
    setHistory([newInitial]);
    setIndex(0);
  }, []);

  return { state, push, undo, redo, reset, canUndo, canRedo, historyLength: history.length, currentIndex: index };
}
