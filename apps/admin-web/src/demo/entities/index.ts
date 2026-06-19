export type UserRole = 'admin' | 'teacher' | 'parent';

export type EventLevel = 'low' | 'medium' | 'high';
export type EventStatus =
  | 'new'
  | 'pending'
  | 'processing'
  | 'reviewing'
  | 'closed';

export type EventSource = 'mock-ai' | 'manual' | 'system' | 'parent';

export type School = {
  id: string;
  name: string;
  campusName: string;
};

export type Grade = {
  id: string;
  schoolId: string;
  name: string;
};

export type ClassEntity = {
  id: string;
  schoolId: string;
  gradeId: string;
  name: string;
  teacherId: string;
};

export type User = {
  id: string;
  name: string;
  role: UserRole;
  schoolId: string;
  classId?: string;
};

export type Student = {
  id: string;
  name: string;
  classId: string;
  guardianIds: string[];
};

export type DevicePointType = 'gate' | 'camera' | 'area';

export type DevicePoint = {
  id: string;
  schoolId: string;
  name: string;
  type: DevicePointType;
  location: string;
};

export type DemoEventType =
  | 'access_pass'
  | 'access_alert'
  | 'patrol_risk'
  | 'emotion_alert'
  | 'parent_leave_request'
  | 'notice_delivery'
  | 'parent_feedback'
  | 'manual_review';

export type DemoEvent = {
  id: string;
  type: DemoEventType;
  title: string;
  summary: string;
  level: EventLevel;
  status: EventStatus;
  schoolId: string;
  classId?: string;
  studentId?: string;
  actorUserId?: string;
  ownerUserId?: string;
  relatedPointId?: string;
  source: EventSource;
  createdAt: string;
  updatedAt: string;
};
