class Tones {
  constructor() {
    this.tonea1 = new Audio('newtones/instrument1/short/QP1.mp3');
    this.tonea2 = new Audio('newtones/instrument1/short/QP2.mp3');
    this.tonea3 = new Audio('newtones/instrument1/short/QP3.mp3');
    this.tonea4 = new Audio('newtones/instrument1/short/QP4.mp3');
    this.tonea5 = new Audio('newtones/instrument1/short/QP5.mp3');
    this.tonea6 = new Audio('newtones/instrument1/short/QP6.mp3');
    this.tonea7 = new Audio('newtones/instrument1/short/QP7.mp3');
    this.tonea8 = new Audio('newtones/instrument1/short/QP8.mp3');
    this.tonea9 = new Audio('newtones/instrument1/short/QP9.mp3');
    this.tonea10 = new Audio('newtones/instrument1/short/QP10.mp3');

    this.toneb1 = new Audio('newtones/instrument1/short/SV1.mp3');
    this.toneb2 = new Audio('newtones/instrument1/short/SV2.mp3');
    this.toneb3 = new Audio('newtones/instrument1/short/SV3.mp3');
    this.toneb4 = new Audio('newtones/instrument1/short/SV4.mp3');
    this.toneb5 = new Audio('newtones/instrument1/short/SV5.mp3');
    this.toneb6 = new Audio('newtones/instrument1/short/SV6.mp3');
    this.toneb7 = new Audio('newtones/instrument1/short/SV7.mp3');
    this.toneb8 = new Audio('newtones/instrument1/short/SV8.mp3');
    this.toneb9 = new Audio('newtones/instrument1/short/SV9.mp3');
    this.toneb10 = new Audio('newtones/instrument1/short/SV10.mp3');

    this.tonec1 = new Audio('newtones/instrument1/short/SP1.mp3');
    this.tonec2 = new Audio('newtones/instrument1/short/SP2.mp3');
    this.tonec3 = new Audio('newtones/instrument1/short/SP3.mp3');
    this.tonec4 = new Audio('newtones/instrument1/short/SP4.mp3');
    this.tonec5 = new Audio('newtones/instrument1/short/SP5.mp3');
    this.tonec6 = new Audio('newtones/instrument1/short/SP6.mp3');
    this.tonec7 = new Audio('newtones/instrument1/short/SP7.mp3');
    this.tonec8 = new Audio('newtones/instrument1/short/SP8.mp3');
    this.tonec9 = new Audio('newtones/instrument1/short/SP9.mp3');
    this.tonec10 = new Audio('newtones/instrument1/short/SP10.mp3');

    this.toned1 = new Audio('newtones/instrument1/short/PW1.mp3');
    this.toned2 = new Audio('newtones/instrument1/short/PW2.mp3');
    this.toned3 = new Audio('newtones/instrument1/short/PW3.mp3');
    this.toned4 = new Audio('newtones/instrument1/short/PW4.mp3');
    this.toned5 = new Audio('newtones/instrument1/short/PW5.mp3');
    this.toned6 = new Audio('newtones/instrument1/short/PW6.mp3');
    this.toned7 = new Audio('newtones/instrument1/short/PW7.mp3');
    this.toned8 = new Audio('newtones/instrument1/short/PW8.mp3');
    this.toned9 = new Audio('newtones/instrument1/short/PW9.mp3');
    this.toned10 = new Audio('newtones/instrument1/short/PW10.mp3');

    this.tones1 = {};
    this.tones2 = {};
    this.tones3 = {};
    this.tones4 = {};
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
    this.tones2 = Object.assign({}, this.tones1);
    this.tones3 = Object.assign({}, this.tones1);
    this.tones4 = Object.assign({}, this.tones1);

  }
}

export default Tones;
