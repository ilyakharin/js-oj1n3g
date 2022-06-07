const { setBlock } = require('progkids/world');
const { connect, clear } = require('progkids/server');
const symbols = require('./symbols').default;

const NICK = 'Sup';
const TOKEN = '5esyLrgTE63CPwi4iE5B';

const renderTime = async (offset, dots) => {
  const x_offset = offset * 6;
  let line_offset = 0;
  const position = { x: 0, y: 10, z: 0 };

  for (const line of dots) {
    for (let j = 0; j < 5; j++) {
      if (line[j] === '0') {
        await setBlock(
          position.x + j + x_offset,
          position.y - line_offset,
          position.z,
          3
        );
      }
    }

    line_offset++;
  }
};

const main = async () => {
  await connect({
    nick: NICK,
    token: TOKEN,
  });

  clear();
  let digit_offset = 0;
  const now = new Date().toLocaleTimeString();
  for (const symbol of now) {
    console.log(symbol);
    const dots = symbols[symbol];
    await renderTime(digit_offset, dots);
    digit_offset++;
  }
};

document.getElementById('test').addEventListener('click', () => {
  main();
});
