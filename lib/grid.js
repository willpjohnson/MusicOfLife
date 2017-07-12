class Grid {
  constructor(grid) {
    this.grid = grid;
    this.livingCells = [];
    grid.addEventListener("mousedown", (e) => {
      this.toggleDragging(e);
    });
    grid.addEventListener("mouseup", (e) => {
      this.toggleDragging(e);
    });
    this.dragging = false;
    this.firstDraggedCell = null;
    this.toggleDragging = this.toggleDragging.bind(this);
  }

  advanceGeneration() {
    let cells = document.getElementsByClassName('grid-cell');
    cells = Array.prototype.slice.call(cells);
    this.livingCells = [];

    cells.forEach( (cell) => {
      let id = parseInt(cell.id);
      let neighborIds = this.findNeighbors(id);
      let neighbors = 0;
      neighborIds.forEach( (neighborId) => {
        let neighbor = document.getElementById(neighborId);
        if (neighbor.classList.contains("alive")) {
          neighbors ++;
        }
      });
      cell.setAttribute("neighbors", neighbors);
    });

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
  }

  findNeighbors(id) {
    let allNeighbors;
    if (id%20 === 0) {
      allNeighbors = [id-20,id-19,id+1,id+20,id+21];
    } else if (id%20 === 19) {
      allNeighbors = [id-21,id-20,id-1,id+19,id+20];
    } else {
      allNeighbors = [id-21,id-20,id-19,id-1,id+1,id+19,id+20,id+21];
    }
    let neighbors = allNeighbors.filter( (n) => {
      return !(n < 0 || n > 399);
    });
    return neighbors;
  };

  toggleDragging(e) {
    if (e.type === 'mousedown') {
      this.dragging = true;
      this.firstDraggedCell = e.target;
    } else if (e.type === 'mouseup') {
      this.dragging = false;
      this.firstDraggedCell = null;
    }
  }



}

export default Grid;
