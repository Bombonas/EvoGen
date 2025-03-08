const $ = (selector) => document.querySelector(selector);

const $genButton = $("#gen");

$genButton.addEventListener("click", async () => {
  const $msgArea = $("#msgArea");
  $msgArea.innerHTML = await window.electronAPI.newEvent();
});
