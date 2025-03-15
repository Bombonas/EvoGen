const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");

const jsonPath = path.join(__dirname, "events", "events.json");

let jsonEvents = {};

try {
  jsonEvents = JSON.parse(fs.readFileSync(jsonPath, "utf8")).events;
} catch (error) {
  console.error("Error cargando el JSON:", error);
}

contextBridge.exposeInMainWorld("electronAPI", {
  newEvent: () => {
    if (jsonEvents.length === 0)
      return { title: "Sin eventos", text: "No hay eventos disponibles." };

    const randomEvent =
      jsonEvents[Math.floor(Math.random() * jsonEvents.length)];
    return { title: randomEvent.title, text: randomEvent.text };
  },
});
