var dog,happyDog;
var database;
var foodS,foodStock;
var dogImg,dogHapImg;



function preload()
{
  dogImg = loadAnimation("Images/Dog.png");
  dogHapImg = loadImage("Images/happydog.png");
}

function setup() 
{
  database =firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(200,300,20,20);
  dog.addAnimation("pet", dogImg);
  dog.scale = 0.1;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}

function draw() 
{  

  background(46,139,87);

  if(keyWentDown(UP_ARROW))
  {
      writeStock(foodS);
      dog.addImage("happy",dogHapImg);
  }

  drawSprites();


  textSize(15);
  fill("purple");
  stroke(4);
  text("Note: PRESS THE UP ARROW KEY TO FEED THE DRAGO MILK",30,100);

}

function readStock(data)
{
    foodS = data.val()
}

function writeStock(x)
{
  if(x <= 0)
  {
    x = 0;
  }
  else{
    x = x -1;
  }
  database.ref('/').update({
    Food: x
    
  })
}



