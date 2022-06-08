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

  await setCuboid(-63, 0, -63, 63, 25, 63, 0);
  await removeAll();
  await setCuboid(-63, 1, -63, 63, 9, 63, 10);
  await setCuboid(0, 12, 0, 20, 12, 5, 1);
  await setPos(10, 13, 1);

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

  let x = 19;
  let y = 4;

  for (let b of [s,t,a,r,t]) {
  	y = 4;
    console.log(b);
	  for (let s of b) {
      console.log(s);
		  for (let n of s) {
			  if (n === 1) {
			  	await setBlock(x,12,y,41);
			  	x--;
        }
			  else {
				  await setBlock(x,12,y,1);
			  	x--;
        }
      }
		  x+=3;
		  y-=1;
    }
  	x-=4;
	  y+=4;
  }
};

document.getElementById('test').addEventListener('click', () => {
  main();
});
