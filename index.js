const { setBlock } = require('progkids/world');
const { connect, clear } = require('progkids/server');

const NICK = 'Sup';
const TOKEN = '5esyLrgTE63CPwi4iE5B';

const main = async () => {
  await connect({
    nick: NICK,
    token: TOKEN,
  });

  clear();
};

document.getElementById('test').addEventListener('click', () => {
  main();
});
