import { contextBridge, ipcRenderer } from 'electron';

console.log('preload.js loaded');

contextBridge.exposeInMainWorld('ipcRenderer', {
    invoke: (channel, args) => ipcRenderer.invoke(channel, args),
});
