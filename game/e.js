const errMsg = document.querySelector('#errorDisplay');
try{
  setInterval(mainLoop, 20);
}catch(err){
  errMsg.innerHTML = err.stack + err.name + err.message;
}

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

var i;
var j;
var player = {
  x: canvas.width  / 2,
  y: canvas.height / 2,
  velX:  0,
  velY:  0,
  frame: 0,
};
var platforms = [
  {type: 'floor',    x: canvas.width / 2, y: canvas.height / 2 + 10, width: 50, height: 50},
  {type: 'obstacle', x: canvas.width / 2, y: canvas.height / 2 + 20, width: 50, height: 50},
];

function mainLoop() {
  function clear(clr) {
    ctx.save();
    ctx.fillStyle = clr;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }
  function render() {
    clear('rgb(135, 206, 235)');
    for (i = 0; i < platforms.length; i++) {
      switch(platforms [i].type) {
          case 'ground':
            ctx.fillStyle = 'rgb(0, 179, 44)';
            break;
          case 'obstacle':
            ctx.fillStyle = 'rgb(179, 0, 12)';
            break;
      }
      ctx.fillRect(platforms[i].x - platforms[i].width / 2, platforms[i].y - platforms[i].height / 2, platforms[i].width, platforms[i].height);
    }
    render();
}
