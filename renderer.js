const $ = (selector) => document.querySelector(selector);

const $genButton = $("#gen");

$genButton.addEventListener("click", () => {
  const $msgArea = $("#msgArea");

  const event = window.electronAPI.newEvent();
  $msgArea.innerHTML = "<h3>" + event.title + "</h3><p>" + event.text + "</p>";
});
