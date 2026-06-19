/**
 * @see https://umijs.org/docs/max/access
 */
export default function access(
  initialState: { currentUser?: API.CurrentUser } | undefined,
) {
  const { currentUser } = initialState ?? {};

  return {
    canAdmin: currentUser?.access === 'admin',
    canTeacher: currentUser?.access === 'teacher',
  };
}
