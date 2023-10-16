const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('flarn', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  ghibbet: () => ipcRenderer.invoke('dialog:ghibbet'),
})