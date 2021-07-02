import Phaser from 'phaser';
import scoreSystem from '../scores/api';

export default class InputScene extends Phaser.Scene {
  constructor() {
    super('Input');
  }

  create() {
    this.add.image(150, 80, 'logo').setScale(0.2);
    this.add.text(100, 120, 'You did a great job, Evader!!!', {
      color: '#FFF', fontFamily: 'Arial', fontSize: '12px ', fontWeight: '900',
    });
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