import { setCuboid, setBlock } from 'progkids/world';
import { setPos } from 'progkids/player';
import { removeAll, createDrone } from 'progkids/drones';
import { connect, clear } from 'progkids/server';

import start from './start';

const NICK = 'Sup';
const TOKEN = '5esyLrgTE63CPwi4iE5B';

const begin = async () => {
  setCuboid(-63, 0, -63, 63, 25, 63, 0);
  removeAll();
  setCuboid(-63, 1, -63, 63, 9, 63, 10);
  setCuboid(0, 12, 0, 20, 12, 5, 1);
  setPos(10, 13, 1);

  let pos = { x: 19, y: 12, z: 4 };
  let x_offset = 0;
  let z_offset = 0;

  for (const i of start) {
    z_offset = 0;
    for (const j of i) {
      for (const n of j) {
        if (n === 1) {
          setBlock(pos.x + x_offset, pos.y, pos.z + z_offset, 41);
        }
        x_offset--;
      }
      x_offset += 3;
      z_offset -= 1;
    }
    x_offset -= 4;
    z_offset += 4;
  }
};

const delay = async () => {
  await new Promise((ok) => setTimeout(ok, 2000));
};

const main = async () => {
  await connect({
    nick: NICK,
    token: TOKEN,
  });

  await new Promise((ok) => setTimeout(ok, 1000));

  clear();
  begin();

  setCuboid(9, 12, 6, 11, 12, 8, 57);
  setCuboid(43, 19, -5, 47, 19, -1, 57);
  let winDrone = createDrone(43, 20, -1, '(◕‿◕)');
  await winDrone.move('DOWN', 1);
  await winDrone.turnRight();
  await winDrone.turnRight();
  
};

document.getElementById('start').addEventListener('click', () => {
  main();
});
