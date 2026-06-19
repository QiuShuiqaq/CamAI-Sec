import type { ParentTabItem } from '@/shared/types/navigation';
import {
  AppOutline,
  BellOutline,
  MessageOutline,
  UserOutline,
} from 'antd-mobile-icons';

export const parentTabs: ReadonlyArray<ParentTabItem> = [
  { key: 'home', title: '首页', icon: <AppOutline /> },
  { key: 'child-status', title: '孩子', icon: <UserOutline /> },
  { key: 'messages', title: '消息', icon: <MessageOutline /> },
  { key: 'services', title: '服务', icon: <BellOutline /> },
  { key: 'profile', title: '我的', icon: <UserOutline /> },
];
