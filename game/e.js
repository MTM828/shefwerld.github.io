const errMsg = document.querySelector('#errorDisplay');

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

function mainLoop() {
  ctx.fillStyle = 'rgb(135, 206, 235)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
setInterval(
  function(){try{mainLoop();}catch(err){errMsg.innerHTML = err;}}
, 20)
