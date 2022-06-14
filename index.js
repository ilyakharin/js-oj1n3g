import { setCuboid, setBlock, getBlock } from 'progkids/world';
import { setPos, getPos } from 'progkids/player';
import { removeAll, createDrone } from 'progkids/drones';
import { connect, clear } from 'progkids/server';

import start from './start';

const NICK = 'Sup';
const TOKEN = '5esyLrgTE63CPwi4iE5B';

const begin = async () => {
  removeAll();
  setCuboid(-63, 0, -63, 63, 25, 63, 0);
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
  setCuboid(9, 12, 6, 11, 12, 8, 57);
  setCuboid(43, 19, -5, 47, 19, -1, 57);
};

const platform = async (x, y, z, type) => {
  setCuboid(x, y, z, x + 2, y, z + 2, type)
}

const movePlatform = async () => {
  setCuboid(28, 19, 20, 30, 19, 22, 17);
  let n = 0;
  let moveInterval = setInterval(async () => {
    setCuboid(31 + x, 19, 20, 31 + x, 19, 22, 1);
    setCuboid(28 + x, 19, 20, 28 + x, 19, 22, 0);
    n += 1;
    if (n > 15){
      clearInterval(moveInterval);
    }
  }, 1500);
}

const main = async () => {
  await connect({
    nick: NICK,
    token: TOKEN,
  });

  begin();
  
  let newInterval = setInterval(async () => {
    let pos = await getPos();
    let block = await getBlock(pos[0], pos[1] - 1, pos[2]);

    document.getElementById('stop').addEventListener('click', () => {
      clearInterval(newInterval);
    });

    switch (block) {
      case 57:
        await platform(9, 12, 9, 4);
        break;
      case 4:
        await platform(9, 12, 13, 89);
        break;
      case 89:
        await platform(13, 12, 13, 18);
        break;
      case 18:
        await platform(17, 12, 13, 45);
        break;
      case 45:
        await platform(17, 12, 18, 49);
        break;
      case 49:
        await platform(17, 12, 23, 5);
        break;
      case 5:
        await platform(14, 13, 23, 20); 
        break;
      case 20:
        await platform(11, 14, 23, 112);
        break;
      case 112:
        await platform(11, 15, 27, 79);
        break;
      case 79:
        await setCuboid(11, 15, 30, 13, 15, 40, 14);
        break;
      case 14:
        await platform(11, 15, 41, 13);
        let n = 25;
	      while (n > 0) {
		    setBlock(Math.floor(Math.random() * 3) + 11, 15, Math.floor(Math.random() * 11) + 30, 0);
		    n -= 1;
        }
        break;
      case 13:
        await platform(15, 16, 41, 80);
        break;
      case 80:
        await platform(19, 17, 41, 121);
        break;
      case 121:
        await platform(24, 18, 41, 170);
        break;
      case 170:
        await platform(29, 19, 41, 22);
        break;
      case 22:
        await setCuboid(29, 19, 30, 31, 19, 40, 24)
        break;
      case 24:
        await platform(29, 19, 27, 35);
        let m = 25;
	      while (m > 0) {
		    setBlock(Math.floor(Math.random() * 4) + 28, 19, Math.floor(Math.random() * 11) + 30, 0);
		    m -= 1;
        }
        break;
      case 35:
        await platform(29, 19, 25, 7);
        break;
      case 7:
        await movePlatform();
        break;
      case 10:
        setPos(10,13,1);
        break;
      }
  }, 400);
};


document.getElementById('clear').addEventListener('click', () => {
  clear();
});

document.getElementById('start').addEventListener('click', () => {
  main();
});
