/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tones__ = __webpack_require__(2);



const toggleActivationClick = (e) => {
  let cell = e.currentTarget;
  cell.classList.toggle("alive")
}

const advanceGeneration = () => {
  let cells = document.getElementsByClassName('grid-cell');
  cells = Array.prototype.slice.call(cells);

  cells.forEach( (cell) => {
    let id = parseInt(cell.id);
    let neighborIds = findNeighbors(id);
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
        cell.classList.toggle("alive");
      } else if (neighbors > 3) {
        cell.classList.toggle("alive");
      }
    } else {
      if (neighbors === 3) {
        cell.classList.toggle("alive");
      }
    }
  });
}

const findNeighbors = (id) => {
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

document.addEventListener("DOMContentLoaded", () => {
  let grid = document.getElementById('grid');
  let game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](grid);
  let tones = new __WEBPACK_IMPORTED_MODULE_1__tones__["a" /* default */]();
  let intervalId;

  let startButton = document.getElementById('start');
  const runGame = () => {
    game.toggleRunning();
    let selector = document.getElementById("speed");
    let speed = parseInt(selector.options[selector.selectedIndex].value);
    if (game.running) {
      startButton.innerHTML = "Stop";
      intervalId = setInterval( () => {
        advanceGeneration();
      }, speed);
    } else {
      startButton.innerHTML = "Start";
      clearInterval(intervalId);
    }
  }
  startButton.addEventListener("click", runGame);

  let cellId = 0;
  for (let i=0; i<20; i++) {
    let row = document.createElement('div');
    row.classList.add('grid-row');
    for (let j=0; j<20; j++) {
      let cell = document.createElement('div');
      cell.id=cellId;
      cell.classList.add('grid-cell');
      cell.addEventListener("click", toggleActivationClick);
      row.appendChild(cell);
      cellId += 1;
    }
    grid.appendChild(row);
  }
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Tones {
  constructor() {
    this.cm1 = new Audio('tones/CM1.mp3');
    this.cm2 = new Audio('tones/CM2.mp3');
    this.cm3 = new Audio('tones/CM3.mp3');
    this.cm4 = new Audio('tones/CM4.mp3');
    this.cm5 = new Audio('tones/CM5.mp3');
    this.cm6 = new Audio('tones/CM6.mp3');
    this.cm7 = new Audio('tones/CM7.mp3');
    this.cm8 = new Audio('tones/CM8.mp3');
    this.cm9 = new Audio('tones/CM9.mp3');
    this.cm10 = new Audio('tones/CM10.mp3');
    this.dn1 = new Audio('tones/DN1.mp3');
    this.dn2 = new Audio('tones/DN2.mp3');
    this.dn3 = new Audio('tones/DN3.mp3');
    this.dn4 = new Audio('tones/DN4.mp3');
    this.dn5 = new Audio('tones/DN5.mp3');
    this.dn6 = new Audio('tones/DN6.mp3');
    this.dn7 = new Audio('tones/DN7.mp3');
    this.dn8 = new Audio('tones/DN8.mp3');
    this.dn9 = new Audio('tones/DN9.mp3');
    this.dn10 = new Audio('tones/DN10.mp3');
    this.hg1 = new Audio('tones/HG1.mp3');
    this.hg2 = new Audio('tones/HG2.mp3');
    this.hg3 = new Audio('tones/HG3.mp3');
    this.hg4 = new Audio('tones/HG4.mp3');
    this.hg5 = new Audio('tones/HG5.mp3');
    this.hg6 = new Audio('tones/HG6.mp3');
    this.hg7 = new Audio('tones/HG7.mp3');
    this.hg8 = new Audio('tones/HG8.mp3');
    this.hg9 = new Audio('tones/HG9.mp3');
    this.hg10 = new Audio('tones/HG10.mp3');
    this.sv1 = new Audio('tones/SV1.mp3');
    this.sv2 = new Audio('tones/SV2.mp3');
    this.sv3 = new Audio('tones/SV3.mp3');
    this.sv4 = new Audio('tones/SV4.mp3');
    this.sv5 = new Audio('tones/SV5.mp3');
    this.sv6 = new Audio('tones/SV6.mp3');
    this.sv7 = new Audio('tones/SV7.mp3');
    this.sv8 = new Audio('tones/SV8.mp3');
    this.sv9 = new Audio('tones/SV9.mp3');
    this.sv10 = new Audio('tones/SV10.mp3');

    this.tones = {};
    this.assignValues();
  }


  assignValues() {
    let i = 0;
    while (i < 400) {
      if ((0 <= i && i < 20) || (200 <= i && i < 220)) {
        if (i % 4 === 0) {
          this.tones[i] = this.cm10;
        } else if (i % 4 === 1) {
          this.tones[i] = this.dn10;
        } else if (i % 4 === 2) {
          this.tones[i] = this.hg10;
        } else if (i % 4 === 3) {
          this.tones[i] = this.sv10;
        }
      } else if (20 <= i < 40 || 220 <= i < 240) {
        if (i % 4 === 0) {
          this.tones[i] = this.cm9;
        } else if (i % 4 === 1) {
          this.tones[i] = this.dn9;
        } else if (i % 4 === 2) {
          this.tones[i] = this.hg9;
        } else if (i % 4 === 3) {
          this.tones[i] = this.sv9;
        }
      } else if (40 <= i < 60 || 240 <= i < 260) {
        if (i % 4 === 0) {
          this.tones[i] = this.cm8;
        } else if (i % 4 === 1) {
          this.tones[i] = this.dn8;
        } else if (i % 4 === 2) {
          this.tones[i] = this.hg8;
        } else if (i % 4 === 3) {
          this.tones[i] = this.sv8;
        }
      } else if (60 <= i < 80 || 260 <= i < 280) {
        if (i % 4 === 0) {
          this.tones[i] = this.cm7;
        } else if (i % 4 === 1) {
          this.tones[i] = this.dn7;
        } else if (i % 4 === 2) {
          this.tones[i] = this.hg7;
        } else if (i % 4 === 3) {
          this.tones[i] = this.sv7;
        }
      } else if (80 <= i < 100 || 280 <= i < 300) {
        if (i % 4 === 0) {
          this.tones[i] = this.cm6;
        } else if (i % 4 === 1) {
          this.tones[i] = this.dn6;
        } else if (i % 4 === 2) {
          this.tones[i] = this.hg6;
        } else if (i % 4 === 3) {
          this.tones[i] = this.sv6;
        }
      } else if (100 <= i < 120 || 300 <= i < 320) {
        if (i % 4 === 0) {
          this.tones[i] = this.cm5;
        } else if (i % 4 === 1) {
          this.tones[i] = this.dn5;
        } else if (i % 4 === 2) {
          this.tones[i] = this.hg5;
        } else if (i % 4 === 3) {
          this.tones[i] = this.sv5;
        }
      } else if (120 <= i < 140 || 320 <= i < 340) {
        if (i % 4 === 0) {
          this.tones[i] = this.cm4;
        } else if (i % 4 === 1) {
          this.tones[i] = this.dn4;
        } else if (i % 4 === 2) {
          this.tones[i] = this.hg4;
        } else if (i % 4 === 3) {
          this.tones[i] = this.sv4;
        }
      } else if (140 <= i < 160 || 340 <= i < 360) {
        if (i % 4 === 0) {
          this.tones[i] = this.cm3;
        } else if (i % 4 === 1) {
          this.tones[i] = this.dn3;
        } else if (i % 4 === 2) {
          this.tones[i] = this.hg3;
        } else if (i % 4 === 3) {
          this.tones[i] = this.sv3;
        }
      } else if (160 <= i < 180 || 360 <= i < 380) {
        if (i % 4 === 0) {
          this.tones[i] = this.cm2;
        } else if (i % 4 === 1) {
          this.tones[i] = this.dn2;
        } else if (i % 4 === 2) {
          this.tones[i] = this.hg2;
        } else if (i % 4 === 3) {
          this.tones[i] = this.sv2;
        }
      } else if (180 <= i < 200 || 380 <= i < 400) {
        if (i % 4 === 0) {
          this.tones[i] = this.cm1;
        } else if (i % 4 === 1) {
          this.tones[i] = this.dn1;
        } else if (i % 4 === 2) {
          this.tones[i] = this.hg1;
        } else if (i % 4 === 3) {
          this.tones[i] = this.sv1;
        }
      }

      i += 1;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Tones);


/***/ })
/******/ ]);