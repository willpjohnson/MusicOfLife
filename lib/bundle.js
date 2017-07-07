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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__grid__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tones__ = __webpack_require__(3);




document.addEventListener("DOMContentLoaded", () => {
  let grid = new __WEBPACK_IMPORTED_MODULE_0__grid__["a" /* default */](document.getElementById('grid'));
  let game = new __WEBPACK_IMPORTED_MODULE_1__game__["a" /* default */](grid);
  let tones = new __WEBPACK_IMPORTED_MODULE_2__tones__["a" /* default */]();
  let intervalId;

  let startButton = document.getElementById('start');
  const runGame = () => {
    game.toggleRunning();
    let selector = document.getElementById("speed");
    let speed = parseInt(selector.options[selector.selectedIndex].value);
    if (game.running) {
      startButton.innerHTML = "Stop";
      intervalId = setInterval( () => {
        grid.advanceGeneration();
        grid.livingCells.forEach( (cellId) => {
          let tone = tones.tones1[cellId];
          tone.currentTime = 0;
          tone.play();
        });
      }, speed);
    } else {
      startButton.innerHTML = "Start";
      clearInterval(intervalId);
    }
  }
  startButton.addEventListener("click", runGame);

  let resetButton = document.getElementById('reset');
  resetButton.addEventListener("click", (e) => {
    e.preventDefault();
    for (let i=0; i<400; i++) {
      let cell = document.getElementById(i);
      cell.classList.remove('alive');
    }
  });

  let cellId = 0;
  for (let i=0; i<20; i++) {
    let row = document.createElement('div');
    row.classList.add('grid-row');
    for (let j=0; j<20; j++) {
      let cell = document.createElement('div');
      cell.id=cellId;
      cell.classList.add('grid-cell');
      cell.addEventListener("click", grid.toggleActivationClick);
      row.appendChild(cell);
      cellId += 1;
    }
    grid.grid.appendChild(row);
  }

  // let reverb = new Pizzicato.Effects.Reverb({
  //   time: 2,
  //   decay: 0.8,
  //   reverse: false,
  //   mix: 0.8
  // });
  // let sound = new Pizzicato.Sound({
  //   source: 'file',
  //   options: { path: './puke.mp3' }
  // }, function() {
  //   sound.addEffect(reverb);
  //   sound.play();
  // });


});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Grid {
  constructor(grid) {
    this.grid = grid;
    this.livingCells = [];
  }

  toggleActivationClick(e) {
    let cell = e.currentTarget;
    cell.classList.toggle("alive")
  }

  toggleActivationDrag(e) {
    if (e.type === 'mousedown') {
      e.currentTarget.addEventListener("mouseover")
    } else if (e.type === 'mouseup') {

    }
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

}

/* harmony default export */ __webpack_exports__["a"] = (Grid);


/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Tones {
  constructor() {
    this.reverb = new Pizzicato.Effects.Reverb({
      time: 2,
      decay: 0.8,
      reverse: false,
      mix: 0.5
    });

    let that = this;

    this.tonea1 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/QP1.mp3', volume: 0.01}},  function() {this.tonea1.addEffect(this.reverb)}.bind(this));
    this.tonea2 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/QP2.mp3', volume: 0.01}},  function() {this.tonea2.addEffect(this.reverb)}.bind(this));
    this.tonea3 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/QP3.mp3', volume: 0.01}},  function() {this.tonea3.addEffect(this.reverb)}.bind(this));
    this.tonea4 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/QP4.mp3', volume: 0.01}},  function() {this.tonea4.addEffect(this.reverb)}.bind(this));
    this.tonea5 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/QP5.mp3', volume: 0.01}},  function() {this.tonea5.addEffect(this.reverb)}.bind(this));
    this.tonea6 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/QP6.mp3', volume: 0.01}},  function() {this.tonea6.addEffect(this.reverb)}.bind(this));
    this.tonea7 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/QP7.mp3', volume: 0.01}},  function() {this.tonea7.addEffect(this.reverb)}.bind(this));
    this.tonea8 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/QP8.mp3', volume: 0.01}},  function() {this.tonea8.addEffect(this.reverb)}.bind(this));
    this.tonea9 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/QP9.mp3', volume: 0.01}},  function() {this.tonea9.addEffect(this.reverb)}.bind(this));
    this.tonea10 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/QP10.mp3', volume: 0.01}},  function() {this.tonea10.addEffect(this.reverb)}.bind(this));

    this.toneb1 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/SV1.mp3', volume: 0.01}},  function() {this.toneb1.addEffect(this.reverb)}.bind(this));
    this.toneb2 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/SV2.mp3', volume: 0.01}},  function() {this.toneb2.addEffect(this.reverb)}.bind(this));
    this.toneb3 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/SV3.mp3', volume: 0.01}},  function() {this.toneb3.addEffect(this.reverb)}.bind(this));
    this.toneb4 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/SV4.mp3', volume: 0.01}},  function() {this.toneb4.addEffect(this.reverb)}.bind(this));
    this.toneb5 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/SV5.mp3', volume: 0.01}},  function() {this.toneb5.addEffect(this.reverb)}.bind(this));
    this.toneb6 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/SV6.mp3', volume: 0.01}},  function() {this.toneb6.addEffect(this.reverb)}.bind(this));
    this.toneb7 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/SV7.mp3', volume: 0.01}},  function() {this.toneb7.addEffect(this.reverb)}.bind(this));
    this.toneb8 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/SV8.mp3', volume: 0.01}},  function() {this.toneb8.addEffect(this.reverb)}.bind(this));
    this.toneb9 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/SV9.mp3', volume: 0.01}},  function() {this.toneb9.addEffect(this.reverb)}.bind(this));
    this.toneb10 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/SV10.mp3', volume: 0.01}},  function() {this.toneb10.addEffect(this.reverb)}.bind(this));

    this.tonec1 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/SP1.mp3', volume: 0.01}},  function() {this.tonec1.addEffect(this.reverb)}.bind(this));
    this.tonec2 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/SP2.mp3', volume: 0.01}},  function() {this.tonec2.addEffect(this.reverb)}.bind(this));
    this.tonec3 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/SP3.mp3', volume: 0.01}},  function() {this.tonec3.addEffect(this.reverb)}.bind(this));
    this.tonec4 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/SP4.mp3', volume: 0.01}},  function() {this.tonec4.addEffect(this.reverb)}.bind(this));
    this.tonec5 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/SP5.mp3', volume: 0.01}},  function() {this.tonec5.addEffect(this.reverb)}.bind(this));
    this.tonec6 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/SP6.mp3', volume: 0.01}},  function() {this.tonec6.addEffect(this.reverb)}.bind(this));
    this.tonec7 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/SP7.mp3', volume: 0.01}},  function() {this.tonec7.addEffect(this.reverb)}.bind(this));
    this.tonec8 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/SP8.mp3', volume: 0.01}},  function() {this.tonec8.addEffect(this.reverb)}.bind(this));
    this.tonec9 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/SP9.mp3', volume: 0.01}},  function() {this.tonec9.addEffect(this.reverb)}.bind(this));
    this.tonec10 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/SP10.mp3', volume: 0.01}},  function() {this.tonec10.addEffect(this.reverb)}.bind(this));

    this.toned1 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/PW1.mp3', volume: 0.01}},  function() {this.toned1.addEffect(this.reverb)}.bind(this));
    this.toned2 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/PW2.mp3', volume: 0.01}},  function() {this.toned2.addEffect(this.reverb)}.bind(this));
    this.toned3 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/PW3.mp3', volume: 0.01}},  function() {this.toned3.addEffect(this.reverb)}.bind(this));
    this.toned4 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/PW4.mp3', volume: 0.01}},  function() {this.toned4.addEffect(this.reverb)}.bind(this));
    this.toned5 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/PW5.mp3', volume: 0.01}},  function() {this.toned5.addEffect(this.reverb)}.bind(this));
    this.toned6 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/PW6.mp3', volume: 0.01}},  function() {this.toned6.addEffect(this.reverb)}.bind(this));
    this.toned7 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/PW7.mp3', volume: 0.01}},  function() {this.toned7.addEffect(this.reverb)}.bind(this));
    this.toned8 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/PW8.mp3', volume: 0.01}},  function() {this.toned8.addEffect(this.reverb)}.bind(this));
    this.toned9 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/PW9.mp3', volume: 0.01}},  function() {this.toned9.addEffect(this.reverb)}.bind(this));
    this.toned10 = new Pizzicato.Sound({source: 'file', options: {path: 'newtones/instrument1/short/PW10.mp3', volume: 0.01}},  function() {this.toned10.addEffect(this.reverb)}.bind(this));
    //
    // this.tonea1 = new Audio('newtones/instrument1/short/QP1.mp3');
    // this.tonea2 = new Audio('newtones/instrument1/short/QP2.mp3');
    // this.tonea3 = new Audio('newtones/instrument1/short/QP3.mp3');
    // this.tonea4 = new Audio('newtones/instrument1/short/QP4.mp3');
    // this.tonea5 = new Audio('newtones/instrument1/short/QP5.mp3');
    // this.tonea6 = new Audio('newtones/instrument1/short/QP6.mp3');
    // this.tonea7 = new Audio('newtones/instrument1/short/QP7.mp3');
    // this.tonea8 = new Audio('newtones/instrument1/short/QP8.mp3');
    // this.tonea9 = new Audio('newtones/instrument1/short/QP9.mp3');
    // this.tonea10 = new Audio('newtones/instrument1/short/QP10.mp3');
    //
    // this.toneb1 = new Audio('newtones/instrument1/short/SV1.mp3');
    // this.toneb2 = new Audio('newtones/instrument1/short/SV2.mp3');
    // this.toneb3 = new Audio('newtones/instrument1/short/SV3.mp3');
    // this.toneb4 = new Audio('newtones/instrument1/short/SV4.mp3');
    // this.toneb5 = new Audio('newtones/instrument1/short/SV5.mp3');
    // this.toneb6 = new Audio('newtones/instrument1/short/SV6.mp3');
    // this.toneb7 = new Audio('newtones/instrument1/short/SV7.mp3');
    // this.toneb8 = new Audio('newtones/instrument1/short/SV8.mp3');
    // this.toneb9 = new Audio('newtones/instrument1/short/SV9.mp3');
    // this.toneb10 = new Audio('newtones/instrument1/short/SV10.mp3');
    //
    // this.tonec1 = new Audio('newtones/instrument1/short/SP1.mp3');
    // this.tonec2 = new Audio('newtones/instrument1/short/SP2.mp3');
    // this.tonec3 = new Audio('newtones/instrument1/short/SP3.mp3');
    // this.tonec4 = new Audio('newtones/instrument1/short/SP4.mp3');
    // this.tonec5 = new Audio('newtones/instrument1/short/SP5.mp3');
    // this.tonec6 = new Audio('newtones/instrument1/short/SP6.mp3');
    // this.tonec7 = new Audio('newtones/instrument1/short/SP7.mp3');
    // this.tonec8 = new Audio('newtones/instrument1/short/SP8.mp3');
    // this.tonec9 = new Audio('newtones/instrument1/short/SP9.mp3');
    // this.tonec10 = new Audio('newtones/instrument1/short/SP10.mp3');
    //
    // this.toned1 = new Audio('newtones/instrument1/short/PW1.mp3');
    // this.toned2 = new Audio('newtones/instrument1/short/PW2.mp3');
    // this.toned3 = new Audio('newtones/instrument1/short/PW3.mp3');
    // this.toned4 = new Audio('newtones/instrument1/short/PW4.mp3');
    // this.toned5 = new Audio('newtones/instrument1/short/PW5.mp3');
    // this.toned6 = new Audio('newtones/instrument1/short/PW6.mp3');
    // this.toned7 = new Audio('newtones/instrument1/short/PW7.mp3');
    // this.toned8 = new Audio('newtones/instrument1/short/PW8.mp3');
    // this.toned9 = new Audio('newtones/instrument1/short/PW9.mp3');
    // this.toned10 = new Audio('newtones/instrument1/short/PW10.mp3');

    this.tones1 = {};
    this.assignValues();
  }


  assignValues() {
    let i = 0;
    while (i < 400) {
      if ((0 <= i && i < 20) || (200 <= i && i < 220)) {
        if (i % 4 === 0) {
          this.tones1[i] = this.tonea10;
        } else if (i % 4 === 1) {
          this.tones1[i] = this.toneb10;
        } else if (i % 4 === 2) {
          this.tones1[i] = this.tonec10;
        } else if (i % 4 === 3) {
          this.tones1[i] = this.toned10;
        }
      } else if ((20 <= i && i < 40) || (220 <= i && i < 240)) {
        if (i % 4 === 0) {
          this.tones1[i] = this.tonea9;
        } else if (i % 4 === 1) {
          this.tones1[i] = this.toneb9;
        } else if (i % 4 === 2) {
          this.tones1[i] = this.tonec9;
        } else if (i % 4 === 3) {
          this.tones1[i] = this.toned9;
        }
      } else if ((40 <= i && i < 60) || (240 <= i && i < 260)) {
        if (i % 4 === 0) {
          this.tones1[i] = this.tonea8;
        } else if (i % 4 === 1) {
          this.tones1[i] = this.toneb8;
        } else if (i % 4 === 2) {
          this.tones1[i] = this.tonec8;
        } else if (i % 4 === 3) {
          this.tones1[i] = this.toned8;
        }
      } else if ((60 <= i && i < 80) || (260 <= i && i < 280)) {
        if (i % 4 === 0) {
          this.tones1[i] = this.tonea7;
        } else if (i % 4 === 1) {
          this.tones1[i] = this.toneb7;
        } else if (i % 4 === 2) {
          this.tones1[i] = this.tonec7;
        } else if (i % 4 === 3) {
          this.tones1[i] = this.toned7;
        }
      } else if ((80 <= i && i < 100) || (280 <= i && i < 300)) {
        if (i % 4 === 0) {
          this.tones1[i] = this.tonea6;
        } else if (i % 4 === 1) {
          this.tones1[i] = this.toneb6;
        } else if (i % 4 === 2) {
          this.tones1[i] = this.tonec6;
        } else if (i % 4 === 3) {
          this.tones1[i] = this.toned6;
        }
      } else if ((100 <= i && i < 120) || (300 <= i && i < 320)) {
        if (i % 4 === 0) {
          this.tones1[i] = this.tonea5;
        } else if (i % 4 === 1) {
          this.tones1[i] = this.toneb5;
        } else if (i % 4 === 2) {
          this.tones1[i] = this.tonec5;
        } else if (i % 4 === 3) {
          this.tones1[i] = this.toned5;
        }
      } else if ((120 <= i && i < 140) || (320 <= i && i < 340)) {
        if (i % 4 === 0) {
          this.tones1[i] = this.tonea4;
        } else if (i % 4 === 1) {
          this.tones1[i] = this.toneb4;
        } else if (i % 4 === 2) {
          this.tones1[i] = this.tonec4;
        } else if (i % 4 === 3) {
          this.tones1[i] = this.toned4;
        }
      } else if ((140 <= i && i < 160) || (340 <= i && i < 360)) {
        if (i % 4 === 0) {
          this.tones1[i] = this.tonea3;
        } else if (i % 4 === 1) {
          this.tones1[i] = this.toneb3;
        } else if (i % 4 === 2) {
          this.tones1[i] = this.tonec3;
        } else if (i % 4 === 3) {
          this.tones1[i] = this.toned3;
        }
      } else if ((160 <= i && i < 180) || (360 <= i && i < 380)) {
        if (i % 4 === 0) {
          this.tones1[i] = this.tonea2;
        } else if (i % 4 === 1) {
          this.tones1[i] = this.toneb2;
        } else if (i % 4 === 2) {
          this.tones1[i] = this.tonec2;
        } else if (i % 4 === 3) {
          this.tones1[i] = this.toned2;
        }
      } else if ((180 <= i && i < 200) || (380 <= i && i < 400)) {
        if (i % 4 === 0) {
          this.tones1[i] = this.tonea1;
        } else if (i % 4 === 1) {
          this.tones1[i] = this.toneb1;
        } else if (i % 4 === 2) {
          this.tones1[i] = this.tonec1;
        } else if (i % 4 === 3) {
          this.tones1[i] = this.toned1;
        }
      }

      i += 1;
    }

  }
}

/* harmony default export */ __webpack_exports__["a"] = (Tones);


/***/ })
/******/ ]);