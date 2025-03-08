const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    newEvent: ()=>{
        return "El PouPou y la MeiMei se quieren mucho.";
    }
});