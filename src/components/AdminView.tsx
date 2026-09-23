import React from 'react';
import { NavTab } from '../types';
import { AdminEditView } from './AdminEditView';

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

interface AdminViewProps {
  setActiveTab: (tab: NavTab) => void;
  onSelectEvent: (eventId: string) => void;
  onControlsReady?: (controls: AdminControls | null) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ setActiveTab, onSelectEvent, onControlsReady }) => {
  return <AdminEditView setActiveTab={setActiveTab} onSelectEvent={onSelectEvent} onControlsReady={onControlsReady} />;
};
