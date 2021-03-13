var begin = true;
while (!begin) {}

window.onload = function() {
    setTimeout(mainLoop, 0);
};
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

var i;
var j;
var k;

var currentTime;
var elapsedTime;
var oldTime;
var frameCount = 0;
var fps = 60;
var frameDelay = 1000/fps;

function col(x1, y1, w1, h1, x2, y2, w2, h2) {
    return ((x1 + w1 > x2) && (x1 < x2 + w2)) && ((y1 + h1 > y2) && (y1 < y2 + h2));
}
function colliding() {
    var returnVal = false;
    for (i=0; i<platforms.length; i++) {
        if (col(
                player.x - 20,
                player.y + 20,
                40, 40,
                platforms[i].x - platforms[i].width + 25,
                platforms[i].y - platforms[i].height * 0.5,
                platforms[i].width, platforms[i].height
            )) {
            returnVal = true;
        }
    }
    return returnVal;
}
function enmCol(index) {
	for (j=0; j<platforms.length; j++) {
		if (col(
		    -enemies[index].x,
			enemies[index].y,
			35,
			35,
			platforms[j].x,
			platforms[j].y,
			platforms[j].width,
			platforms[j].height
		)) {return true;}
	}
	return false;
}

const spriteSheet = new Image();
spriteSheet.src = './SpriteSheet.png';

var player = {
    x: 0,
    y: 0,
    velX: 0,
    velY: 0,
    frame: 0,
	reload: 0,
	reloadPeriod: 75
};
var physics = {
    jumpHeight: 12,
    gravity: 0.3,
    maxGravity: 25,
    movementSpeed: 0.3,
    friction: 0.9,
    maxMovementSpeed: 5,
};
var platforms = [
    {type: 'ground',   x: 0,   y: 100, width: 500,  height: 50},
    {type: 'ground',   x: 0,   y: 300, width: 500,  height: 50},
    {type: 'obstacle', x: 0,   y: 500, width: 500,  height: 50},
    {type: 'ground',   x: 250, y: 700, width: 1000, height: 50},
    {type: 'ground',   x: 450, y: 500, width: 50,   height: 50},
    {type: 'ground',   x: 250, y: 300, width: 50,   height: 50}
];
var projectiles = [];
var enemies = [
    {
	    x: -400,
		y: 0,
		dir: 1,
		type: 1
	}
];

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
};
var mouse = {
    down: false,
    x: 0,
    y: 0
};
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
function onMouseMove(event) {
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
}
document.addEventListener("keydown", onKeyDown, false);
document.addEventListener("keyup", onKeyUp, false);
document.addEventListener("mousemove", onMouseMove, false);
document.addEventListener("mouseup", function(){mouse.down=false;}, false);
document.addEventListener("mousedown", function(){mouse.down=true;}, false);

oldTime = window.performance.now();
function mainLoop() {
    currentTime = window.performance.now();
    elapsedTime = currentTime - oldTime;
    requestAnimationFrame(mainLoop);
    while (!elapsedTime > frameDelay) {}
    oldTime = currentTime;

    function update() {
        player.y += player.velY;
        player.velY += physics.gravity;
        if (colliding()) {
            while (colliding()) {
                if (player.velY > 0) {
                    player.y -= 0.1;
                } else if (player.velY < 0) {
                    player.y += 0.1;
                }
            }
            if (keys.upArrow && player.velY > 0) {
                player.velY = -physics.jumpHeight;
            } else {
                player.velY = 0;
            }
        }
        if (Math.abs(player.velY) > physics.maxGravity) {
            if (player.vely > 0) {
                player.velY = physics.maxGravity;
            } else if (player.vely < 0) {
                player.velY = -physics.maxGravity;
            }
        }
        if (!keys.rtArrow && !keys.ltArrow) {
            player.velX *= physics.friction;
        }
        if (keys.rtArrow) {
            player.velX += physics.movementSpeed;
        }
        if (keys.ltArrow) {
            player.velX -= physics.movementSpeed;
        }
        if (Math.abs(player.velX) > physics.maxMovementSpeed) {
            if (player.velX > 0) {
                player.velX = physics.maxMovementSpeed;
            } else {
                player.velX = -physics.maxMovementSpeed;
            }
        }
        player.x += player.velX;
        if (colliding()) {
            while (colliding()) {
                if (player.velX > 0) {
                    player.x -= 0.1;
                } else if (player.velX < 0) {
                    player.x += 0.1;
                }
            }
            player.velX = 0;
        }

		player.frame += 1;
        // if (player.frame > 5 - 1) {player.frame = 0;}

        if (player.reload < player.reloadPeriod) {player.reload += 1;}
        if (mouse.down && player.reload >= player.reloadPeriod) {
			player.reload = 0;
			projectiles.push({
				x: player.x - 20 + canvas.width/2,
				y: player.y - 20 + canvas.height/2,
				vel: 10,
				dir: Math.atan2(mouse.y - canvas.height/2, mouse.x - canvas.width/2)
			});
		}
		for (i=0; i<projectiles.length; i++) {
			projectiles[i].x += Math.cos(projectiles[i].dir) * projectiles[i].vel;
			projectiles[i].y += Math.sin(projectiles[i].dir) * projectiles[i].vel;
		}

        for (i=0; i<enemies.length; i++) {
			while (!enmCol(i)) {enemies[i].y += 1;}

			enemies[i].x += enemies[i].dir;
			if (!enmCol(i)) {enemies[i].x -= 1; enemies[i].dir *= -1}

			if (enmCol(i)) {enemies[i].y -= 1;}
		}
    }

    function clear(clr) {
        ctx.save();
        ctx.fillStyle = clr;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }
    function render() {
        clear('rgb(135, 206, 235)');
        for (i=0; i<platforms.length; i++) {
            switch (platforms[i].type) {
                case 'ground':
                    ctx.fillStyle = 'rgb(0, 179, 44)';
                    break;
                case 'obstacle':
                    ctx.fillStyle = 'rgb(179, 0, 12)';
                    break;
            }
            ctx.fillRect(
                platforms[i].x + 30 - platforms[i].width  + canvas.width/2  - player.x,
                platforms[i].y - 20 - platforms[i].height + canvas.height/2 - player.y,
                platforms[i].width,
                platforms[i].height
            );
        }
		for (i=0; i<enemies.length; i++) {
			switch (enemies[i].type) {
				case 1:
                    ctx.drawImage(
	        	        spriteSheet,
        		    	0,
    			        40,
		        	    40,
	    	        	40,
    		        	enemies[i].x - player.x - 15 + canvas.width/2,
		            	enemies[i].y - player.y - 70 + canvas.height/2,
	    		        35,
    			        35
		            );
					break;
				case 2:
                    ctx.drawImage(
	        	        spriteSheet,
        		    	0,
    			        80,
		        	    40,
	    	        	40,
    		        	enemies[i].x - player.x - 15 + canvas.width/2,
		            	enemies[i].y - player.y - 70 + canvas.height/2,
	    		        35,
    			        35
		            );
					break;
			}
		}
		for (i=0; i < projectiles.length; i++) {
		   	ctx.drawImage(
	    	    spriteSheet,
    			0,
			    120,
		    	40,
	    		40,
    			projectiles[i].x - player.x,
		    	projectiles[i].y - player.y,
			    40,
			    40
		    );
		}
        ctx.drawImage(
            spriteSheet,
            player.frame * 40,
			0,
            40,
            40,
            canvas.width / 2 - 15,
            canvas.height / 2 - 20,
            35,
            35
        );
    }

    update();
    render();
	frameCount += 1;
}
