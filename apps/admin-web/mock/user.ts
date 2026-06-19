import type { Request, Response } from 'express';
import { defaultUser, waitTime } from './utils';

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

let access =
  ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';

const usersByRole = {
  admin: {
    ...defaultUser,
    name: '陈校长',
    access: 'admin',
    title: '平台管理员',
    roleLabel: '总控端',
    schoolName: '湖州第一实验学校',
    signature: '负责校园态势、角色权限和全局配置。',
    group: '湖州第一实验学校 / 平台管理中心',
  },
  teacher: {
    ...defaultUser,
    name: '林老师',
    access: 'teacher',
    title: '班主任',
    roleLabel: '老师端',
    schoolName: '湖州第一实验学校',
    signature: '负责班级日常、家校沟通和待办处理。',
    group: '湖州第一实验学校 / 七年级二班',
  },
} as const;

const getAccess = () => access;

export default {
  'GET /api/currentUser': (_req: Request, res: Response) => {
    if (!getAccess()) {
      res.status(401).send({
        data: {
          isLogin: false,
        },
        errorCode: '401',
        errorMessage: '请先登录',
        success: true,
      });
      return;
    }

    res.send({
      success: true,
      data:
        usersByRole[getAccess() as keyof typeof usersByRole] ?? usersByRole.admin,
    });
  },
  'GET /api/users': [
    {
      key: '1',
      name: '陈校长',
      age: 42,
      address: '湖州第一实验学校',
    },
    {
      key: '2',
      name: '林老师',
      age: 31,
      address: '七年级二班',
    },
  ],
  'POST /api/login/account': async (req: Request, res: Response) => {
    const { password, username, type } = req.body;
    await waitTime(400);

    if (password === 'ant.design' && username === 'admin') {
      access = 'admin';
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }

    if (password === 'ant.design' && username === 'teacher') {
      access = 'teacher';
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'teacher',
      });
      return;
    }

    if (type === 'mobile') {
      access = 'teacher';
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'teacher',
      });
      return;
    }

    access = 'guest';
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/login/outLogin': (_req: Request, res: Response) => {
    access = '';
    res.send({ data: {}, success: true });
  },
  'GET /api/500': (_req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (_req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (_req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Forbidden',
      message: 'Forbidden',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (_req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/login/captcha': async (_req: Request, res: Response) => {
    await waitTime(200);
    return res.json('captcha-xxx');
  },
};
