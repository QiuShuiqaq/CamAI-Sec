import type { ReactNode } from 'react';

export type ParentTabKey =
  | 'home'
  | 'child-status'
  | 'messages'
  | 'services'
  | 'profile';

export type ParentOverlayKey = 'leave-request' | null;

export type ParentDetailView =
  | { type: 'message-detail'; id: string }
  | { type: 'leave-history' }
  | { type: 'feedback-center' }
  | null;

export type ParentLeaveSubmission = {
  date: string;
  reason: string;
  remark?: string;
};

export type ParentFeedbackSubmission = {
  category: string;
  content: string;
};

export type ParentTabItem = {
  key: ParentTabKey;
  title: string;
  icon: ReactNode;
};
