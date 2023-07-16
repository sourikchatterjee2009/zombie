var life = 3,score = 0;
var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieGroup ,zombieImg; 
var gameState = 1
var playerCollided = false

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bulletImg = loadImage("assets/bullet.png")
  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png")
}

function setup() {  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
//creating the player sprite
    player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
    player.addImage(shooterImg)
    player.scale = 0.3
   // player.debug = true
    // player.debug = false
    // player.Debug =false
    // Player.debug = true
    //player.Collider("rectagle",0,0,300,300)
    //player.setcollider("rectangle",0,0)
    player.setCollider("rectangle",0,0,300,480)
    // player.Setcollider("rectangle",0,0,300,300)

    zombieGroup = new Group();
    bulletGroup = new Group();
  }

function draw() {
  background(0); 
  drawSprites();
  textSize(50)
  fill ("white")
  text("score = " + score ,20 ,50)
  text("life = " + life,20 ,100)
  
  if(gameState==1){
    //gameState play
     //moving the player up and down and making the game mobile compatible using touches
    if(keyDown("UP_ARROW")||touches.length>0){
      player.y = player.y-30
    }
    if(keyDown("DOWN_ARROW")||touches.length>0){
    player.y = player.y+30
    }

    if(player.y<100) player.y = 100
    if(player.y>displayHeight-100) player.y = displayHeight - 100
    //release bullets and change the image of shooter to shooting position when space is pressed
    if(keyWentDown("space")){
    
      player.addImage(shooter_shooting)
      shootBullet();
      
    }
    //player goes back to original standing image once we stop pressing the space bar
    if(keyWentUp("space")){
      // player.addImage( shooter_shooting )
      // player.addImage()
      player.addImage(shooterImg)
      //player.addImage(shooter_1.png)
 
    }
    spawnZombies()

    //check collision between zombies and player


    player.overlap(zombieGroup,(p,z)=>{
      //playerCollided =true  
     // if(playerCollided == true)
        life -= 1
      if(life<=0 ){
        gameState = 2
      }
      z.destroy()
      p.y = -200
      setTimeout(()=>{p.y = 200},2000)
    }
    )

    bulletGroup.overlap(zombieGroup,(b,z)=>{
      b.destroy()
      z.destroy()
      score += 1
    }
    )
  }
  else{
    //gamestate end
    zombieGroup.setVelocityEach(0)
    text("gameEnded",displayWidth/2,displayHeight/2)
  }





}

function shootBullet(){
  var bullet = createSprite(player.x + 60,player.y - 20,8,8)
  bullet.velocityX = 15
  bullet.shapeColor = "white"
  bullet.life =  400;
  bullet.addImage(bulletImg)
  bullet.scale = 0.02
  bulletGroup.add(bullet)
}

function spawnZombies(){
  if(frameCount%random([60,70,,90,20,,40,10,999])==0){
    var y = random(69,displayHeight-300)
   var zombie = createSprite(displayWidth - 200,y)
    zombie.addImage(zombieImg)
    zombie.scale = 0.2
    //zombie.debug = true
    zombie.setCollider("rectangle", 0,0,450,1000)
    zombie.velocityX = -3
    zombieGroup.add(zombie)
    zombie.life = 400
  }
}
