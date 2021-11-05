import { ipcRenderer as renderer } from 'electron';

export const ipcRenderer = {
  on(channel: any, handler: any) {
    renderer.on(channel, handler);
  },

  invoke(channel: any, ...args: any) {
    return renderer.invoke(channel, ...args);
  },
};
