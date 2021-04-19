"use strict";

var i; var j;
function log(str = "") {
    console.log(str);
}
function rgb(r, g, b) {
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
const spriteSheet = new Image();
spriteSheet.src = "./spritesheet.png";

const g = "grass";
const s = "stone";
const X = "ground moving x-axis";
const Y = "ground moving y-axis";
const Z = "ground moving x+y-axis";
const _ = "air";
var lvl = [
    [_, g, _, g, _, X, _, g, _, _, _],
    [g, g, _, _, _, _, _, _, _, _, _],
    [_, g, _, g, g, g, _, g, _, Y, _],
    [g, g, _, _, _, g, _, _, _, _, _],
    [_, _, _, _, _, g, _, _, _, _, g],
    [g, g, _, _, _, _, _, _, _, g, g],
    [g, g, g, g, g, g, g, g, g, g, g]
];

class Canvas {
    constructor() {
        this.src = document.querySelector("#canvas");

        this.fps = 60;
        this.currentTime;
        this.elapsedTime;
        this.oldTime;
        this.frameDelay = 1000/this.fps;

        this.quit = false;
    }
    mainLoop() {
        canvas.currentTime = window.performance.now();
        canvas.elapsedTime = canvas.currentTime - canvas.oldTime;
        if (!canvas.quit) {requestAnimationFrame(canvas.mainLoop);}
        while (!canvas.elapsedTime > canvas.frameDelay) {}
        canvas.oldTime = canvas.currentTime;

        platforms.update();
        player.update();
        projectiles.update();

        renderer.render();
    }
};
class Renderer {
    constructor() {
        this.ctx = canvas.src.getContext("2d");
    }
    render() {
        this.clear(rgb(0, 0, 255));
        platforms.render();
        projectiles.render();
        enemies.render();
        player.render();
    }
    setColour(colour) {
        this.ctx.fillStyle = colour;
    }
    drawRect(x, y, width, height, colour) {
        this.ctx.save();
        this.setColour(colour);
        this.ctx.fillRect(Math.floor(x), Math.floor(y), width, height);
        this.ctx.restore();
    }
    drawImage(imgSrc, startX, startY, endX, endY, rendX, rendY, rendWidth, rendHeight) {
        this.ctx.drawImage(
            imgSrc, startX, startY, endX, endY, Math.floor(rendX), Math.floor(rendY), rendWidth, rendHeight
        )
    }
    renderFrame(index, row, width, height, rendX, rendY, rendWidth, rendHeight) {
        this.drawImage(
            spriteSheet, index * width, row * height, index * width + width, row * height + height, rendX, rendY, rendWidth, rendHeight
        )
    }
    clear(colour) {
        this.ctx.save();
        this.setColour(colour);
        this.drawRect(0, 0, canvas.src.width, canvas.src.height, colour);
        this.ctx.restore();
    }
};
class Keys {
    constructor() {
        this.w = false;
        this.a = false;
        this.s = false;
        this.d = false;
        this.up    = false;
        this.down  = false;
        this.left  = false;
        this.right = false;
        this.space = false;
    }
};
class Physics {
    constructor() {
        this.gravity = 0.2;
        this.jumpHeight = -8;
        this.acceleration = 1;
        this.maxSpeed = 8;
        this.friction = 0.8;
    }
    rectCol(x1, y1, w1, h1, x2, y2, w2, h2) {
        return x1 + w1 > x2 && x1 < x2 + w2 && y1 + h1 > y2 && y1 < y2 + h2;
    }
};
class Player {
    constructor(xInit = 0, yInit = 0) {
        this.xInit = xInit;
        this.yInit = yInit;
        this.x = xInit;
        this.y = yInit;
        this.yVel = 0;
        this.xVel = 0;
        this.onGround = false;
        this.width  = 50;
        this.height = 50;
        this.frame = 0;
    }
    colliding(getTile = false) {
        for (i = 0; i < platforms.platforms.length; i++) {
            if (physics.rectCol(
                this.x, this.y, this.width, this.height, platforms.platforms[i].x, platforms.platforms[i].y, platforms.width, platforms.height
            )) {
                if (getTile) {return i;} else {return true;}
            }
        }
        return false;
    }
    die() {
        this.x = this.xInit;
        this.y = this.yInit;
    }
    update() {
        this.yVel += physics.gravity;
        this.y += this.yVel;
        if (this.colliding()) {
            if (this.yVel < 0) {
                while (this.colliding()) {this.y += physics.gravity;}
            } else if (this.yVel > 0) {
                this.onGround = this.colliding(true);
                while (this.colliding()) {this.y -= physics.gravity;}
            }
            if (keys.up && this.yVel > 0) {
                this.yVel = physics.jumpHeight;
                this.onGround = false;
            } else {
                this.yVel = 0;
            }
        } else {
            this.onGround = false;
        }

        this.xVel *= physics.friction;
        if (keys.right && Math.abs(this.xVel) < physics.maxSpeed) {this.xVel += physics.acceleration;}
        if (keys.left  && Math.abs(this.xVel) < physics.maxSpeed) {this.xVel -= physics.acceleration;}
        this.xVel = Math.round(this.xVel * 1000) / 1000;
        this.x += this.xVel;
        if (this.colliding()) {
            if (this.xVel > 0) {
                while (this.colliding()) {this.x -= 0.1;}
            } else if (this.xVel < 0) {
                while (this.colliding()) {this.x += 0.1;}
            }
            this.xVel = 0;
        }
    }
    render() {
        renderer.renderFrame(this.frame, 0, 40, 40, canvas.src.width/2 - this.width/2, canvas.src.height/2 - this.height/2, this.width, this.height);
    }
};
class Enemies {
    constructor() {
        this.enemies = [];
    }
    update() {}
    render() {}
};
class Projectiles {
    constructor() {}
    update() {}
    render() {}
};
class Platform {
    constructor(x, y, type, xMotion = 0, yMotion = 0, motionVel = 0) {
        this.xInit = x;
        this.yInit = y;
        this.x = x;
        this.y = y;
        this.type = type;
        this.xMotion = xMotion;
        this.yMotion = yMotion;
        this.motionVel = motionVel;
    }
};
class Platforms {
    constructor() {
        this.level = lvl;
        this.platforms = [];
        this.width  = 75;
        this.height = 75;
    }
    init() {
        for (i = 0; i < this.level.length; i++) {
            for (j = 0; j < this.level[i].length; j++) {
                switch (this.level[i][j]) {
                    case _: break;
                    case g: this.platforms.push(new Platform(j * this.width, i * this.height, g           )); break;
                    case s: this.platforms.push(new Platform(j * this.width, i * this.height, s           )); break;
                    case X: this.platforms.push(new Platform(j * this.width, i * this.height, g, 75, 0 , 1)); break;
                    case Y: this.platforms.push(new Platform(j * this.width, i * this.height, g, 0 , 75, 1)); break;
                    case Z: this.platforms.push(new Platform(j * this.width, i * this.height, g, 75, 75, 1)); break;
                }
            }
        }
    }
    update() {
        var platform;
        for (i = 0; i < this.platforms.length; i++) {
            platform = this.platforms[i];
            if (platform.xMotion != 0) {
                if (platform.motionVel > 0) {
                    if (platform.x < platform.xInit + platform.xMotion) {
                        platform.x += platform.motionVel;
                        if (player.onGround == i) {
                            player.x += platform.motionVel;
                            if (player.colliding()) {while (player.colliding()) {player.x -= 0.1;}}
                        }
                        if (player.colliding()) {
                            player.x += platform.motionVel;
                            if (player.colliding()) {player.die();}
                        }
                    } else {
                        platform.motionVel *= -1;
                        while (platform.x < platform.xInit + platform.xMotion) {
                            platform.x += 0.1;
                            if (player.onGround) {
                                player.x += 0.1;
                            }
                        }
                    }
                } else if (platform.motionVel < 0) {
                    if (platform.x > platform.xInit - platform.xMotion) {
                        platform.x += platform.motionVel;
                        if (player.onGround == i) {
                            player.x += platform.motionVel;
                            if (player.colliding()) {while (player.colliding()) {player.x -= 0.1;}}
                        }
                        if (player.colliding()) {
                            player.x += platform.motionVel;
                            if (player.colliding()) {player.die();}
                        }
                    } else {
                        platform.motionVel *= -1;
                        while (platform.x > platform.xInit + platform.xMotion) {
                            platform.x -= 0.1;
                            if (player.onGround) {
                                player.x -= 0.1;
                            }
                        }
                    }
                }
            }
            if (platform.yMotion != 0) {
                if (platform.motionVel > 0) {
                    if (platform.y < platform.yInit + platform.yMotion) {
                        platform.y += platform.motionVel;
                        if (player.onGround == i) {
                            player.y += platform.motionVel;
                            if (player.colliding()) {while (player.colliding()) {player.y -= 0.1;}}
                        }
                        if (player.colliding()) {
                            player.y += platform.motionVel;
                            if (player.colliding()) {player.die();}
                        }
                    } else {
                        platform.motionVel *= -1;
                        while (platform.y < platform.yInit + platform.yMotion) {
                            platform.y += 0.1;
                            if (player.onGround) {
                                player.y += 0.1;
                            }
                        }
                    }
                } else if (platform.motionVel < 0) {
                    if (platform.y > platform.yInit - platform.yMotion) {
                        platform.y += platform.motionVel;
                        if (player.onGround == i) {
                            player.y += platform.motionVel;
                            if (player.colliding()) {while (player.colliding()) {player.y -= 0.1;}}
                        }
                        if (player.colliding()) {
                            player.y += platform.motionVel;
                            if (player.colliding()) {player.die();}
                        }
                    } else {
                        platform.motionVel *= -1;
                        while (platform.y > platform.yInit + platform.yMotion) {
                            platform.y -= 0.1;
                            if (player.onGround) {
                                player.y -= 0.1;
                            }
                        }
                    }
                }
            }
        }
        platform = null;
    }
    render() {
        for (i = 0; i < this.platforms.length; i++) {
            renderer.drawRect(
                this.platforms[i].x - player.x + (canvas.src.width /2 - player.width /2),
                this.platforms[i].y - player.y + (canvas.src.height/2 - player.height/2),
                this.width, this.height,
                rgb(0, 255, 0)
            );
        }
    }
};

const canvas      = new Canvas();
const renderer    = new Renderer();
const keys        = new Keys();
const physics     = new Physics();
const platforms   = new Platforms();
const projectiles = new Projectiles();
const enemies     = new Enemies();
const player      = new Player(150, 75);
platforms.init();

function onKeyUp(event) {
    switch (event.which) {
        case 87: keys.w     = false; break;
        case 83: keys.s     = false; break;
        case 65: keys.a     = false; break;
        case 68: keys.d     = false; break;
        case 38: keys.up    = false; break;
        case 40: keys.down  = false; break;
        case 37: keys.left  = false; break;
        case 39: keys.right = false; break;
        case 32: keys.space = false; break;
    }
}
function onKeyDown(event) {
    switch (event.which) {
        case 87: keys.w     = true; break;
        case 83: keys.s     = true; break;
        case 65: keys.a     = true; break;
        case 68: keys.d     = true; break;
        case 38: keys.up    = true; break;
        case 40: keys.down  = true; break;
        case 37: keys.left  = true; break;
        case 39: keys.right = true; break;
        case 32: keys.space = true; break;
    }
}
document.addEventListener("keyup"  , onKeyUp  , false);
document.addEventListener("keydown", onKeyDown, false);