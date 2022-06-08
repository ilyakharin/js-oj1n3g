const { setCuboid } = require('progkids/world');
const { setPos } = require('progkids/player');
const { removeAll } = require('progkids/drones');
const { connect, clear } = require('progkids/server');


const NICK = 'Sup';
const TOKEN = '5esyLrgTE63CPwi4iE5B';

const main = async () => {
  await connect({
    nick: NICK,
    token: TOKEN,
  });

  clear();

  await setCuboid(-63,0,-63,63,25,63,0);
  await removeAll();
  await setCuboid(-63,1,-63,63,9,63,10);
  await setCuboid(0,12,0,20,12,5,1);
  await setPos(10,13,1);

  let s =[
    [1,1,1], 
    [1,0,0], 
    [1,0,0], 
    [1,1,1],];

  let t =[
    [1,1,1],
		[0,1,0],
		[0,1,0],
		[0,1,0]];

  let a =[
    [0,1,0],
		[1,0,1],
		[1,1,1],
		[1,0,1]];

  let r =[
    [1,1,0],
		[1,0,1],
		[1,1,0],
		[1,0,0]];

  let x = 19;
  let y = 4;


};

document.getElementById('test').addEventListener('click', () => {
  main();
});
