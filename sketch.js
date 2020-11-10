var climber,door,ghost,tower,Iclimbe,b
var climberImage,doorImage,ghostImage,towerImage,bI,sS,gr,gl
var dG,cG,IcG
var gameState="Play"

function preload() {
  climberImage=loadImage("climber.png");
  doorImage=loadImage("door.png");
  ghostImage=loadAnimation("0.png","5.png");
  towerImage=loadImage("tower.png");
  bI=loadImage("g.png");
  sS=loadSound("spooky.wav");
  gr=loadImage("87.png");
  gl=loadImage("12.png");
  }
function setup() {
  createCanvas(600,600);
  tower=createSprite(300,300,600,600);
  tower.addImage(towerImage);
  
  sS.loop();
  
  ghost=createSprite(300,300,10,10);
  ghost.addAnimation("running",ghostImage);
    ghost.addAnimation("runningl",gl);
    ghost.addAnimation("runningr",gr);
  ghost.scale=2;
  
  dG=createGroup();
  cG=createGroup();
  IcG=createGroup();
  
  
}
function draw(){
  if (gameState==="Play"){
    tower.velocityY=6;
  if(tower.y>600){
    tower.y=300
   }
  if(keyDown("left")){
    ghost.x=ghost.x-3;
    ghost.changeAnimation("runningl",gl);
  }
 if(keyDown("right")){
    ghost.x=ghost.x+3;
   ghost.changeAnimation("runningr",gr);
  }
  if(keyDown("space")){
    ghost.velocityY=-6;
    ghost.changeAnimation("running",ghostImage);
  }
  ghost.velocityY=ghost.velocityY+0.8;
  spawndoors();
  if(cG.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
    if(IcG.isTouching(ghost)|| ghost.y>600){
      gameState="End";
    }
  }
  else
    if(gameState==="End"){
      b=createSprite(300,300,10,10);
      b.addImage(bI);
      b.scale=0.5
      ghost.destroy();
      cG.setVelocityYEach(0);
       dG.setVelocityYEach(0);
       IcG.setVelocityYEach(0);
      cG.setLifetimeEach(-1);
      dG.setLifetimeEach(-1);
      IcG.setLifetimeEach(-1);
      tower.velocityY=0;
    }

 drawSprites();
}


function spawndoors(){
if (frameCount % 220 === 0) {
  doors=createSprite(Math.round(random(110,550)),-40,10,10);
  doors.addImage(doorImage);
  doors.velocityY=6;
  doors.lifetime=110;
  ghost.depth=doors.depth+1;
  dG.add(doors);
   climber=createSprite(Math.round(random(110,550)),-40,10,10);
climber.addImage(climberImage);
  climber.velocityY=6;
  climber.lifetime=110;
  ghost.depth=climber.depth+1;
  cG.add(climber);
  climber.x=doors.x;
  climber.y=20;
   Iclimber=createSprite(Math.round(random(110,550)),-40,10,10);
  Iclimber.velocityY=6;
  Iclimber.lifetime=110;
  IcG.add(Iclimber);
  Iclimber.x=doors.x;
  Iclimber.y=30;
  Iclimber.width=climber.width;
  Iclimber.visible=false;
}
  
  
  
}