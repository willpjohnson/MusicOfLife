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
  let allNeighbors = [id-21,id-20,id-19,id-1,id+1,id+19,id+20,id+21];
  let neighbors = allNeighbors.filter( (n) => {
    return !(n < 0 || n > 399);
  });
  return neighbors;
};

document.addEventListener("DOMContentLoaded", () => {
  let grid = document.getElementById('grid');
  let game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](grid);
  let intervalId;

  const runGame = () => {
    game.toggleRunning();
    if (game.running) {
      intervalId = setInterval( () => {
        advanceGeneration();
      }, 100);
    } else {
      clearInterval(intervalId);
    }
  }
  let startButton = document.getElementById('start');
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


/***/ })
/******/ ]);