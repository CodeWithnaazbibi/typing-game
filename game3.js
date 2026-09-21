const coinsCollectedElement = document.getElementById("coins-collected");

const TILE_SIZE = 32;
const COLS = 15;
const ROWS = 20;
const GAME_WIDTH = TILE_SIZE * COLS;
const GAME_HEIGHT = TILE_SIZE * ROWS;
const HALF_TILE = TILE_SIZE / 2;
const LEFT = "LEFT";
const RIGHT = "RIGHT";
const UP = "UP";
const DOWN = "DOWN";
let coinsCollected = 0;

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;

  class Game {
    constructor() {
      this.world = new World();
      this.hero = new Hero({
        game: this,
        sprite: {
          x: 0,
          y: 11,
          width: 64,
          height: 64,
          image: document.getElementById("hero1"),
        },
        position: { x: 1 * TILE_SIZE, y: 2 * TILE_SIZE },
        scale: 1,
      });
      this.input = new Input(this);

      this.eventUpdate = false;
      this.eventTimer = 0;
      this.eventInterval = 120;

      this.debug = false;
    }
    toggleDebug(){
        this.debug = !this.debug;
    }
    render(ctx, deltaTime) {
      this.hero.update(deltaTime);
      this.world.drawBackground(ctx);
      this.world.drawCoins(ctx)
      
      if(this.debug) this.world.drawGrid(ctx);
      this.hero.draw(ctx);
      this.world.drawForeground(ctx);
      if(this.debug) this.world.drawCollisionMap(ctx);

      if (this.eventTimer < this.eventInterval) {
        this.eventTimer += deltaTime;
        this.eventUpdate = false;
      } else {
        this.eventTimer = 0;
        this.eventUpdate = true;
      }
    }
  }

  const game = new Game();

  let lastTime = 0;
  function animate(timeStamp) {
    requestAnimationFrame(animate);

    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    game.render(ctx, deltaTime);
  }
  requestAnimationFrame(animate);
});

class World {
  constructor() {
    this.level1 = {
      coinsLayer: [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,

        0,0,0,0,0,0,"R","K",0,0,0,0,0,0,0,

        0,0,"F",0,"Q","M","T","H","Z","L","B","C","N","V",0,

        0,"J","P",0,0,"G","Y",0,"D","R","K","W","A","S",0,

        0,"C","X","H","M","Q","E",0,"T",0,0,"L","B","Z",0,

        0,"N","V",0,"K","P",0,"J","R","F","U","Y","D","M",0,

        0,"A","T",0,0,0,0,0,0,0,0,"Q","L","X",0,

        0,"W","H",0,0,0,0,0,0,0,0,"Z",0,"C",0,

        0,"F","R",0,0,0,0,0,0,0,0,"M",0,0,0,

        0,"Q","Y",0,0,0,0,0,0,0,0,"B","K","H",0,

        0,"L","D",0,0,0,0,0,0,0,0,"V","N","J",0,

        0,"S","M",0,0,0,0,0,0,0,0,"X","F","Q",0,

        0,"H","K","Z","R","T","Y","P","C","N","M","L","B","D",0,

        0,"Q","W","E","R","T","Y","U","I","O","P","A","S","D",0,

        0,"J","F",0,"K","L","Z","X","C","V","B","N","M","Q",0,

        0,"R","T",0,0,"Y","U",0,"I","O","P","L","K","J",0,

        0,"A","S","D","F","G","H","J","K","L","Q","W","E","R",0,

        0,"Z","X","C","V","B","N","M","A","S","D","F","G","H",0,

        0,0,0,0,"Q",0,0,0,0,"W",0,0,"E","R",0,

        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      ],
      collisionLayer: [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,1,1,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,1,0,1,1,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,
        1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,
        1,0,0,1,1,1,1,1,1,1,1,0,1,1,1,
        1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,
        1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,
        1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,1,1,0,0,1,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      ],
      backgroundLayer: document.getElementById("backgroundLevel1"),
      foregroundLayer: document.getElementById("foregroundLevel1"),
    };
  }
  getTile(array, row, col){
    return array[COLS * row + col]
  }
  drawBackground(ctx) {
    ctx.drawImage(this.level1.backgroundLayer, 0, 0);
  }

  drawForeground(ctx) {
    ctx.drawImage(this.level1.foregroundLayer, 0, 0);
  }

  findLetter(letter) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {

      if (this.level1.coinsLayer[row * COLS + col] === letter) {
        return {
          row: row,
          col: col
        };
      }

    }
  }

  return null;
}


  drawCoins(ctx) {
  ctx.font = "bold 18px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const idx = row * COLS + col;
      const letter = this.level1.coinsLayer[idx];

      if (letter) {
        const x = col * TILE_SIZE + TILE_SIZE / 2;
        const y = row * TILE_SIZE + TILE_SIZE / 2;

        ctx.fillStyle = "#ffffff";
        ctx.fillText(letter, x, y);
      }
    }
  }
}
  
  drawCollisionMap(ctx){
    ctx.fillStyle = "rgba(0,0,225,0.5)";
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if(this.getTile(this.level1.collisionLayer, row, col)){
          ctx. fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
      }
    }
  }

  

  drawGrid(ctx) {
    ctx.strokeStyle = "black";
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        ctx.strokeRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
  }
}

class GameObject {
  constructor({ game, sprite, position, scale }) {
    this.game = game;
    this.sprite = sprite ?? {
      x: 0,
      y: 0,
      width: TILE_SIZE,
      height: TILE_SIZE,
      image: "",
    };
    this.position = position ?? { x: 0, y: 0 };
    this.scale = scale ?? 1;

    this.destinationPosition = { x: this.position.x, y: this.position.y };
    this.distanceToTravel = { x: 0, y: 0 };

    this.width = this.sprite.width * this.scale;
    this.halfWidth = this.width / 2;
    this.height = this.sprite.height * this.scale;
  }

  moveTowards(destinationPosition, speed) {
    this.distanceToTravel.x = destinationPosition.x - this.position.x;
    this.distanceToTravel.y = destinationPosition.y - this.position.y;

    let distance = Math.hypot(
      this.distanceToTravel.x + this.distanceToTravel.y,
    );

    if (distance <= speed) {
      this.position.x = destinationPosition.x;
      this.position.y = destinationPosition.y;
    } else {
      const stepX = this.distanceToTravel.x / distance;
      const stepY = this.distanceToTravel.y / distance;
      this.position.x += stepX * speed;
      this.position.y += stepY * speed;

      this.distanceToTravel.x = destinationPosition.x - this.position.x;
      this.distanceToTravel.y = destinationPosition.y - this.position.y;

      distance = Math.hypot(this.distanceToTravel.x + this.distanceToTravel.y);
    }

    return distance;
  }

  draw(ctx) {
    if(this.game.debug){
        ctx.fillStyle = "blue";
        ctx.fillRect(this.position.x, this.position.y, TILE_SIZE, TILE_SIZE);
        ctx.strokeStyle = "yellow";
        ctx.strokeRect(
          this.destinationPosition.x,
          this.destinationPosition.y,
          TILE_SIZE,
          TILE_SIZE,
        );
    }
    ctx.drawImage(
      this.sprite.image,
      this.sprite.x * this.sprite.width,
      this.sprite.y * this.sprite.height,
      this.sprite.width,
      this.sprite.height,
      this.position.x + HALF_TILE - this.halfWidth,
      this.position.y + TILE_SIZE - this.height,
      this.width,
      this.height,
    );
  }
}

class Hero extends GameObject {
  constructor({ game, sprite, position, scale }) {
    super({ game, sprite, position, scale });
    this.speed = 100;
    this.maxFrame = 2;
  }

  update(deltaTime) {
    let nextX = this.destinationPosition.x;
    let nextY = this.destinationPosition.y;

    const scaledSpeed = this.speed * (deltaTime / 1000);

    const distance = this.moveTowards(this.destinationPosition, scaledSpeed);

    const arrived = distance <= scaledSpeed;

    if (arrived) {
      if (this.game.input.lastKey === "1") {
        nextY -= TILE_SIZE;
        this.sprite.y = 8;
      } else if (this.game.input.lastKey === DOWN) {
        nextY += TILE_SIZE;
        this.sprite.y = 10;
      } else if (this.game.input.lastKey === LEFT) {
        nextX -= TILE_SIZE;
        this.sprite.y = 9;
      } else if (this.game.input.lastKey === RIGHT) {
        nextX += TILE_SIZE;
        this.sprite.y = 11;
      }
      const col = nextX / TILE_SIZE;
      const row = nextY / TILE_SIZE;
      if(this.game.world.getTile(this.game.world.level1.collisionLayer, row,col) !== 1){
          this.destinationPosition.x = nextX;
          this.destinationPosition.y = nextY;
      }
      if(this.game.world.getTile(this.game.world.level1.coinsLayer, row,col) !== 0){
        coinsCollected += 1;
        coinsCollectedElement.textContent = "Coins Collected: " + coinsCollected;
        this.game.world.level1.coinsLayer[row * COLS + col] = 0;
      } else if (coinsCollected == 149) {
        coinsCollectedElement.textContent = "You have collected all 149 coins"
      }
    }

    if (this.game.input.keys.length > 0 || !arrived) {
      this.moving = true;
    } else {
      this.moving = false;
    }

    if (this.game.eventUpdate && this.moving) {
      this.sprite.x < this.maxFrame ? this.sprite.x++ : (this.sprite.x = 0);
    } else if (!this.moving) {
      this.sprite.x = 0;
    }
  }
}