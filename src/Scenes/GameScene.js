import Phaser from 'phaser';

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
    // create the map
    const map = this.make.tilemap({ key: 'map' });

    // first parameter is the name of the tilemap in tiled
    const tiles = map.addTilesetImage('spritesheet', 'tiles');

    // creating the layers
    const grass = map.createLayer('Grass', tiles, 150, 50);
    const obstacles = map.createLayer('Obstacles', tiles, 150, 50);

    // make all tiles in obstacles collidable
    obstacles.setCollisionByExclusion([-1]);

    // don't go out of the map
    this.player = this.physics.add.sprite(50, 100, 'dude', 4).setScale(0.5);
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    // limit camera to map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;
  }

  // update(time, delta) {
  //   this.player.body.setVelocity(0);
  //   // Horizontal movement
  //   if (this.cursors.left.isDown) {
  //     this.player.body.setVelocityX(-80);
  //   } else if (this.cursors.right.isDown) {
  //     this.player.body.setVelocityX(80);
  //   }

  //   // Vertical movement
  //   if (this.cursors.up.isDown) {
  //     this.player.body.setVelocityY(-80);
  //   } else if (this.cursors.down.isDown) {
  //     this.player.body.setVelocityY(80);
  //   }
  // }
}
