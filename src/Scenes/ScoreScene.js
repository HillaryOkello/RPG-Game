import Phaser from 'phaser';
import { Align } from '../align';
import Button from '../objects/Button';
import config from '../Config/config';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Score');
  }

  create() {
    const catbg = this.add.image(0, 0, 'scorebg');
    Align.scaleToGameW(catbg, 1.5, this);
    Align.center(catbg, this);
    const board = document.getElementById('score');
    board.style.display = 'block';
    board.innerHTML = '';
    fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/4A1oDEacyDE8mH3xM7JS/scores/')
      .then((res) => res.json())
      .then((res) => {
        const arr = res.result;
        for (let i = 0; i < arr.length; i += 1) {
          for (let j = 0; j < arr.length - 1; j += 1) {
            if (arr[j].score < arr[j + 1].score) {
              const tmp = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = tmp;
            }
          }
        }
        arr.slice(0, 5).forEach((item) => {
          const div = document.createElement('div');
          div.style.cssText = `
          display:flex;
          justify-content: space-between
          `;
          const nameDiv = document.createElement('strong');
          const scoreDiv = document.createElement('strong');
          nameDiv.innerHTML = `${item.user} `;
          scoreDiv.innerHTML = `${item.score}`;
          div.appendChild(nameDiv);
          div.appendChild(scoreDiv);
          board.appendChild(div);
          this.menuButton = new Button(this, config.width / 2, config.height / 2, 'blueButton1', 'blueButton2', 'Menu', 'Title');
        });
      });
  }
}