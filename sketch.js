      var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudIMG
var obstecle,obstecle1,obstecle2,obstecle3,obstecle4,obstecle5,obstecle6
var obsteclesGroup, cloudGroup
var score = 0
var gameState,play,end
var gameOver, restart
var gm,re
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  
  gm = loadImage("gameOver.png")
  re= loadImage("restart.png")
  
  obstecle1 = loadImage("obstacle1.png")
  obstecle2 = loadImage("obstacle2.png")
  obstecle3 = loadImage("obstacle3.png")
  obstecle4 = loadImage("obstacle4.png")
  obstecle5 = loadImage("obstacle5.png")
  obstecle6 = loadImage("obstacle6.png")
  
  cloudIMG = loadImage("cloud.png")
}

function setup() {
  createCanvas(600, 200);
  
obsteclesGroup = new Group()
  cloudGroup = new Group()
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("dead",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -6;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  play = 1
  end = 0
  gameState = play
  
   gameOver = createSprite(300,120);
 restart = createSprite(300,170);
gameOver.addImage("gm",gm);
gameOver.scale = 0.5;
restart.addImage("re",re);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;

  
}

function draw() {
  if(gameState === play){
if(keyDown("space")) {
    trex.velocityY = -10;
   }
    
    score += Math.round(getFrameRate()/60)
    
  trex.velocityY = trex.velocityY + 0.8
    
     if (ground.x < 0){
    ground.x = ground.width/2;
       
       
  }
    
     spawnClouds()
  spawnObstacles()
    
     ground.velocityX = -6;
     if(obsteclesGroup.isTouching(trex)){
      
      gameState = end;
     
    }
  }
else if (gameState === end){
  gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obsteclesGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("dead");
    
    //set lifetime of the game objects so that they are never destroyed
    obsteclesGroup.setLifetimeEach(-1);
   cloudGroup.setLifetimeEach(-1);
  
  if(mousePressedOver(restart)) {
    reset();
  }
}
  background(0);
  
  
  
  text(score,500,50)
  
 
  
  
  
 
  trex.collide(invisibleGround);
  drawSprites();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 45 === 0) {
     cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud",cloudIMG);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud. lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    
    cloudGroup.add(cloud)
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
     obstecle = createSprite(600,165,10,40);
    obstecle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstecle.addImage("cactus1",obstecle1);
        break;
        case 2:obstecle.addImage("cactus2",obstecle2);
        break;
        case 3:obstecle.addImage("cactus3",obstecle3);
        break;
        case 4:obstecle.addImage("cactus4",obstecle4);
        break;
        case 5:obstecle.addImage("cactus5",obstecle5);
        break;
        case 6:obstecle.addImage("cactus6",obstecle6);
        break;
        default:break;
        
    }
    obsteclesGroup.add(obstecle)
    //assign scale and lifetime to the obstacle           
    obstecle.scale = 0.5;
    obstecle.lifetime = 100;
  }
}
function reset(){
  gameState = play;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obsteclesGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.changeAnimation("running");
  
  score = 0;
  
}