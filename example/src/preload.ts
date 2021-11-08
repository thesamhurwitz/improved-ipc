import { contextBridge } from 'electron';
import { settingsIpcRenderer } from './ipc';
import type { ElectronApi } from './types';

const apiKey = 'api';

const api: ElectronApi = {
  settings: settingsIpcRenderer,
};

contextBridge.exposeInMainWorld(apiKey, api);
