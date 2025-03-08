const { app, BrowserWindow } = require("electron");
const path = require('path');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    }
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile("index.html");  
};

app.whenReady().then(() => {
  createWindow();
});
