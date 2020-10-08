import { app, BrowserWindow, globalShortcut } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import {loadDB} from './Models/adapter';
import path from 'path';
// import { enableLiveReload } from 'electron-compile';

let mainWindow;
global.models = {};
loadDB(global);

const isDevMode = process.execPath.match(/[\\/]electron/);
// if (isDevMode) enableLiveReload({ strategy: 'react-hmr' });

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    frame: false,
    show: false,
    icon: path.join(__dirname, 'src', 'assets', 'media', 'images', 'logo.png'),
    // resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // mainWindow.webContents.openDevTools();
  mainWindow.loadFile(`${__dirname}/views/index.html`);
  // mainWindow.setMenu(null);
  mainWindow.maximize();
  mainWindow.show();
  
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  
};

app.on('ready', createWindow);

app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+D', () => {
    mainWindow.webContents.openDevTools();
  })
})

if(require('electron-squirrel-startup')) app.quit();

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
