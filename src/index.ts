import type {
  IpcMainEvent,
  IpcMainInvokeEvent,
  IpcRendererEvent,
} from 'electron';

type InputMap = {
  [key: string]: (...args: any) => any;
};

export interface TypedIpcMain<
  Commands extends InputMap,
  Events extends InputMap
> {
  on<K extends Extract<keyof Events, string>>(
    channel: K,
    handler: (event: IpcMainEvent, ...args: Parameters<Events[K]>) => void
  ): void;

  handle<K extends Extract<keyof Commands, string>>(
    channel: K,
    handler: (
      event: IpcMainInvokeEvent,
      ...args: Parameters<Commands[K]>
    ) => Promise<ReturnType<Commands[K]>>
  ): void;
}

export interface TypedIpcRenderer<
  Commands extends InputMap,
  Events extends InputMap
> {
  on<K extends Extract<keyof Events, string>>(
    channel: K,
    handler: (event: IpcRendererEvent, ...args: Parameters<Events[K]>) => void
  ): void;

  invoke<K extends Extract<keyof Commands, string>>(
    channel: K,
    ...args: Parameters<Commands[K]>
  ): Promise<ReturnType<Commands[K]>>;
}

export * from "./main";
export * from "./renderer";
