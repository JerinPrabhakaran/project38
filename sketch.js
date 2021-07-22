var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var score
var ground;
var edge;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstacleGroup;
var bananaGroup;
var monkey_stop;
var backGroundImage ,bg;


   


function preload(){
  
  
  monkey_running =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png" ,"Monkey_09.png" ,"Monkey_10.png");
  monkey_stop = loadAnimation("Monkey_01.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
  backGroundImage = loadImage("jungle.jpg");
 
}



function setup() {
   createCanvas(600 ,500)
  
  bg = createSprite(300 ,250 ,50,50);
  
  bg.addImage("bg" ,backGroundImage);
  bg.scale = 2;
monkey = createSprite(100 ,400 ,10 ,10);
monkey.addAnimation("moving" ,monkey_running);
monkey.scale = 0.2;


ground = createSprite(300 ,500 ,1200 ,50);

ground.x = ground.width/2;
  
edge = createSprite(300 ,-500 ,600);
  
score = 0;
  
monkey.addAnimation("stop",monkey_stop);
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
}


function draw() {
  background("lightgreen");
 
 

  monkey.velocityY = monkey.velocityY + 0.5;
 monkey.collide(ground);
   monkey.collide(edge);
  
    camera.position.x = width/2;
  camera.position.y = monkey.y-150;
  
  rocks();
  bananas();
  
  
  if (gameState === PLAY){
      if (keyDown ("space") && monkey.y >= 350){
    monkey.velocityY = -10;
  }
    console.log(monkey.y)
   if(bananaGroup.isTouching(monkey)){
       score = score+2;
     bananaGroup.destroyEach();
     console.log(score);
     switch(score){
       case 10:monkey.scale  = monkey.scale +0.02;
       break;  
       case 20:monkey.scale =  monkey.scale +0.02; 
       break; 
       case 30:monkey.scale =  monkey.scale +0.02; 
       break; 
       default : break;
     }
   }
    
    monkey.changeAnimation("moving" ,monkey_running);
    
    if (bg.x<0){
    bg.x = bg.width/2;
  }
    bg.velocityX = -2;
  
  
  
  if (ground.x<0){
    ground.x = ground.width/2;
  }
   ground.velocityX = -4;
    
  }
  
  if (obstacleGroup.isTouching(monkey)){
      gameState = END;
    console.log("get")
    monkey.scale = 0.2;
  }

  if (gameState === END){
    
    
    obstacle.velocityX = 0; 
    banana.velocityX = 0; 
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    monkey.changeAnimation("stop" ,monkey_stop);
    ground.velocityX = 0;
    bg.velocityX = 0;
    
    
  }
  
  if (keyDown ("r")){
    reset();
  }
  
  
 drawSprites();
  
    textSize(30);
  stroke("black")
  text ("SCORE = " +score ,200 ,50);
    if (gameState === END){
 text("PRESS R TO RESTART" ,150 ,100);
  }
}

function rocks(){
  if(frameCount % 100 ===0){
    obstacle = createSprite(600 ,427 ,10 ,10);
    obstacle.velocityX = -10; 
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    
    
  }
}

function bananas(){
  if(frameCount % 110 ===0){
    banana = createSprite(600 ,227 ,10 ,10);
    banana.velocityX = -12; 
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 100;
    bananaGroup.add(banana);
    
  }
}

function reset(){
  gameState = PLAY;
  score = 0;
}



