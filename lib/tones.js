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

export default Tones;
