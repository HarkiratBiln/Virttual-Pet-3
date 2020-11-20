//Creating the Variables
var dog, happyDog;
var foodS, foodStock, foodObj;
var garden, washroom, bedroom;
var feedPetButton, addFoodButton;
var fedTime, lastFed;
var readState, changeState;
var database;

function preload()
{
  //Loading Dog Images
  dogIMG = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  //sad dog image is not there

  //Loading the Background Images
  gardenIMG = loadImage("images/Garden.png");
  washroomIMG = loadImage("images/Wash Room.png");
  bedroomIMG = loadImage("images/Bed Room.png");


}

function setup() {
	createCanvas(700, 500);
  database = firebase.database();

  //Reading the Game State from the Database
  readState = database.ref("gameState");
  readState.on("value",function(data) {
    gameState = data.val();
  });


  //Creating the Food Object
  foodObj = new Food();

  //Creating the Feed Button
  feedPetButton = createButton("Feed the Dog");
  feedPetButton.position(700,95);
  feedPetButton.mousePressed(addFoods);

  //Creating the Add Food Button
  addFoodButton = createButton("Add Food");
  addFoodButton.position(800,95);
  addFoodButton.mousePressed(addFoods);

  //Creating the Dog Sprite
  dog = createSprite(250,300);
  dog.addImage(dogIMG);
  dog.scale = 0.2;

  //Creating the Background Images
  //garden.addImage(gardenIMG);
  //washroom.addImage(washroomIMG);
  //bedroom.addImage(bedroomIMG);

  //Foodstock
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
}


function draw() {  

  currentTime=hour();
  if(currentTime==(lastFed+1)){
      update("Playing");
      foodObj.garden();
   }else if(currentTime==(lastFed+2)){
    update("Sleeping");
      foodObj.bedroom();
   }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
      foodObj.washroom();
   }else{
    update("Hungry")
    foodObj.display();
   }
   
   if(gameState!="Hungry"){
     feed.hide();
     addFood.hide();
     dog.remove();
   }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
   }
 
  drawSprites();
}

function readStock(data) {

  foodS = data.val();  
  foodObj.updateFoodStock(foodS);
}

/*
function writeStock(number) {
  if(number <= 0){
    number =0;
  }
  else{
    number = number-1;
  }

  database.ref("/").update({
    Food:number 
  })
}
*/

function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock() -1);
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods() {
  foodS++;
  data.ref("/").update({
    Food: foodS
  })
}


//update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}
