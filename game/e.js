const errMsg = document.querySelector('#errorDisplay');
/*try{
  */setInterval(mainLoop(), 20);/*
}catch(err){
  errMsg.innerHTML = err.stack + err.name + err.message;
}*/

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

var platforms = [
  {type: 'floor',    x: canvas.width / 2, y: canvas.height / 2 + 10, width: 50,  height: 50},
  {type: 'obstacle', x: canvas.width / 2, y: canvas.height / 2 + 20, width: 50, height: 50},
];

var player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  velX: 0,
  velY: 0,
};

function mainLoop() {
  ctx.fillStyle = 'rgb(135, 206, 235)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
