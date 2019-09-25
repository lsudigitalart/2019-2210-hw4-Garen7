//physics
const speed = 3
const acceleration = .1
//player
const hurtBoxSize = 40
const playerX = innerWidth/2
const playerY = innerHeight/2
//space is centered around the same point the window is
const spaceWidth = 2*innerWidth
const spaceHeight = 2*innerHeight
const spaceWidthStart = innerWidth/2 - spaceWidth/2
const spaceHeightStart = innerHeight/2 - spaceHeight/2
//astroids
const numAstroids = 20
const astroidMinSize = 5
var astroids = []
//score
const scoreTextSize = 20
var score = 0
//game over
const gameOverTextSize = 40
var gameOver = false

class Astroid{
  constructor(x, y, xVel, yVel, sizeooga){
    this.x = x
    this.y = y
    this.xVel = xVel
    this.yVel = yVel
    this.c = color(random(256), random(256), random(256))
    this.size = sizeooga
  }

  onDraw(){
    this.x += this.xVel
    this.y += this.yVel
    fill(this.c)
    circle(this.x, this.y, this.size)
    //wrap around width
    if(this.x > spaceWidth+spaceWidthStart){
      this.x = spaceWidthStart
    }
    else if(this.x < spaceWidthStart){
      this.x = spaceWidth+spaceWidthStart
    }
    //wrap around height
    if(this.y > spaceHeight+spaceHeightStart){
      this.y = spaceHeightStart
    }
    else if(this.y < spaceHeightStart){
      this.y = spaceHeight+spaceHeightStart
    }

    if(this.collisionCheck()){
      gameOver = true
    }
  }

  collisionCheck(){
    return dist(playerX, playerY, this.x, this.y) < (this.size + hurtBoxSize)/2 && this.size != 0
  }

  destroy(){
    if(size >= astroidMinSize){
      astroids.push(new Astroid(random(spaceWidth), random(spaceHeight), random(2*speed)-speed, random(2*speed)-speed), this.size/2)
      astroids.push(new Astroid(random(spaceWidth), random(spaceHeight), random(2*speed)-speed, random(2*speed)-speed), this.size/2)
    }
    this.size = 0 //bad
    score++
  }
}

function setup(){
  createCanvas(innerWidth, innerHeight)
  //create the astroids
  for(var numAstroidsLeft = numAstroids; numAstroidsLeft > 0; numAstroidsLeft -= 1){
    astroids.push(new Astroid(random(spaceWidth), random(spaceHeight), random(2*speed)-speed, random(2*speed)-speed), random(20)+30)
  }
}

function draw(){
  background(0, 0, 0, 25)
  //astroids
  noStroke()
  for(var a of astroids){
    a.onDraw()
  }

  //player
  if(!gameOver){
    var playerSpeed = sqrt()
    circle(playerX, playerY, hurtBoxSize)
    playerControls()
  }
  else{ //game over
    textSize(gameOverTextSize)
    text("Game Over", width/2-2.5*gameOverTextSize, height/2)
  }

  //draw score
  stroke(256)
  fill(0)
  rect(width/2-2*scoreTextSize, 0, 6*scoreTextSize, 1.5*scoreTextSize)
  textSize(scoreTextSize)
  noStroke()
  fill(256)
  text("Score: "+score, width/2-scoreTextSize, scoreTextSize)
}

function mouseClicked(){
  if(gameOver){
    return
  }
  for(var a of astroids){
    if(dist(mouseX, mouseY, a.x, a.y) < a.size/2){
      a.destroy()
    }
  }
}

function playerControls(){
  //keyboard controls
  if(keyIsDown(87)){ //w
    for(var a of astroids){
      a.yVel+=acceleration
    }
  }
  if(keyIsDown(65)){ //a
    for(var a of astroids){
      a.xVel+=acceleration
    }
  }
  if(keyIsDown(83)){ //s
    for(var a of astroids){
      a.yVel-=acceleration
    }
  }
  if(keyIsDown(68)){ //d
    for(var a of astroids){
      a.xVel-=acceleration
    }
  }
}
