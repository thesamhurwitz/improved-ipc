import { ipcMain, ipcRenderer } from 'improved-ipc';
import type { TypedIpcMain, TypedIpcRenderer } from 'improved-ipc';

export interface Settings {
  a: number;
  b: string;
}

type Commands = {
  getSettings: () => Settings;
  updateSettings: (settings: Partial<Settings>) => void;
};

type MainEvents = {
  // Events that occur in Main
  settingsUpdated: (newSettings: Settings) => void;
};

type RendererEvents = {
  // Events that occur in Renderer
  openFolderClicked: (path: string) => void;
};

export const settingsIpcMain = ipcMain as TypedIpcMain<
  Commands,
  RendererEvents,
  MainEvents
>; // Note Renderer Events are passed to IpcMain

export const settingsIpcRenderer = ipcRenderer as TypedIpcRenderer<
  Commands,
  RendererEvents,
  MainEvents
>;