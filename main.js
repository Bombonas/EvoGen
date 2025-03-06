const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
  });

  window.setMenuBarVisibility(false);
  window.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
});
