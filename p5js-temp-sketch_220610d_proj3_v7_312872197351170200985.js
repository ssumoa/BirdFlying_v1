let n = 50;
let circles =  [];
let birds =  [];

let img =[];
let imgX = 30;
let imgY = 30;
let frameNum = 0;
let xPos = 30;

let life = true;

function preload(){
  for(let i=1; i<=12; i++){
    img[i-1] = loadImage('data/img/' + i + '.png');
  }
}

function setup(){
  
  createCanvas(1280,720);
  background(0);
  noStroke();
  frameRate(24);
  
  for(let i = 0; i<n; i++){
    let x = random(width/3);
    let y = random(height);
    birds[i] = new Bird(x,y);
  }
}

function draw(){
  fill(0,120);
  rect(0,0,width, height);
  if(life){
   makeNewBird(10);
    if(birds.length == 100) life = !life;
  }
    else{ removeBird(10);if(birds.length == 60) life = !life; }  
  
  for(let i = 0; i < birds.length; i++){
    birds[i].update();
    birds[i].wrap();
    birds[i].display();
  }
 // console.log(birds.length);
}

class Bird{
    constructor(posX_, posY_) {
    this.posX= posX_;
    this.posY= posY_;
    this.incr=0;
    this.theta=0;
  }

  move() {
    this.update();
    this.wrap();
   this.display();
  }

 update() {
    this.incr -=  0.008;
    this.theta = noise(this.posX * 0.06, this.posY * 0.04, this.incr) * TWO_PI;
    this.posX -= 5 * cos(this.theta);
    //if(this.posY>20 && posY <height-20) this.posY -= 4 * sin(this.theta);
this.posY -= 4 * sin(this.theta);    
    //console.log(this.posX + " : " + this.posY);
  }
  
  display() {
   
    if (this.posX > 0 && this.posX < width && this.posY > 0  && this.posY < height) {
     // fill(255);
     let size = this.posX;
     fill(0,2); rect(0,0,width, height);
    // if(frameNum == 4 || frameNum ==8)  rect(0,0,width, height);
     push();
     translate(this.posX,this.posY);
      rotate(radians(330));
      rotate(radians(35 * (this.posY*2)/float(height)));
      //scale(1 + size/width);
      birdFly(0, 0, size);
      pop();
    }
  }

   wrap() {
    if (this.posX < 0) this.posX = width -30;
    if (this.posX > width ) this.posX =  0;
    if (this.posY < 0) this.posY = height-30;
    if (this.posY > height) this.posY =  0;
  }
}

function birdFly(posX, posY, size_){
   
  let size = 60+1.3*(size_/width *100);
 
  image(img[frameNum],posX ,posY,size,size);
   frameNum ++;
   
   
    if (frameNum  >= 11)
    {
      frameNum = 0;
    }
}

function makeNewBird(rate){
  if(birds.length <100){
    if(random(100)<rate){
      birds.push(new Bird( random(width/8),random(height*0.1, height*0.9)));
    }
  }
}

function removeBird(rate){
  if(birds.length >60){
    if(random(100)<rate){
      birds.pop(new Bird( random(width/8),random(height*0.1, height*0.9)));
    }
  }
}
