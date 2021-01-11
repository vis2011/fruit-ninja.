var PLAY=1;
var End=0;
var gameState=PLAY;

var sword,fruit,enemy,knifeSound,gameoverSound;

var swordImage,fruitImage,enemyImage,enemyImage1,
fruitImage1,fruitImage2,fruitImage3,fruitGroup,enemyGroup,gameOverImage,position;

var score=0;

function preload(){
  swordImage=loadImage("sword.png");
  fruitImage=loadImage("fruit1.png");
  fruitImage1=loadImage("fruit2.png");
  fruitImage2=loadImage("fruit3.png");
  fruitImage3=loadImage("fruit4.png");
  //enemyImage=loadImage("alien1.png");
  enemyImage=loadAnimation("alien1.png","alien2.png");
  knifeSound=loadSound("knifeSwooshSound.mp3");
  gameoverSound=loadSound("gameover.mp3");
  gameOverImage=loadImage("gameover.png");
}

function setup(){
  createCanvas(windowHeight,windowWidth);
  
  sword=createSprite(200,200,20,20);
  sword.addImage(swordImage);
  
  fruitGroup=new Group();
  enemyGroup=new Group();
  
}

function draw(){
  background("lightblue");
  
  if(gameState===PLAY){
  sword.y=World.mouseY;
  sword.x=World.mouseX;
  Spawnfruit();
  Spawnenemy();
  }
  
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    knifeSound.play();
    score=score+1;
  }
  
  if(enemyGroup.isTouching(sword)){
    gameState=End;
    gameoverSound.play();
  }
  
  if(gameState==End){
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    sword.addImage(gameOverImage);
    sword.velocityX=0;
    sword.velocityY=0;
    sword.y=width-200;
    sword.x=width-250;  
    sword.scale=1.5;
  }
    

  drawSprites();
  text("score :"+score,width-50,20);
}

function Spawnfruit(){
  if(frameCount%70===0){
    position=Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    fruit.velocityX=-3;
    fruit.y=Math.round(random(10,440));
    
    m=Math.round(random(1,4));
    switch(m){
      case 1:fruit.addImage(fruitImage);
              break;
      case 2:fruit.addImage(fruitImage1);
              break;
      case 3: fruit.addImage(fruitImage2);
              break;
      case 4: fruit.addImage(fruitImage3);
              break;
      default: break;
      
      
      
    }
    fruitGroup.add(fruit);
    
    
    if(position===1){
      fruit.x=400;
      fruit.velocityX=-(7+(score/4));
      fruit.lifetime=50;
    }
    else
      if(position===2){
        fruit.x=0;
        fruit.velocityX=(7+score/4);
        fruit.lifetime=65;
      }
  }
}

function Spawnenemy(){
  if(frameCount%200===0){
  enemy=createSprite(400,200,20,20);
  enemy.y=Math.round(random(20,520));
  enemy.velocityX=-(3+score/10);
    
  m=Math.round(random(1,1));
  switch(m){
       case 1:enemy.addAnimation("alien",enemyImage);
              break;
      default:break;
  }
    enemy.lifetime=70;
    enemyGroup.add(enemy);
}
  
}