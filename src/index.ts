import type {
  IpcMainEvent,
  IpcMainInvokeEvent,
  IpcRendererEvent,
  WebContents,
} from 'electron';

type InputMap = {
  [key: string]: (...args: any) => any;
};

export interface TypedIpcMain<
  Commands extends InputMap,
  RendererEvents extends InputMap,
  MainEvents extends InputMap,
> {
  on<K extends Extract<keyof RendererEvents, string>>(
    channel: K,
    handler: (event: IpcMainEvent, ...args: Parameters<RendererEvents[K]>) => void
  ): void; // TODO: return this

  once<K extends Extract<keyof RendererEvents, string>>(
    channel: K,
    handler: (event: IpcMainEvent, ...args: Parameters<RendererEvents[K]>) => void
  ): void;

  removeListener<K extends Extract<keyof RendererEvents, string>>(
    channel: K,
    handler: (event: IpcMainEvent, ...args: Parameters<RendererEvents[K]>) => void
  ): void;

  removeAllListeners<K extends Extract<keyof RendererEvents, string>>(
    channel?: K
  ): void;

  send<K extends Extract<keyof MainEvents, string>>(
    webContents: WebContents | number | 'default',
    channel: K,
    ...args: Parameters<MainEvents[K]>
  ): void;

  handle<K extends Extract<keyof Commands, string>>(
    channel: K,
    handler: (
      event: IpcMainInvokeEvent,
      ...args: Parameters<Commands[K]>
    ) => Promise<ReturnType<Commands[K]>>
  ): void;

  handleOnce<K extends Extract<keyof Commands, string>>(
    channel: K,
    handler: (
      event: IpcMainInvokeEvent,
      ...args: Parameters<Commands[K]>
    ) => Promise<ReturnType<Commands[K]>>
  ): void;

  removeHandler<K extends Extract<keyof Commands, string>>(
    channel: K,
  ): void;
}

export interface TypedIpcRenderer<
  Commands extends InputMap,
  RendererEvents extends InputMap,
  MainEvents extends InputMap,
> {
  on<K extends Extract<keyof MainEvents, string>>(
    channel: K,
    handler: (event: IpcRendererEvent, ...args: Parameters<MainEvents[K]>) => void
  ): void;

  once<K extends Extract<keyof MainEvents, string>>(
    channel: K,
    handler: (event: IpcRendererEvent, ...args: Parameters<MainEvents[K]>) => void
  ): void;

  removeListener<K extends Extract<keyof MainEvents, string>>(
    channel: K,
    listener: (
      event: IpcRendererEvent,
      ...args: Parameters<MainEvents[K]>
    ) => void
  ): void;
  
  removeAllListeners<K extends Extract<keyof MainEvents, string>>(channel: K): this;
  
  invoke<K extends Extract<keyof Commands, string>>(
    channel: K,
    ...args: Parameters<Commands[K]>
  ): Promise<ReturnType<Commands[K]>>;

  send<K extends Extract<keyof RendererEvents, string>>(
    channel: K,
    ...args: Parameters<RendererEvents[K]>
  ): void;

  sendSync<K extends Extract<keyof RendererEvents, string>>(
    channel: K,
    ...args: Parameters<RendererEvents[K]>
  ): ReturnType<RendererEvents[K]>;

  sendTo<K extends Extract<keyof RendererEvents, string>>(
    webContentsId: number,
    channel: K,
    ...args: Parameters<RendererEvents[K]>
  ): void;

  sendToHost<K extends Extract<keyof RendererEvents, string>>(
    channel: K,
    ...args: Parameters<RendererEvents[K]>
  ): void;

}

export * from "./main";
export * from "./renderer";
