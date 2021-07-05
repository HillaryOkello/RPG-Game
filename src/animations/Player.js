import Phaser from 'phaser';

const createPlayerAnims = (anims = Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'down',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 10,
  });
  anims.create({
    key: 'right',
    frames: anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: 'up',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 10,
  });

  anims.create({
    key: 'left',
    frames: anims.generateFrameNumbers('dude', { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1,
  });
};
export default createPlayerAnims;