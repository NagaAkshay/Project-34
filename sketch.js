//Create variables here
var dog, happyDog;
var dogImg, happyDogImg;
var dataBase;
var foodS, foodStock;

function preload(){
  //load images here
  dog_img = loadImage("Dog.png");
  happyDog_img = loadImage("images/dogImg1.png");
}

function setup() {
  //Create the desired canvas
  createCanvas(600, 600);

  // Create the background
  background(46, 139, 87);
  
  // Create the spites here
  dog = createSprite(300, 400);
  dog.addImage("dog_Img", dog_img);
  dog.addImage("happyDog_Img", happyDog_img);
  dog.scale = 0.25;

  dataBase = firebase.database();

  foodStock = dataBase.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  // Add the background
  background(46, 139, 87);

  // Feeding the dog
  if (keyWentDown(UP_ARROW) && foodS > 0) {
    writeStock(foodS);
    dog.changeImage("happyDog_Img");
    foodStock = foodStock-1;
  }

  if (keyWentUp(UP_ARROW) && foodS > 0) {
    dog.changeImage("dog_Img")
  }

  if (foodS === 0) {
    dog.changeImage("dog_Img");
    textSize(20);
    fill("white");
    stroke(2, "black");
    text("Peko ate to his stomach full", 150, 100);
  }

  // Draw the Sprites
  drawSprites();

  //add styles here
  textSize(30);
  fill("blue");
  stroke(2, "black");
  text("Food Remaining: "+foodS, 175, 200);

  // Add note 
  textSize(15);
  fill("red");
  text("NOTE:Press UP_ARROW key to feed your pet", 30, 50);

  textSize(35);
  fill("orange");
  stroke(2,"yellow");
  text("Name of the Dog:PEKO",150, 575);

}

 

//Function to readStock from the dataBase
function readStock(data) {
  foodS = data.val();
}

//Function to writeStock from the dataBase
function writeStock(x) {

  if (x <= 0) {
    x=0;
  }else{
    x = x-1
  }
  dataBase.ref('/').update({
    Food:x
  })
}



