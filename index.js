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

const platform2 = async (x, y, z, type) => {
  setCuboid(x, y, z, x+2, y, z+2, type)
  while (true){
    let pos = getPos();
    if (getBlock(pos[0], pos[1] - 1, pos[2]) == type) {
      await platform3(13, 12, 13, 3);
      break;
    } else if (getBlock(pos[0], pos[1] - 1, pos[2]) == 10) {
      setPos(10, 13, 1);
    }
  }
}

const platform1 = async (x, y, z, type) => {
  setCuboid(x, y, z, x+2, y, z+2, type)
  while (true){
    let pos = getPos();
    if (getBlock(pos[0], pos[1] - 1, pos[2]) == type) {
      await platform2(9, 12, 13, 218);
      break;
    } else if (getBlock(pos[0], pos[1] - 1, pos[2]) == 10) {
      setPos(10, 13, 1);
    }
  }
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
    let pos = getPos();
    let underPos = [pos[0], pos[1] - 1, pos[2]];
    if (getBlock(underPos[0], underPos[1], underPos[2]) === 57) {
      await platform1(9,12,9,1);
    } else if (getBlock(pos[0], pos[1] - 1, pos[2]) == 10) {
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
