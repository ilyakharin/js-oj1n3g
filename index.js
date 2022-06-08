import { setCuboid, setBlock } from 'progkids/world';
import { setPos } from 'progkids/player';
import { removeAll } from 'progkids/drones';
import { connect,clear } from 'progkids/server';

const NICK = 'Sup';
const TOKEN = '5esyLrgTE63CPwi4iE5B';

const main = async () => {
  await connect({
    nick: NICK,
    token: TOKEN,
  });

  await new Promise((ok) => setTimeout(ok, 5000));

  clear();

  setCuboid(-63, 0, -63, 63, 25, 63, 0);
  removeAll();
  setCuboid(-63, 1, -63, 63, 9, 63, 10);
  setCuboid(0, 12, 0, 20, 12, 5, 1);
  setPos(10, 13, 1);

  let s = [
    [1, 1, 1],
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ];

  let t = [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ];

  let a = [
    [0, 1, 0],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
  ];

  let r = [
    [1, 1, 0],
    [1, 0, 1],
    [1, 1, 0],
    [1, 0, 0],
  ];

  let pos = { x: 19, y: 12, z: 4 };
  let x_offset = 0;
  let z_offset = 0;

  for (const i of [s,t,a,r,t]) {
  	z_offset = 0;
	  for (const j of i) {
		  for (const n of j) {
			  if (n === 1) {
			  	  setBlock(
            pos.x + x_offset, 
            pos.y,
            pos.z + z_offset,
            41
            );
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

document.getElementById('test').addEventListener('click', () => {
  main();
});
