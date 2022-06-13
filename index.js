import { setCuboid, setBlock, getBlock } from 'progkids/world';
import { setPos, getPos } from 'progkids/player';
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

function platform1(x, y, z, type) {
  setCuboid(x, y, z, x + 2, y, z + 2, type)
}

const platform = async (x, y, z, type) => {
  setCuboid(x, y, z, x + 2, y, z + 2, type)
}

const main = async () => {
  await connect({
    nick: NICK,
    token: TOKEN,
  });

  begin();

  setCuboid(9, 12, 6, 11, 12, 8, 57);
  setCuboid(43, 19, -5, 47, 19, -1, 57);
  

  setInterval(async () => {
    let pos = await getPos();
    let block = await getBlock(pos[0], pos[1] - 1, pos[2]);
    if (block === 57) {
      await platform(9, 12, 9, 4);
    } else if (block === 4) {
      await platform(9, 12, 13, 89);
    } else if (block === 89) {
      await platform(13, 12, 13, 18);
    } else if (block === 18) {
      await platform(17, 12, 13, 45);
    } else if (block === 45) {
      await platform(17, 12, 18, 49);
    } else if (block === 49) {
      await platform(17, 12, 23, 5);
    } else if (block === 5) {
      await platform(14, 12, 23, 20);
    } else if (block === 10) {
      setPos(10,13,1);
    }
  }, 1000);
};


document.getElementById('clear').addEventListener('click', () => {
  clear();
});

document.getElementById('start').addEventListener('click', () => {
  main();
});
