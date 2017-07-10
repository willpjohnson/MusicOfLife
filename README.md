# Music of Life

[Live Link](http://willjohnson.tech/MusicOfLife/)

![main](docs/images/main-page.gif)

## Background

Music of Life is a cellular automaton based on Conway's Game of Life with the added musical feature of a Tone Matrix. Cells on a grid change state according to how many of their immediate neighbors are "alive". At each generation, all living cells emit a preset tone resulting in a naturally evolving musical phrase.

## Instructions

Cells can be activated or deactivated by clicking on them. Alternatively, you can select a preset configuration from the dropdown menu. Once the configuration is prepared, you can select the playback speed. Start triggers the Game of Life process and Reset clears the grid.

## Features

### Cell Growth

Cells are created, persisted, or killed at each new generation according to the following criteria:

1) Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
2) Any live cell with two or three live neighbours lives on to the next generation.
3) Any live cell with more than three live neighbours dies, as if by overpopulation.
4) Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

This was implemented as follows:

```javascript
cells.forEach( (cell) => {
  let neighbors = parseInt(cell.getAttribute("neighbors"));
  if (cell.classList.contains("alive")) {
    if (neighbors < 2) {
      cell.classList.remove("alive");
    } else if (neighbors > 3) {
      cell.classList.remove("alive");
    } else if (neighbors === 2 || neighbors === 3) {
      this.livingCells.push(parseInt(cell.id));
    }
  } else {
    if (neighbors === 3) {
      cell.classList.add("alive");
      this.livingCells.push(parseInt(cell.id));
    }
  }
});
```

### Tones

At every new generation, all living cells sound their tones. The tones are assigned according to the cell's position in the grid. The grid's y-axis corresponds to musical scale degree while the x-axis corresponds to instrument. The twenty y-axis positions represent two occurrences of ten notes in a major pentatonic scale, or two full octaves. The twenty x-axis positions represent five occurrences of four different synth instruments.
