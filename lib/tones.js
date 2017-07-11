class Tones {
  constructor() {
    this.reverb = new Pizzicato.Effects.Reverb({
      time: 2,
      decay: 0.8,
      reverse: false,
      mix: 0.8
    });

    this.tones = {};
    for (let i = 1; i <= 10; i++) {
      this.tones[`a${i}`] = new Pizzicato.Sound({source: 'file', options: {path: `tones/short/QP${i}.mp3`, volume: 0.01}},  function() {this.tones[`a${i}`].addEffect(this.reverb)}.bind(this));
      this.tones[`b${i}`] = new Pizzicato.Sound({source: 'file', options: {path: `tones/short/SV${i}.mp3`, volume: 0.01}},  function() {this.tones[`b${i}`].addEffect(this.reverb)}.bind(this));
      this.tones[`c${i}`] = new Pizzicato.Sound({source: 'file', options: {path: `tones/short/SP${i}.mp3`, volume: 0.01}},  function() {this.tones[`c${i}`].addEffect(this.reverb)}.bind(this));
      this.tones[`d${i}`] = new Pizzicato.Sound({source: 'file', options: {path: `tones/short/PW${i}.mp3`, volume: 0.01}},  function() {this.tones[`d${i}`].addEffect(this.reverb)}.bind(this));
    }

    this.toneCells = {};

    this.assignValues();
  }


  assignValues() {
    let i = 0;
    while (i < 400) {
      if ((0 <= i && i < 20) || (200 <= i && i < 220)) {
        if (i % 4 === 0) {
          this.toneCells[i] = this.tones['a10'];
        } else if (i % 4 === 1) {
          this.toneCells[i] = this.tones['b10'];
        } else if (i % 4 === 2) {
          this.toneCells[i] = this.tones['c10'];
        } else if (i % 4 === 3) {
          this.toneCells[i] = this.tones['d10'];
        }
      } else if ((20 <= i && i < 40) || (220 <= i && i < 240)) {
        if (i % 4 === 0) {
          this.toneCells[i] = this.tones['a9'];
        } else if (i % 4 === 1) {
          this.toneCells[i] = this.tones['b9'];
        } else if (i % 4 === 2) {
          this.toneCells[i] = this.tones['c9'];
        } else if (i % 4 === 3) {
          this.toneCells[i] = this.tones['d9'];
        }
      } else if ((40 <= i && i < 60) || (240 <= i && i < 260)) {
        if (i % 4 === 0) {
          this.toneCells[i] = this.tones['a8'];
        } else if (i % 4 === 1) {
          this.toneCells[i] = this.tones['b8'];
        } else if (i % 4 === 2) {
          this.toneCells[i] = this.tones['c8'];
        } else if (i % 4 === 3) {
          this.toneCells[i] = this.tones['d8'];
        }
      } else if ((60 <= i && i < 80) || (260 <= i && i < 280)) {
        if (i % 4 === 0) {
          this.toneCells[i] = this.tones['a7'];
        } else if (i % 4 === 1) {
          this.toneCells[i] = this.tones['b7'];
        } else if (i % 4 === 2) {
          this.toneCells[i] = this.tones['c7'];
        } else if (i % 4 === 3) {
          this.toneCells[i] = this.tones['d7'];
        }
      } else if ((80 <= i && i < 100) || (280 <= i && i < 300)) {
        if (i % 4 === 0) {
          this.toneCells[i] = this.tones['a6'];
        } else if (i % 4 === 1) {
          this.toneCells[i] = this.tones['b6'];
        } else if (i % 4 === 2) {
          this.toneCells[i] = this.tones['c6'];
        } else if (i % 4 === 3) {
          this.toneCells[i] = this.tones['d6'];
        }
      } else if ((100 <= i && i < 120) || (300 <= i && i < 320)) {
        if (i % 4 === 0) {
          this.toneCells[i] = this.tones['a5'];
        } else if (i % 4 === 1) {
          this.toneCells[i] = this.tones['b5'];
        } else if (i % 4 === 2) {
          this.toneCells[i] = this.tones['c5'];
        } else if (i % 4 === 3) {
          this.toneCells[i] = this.tones['d5'];
        }
      } else if ((120 <= i && i < 140) || (320 <= i && i < 340)) {
        if (i % 4 === 0) {
          this.toneCells[i] = this.tones['a4'];
        } else if (i % 4 === 1) {
          this.toneCells[i] = this.tones['b4'];
        } else if (i % 4 === 2) {
          this.toneCells[i] = this.tones['c4'];
        } else if (i % 4 === 3) {
          this.toneCells[i] = this.tones['d4'];
        }
      } else if ((140 <= i && i < 160) || (340 <= i && i < 360)) {
        if (i % 4 === 0) {
          this.toneCells[i] = this.tones['a3'];
        } else if (i % 4 === 1) {
          this.toneCells[i] = this.tones['b3'];
        } else if (i % 4 === 2) {
          this.toneCells[i] = this.tones['c3'];
        } else if (i % 4 === 3) {
          this.toneCells[i] = this.tones['d3'];
        }
      } else if ((160 <= i && i < 180) || (360 <= i && i < 380)) {
        if (i % 4 === 0) {
          this.toneCells[i] = this.tones['a2'];
        } else if (i % 4 === 1) {
          this.toneCells[i] = this.tones['b2'];
        } else if (i % 4 === 2) {
          this.toneCells[i] = this.tones['c2'];
        } else if (i % 4 === 3) {
          this.toneCells[i] = this.tones['d2'];
        }
      } else if ((180 <= i && i < 200) || (380 <= i && i < 400)) {
        if (i % 4 === 0) {
          this.toneCells[i] = this.tones['a1'];
        } else if (i % 4 === 1) {
          this.toneCells[i] = this.tones['b1'];
        } else if (i % 4 === 2) {
          this.toneCells[i] = this.tones['c1'];
        } else if (i % 4 === 3) {
          this.toneCells[i] = this.tones['d1'];
        }
      }

      i += 1;
    }

  }
}

export default Tones;
