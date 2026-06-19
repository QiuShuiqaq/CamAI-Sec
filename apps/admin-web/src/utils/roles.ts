export const roleHomeMap = {
  admin: '/overview',
  teacher: '/teacher/workbench',
} as const;

export type PlatformRole = keyof typeof roleHomeMap;

export function resolveHomeByRole(role?: string) {
  return roleHomeMap[(role as PlatformRole) || 'admin'] ?? roleHomeMap.admin;
}
