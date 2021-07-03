import Phaser from 'phaser';
import createPlayerAnims from '../animations/Player';
import { Align } from '../align';
import scoreSystem from '../scores/api';
import Button from '../objects/Button';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // map tiles
    this.load.image('tiles', 'assets/map/spritesheet.png');

    // map in json format
    this.load.tilemapTiledJSON('map', 'assets/map/map.json');

    // our two characters
    this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
  }

  create() {
    const board = document.getElementById('score');
    board.style.display = 'none';
    const map = this.make.tilemap({ key: 'map' });
    const tiles = map.addTilesetImage('spritesheet', 'tiles');
    // eslint-disable-next-line no-unused-vars
    const grass = map.createLayer('Grass', tiles, 0, 0);
    const obstacles = map.createLayer('Obstacles', tiles, 0, 0);
    obstacles.setCollisionByExclusion([-1]);

    // don't go out of the map
    this.player = this.physics.add.sprite(70, 100, 'dude', 4).setScale(0.5);
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    // limit camera to map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    createPlayerAnims(this.anims);

    this.cursors = this.input.keyboard.createCursorKeys();

    // don't walk on trees
    this.physics.add.collider(this.player, obstacles);

    // where the enemies will be
    this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    for (let i = 0; i < 30; i += 1) {
      const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      // parameters are x, y, width, height
      this.spawns.create(x, y, 20, 20);
    }
    this.physics.add.overlap(this.player, this.spawns, this.BombZone, false, this);

    this.gameitems = this.physics.add.group();

    for (let i = 0; i < 20; i += 1) {
      const x = Phaser.Math.RND.between(0, 400);
      const y = Phaser.Math.RND.between(0, 400);

      this.gameitems.create(x, y, 'audio').setScale(0.5);
    }

    this.score = 0;
    this.scoreText = this.add.text(10, 7, 'Score: 0', {
      fontSize: '12px',
      fill: '#000',
    }).setDepth(3);

    this.physics.add.overlap(this.player, this.gameitems, this.collectMedal, null, this);

    this.physics.add.collider(this.gameitems, obstacles);
  }

  update() {
    // this.scoreText.setScrollFactor(0, 0);
    if (this.cursors.left.isDown) {
      this.player.anims.play('left', true);
      this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play('right', true);
      this.player.body.setVelocityX(80);
    } else if (this.cursors.up.isDown) {
      this.player.anims.play('up', true);
      this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play('down', true);
      this.player.body.setVelocityY(80);
    } else {
      this.player.anims.stop();
      this.player.body.setVelocity(0);
    }
  }

  BombZone(player, zone) {
    // bomb Zone
    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    const gameOver = this.add.text(80, 120, 'GAME OVER!!', {
      fontSize: '30px',
      fill: '#FF0000',
    }).setDepth(5);
    Align.center(gameOver, this);
    this.endGame(player, this.score);
  }

  collectMedal(player, audio) {
    audio.disableBody(true, true);
    this.score += 100;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  endGame(player) {
    this.cameras.main.shake(900);
    player.setTint(0xff0000);
    this.physics.pause();
    scoreSystem.scorer(this.score);
    this.time.addEvent({
      delay: 3000,
      loop: false,
      callback: () => {
        this.scene.start('Input');
        this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
      },
    });
  }
}
