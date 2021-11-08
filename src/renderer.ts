import { ipcRenderer as renderer } from 'electron';
import type { IpcRenderer } from 'electron';

const ipcRenderer = {
  invoke(channel: any, ...args: any) {
    return renderer.invoke(channel, ...args);
  },
  
  on(channel, listener) {
    return renderer.on(channel, listener);
  },
  once(channel, listener) {
    return renderer.on(channel, listener);
  },
  postMessage(channel, message, transfer?) {
    return renderer.postMessage(channel, message, transfer);
  },
  removeAllListeners(channel){
    return renderer.removeAllListeners(channel);
  },
  removeListener(channel, listener) {
    return renderer.removeListener(channel, listener);
  },
  send(channel, ...args) {
    return renderer.send(channel, ...args);
  },
  sendSync(channel, ...args) {
    return renderer.sendSync(channel, ...args);
  },
  sendTo(webContentsId, channel, ...args) {
    return renderer.sendTo(webContentsId, channel, ...args);
  },
  sendToHost(channel, ...args) {
    return renderer.sendToHost(channel, ...args);
  },
};

export { ipcRenderer };
