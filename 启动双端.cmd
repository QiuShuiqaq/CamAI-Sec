@echo off
start "admin-web" cmd /k "cd /d f:\Workspace_VS\CamAI-Sec\apps\admin-web && npm.cmd run dev"
start "parent-h5" cmd /k "cd /d f:\Workspace_VS\CamAI-Sec\apps\parent-h5 && npm.cmd run dev"
