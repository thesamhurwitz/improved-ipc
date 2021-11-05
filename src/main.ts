import { ipcMain as main } from 'electron';

export const ipcMain = {
  on(channel: any, handler: any) {
    main.on(channel, handler);
  },

  handle(channel: any, handler: any) {
    main.handle(channel, handler);
  },
};
