class Tones {
  constructor() {
    this.reverb = new Pizzicato.Effects.Reverb({
      time: 2,
      decay: 0.8,
      reverse: false,
      mix: 0.8
    });

    this.tones = {10:{},9:{},8:{},7:{},6:{},5:{},4:{},3:{},2:{},1:{}};
    for (let i = 1; i <= 10; i++) {
      this.tones[i][0] = new Pizzicato.Sound({source: 'file', options: {path: `tones/short/QP${i}.mp3`, volume: 0.01}},  function() {this.tones[i][0].addEffect(this.reverb)}.bind(this));
      this.tones[i][1] = new Pizzicato.Sound({source: 'file', options: {path: `tones/short/SV${i}.mp3`, volume: 0.01}},  function() {this.tones[i][1].addEffect(this.reverb)}.bind(this));
      this.tones[i][2] = new Pizzicato.Sound({source: 'file', options: {path: `tones/short/SP${i}.mp3`, volume: 0.01}},  function() {this.tones[i][2].addEffect(this.reverb)}.bind(this));
      this.tones[i][3] = new Pizzicato.Sound({source: 'file', options: {path: `tones/short/PW${i}.mp3`, volume: 0.01}},  function() {this.tones[i][3].addEffect(this.reverb)}.bind(this));
    }

    this.toneCells = {};
    this.assignValues();
  }

  assignValues() {
    let cell=0;
    while (cell < 400) {
      let scaleDegree = 10 - (Math.floor((cell % 200) / 20));
      let instrumentId = cell % 4;
      this.toneCells[cell] = this.tones[scaleDegree][instrumentId];
      cell += 1;
    }
  }
}

export default Tones;
