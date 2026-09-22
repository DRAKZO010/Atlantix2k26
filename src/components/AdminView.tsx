import React from 'react';
import { NavTab } from '../types';
import { AdminEditView } from './AdminEditView';

interface AdminViewProps {
  setActiveTab: (tab: NavTab) => void;
  onSelectEvent: (eventId: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ setActiveTab, onSelectEvent }) => {
  return <AdminEditView setActiveTab={setActiveTab} onSelectEvent={onSelectEvent} />;
};
