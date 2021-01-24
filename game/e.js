const errMsg = document.querySelector('#errorDisplay');
window.onload = function() {
  try {
    mainLoop();
  } catch(err) {
    errMsg.innerHTML = err.stack;
  }
}
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

var i;
var j;

var currentTime;
var elapsedTime;
var oldTime;
var frameCount = 0;
var fps = 60;
var frameDelay = 1000 / fps;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function col(x1, y1, w1, h1, x2, y2, w2, h2) {
  return ((x1-w1*0.5 < x2-w2*-0.5) && (x1+w1*0.5 > x2+w2*-0.5)) && ((y1-h1*0.5 < y2-h2*-0.5) && (y1+h1*0.5 > y2+h2*-0.5));
}
function colliding() {
  var returnVal = false;
  for (i = 0; i < platforms.length; i++) {
    if (col(player.x - 40 / 2, player.y - 40 / 2, 40, 40, platforms[i].x - platforms[i].width / 2, platforms[i].y - platforms[i].height / 2, platforms[i].width, platforms[i].height)) {returnval = true; console.log('col');}
  }
  return returnVal;
}

var player = {
  x: 0,
  y: 0,
  velX:  0,
  velY:  0,
  frame: 0,
  col: function() {
    var returnVal = false;
    for (i = 0; i < platforms.length; i++) {
      if (col(this.x - this.width / 2, this.y - this.height / 2, 40, 40, platforms[i].x - platforms[i].width / 2, platforms[i].y - platforms[i].height / 2, platforms[i].width, platforms[i].height)) {returnval = true; console.log('col');}
    }
    return returnVal;
	/*
	var returnVal = false;
	for (i = 0; i < platforms.length; i++) {
	  if (col(player.x, player.y)) {
	    returnVal = true;
	  }
	}
	return returnVal;
	*/
  },
}
var physics = {
  jumpHeight: 12,
  gravity: 0.3,
  maxGravity: 25,
  movementSpeed: 0.3,
  friction: 0.1,
  maxMovementSpeed: 5,
}
var platforms = [
  {type: 'ground',   x: 0,      y: 50, width: 50, height: 50},
  {type: 'obstacle', x: 0 - 50, y: 50, width: 50, height: 50},
]

var keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    rtArrow: false,
    ltArrow: false,
    upArrow: false,
    dnArrow: false,
    space: false
}
function onKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        keys.w = true;
    }
    if (keyCode == 83) {
        keys.s = true;
    }
    if (keyCode == 65) {
        keys.a = true;
    }
    if (keyCode == 68) {
        keys.d = true;
    }
    if (keyCode == 38) {
        keys.upArrow = true;
    }
    if (keyCode == 40) {
        keys.dnArrow = true;
    }
    if (keyCode == 37) {
        keys.ltArrow = true;
    }
    if (keyCode == 39) {
        keys.rtArrow = true;
    }
    if (keyCode == 32) {
        keys.space = true;
    }
}
function onKeyUp(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        keys.w = false;
    }
    if (keyCode == 83) {
        keys.s = false;
    }
    if (keyCode == 65) {
        keys.a = false;
    }
    if (keyCode == 68) {
        keys.d = false;
    }
    if (keyCode == 38) {
        keys.upArrow = false;
    }
    if (keyCode == 40) {
        keys.dnArrow = false;
    }
    if (keyCode == 37) {
        keys.ltArrow = false;
    }
    if (keyCode == 39) {
        keys.rtArrow = false;
    }
    if (keyCode == 32) {
        keys.space = false;
    }
}
document.addEventListener("keydown", onKeyDown, false);
document.addEventListener("keyup", onKeyUp, false);
oldTime = window.performance.now();

function mainLoop() {
  currentTime = window.performance.now();
  elapsedTime = currentTime - oldTime;
  requestAnimationFrame(mainLoop);
  if (!elapsedTime > frameDelay) {
    return;
  }
  oldTime = currentTime;

  function update() {
    if (keys.rtArrow) {player.velX += physics.movementSpeed;}
    if (keys.rtArrow) {player.velX -= physics.movementSpeed;}
    if (Math.abs(velX) > physics.maxMovementSpeed) {if (player.velX > 0) {player.velX = gravity.player.maxMovementSpeed;} else {player.velX = -gravity.maxMovementSpeed;}}
    player.velY += physics.gravity;
    if (colliding()) {
      while (colliding()) {
        player.y -= 0.1;
      }
      player.velY = 0;
    }
    player.y += player.velY;
    player.x += player.velX;
  }
  function clear(clr) {
    ctx.save();
    ctx.fillStyle = clr;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }
  function render() {
    ctx.save();
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
      ctx.fillRect(
	    platforms[i].x - (platforms[i].width  / 2 - player.x) + canvas.width  / 2,
		platforms[i].y + (platforms[i].height / 2 - player.y) + canvas.height / 2,
		platforms[i].width,
		platforms[i].height
	  );
    }
    ctx.fillStyle = 'rgb(0, 0, 255)';
    ctx.fillRect(canvas.width / 2 - 40 / 2, canvas.height / 2 - 40 / 2, 40, 40);
    ctx.restore();
  }
  update();
  render();
}
