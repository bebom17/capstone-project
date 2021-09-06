var bird, birdImg;
var background, backgroundImg; 
var background2, background2Img;
var pipe1, pipe1Img;
var pipe2, pipe2Img; 
var pipe1Group, pipe2Group;
var score;
var PLAY = 1; 
var END = 0; 
var gameState = 1;
var restart, restartImg;

function preload(){
birdImg = loadImage("bird1.png");
backgroundImg = loadImage("background.png");
background2Img = loadImage("background2.png");
pipe1Img = loadImage("pipe1.png");
pipe2Img = loadImage("pipe2.png");
restartImg = loadImage("resetbutton.png")
}

function setup() {
createCanvas(400,400);

background = createSprite(200,200,10,10);
background.addImage(backgroundImg);

background2 = createSprite(200,300,10,10);
background2.addImage(background2Img)

bird = createSprite(25,250,10,10);
bird.addImage(birdImg);

restart = createSprite(200,250,10,10);
restart.addImage(restartImg);
restart.visible = false; 
restart.scale = 0.5; 

pipe1Group = new Group();
pipe1Group = new Group();

score = 0;
}

function draw() {


if(gameState === PLAY){
    pipeRandomPosition();
  
    
  if (keyDown("space")){
    bird.y = bird.y -20;
    }
    else{
    bird.velocityY = 5;
    }
   
    
  background2.velocityX = -1;

  if(background2.x < 150){
    background2.x = background2.width/2;
    }
  

    if (bird.isTouching(pipe1Group) || bird.isTouching(pipe2Group)){
      gameState = END;
    }
    if(bird.isTouching(background2)){
      gameState = END;
    }
    
  if(frameCount % 75 === 0){
  score++;
  }
  }
  else if(gameState === END)  {
  background2.velocityX = 0;
  bird.visible = false;
  bird.x=25;
  bird.y=250;
  pipe1Group.setVelocityXEach(0);
  pipe2Group.setVelocityXEach(0);
  pipe1Group.setLifetimeEach(-1);
  pipe2Group.setLifetimeEach(-1);
  restart.visible=true;
  }
    
  if(mousePressedOver(restart)){
    reset();
  }
  
  drawSprites();
  
  textSize(30);
  textFont("Georgia");
  text("Score:" + score,175,500);
  }

function pipeRandomPosition() {
 if (frameCount % 75 === 0) {
 pipe1 = createSprite(200,0,10,100);
 pipe1.addImage(pipe1Img);
pipe1.y = random(0,100);
pipe1.velocityX = -1;
pipe1Ground.add(pipe1);
pipe1Group.setLifetimeEach(200);

pipe2 = createSprite(150,500,10,200);
pipe2.addImage(pipe2Img);
pipe2.y = random(450,500);
pipe2.velocityX = -1;
pipe2Ground.add(pipe2);
pipe2Group.setLifetimeEach(200);
 }
}
function reset(){
    gameState = PLAY;
    pipe1Group.destroyEach();
    pipe2Group.destroyEach();
    score = 0;
    bird.visible=true;
    restart.visible=false
  }