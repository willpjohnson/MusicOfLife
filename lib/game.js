class Game {
  constructor(grid) {
    this.running = false;
  }

  toggleRunning() {
    if (this.running) {
      this.running = false;
    } else {
      this.running = true;
    }
  }
}

export default Game;
