const $ = (selector) => document.querySelector(selector);

const $genButton = $("#gen");
const $confirmButton = $("#confirm");
const $numPlayers = $("#nPlayers");
const $prev = $("#prev");
const $next = $("#next");
const $turn = $("#turn");
const $round = $("#round");

let glowActive = false;

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;

  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}

function playBell() {
  const audio = new Audio("sounds/bellSound.mp3");
  audio.play();
}

let gameState = {
  _turn: 1,
  _round: 1,
  _players: 0,

  onTurnChange: () => {},
  onRoundChange: () => {},

  set turn(value) {
    this._turn = value;
    this.onTurnChange(value);
  },

  get turn() {
    return this._turn;
  },

  set round(value) {
    this._round = value;
    this.onRoundChange(value);
  },

  get round() {
    return this._round;
  },

  set players(value) {
    let num = parseInt(value, 10) || 2;
    if (num < 2) num = 2;
    if (num > 4) num = 4;

    this._players = num;
    this.onPlayersChange(num);
  },

  get players() {
    return this._players;
  },

  nextTurn() {
    if (this.players > 0) {
      this.turn = (this.turn % this.players) + 1;
      if (this.turn === 1) {
        this.nextRound();
      }
    } else {
      showToast("Debes seleccionar el número de jugadores.");
    }
  },

  nextRound() {
    ++this.round;
    playBell();
    glowActive = this.turn;
    $genButton.classList.add("active");
  },
  prevTurn() {
    if (this.players > 0 && this.round >= 1) {
      if (this.round == 1 && this.turn == 1) {
        showToast("No se puede bajar más el turno.");
      } else {
        this.turn = this.turn === 1 ? this.players : this.turn - 1;
      }
      if (this.turn === this.players) {
        this.prevRound();
      }
    } else {
      showToast("Debes seleccionar el número de jugadores.");
    }
  },

  prevRound() {
    if (this.round - 1 != 0) --this.round;
  },
};

gameState.onTurnChange = (newTurn) => {
  $turn.innerHTML = newTurn;
};

gameState.onRoundChange = (newRound) => {
  $round.innerHTML = newRound;
};

gameState.onPlayersChange = (newPlayers) => {
  gameState.round = 1;
  gameState.turn = 1;
};

$genButton.addEventListener("click", () => {
  const $msgArea = $("#msgArea");
  if (glowActive) {
    $genButton.classList.remove("active");
    glowActive = false;
  }
  const event = window.electronAPI.newEvent();
  $msgArea.innerHTML = "<h3>" + event.title + "</h3><p>" + event.text + "</p>";
});

// Hay un bug que al cambiar los jugadores no deja escribir en el input.
$confirmButton.addEventListener("click", () => {
  if ($confirmButton.innerHTML == "OK") {
    $confirmButton.innerHTML = "Cambiar";
    $numPlayers.value = gameState.players;
    $numPlayers.disabled = true;
  } else {
    const confirmChange = window.confirm(
      "¿Estás seguro de cambiar el número de jugadores?"
    );
    if (confirmChange) {
      $numPlayers.disabled = false;
      $confirmButton.innerHTML = "OK";
    }
  }
});

$numPlayers.addEventListener("input", () => {
  let num = $numPlayers.value.replace(/\D/g, "");
  gameState.players = num;
});

$next.addEventListener("click", () => {
  gameState.nextTurn();
});

$prev.addEventListener("click", () => {
  gameState.prevTurn();
});
