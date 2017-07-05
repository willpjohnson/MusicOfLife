# JS Project Proposal: Music of Life

## Background

Music of Life is an app combining the functionality of Conway's Game of Life and Tone Matrix.

Conway's Game of Life is a zero-player game representing cellular growth. The game plays out on a grid that is pre-populated by the user as having some selected (live) squares and some unselected (dead). At each life-cycle step, every cell on the board changes state based on the following parameters.

1) Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
2) Any live cell with two or three live neighbours lives on to the next generation.
3) Any live cell with more than three live neighbours dies, as if by overpopulation.
4) Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

This pattern repeats indefinitely, resulting in an organically evolving grid.

Tone Matrix is a music making app. Like CGoL, it is also played out on a grid that is populated by the user selecting and unselecting squares. The app then sweeps through the grid from left to right and sounds various musical tones corresponding to the selected squares. The result is a cohesive and unique musical phrase.

Music of Life will combine these two concepts to create an evolving musical pattern. The phrase will be originally seeded by the user but will take on a life of it's own throughout it's generations.

## Functionality & MVP

The basic functionality of Music of Life will be:

- [ ] Starting and stopping the live playback.
- [ ] Select initial seed squares and select squares during live playback.
- [ ] Opt for an initial preset seed configuration.

Additionally, this project will have:

- [ ] An instructional step-by-step tour.
- [ ] A production README.

## Wireframes

This app will be implemented on one single page, the focus of which will be the main grid. The grid will be 20x20 squares. The y-axis of the grid will correspond to scale degree value while the x-axis will correspond to the sonic quality and timbre of the instrument. The main page will also include start/stop controls, a pre-set configuration dropdown, and links to my GitHub and LinkedIn.

![wireframe](/wireframes/MusicOfLife.png)

## Architecture and Technologies

This project will be implemented with the following technologies:

- [ ] `Javascript` for game logic
- [ ] `Webpack` for bundling JS files
- [ ] `CSS` for live rendering

## Implementation Timeline

**Phase 1**
Setup entry file and homepage. Make wireframe a reality with CSS styling.

**Phase 2**
Write full functionality of CGoL. Allow for grid growth and evolution over set period of time.

**Phase 3**
Incorporate musical instruments and cues to grid. Resolve all outstanding design issues.


## Bonus

In addition to the MVP, I plan to add the following functionality.

- [ ] Add multiple colors for multiple musical instruments.
- [ ] Setting selectors for generation cycle length, number of colors, etc.
