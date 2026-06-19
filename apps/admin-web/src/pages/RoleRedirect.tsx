import { history, useModel } from '@umijs/max';
import { useEffect } from 'react';
import { resolveHomeByRole } from '@/utils/roles';

const RoleRedirect = () => {
  const { initialState } = useModel('@@initialState');

  useEffect(() => {
    if (!initialState?.currentUser) {
      history.replace('/user/login');
      return;
    }

    history.replace(resolveHomeByRole(initialState.currentUser.access));
  }, [initialState?.currentUser]);

  return null;
};

export default RoleRedirect;
