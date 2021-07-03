import Phaser from 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import CreditsScene from './Scenes/CreditsScene';
import OptionsScene from './Scenes/OptionsScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import ScoreScene from './Scenes/ScoreScene';
import InputScene from './Scenes/Input';
import Model from './Model';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Game', GameScene);
    this.scene.add('Boot', BootScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Score', ScoreScene);
    this.scene.add('Input', InputScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();