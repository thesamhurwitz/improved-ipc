import { BrowserWindow, ipcMain as main, WebContents, webContents as wc } from 'electron'
import type { IpcMain } from 'electron';


const ipcMain = {
  handle(channel: any, handler: any) {
    main.handle(channel, handler);
  },

  handleOnce(channel: any, handler: any) {
    main.handleOnce(channel, handler);
  },

  send(webContents: WebContents | number | 'default', channel, ...args) {
    if (webContents === 'default') {
      webContents = BrowserWindow.getAllWindows()[0]?.webContents;

      if (!webContents) {
        return;
      }
    } else if (typeof webContents === 'number') {
      webContents = wc.fromId(webContents);
    }
    webContents.send(channel, ...args);
  },

  on(channel, listener) {
    return main.on(channel, listener);
  },
  once(channel, listener) {
    return main.once(channel, listener);
  },
  removeAllListeners(channel?) {
    return main.removeAllListeners(channel);
  },
  removeHandler(channel) {
    return main.removeHandler(channel);
  },
  removeListener(channel, listener) {
    return main.removeListener(channel, listener);
  },
};

export { ipcMain };
