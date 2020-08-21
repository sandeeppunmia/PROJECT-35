//Create variables here
var canvas;
var dog, dogImg,happyDog ,happyDogImg,database, foodS, foodStock;
var feed, addFood;
var foodStock,lastFed,foodObj;
var gameState = 0;
var petCount;
var database;
var form,pet,game;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  canvas = createCanvas(600, 600);
  database = firebase.database();
  dog = createSprite(450,200);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock,showErr);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  game = new Game();
  game.getState();
  game.start();

  milk = new Food();
 
}


function draw() {  
  background(46, 139, 87);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  

  fill(255,255,254);
  textSize(15);
  getLastFedTime();
  if(lastFed>=12){
    text("Last Feed : "+lastFed%12 + "PM",350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+lastFed + "AM",350,30);
  }

  if(foodS<=0){
    textSize(20);
    text("Oops, it seems that you don't have food to feed your dog..Please ",10,470);
    text("add the food to feed your dog",10,490);
  }

milk.display();

  drawSprites();
  //add styles here
  textSize(30);
  fill("red");
  text("Food Remaining:"+foodS,10,450);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x = x-1;
  }
  database.ref('/').set({
    Food:x
  })
}

function showErr(){
  console.log("Error in reading the database");
}

function feedDog(){
  dog.addImage(happyDogImg);
  foodS = foodS - 1;
  database.ref('/').update({
    Food:foodS
  
})

  /*foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })*/
}


  function addFoods(){
      foodS++;
      database.ref('/').update({
          Food:foodS
      })

  }

  async function getLastFedTime(){
    var response = await fetch("https://worldtimeapi.org/api/timezone/asia/tokyo");
    var responseJSON = await response.json();
    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
  }
  