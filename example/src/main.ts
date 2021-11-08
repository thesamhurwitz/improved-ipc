import { app, BrowserWindow } from "electron";
import * as path from "path";

import { settingsIpcMain, Settings } from './ipc'

function createWindow() {
  bindIpc();

  const mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    width: 800,
  });

  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  mainWindow.webContents.openDevTools();
}

const settings: Settings = {
  a: 0,
  b: 'hello'
}

function bindIpc() {
  settingsIpcMain.on('openFolderClicked', (event, path) => {
    console.log(`Opening ${path} in file explorer`);
    // ...
  })

  settingsIpcMain.handle('getSettings', async (event) => {
    return settings;
  });

  settingsIpcMain.handle('updateSettings', async (event, newSettings) => {
    Object.assign(settings, newSettings);

    settingsIpcMain.send('default', 'settingsUpdated', settings);
  })
}

app.on("ready", () => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
