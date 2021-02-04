var dog, dogImg, dogImg1, database, foodS, foodStock;

function preload() {
  dogImg = loadImage("images/dogImg.png");
  dogImg1 = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250, 250);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  textSize(20);
}

function draw() {
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(dogImg1);
  }
  drawSprites();
  textSize(15);
  fill("red");
  text("Note: Press UP Arrow Key to Feed Drago Milk!", 100, 100);

  fill("black");
  text("Food Remaining: " + foodS, 170, 80);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref("/").update({
    Food: x,
  });
}
