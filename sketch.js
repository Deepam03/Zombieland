var play = 1;
var end = 0;
var gamestate = play;
var score;
var bcI , inbc;
var mgman ,mgmanImg ,  mgmanrestImage , mgmanhit;
var ob , obb , obbg, obbgr, ob1 , ob2 , ob3;
var obI , ob1I , ob2I ;
var sword , swordI;
var tree , treeI , treeg;
var screen , screenI;
var restart , restartI;
var info , infoI ;
var boss , bossI;
var princess , princessI;
var cage , cageImage;
var start , startI;
var hitsound;

function preload(){
  bcI  = loadImage("bc.png");
  mgmanrestImage = loadImage("melissa-lam-hero-idle-gif.gif");
  mgmanImg = loadImage("melissa-lam-hero-run-new-gif.gif");
  mgmanhit = loadImage("melissa-lam-hero-jab-gif-new.gif");
  obI = loadImage("V1.gif");
  ob1I = loadImage("V2.gif");
  ob2I = loadImage("V3.jpg");
  swordI = loadImage("sword.gif");
  treeI = loadImage("tree.png");
  screenI = loadImage("gameOver.png");
  restartI = loadImage("restart.png");
  infoI = loadImage("in.PNG");
  bossI = loadImage("Boss.gif");
  princessI = loadImage("princess.png");
  cageImage = loadImage("end..PNG");
  startI = loadImage("start.PNG")
  hitsound = loadSound("deepam.mp3");
}

function setup() {
 createCanvas(600,400);
    
  bc = createSprite(300,200,600,400);
  bc.addImage(bcI);
  
  
 mgman= createSprite(50,380,50,50);
 mgman.addAnimation("running",mgmanrestImage);
 mgman.scale = 0.2;
 mgman.width = 400;
 mgman.height = 700
 mgman.setCollider("rectangle",0,0,mgman.width , mgman.height);
//mgman.debug = true;
  
 inbc = createSprite(300,390,1000,5);
 inbc.velocityX = - 5;
 inbc.visible = false;
  
  sword = createSprite(800,340,20,10);
  sword.addAnimation("hitit",swordI);
  sword.scale = 0.2;
  sword.debug = false;
  
  obr = new Group();
  obbg = new Group();
  obbgr = new Group();
  treeGroup = new Group();
  
  start = createSprite(300 , 400, 40,40);
  start.addImage(startI);
  start.scale = 0.5;
  start.velocityY = -1;
  start.visible = false;
  
  screen = createSprite(300 , 150,10,02);
  screen.addAnimation("game", screenI);
  screen.scale = 0.3;
  screen.visible = false;
  
  info = createSprite(300,300,10,20);
  info.addImage(infoI);
  info.scale = 0.5;
  info.visible = false;
  
  boss = createSprite(300,320,5,5);
  
  princess = createSprite(550,300,2, 2);
  
  cage = createSprite(300,200,4.98);
  cage.visible = false;
  cage.addImage(cageImage);
  cage.scale = 0.5;
  
  score = 0;
}

function draw() {

  text("Score: "+ score, 400,50);

if(gamestate === play){
  
  if(keyDown("right")){
    mgman.addAnimation("running",mgmanImg);
    bc.velocityX = -3;
  }
  
  
  if(bc.x < 200){
    bc.x = bc.width / 2;
  }
  
  if(keyDown("left")){
    mgman.addAnimation("running",mgmanrestImage);
    bc.velocityX = 0;
  }  
  
  if(keyDown("down")){
    mgman.addAnimation("running",mgmanhit);
    bc.velocityX = 0;
    sword.x = 80;
  }
  
  if(keyWentUp("down")){
    mgman.addAnimation("running",mgmanImg)
    bc.velocityX = -3;
    sword.x = 800;
  }
  
  if(sword.isTouching(obbgr)){
    obbgr.destroyEach();
    score = score + 1;
    hitsound.play();
  }
  
  if( sword.isTouching(obbg)){
    obbg.destroyEach();
  score = score + 1;
     hitsound.play();
  }
  
  if( sword.isTouching(obr)){
    obr.destroyEach();
    score = score + 1;
     hitsound.play();
  }
  
  spawnob2();
  spawnob1();
  spawnob();
  
  if(obbg.isTouching(mgman) || obbgr.isTouching(mgman) || obr.isTouching(mgman)){
    gamestate = end; 
  }
}else if(gamestate === end){
     mgman.visible = false;
    bc.velocityX  = 0;
    sword.x = 1000;
    screen.visible = true;

    info.visible = true;
    
     if(keyDown("space")) {
        reset();
      }
}
  
  mgman.collide(inbc);
  princess.collide(inbc);
  
  if(score === 30){
    boss.addAnimation("evil",bossI);
    boss.scale = 0.3;
    gamestate = end;
    screen.visible = false;
    info.visible = false; 
    mgman.visible = true;
    mgman.addAnimation("running",mgmanrestImage);
    princess.addAnimation("princesses",princessI);
    princess.scale = 0.12;
    cage.visible = true;
  }
  
  drawSprites();
}

function spawnob(){
  if(frameCount % 430 === 0){
    var ob = createSprite(600,340,30,20);
    ob.addAnimation("evil" , obI);
    ob.velocityX = -3;
    ob.scale = 0.35;
    ob.lifetime = 200;
    obbg.add(ob);
  }
}

function spawnob1(){
  if(frameCount % 330 === 0){
    var ob1 = createSprite(600,330,30,20);
    ob1.addAnimation("evil" , ob1I);
    ob1.velocityX = -3;
    ob1.scale = 0.35;
    ob1.lifetime = 200;
    obr.add(ob1);
  }
}


function spawnob2(){
  if(frameCount % 550 === 0){
    var ob2 = createSprite(Math.round(random(100,200)),10,30,20);
    ob2.addImage(ob2I);
    ob2.velocityY = 4;
    ob2.scale = 0.7;
    ob2.lifetime = 200;
    //ob2.debug = true;
    ob2.height = 50;
    ob2.width = 100;
    ob2.setCollider("rectangle",0,0,ob2.width,ob2.height)
    obbgr.add(ob2);
    return ob2;
  }
}

function reset(){
  gamestate = play;
  screen.visible = false;
  mgman.visible = true;
  info.visible = false;
  bc.velocityX = -3;
}
