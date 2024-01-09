var ushala, ushalaRunning;
var pista, pistaImg;
var bomb, bombImg;
var explosion, explosionBlowing;
var bau, bauImg;
var invisibleWall1, invisibleWall2;
var start, startImg;
var score = 0;
var WAIT = 0;
var PLAY = 1;
var PAUSE = 2;
var END = 3;
var gameState = WAIT;

function preload(){
ushalaRunning = loadAnimation(
"../assets/ushala1.png",
"../assets/ushala2.png",
"../assets/ushala3.png",
"../assets/ushala4.png",
"../assets/ushala5.png",
"../assets/ushala6.png"
)
pistaImg = loadImage(
"../assets/ground.png"
)
bombImg = loadImage(
"../assets/bomb.png"
)
explosionBlowing = loadAnimation(
"../assets/explosion1.png",
"../assets/explosion2.png",
"../assets/explosion3.png",
"../assets/explosion4.png"
)
bauImg = loadImage(
"../assets/bau.png"
)
startImg = loadImage(
"../assets/start1.png"
)
}




function setup() {
  createCanvas(400,600);
  pista = createSprite(200,300);
  pista.addImage(pistaImg);
  pista.scale = 2;



  ushala = createSprite(200,500);
  ushala.addAnimation("running", ushalaRunning);



  invisibleWall1 = createSprite(20,350,25,1000);
  invisibleWall2 = createSprite(380,350,25,1000);
  invisibleWall1.visible = false;
  invisibleWall2.visible = false;

  start = createSprite(200,300,150,100);
  start.addImage(startImg);
  start.scale = 0.5;

  bauGroup = new Group();
  bombGroup = new Group();
}

function draw(){
  background(225);
  //console.log(pista.y);
  if(mousePressedOver(start)){
    start.visible = false;
    gameState = PLAY;
  }

  if(gameState === PLAY){
    spawnBombs();
    spawnBau();
    if(keyDown("left")){
      ushala.x = ushala.x -10;
    }
    if(keyDown("right")){
      ushala.x = ushala.x +10;
    }
    pista.velocityY = 2;

    /*if(ushala.bounceOff(bau)){
      score = score + 10;
    }

    if(ushala.bounceOff(bomb)){
      ushala.destroy;
      bomb.addAnimation(explosionBlowing);
      gameState = END;
    }*/
    bauGroup.overlap(ushala, function(bau){
      bau.remove();
      score + 100;
    })
    bombGroup.overlap(ushala, function(bomb){
      bomb.addImage(explosionBlowing);
      bomb.remove();
    })
  }

  if(gameState === END){
    pista.velocityY = 0;
  }


  if(pista.y === 900){
    pista.y = 330;
  }
  
  ushala.bounceOff(invisibleWall1);
  ushala.bounceOff(invisibleWall2);



  drawSprites();
  textSize(20);
  text("SCORE: ", 60,70);

}

function spawnBombs(){
  if(frameCount%100 === 0){
    bomb = createSprite(200,0,40,40);
    bomb.velocityY = 2;
    bomb.x = Math.round(random(100,300));
    bomb.lifetime = 410;
    bomb.addImage(bombImg);
    bomb.scale = 0.35
    bombGroup.add(bomb);
  }
}

function spawnBau(){
  if(frameCount%150 === 0){
    bau = createSprite(200,0,40,40);
    bau.velocityY = 2;
    bau.x = Math.round(random(100,300));
    bau.lifetime = 410;
    bau.addImage(bauImg);
    bau.scale = 0.5
    bauGroup.add(bau);
  }
}