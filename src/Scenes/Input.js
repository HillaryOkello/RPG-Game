import Phaser from 'phaser';
import scoreSystem from '../scores/api';

export default class InputScene extends Phaser.Scene {
  constructor() {
    super('Input');
  }

  create() {
    this.add.image(370, 170, 'logo');
    const element = document.getElementById('form');
    element.style.display = 'flex';
    element.addEventListener('click', (event) => {
      if (event.target.name === 'submit') {
        const user = document.getElementById('user');
        if (user.value !== '') {
          element.style.display = 'none';
          scoreSystem.namer(user.value);
          scoreSystem.postScores();
          this.scene.start('Title');
        } else {
          const element = document.getElementById('error');
          element.style.display = 'none';
          element.innerHTML = '';
          const p = document.createElement('p');
          p.textContent = 'Enter a valid name please';
          element.appendChild(p);
        }
      }
    });
  }
}