import type { settingsIpcRenderer } from './ipc';

interface ElectronApi {
  settings: typeof settingsIpcRenderer;
}

declare global {
  interface Window {
    api: ElectronApi,
  }
}
