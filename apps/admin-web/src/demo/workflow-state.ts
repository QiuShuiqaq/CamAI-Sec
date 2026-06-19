const WORKFLOW_STORAGE_KEY = 'camai-demo-admin-workflow';

export type TeacherDecisionRecord = {
  eventId: string;
  actionValue: string;
  actionLabel: string;
  note: string;
  time: string;
};

type AdminWorkflowState = {
  teacherDecisions: Record<string, TeacherDecisionRecord>;
};

const defaultWorkflowState: AdminWorkflowState = {
  teacherDecisions: {},
};

export function getTeacherDecision(eventId: string) {
  return readWorkflowState().teacherDecisions[eventId] ?? null;
}

export function saveTeacherDecision(record: TeacherDecisionRecord) {
  const state = readWorkflowState();
  const nextState: AdminWorkflowState = {
    ...state,
    teacherDecisions: {
      ...state.teacherDecisions,
      [record.eventId]: record,
    },
  };

  writeWorkflowState(nextState);
}

function readWorkflowState(): AdminWorkflowState {
  if (typeof window === 'undefined') {
    return defaultWorkflowState;
  }

  try {
    const raw = window.localStorage.getItem(WORKFLOW_STORAGE_KEY);
    if (!raw) {
      return defaultWorkflowState;
    }

    return {
      ...defaultWorkflowState,
      ...JSON.parse(raw),
    };
  } catch {
    return defaultWorkflowState;
  }
}

function writeWorkflowState(state: AdminWorkflowState) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(WORKFLOW_STORAGE_KEY, JSON.stringify(state));
}
