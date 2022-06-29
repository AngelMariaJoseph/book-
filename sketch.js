const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

const Composites = Matter.Composites;
 const Composite = Matter.Composite;
const Constraint =  Matter.Constraint;
let engine
let world 

var ground, books, rope
var books_con;
var books_con_2
var book
var backGround_Image
var fireman
var fireMan
var button

 function preload(){
  backGround = loadImage('pixel art background.png')
  book= loadImage('book stack.png')
  fireMan = loadImage('Super Pixel Platformer Set Pixel Art Design Pixel Art Games (1).jpg')
 }
function setup() {
  canvas=createCanvas(400,400);
 
  engine = Engine.create();
  world = engine.world;
  
  button = createImg('Scissor-icon.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);

  fireman= createSprite(230,330,100,100)
   fireman.addImage(fireMan)
   fireman.scale = 0.3

  books=Bodies.rectangle(300,300,20,20)
  Matter.Composite.add(rope.body,books);

  books_con = new Link(rope,books);

  rectMode(CENTER);
  textSize(50)
  
}


function draw() 
{
  background(51);
  rope.show();
  image(backGround,0,0,490,690);
  push();
  imageMode(CENTER);
   if(books!=null){
    image(book,books.position.x,books.position.y,20,20);
  }
  pop();

 
  Engine.update(engine);
  ground.show();

  drawSprites();

}

function drop()
{
  rope.break();
  books_con.detach();
  books_con = null; 
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,books);
               books = null;
               return true; 
            }
            else{
              return false;
            }
         }
} 


