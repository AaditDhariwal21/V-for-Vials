const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var gameState=0;
var menu;
var bg,overPic,winPic;
var pc,pcHealth=30;
var m1,m2,m3,m4,m5,m6,m7,zPic;
var vial1,vial2,vial3,vialsCollected=0,vPic;
var edges;
var restart;

function preload()
{
	bg=loadImage("bg.jpg")
  zPic=loadImage("Zombie.png")
  vPic=loadImage("Vials.png")
  overPic=loadImage("overBg.jpg")
  winPic=loadImage("win.jpg")
}

function setup() {
	createCanvas(displayWidth,displayHeight);
   
  edges=createEdgeSprites();

  spawnNPCandPC();
  spawnVials();
 
  engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
    menu=new MENU();
	

	Engine.run(engine);
  
}


function draw() {

  rectMode(CENTER);
  
  //gameStates

  if(gameState === 0){
    background(bg);
    menu.display();
    textSize(100);
    fill("red")
    stroke("black")
    strokeWeight(3);
    text("V-for-Vials",450,200)
    textSize(20);
    fill("violet")
    text("-A Game Self-Designed by Aadit Dhariwal",30,730)
	}
  
  if(gameState === 1 ){
    background("red");
	  menu.display();

    textSize(50);
    fill("yellow")
    text("Mission and Key Controls:", 10,215)
    textSize(40);
    text("Mission:", 10,315);
    textSize(30);
    fill("white");
    text("Retrieve the Vials (They are pink in color).", 10,350)
    textSize(40);
    fill("yellow")
    text("Key Controls:", 10,425);
    textSize(30);
    fill("white");
    text("1.W,A,S,D- To move", 10,470);
    text("2.Press E- To collect vials", 10,515);
    textSize(35);
    text("Press Space to start the game", 400,700);

    if(keyWentDown("space")){
      gameState=2;
      menu.hide();
      pc.visible=true;
    }
  }

if(gameState === 2){
  background("black");
  pc.shapeColor="lime";

  vial1.visible=true
  vial2.visible=true
  vial3.visible=true

  movement();

  follow(m1,pc,9);
  follow(m2,pc,8);
  follow(m3,pc,7);
  follow(m4,pc,6);
  follow(m5,pc,5);
  follow(m6,pc,5);
  follow(m7,pc,4);

  //health and knockback
  textSize(30);
  fill("yellow");
  text("Health: "+pcHealth,displayWidth-200,displayHeight-700);

  knockback();

  //vialcollector

   if(pc.isTouching(vial1)&& keyWentDown("e")){
     vial1.destroy();
     vialsCollected=vialsCollected+1
   }

   if(pc.isTouching(vial2)&& keyWentDown("e")){
    vial2.destroy();
    vialsCollected=vialsCollected+1
  }

  if(pc.isTouching(vial3)&& keyWentDown("e")){
    vial3.destroy();
    vialsCollected=vialsCollected+1
  }

  textSize(30);
  fill("yellow");
  text("Vials Collected: " +vialsCollected,displayWidth-250,displayHeight-600);

  m1.visible=true
  m2.visible=true
  m3.visible=true
  m4.visible=true
  m5.visible=true
  m6.visible=true
  m7.visible=true

  pc.collide(edges);

  if(vialsCollected===3 && pcHealth>0){
   gameState="WON"
  }
    
  if(pcHealth === 0){
  gameState="OVER"
 }
}

if(gameState=="WON"){
  background(winPic);

pc.visible=false

 m1.visible=false
 m2.visible=false
 m3.visible=false
 m4.visible=false
 m5.visible=false
 m6.visible=false
 m7.visible=false

 vial1.visible=false
 vial2.visible=false
 vial3.visible=false

 textSize(40);
 fill("white");
 text("YOU WIN!! WELL DONE SURVIVOR.",515,400);

}

if(gameState=="OVER"){
 background(overPic);

 m1.visible=false
 m2.visible=false
 m3.visible=false
 m4.visible=false
 m5.visible=false
 m6.visible=false
 m7.visible=false

 vial1.visible=false
 vial2.visible=false
 vial3.visible=false

 textSize(40);
 fill("white");
 text("YOU LOST!! PRESS SPACE TO TRY AGAIN.",300,500);

 if(keyWentDown("space")){
  gameState=2;
  pcHealth=30;
  spawnNPCandPC();
  spawnVials();

  pc.visible=true

  m1.visible=true
  m2.visible=true
  m3.visible=true
  m4.visible=true
  m5.visible=true
  m6.visible=true
  m7.visible=true

  vial1.visible=true
  vial2.visible=true
  vial3.visible=true  
}

 pc.velocityX=0;
 pc.velocityY=0;
 pc.shapeColor="black";
}

  drawSprites();
 
}


  function movement() {
    //movement
     
    if (keyWentDown("w")) {
      pc.velocityY=-10;
    }
    
    if (keyWentUp("w")) {
      pc.velocityY = 0;
    }
    
    if (keyWentDown("s")) {
      pc.velocityY = 10;
    }

    if (keyWentUp("s")) {
      pc.velocityY= 0;
    }

    if (keyWentDown("a")) {
      pc.velocityX = -10;
    }

    if (keyWentUp("a")) {
      pc.velocityX=0;
    }
    if (keyWentDown("d")) {
      pc.velocityX = 10;
    }

    if (keyWentUp("d")) {
      pc.velocityX=0;
    }
  }

  function follow(follower, followed, velocity) {
    //the follower follows the followed at a constant velocity
      deltaX = followed.x - follower.x;
      deltaY = followed.y - follower.y;
      var followerAngle = Math.atan(deltaY / deltaX); 
      if (deltaX < 0) {
        // the arctan assumes that the angle is in the first or 
        // fourth quadrants, so if it's in the second or third
        // (i.e. deltaX/cosign is negative) correct by adding PI
        followerAngle = followerAngle + Math.PI

}
      follower.velocityX = velocity * Math.cos(followerAngle);  
      follower.velocityY = velocity * Math.sin(followerAngle);
 
       
  }
  
  function spawnNPCandPC(){
    pc=createSprite(750,50,30,30);
    m1=createSprite(random(10,300),random(0,150),30,30);
    m2=createSprite(random(10,300),random(600,800),30,30);
    m3=createSprite(random(20,1300),random(600,800),30,30);
    m4=createSprite(random(20,1300),random(600,800),30,30);
    m5=createSprite(random(20,1300),random(600,800),30,30);
    m6=createSprite(random(1200,1300),random(0,150),30,30);
    m7=createSprite(random(1200,1300),random(600,800),30,30);

    m1.addImage(zPic);
    m2.addImage(zPic);
    m3.addImage(zPic);
    m4.addImage(zPic);
    m5.addImage(zPic);
    m6.addImage(zPic);
    m7.addImage(zPic);

    m1.scale=0.3;
    m2.scale=0.3;
    m3.scale=0.3;
    m4.scale=0.3;
    m5.scale=0.3;
    m6.scale=0.3;
    m7.scale=0.3;

    pc.visible=false

    m1.visible=false
    m2.visible=false
    m3.visible=false
    m4.visible=false
    m5.visible=false
    m6.visible=false
    m7.visible=false

  }

  function knockback(){
    if(m1.isTouching(pc)){
      m1.velocityX=0;
      m1.velocityY=0;
      pc.shapeColor="red";
      
  
      if(m1.x>pc.x){
        pc.x=pc.x-20;
      }
      if(m1.x<pc){
       pc.x=pc.x+20;
      }
      if(m1.y>pc.y){
       pc.y=pc.y-20;
      }
      if(m1.y<pc.y){
       pc.y=pc.y+20;
      }
      pcHealth=pcHealth-1;
    }

   
    if(m2.isTouching(pc)){
      m2.velocityX=0;
      m2.velocityY=0;
      pc.shapeColor="red";
      
  
      if(m2.x>pc.x){
        pc.x=pc.x-20;
      }
      if(m2.x<pc){
       pc.x=pc.x+20;
      }
      if(m2.y>pc.y){
       pc.y=pc.y-20;
      }
      if(m2.y<pc.y){
       pc.y=pc.y+20;
      }
      pcHealth=pcHealth-1;
    }

    if(m3.isTouching(pc)){
      m3.velocityX=0;
      m3.velocityY=0;
      pc.shapeColor="red";
      
      if(m3.x>pc.x){
        pc.x=pc.x-20;
      }
      if(m3.x<pc){
       pc.x=pc.x+20;
      }
      if(m3.y>pc.y){
       pc.y=pc.y-20;
      }
      if(m3.y<pc.y){
       pc.y=pc.y+20;
      }
      pcHealth=pcHealth-1;
    }

    if(m4.isTouching(pc)){
      m4.velocityX=0;
      m4.velocityY=0;
      pc.shapeColor="red";
      
  
      if(m4.x>pc.x){
        pc.x=pc.x-20;
      }
      if(m4.x<pc){
       pc.x=pc.x+20;
      }
      if(m4.y>pc.y){
       pc.y=pc.y-20;
      }
      if(m4.y<pc.y){
       pc.y=pc.y+20;
      }
      pcHealth=pcHealth-1;
    }

    if(m5.isTouching(pc)){
      m5.velocityX=0;
      m5.velocityY=0;
      pc.shapeColor="red";
      
      if(m5.x>pc.x){
        pc.x=pc.x-20;
      }
      if(m5.x<pc){
       pc.x=pc.x+20;
      }
      if(m5.y>pc.y){
       pc.y=pc.y-20;
      }
      if(m5.y<pc.y){
       pc.y=pc.y+20;
      }
      pcHealth=pcHealth-1;
    }

    if(m6.isTouching(pc)){
      m6.velocityX=0;
      m6.velocityY=0;
      pc.shapeColor="red";
      
      if(m6.x>pc.x){
        pc.x=pc.x-20;
      }
      if(m6.x<pc){
       pc.x=pc.x+20;
      }
      if(m6.y>pc.y){
       pc.y=pc.y-20;
      }
      if(m6.y<pc.y){
       pc.y=pc.y+20;
      }
      pcHealth=pcHealth-1;
    }

    if(m7.isTouching(pc)){
      m7.velocityX=0;
      m7.velocityY=0;
      pc.shapeColor="red";
      
      if(m7.x>pc.x){
        pc.x=pc.x-20;
      }
      if(m7.x<pc){
       pc.x=pc.x+20;
      }
      if(m7.y>pc.y){
       pc.y=pc.y-20;
      }
      if(m7.y<pc.y){
       pc.y=pc.y+20;
      }
      pcHealth=pcHealth-1;
    }
  
  }
  function spawnVials(){
    vial1=createSprite(random(10,100),random(100,750),20,20);
    vial2=createSprite(random(1200,1300),random(100,750),20,20);
    vial3=createSprite(random(10,1300),random(500,750),20,20);

    vial1.addImage(vPic);
    vial2.addImage(vPic);
    vial3.addImage(vPic); 

    vial1.scale=0.07;
    vial2.scale=0.07;
    vial3.scale=0.07;
     
    vial1.visible=false
    vial2.visible=false
    vial3.visible=false

  }

