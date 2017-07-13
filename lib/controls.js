class Controls {
  constructor(grid) {
    this.running = false;
    this.preset = null;
  }

  toggleRunning() {
    this.running === true ? this.running = false : this.running = true;
  }
}

export default Controls;
