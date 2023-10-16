require('dotenv').config()

const debug = require('debug')('localapp:main')
const { app, BrowserWindow, ipcMain } = require('electron')


async function initializeDatabase() {
  try {
    debug('DBINIT::BEGIN')
    
    const SQLite = require('better-sqlite3')
    
    const DB = new SQLite('./database.db')
    
    DB.pragma('journal_mode = WAL')
    
    const prep = DB.prepare(`CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY, 
      value TEXT
    )`)

    prep.run()
    
    global.DB = DB
    
    debug('DBINIT::RES', global.DB)
  } catch (error) {
    console.error('DBinitERR', error)
  }
}


if (require('electron-squirrel-startup')) {
  app.quit();
}


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  
  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  
  
  initializeDatabase().catch(console.error)
  
  const serverInit = require('./srv/server.js')
  const IPC = require('./ipc.js')
  
  const server = serverInit()
  
  
  IPC()
}


app.on('ready', createWindow);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})