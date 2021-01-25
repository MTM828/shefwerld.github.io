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

function col(x1, y1, w1, h1, x2, y2, w2, h2) {
  return ((x1 + w1 > x2) && ( x1 < x2 + w2)) && ((y1 + h1 > y2) && ( y1 < y2 + h2));
}
function colliding() {
  var returnVal = false;
  for (i = 0; i < platforms.length; i++) {
    if (col(
      player.x - 20,
      player.y + 20,
      40, 40,
      platforms[i].x - platforms[i].width + 25,
      platforms[i].y - platforms[i].height * 0.5,
      platforms[i].width, platforms[i].height
  )) {returnVal = true;}
  }
  return returnVal;
}
function renderSpriteSheetImg(spritesheet, imgIndex, x, y) {
  ctx.drawImage(imgIndex * 2, 0, 50, 50, x, y, 40, 40);
}

var player = {
  x: 0,
  y: 0,
  velX:  0,
  velY:  0,
  frame: 0,
  spriteSheet: new Image(),
}
player.spriteSheet.src = './img/spritesheet.png';

var physics = {
  jumpHeight: 12,
  gravity: 0.3,
  maxGravity: 25,
  movementSpeed: 0.3,
  friction: 0.9,
  maxMovementSpeed: 5,
}
var platforms = [
  {type: 'ground',   x: 0,   y: 100, width: 500,  height: 50},
  {type: 'ground',   x: 0,   y: 300, width: 500,  height: 50},
  {type: 'obstacle', x: 0,   y: 500, width: 500,  height: 50},
  {type: 'ground',   x: 250, y: 700, width: 1000, height: 50},
  {type: 'ground',   x: 450, y: 500, width: 50,   height: 50},
  {type: 'ground',   x: 250, y: 300, width: 50,   height: 50},
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
  if (!elapsedTime > frameDelay) {while (!elapsedTime > frameDisplay) {}}
  oldTime = currentTime;

  function update() {

    player.y += player.velY;
    player.velY += physics.gravity;
    if (colliding()) {
      while (colliding()) {if (player.velY > 0) {player.y -= 0.1;} else if (player.velY < 0) {player.y += 0.1;}}
      if (keys.upArrow && player.velY > 0) {player.velY = -physics.jumpHeight;} else {player.velY = 0;} 
    }
    if (Math.abs(player.velY) > physics.maxGravity) {if (player.vely > 0) {player.velY = physics.maxGravity;} else if (player.vely < 0) {player.velY = -physics.maxGravity;}}

    if (!keys.rtArrow && !keys.ltArrow) {player.velX *= physics.friction;}
    if (keys.rtArrow) {player.velX += physics.movementSpeed;}
    if (keys.ltArrow) {player.velX -= physics.movementSpeed;}
    if (Math.abs(player.velX) > physics.maxMovementSpeed) {if (player.velX > 0) {player.velX = physics.maxMovementSpeed;} else {player.velX = -physics.maxMovementSpeed;}}
    player.x += player.velX;
    if (colliding()) {
    while (colliding()) {if (player.velX > 0) {player.x -= 0.1} else if (player.velX < 0) {player.x += 0.1}}
    player.velX = 0;
    }

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
      switch (platforms [i].type) {
          case 'ground':
            ctx.fillStyle = 'rgb(0, 179, 44)';
            break;
          case 'obstacle':
            ctx.fillStyle = 'rgb(179, 0, 12)';
            break;
      }
      ctx.fillRect(
        platforms[i].x + 30 - platforms[i].width  + canvas.width  / 2 - player.x,
        platforms[i].y - 20 - platforms[i].height + canvas.height / 2 - player.y,
        platforms[i].width,
        platforms[i].height
      );
    }
    ctx.fillStyle = 'rgb(0, 0, 255)';
    //ctx.fillRect(canvas.width / 2 - 15, canvas.height / 2 - 25, 40, 40);
	if (player.spriteSheet.complete) {ctx.drawImage(player.spriteSheet, 0, 0, 35, 26, canvas.width / 2 - 15, canvas.height / 2 - 25, 40, 40);}
    ctx.restore();
  }
  update();
  render();
}
