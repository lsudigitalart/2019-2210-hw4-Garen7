const speed = 3
const mySpeed = 3
//space is centered around the same point the window is
const spaceWidth = 2*innerWidth
const spaceHeight = 2*innerHeight
const spaceWidthStart = innerWidth/2 - spaceWidth/2
const spaceHeightStart = innerHeight/2 - spaceHeight/2
//astroids
const numAstroids = 10
var astroids = []

class Astroid{
  constructor(x, y, xVel, yVel){
    this.x = x
    this.y = y
    this.xVel = xVel
    this.yVel = yVel
    this.c = color(random(256), random(256), random(256))
  }

  onDraw(){
    this.x += this.xVel
    this.y += this.yVel
    fill(this.c)
    circle(this.x, this.y, 40)
    //wrap around width
    if(this.x > spaceWidth+spaceWidthStart){
      this.x = spaceWidthStart
    }
    if(this.x < spaceWidthStart){
      this.x = spaceWidth+spaceWidthStart
    }
    //wrap around height
    if(this.y > spaceHeight+spaceHeightStart){
      this.y = spaceHeightStart
    }
    if(this.y < spaceHeightStart){
      this.y = spaceHeight+spaceHeightStart
    }
  }
}

function setup(){
  createCanvas(innerWidth, innerHeight)
  noStroke()
  //create the astroids
  for(var numAstroidsLeft = numAstroids; numAstroidsLeft > 0; numAstroidsLeft -= 1){
    astroids.push(new Astroid(random(spaceWidth), random(spaceHeight), random(2*speed)-speed, random(2*speed)-speed))
  }
}

function draw(){
  background(0, 0, 0, 25)
  for(var a of astroids){
    a.onDraw()
  }

  //keyboard controls
  if(keyIsDown(87)){ //w
    for(var a of astroids){
      a.y+=mySpeed
    }
  }
  if(keyIsDown(65)){ //a
    for(var a of astroids){
      a.x+=mySpeed
    }
  }
  if(keyIsDown(83)){ //s
    for(var a of astroids){
      a.y-=mySpeed
    }
  }
  if(keyIsDown(68)){ //d
    for(var a of astroids){
      a.x-=mySpeed
    }
  }
}
