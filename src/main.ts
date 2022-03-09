import * as PIXI from 'pixi.js'
import * as dat from 'dat.gui'
import * as filters from 'pixi-filters'     //add filters gui
import { AdjustmentFilter } from 'pixi-filters';


let bg = new PIXI.Graphics();       //background rectangle (not working makes the program too laggy)
let color = {
    background: '#345678'
}
let sticker_control_1 = {           //each stick is its own object and can be controlled
    Sticker:0,
    width:100,
    height:200,
    rotation: 0,
    is_moving:false
}
let sticker_control_2 = {
    Sticker:0,
    width:100,
    height:40,
    rotation: 0
}

let sticker_control_3 = {
    Sticker:0,
    width:100,
    height:40,
    rotation: 0
}

let sticker_control_4 = {
    Sticker:0,
    width:100,
    height:40,
    rotation: 0
}

let sticker_control_5 = {
    Sticker:0,
    width:100,
    height:40,
    rotation: 0
}

let app = new PIXI.Application({   //took out of main so update function has accceses to it 
    backgroundColor: 0x10777b, resolution: window.devicePixelRatio || 1,
});


const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader.add('world1', 'assets/hello-world.png')
                  .add('red_pika', 'assets/red_pika.png')
                  .add('')
                    .load(() => {
                         resolve();
                    });
        });
};

let stickers = [
    'assets/hello-world.png',  //0
    'assets/red_pika.png',
    'assets/link.png',
    'assets/ness.png',
    'assets/sonic.png',
    'assets/yoshi.png',
    'assets/pac.png',
    'assets/pac_ghost.png',
    'assets/megaman.png',       //88

]                   //add for loop? is there a way to add these properly 

const texture = PIXI.Sprite.from(stickers[0]); //adding stickers to be manipulated 
const texture1 = PIXI.Sprite.from(stickers[1]);
const texture2 = PIXI.Sprite.from(stickers[2]);
const texture3 = PIXI.Sprite.from(stickers[3]);
const texture4 = PIXI.Sprite.from(stickers[4]);
const texture5 = PIXI.Sprite.from(stickers[5]);
const texture6 = PIXI.Sprite.from(stickers[6]);
const texture7 = PIXI.Sprite.from(stickers[7]);
const texture8 = PIXI.Sprite.from(stickers[8]);
//const texture9 = PIXI.Sprite.from(stickers[9]);



const main = async () => {

    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // Load assets
    await load(app);

    // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.hitArea = new PIXI.Polygon([
            0,0,
            window.innerWidth, 0,
            window.innerWidth, window.innerHeight,
            0, window.innerHeight
        ]);
    });

    document.body.appendChild(app.view);
    //GUI controls 
    const gui = new dat.GUI()
    //let sticker_folder = gui.addFolder("Add Stickers")   use a new file for this 
    //sticker_folder.add(s1)
    // let bg_gui = gui.addFolder("Background")
    // bg_gui.addColor(background_control, "color")    //each sticker has its own gui controll
    gui.addColor(color, "background").onChange(value => {
		let tempColor = value.slice(1)
        tempColor = '0x' + tempColor;
		app.renderer.backgroundColor = parseInt(tempColor)
	})

    
    let s1 = gui.addFolder("Sticker #1")
    s1.add(sticker_control_1, "Sticker", 0, 9)
    s1.add(sticker_control_1,"width",0,300)
    s1.add(sticker_control_1,"height",0,300)
    s1.add(sticker_control_1,"rotation",0,10)
    s1.add(sticker_control_1,"is_moving")
   
    let s2 = gui.addFolder("Sticker #2")
    s2.add(sticker_control_2, "Sticker", 0, 9)
    s2.add(sticker_control_2,"width",0,300)
    s2.add(sticker_control_2,"height",0,300)
    s2.add(sticker_control_2,"rotation",0,10)

    let s3 = gui.addFolder("Sticker #3")
    s3.add(sticker_control_3, "Sticker", 0, 9)
    s3.add(sticker_control_3,"width",0,300)
    s3.add(sticker_control_3,"height",0,300)
    s3.add(sticker_control_3,"rotation",0,10)

    let s4 = gui.addFolder("Sticker #4")
    s4.add(sticker_control_4, "Sticker", 0, 9)
    s4.add(sticker_control_4,"width",0,300)
    s4.add(sticker_control_4,"height",0,300)
    s4.add(sticker_control_4,"rotation",0,10)


    let s5 = gui.addFolder("Sticker #5")
    s5.add(sticker_control_5, "Sticker", 0, 9)
    s5.add(sticker_control_5,"width",0,300)
    s5.add(sticker_control_5,"height",0,300)
    s5.add(sticker_control_5,"rotation",0,10)

    app.stage.addChild(bg)
    //gui.addColor(background_control,"color1")
    
    //texture.width = 200;
    //texture.height = 200;
    texture.interactive=true        //setup for each sticker to be controlled 
    texture.buttonMode = true
    texture.anchor.set(0.5)
    texture.on('mousedown', onDragStart)
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            .on('mousemove', onDragMove);
                    
    texture1.interactive=true
    texture1.buttonMode = true
    texture1.anchor.set(0.5)
    texture1.on('mousedown', onDragStart)
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            .on('mousemove', onDragMove);

    texture2.interactive=true
    texture2.buttonMode = true
    texture2.anchor.set(0.5)
    texture2.on('mousedown', onDragStart)
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            .on('mousemove', onDragMove);

    texture3.interactive=true
    texture3.buttonMode = true
    texture3.anchor.set(0.5)
    texture3.on('mousedown', onDragStart)
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            .on('mousemove', onDragMove);
    
    texture4.interactive=true
    texture4.buttonMode = true
    texture4.anchor.set(0.5)
    texture4.on('mousedown', onDragStart)
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            .on('mousemove', onDragMove);

    texture5.interactive=true
    texture5.buttonMode = true
    texture5.anchor.set(0.5)
    texture5.on('mousedown', onDragStart)
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            .on('mousemove', onDragMove);

    texture6.interactive=true
    texture6.buttonMode = true
    texture6.anchor.set(0.5)
    texture6.on('mousedown', onDragStart)
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            .on('mousemove', onDragMove);

    texture7.interactive=true
    texture7.buttonMode = true
    texture7.anchor.set(0.5)
    texture7.on('mousedown', onDragStart)
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            .on('mousemove', onDragMove);

    texture8.interactive=true
    texture8.buttonMode = true
    texture8.anchor.set(0.5)
    texture8.on('mousedown', onDragStart)
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            .on('mousemove', onDragMove);
    app.ticker.add(update);
};

// Cannot be an arrow function. Arrow functions cannot have a 'this' parameter.
function update(delta: number) {
     //rect background function here for colors 
    //background_controller()               //lags too much hw to cheang bg better 
    app.stage.removeChild(texture)
    app.stage.removeChild(texture1)
    app.stage.removeChild(texture2)
    app.stage.removeChild(texture3)
    app.stage.removeChild(texture4)
    app.stage.removeChild(texture5)
    app.stage.removeChild(texture6)
    app.stage.removeChild(texture7)
    app.stage.removeChild(texture8)

    sticker1(sticker_control_1.Sticker)    //new function with new varible to add more than one sticker 
    sticker2(sticker_control_2.Sticker)    //new function with new varible to add more than one sticker 
    sticker3(sticker_control_3.Sticker)
    sticker4(sticker_control_4.Sticker)
    sticker5(sticker_control_5.Sticker)
};

main();

//.onchange

function sticker1(x: number){ 
    if (sticker_control_1.is_moving === true){
        move(texture)
        move(texture1)
        move(texture2)
        move(texture3)
        move(texture4)
        move(texture5)
        move(texture6)
        move(texture7)
        move(texture8)
        
    }
    switch(true) {

        case (x < 1):
           
          break;
        case (x>=1 && x<2):
            app.stage.addChild(texture)
            texture.width=sticker_control_1.width;
            texture.height=sticker_control_1.height;  
            texture.rotation=sticker_control_1.rotation  
            
            
          break;

        case (x>=2 && x<3):
            app.stage.addChild(texture1)
            texture1.width=sticker_control_1.width;
            texture1.height=sticker_control_1.height;  
            texture1.rotation=sticker_control_1.rotation
          break;

          case (x>=3 && x<4):
            app.stage.addChild(texture2)
            texture2.width=sticker_control_1.width;
            texture2.height=sticker_control_1.height;  
            texture2.rotation=sticker_control_1.rotation
          break;

          case (x>=4 && x<5):
            app.stage.addChild(texture3)
            texture3.width=sticker_control_1.width;
            texture3.height=sticker_control_1.height;  
            texture3.rotation=sticker_control_1.rotation
          break;
          
          case (x>=5 && x<6):
            app.stage.addChild(texture4)
            texture4.width=sticker_control_1.width;
            texture4.height=sticker_control_1.height;  
            texture4.rotation=sticker_control_1.rotation
          break;
          
          case (x>=6 && x<7):
            app.stage.addChild(texture5)
            texture5.width=sticker_control_1.width;
            texture5.height=sticker_control_1.height;  
            texture5.rotation=sticker_control_1.rotation
          break;
          
          case (x>=7 && x<8):
            app.stage.addChild(texture6)
            texture6.width=sticker_control_1.width;
            texture6.height=sticker_control_1.height;  
            texture6.rotation=sticker_control_1.rotation
          break;
          
          case (x>=8 && x<9):
            app.stage.addChild(texture7)
            texture7.width=sticker_control_1.width;
            texture7.height=sticker_control_1.height;  
            texture7.rotation=sticker_control_1.rotation
          break;
          
          case (x>=9 && x<10):
            app.stage.addChild(texture8)
            texture8.width=sticker_control_1.width;
            texture8.height=sticker_control_1.height;  
            texture8.rotation=sticker_control_1.rotation
          break;
        default:
          // code block
      }
}

function sticker2(x: number){ 
    switch(true) {
        case (x < 1):
           
          break;
        case (x>=1 && x<2):
            app.stage.addChild(texture)
            texture.width=sticker_control_2.width;
            texture.height=sticker_control_2.height;  
            texture.rotation=sticker_control_2.rotation     
          break;

        case (x>=2 && x<3):
            app.stage.addChild(texture1)
            texture.width=sticker_control_2.width;
            texture.height=sticker_control_2.height;  
            texture.rotation=sticker_control_2.rotation 
          break;

          case (x>=3 && x<4):
            app.stage.addChild(texture2)
            texture.width=sticker_control_2.width;
            texture.height=sticker_control_2.height;  
            texture.rotation=sticker_control_2.rotation 
          break;

          case (x>=4 && x<5):
            app.stage.addChild(texture3)
            texture.width=sticker_control_2.width;
            texture.height=sticker_control_2.height;  
            texture.rotation=sticker_control_2.rotation 
          break;
          
          case (x>=5 && x<6):
            app.stage.addChild(texture4)
            texture.width=sticker_control_2.width;
            texture.height=sticker_control_2.height;  
            texture.rotation=sticker_control_2.rotation 
          break;
          
          case (x>=6 && x<7):
            app.stage.addChild(texture5)
            texture.width=sticker_control_2.width;
            texture.height=sticker_control_2.height;  
            texture.rotation=sticker_control_2.rotation 
          break;
          
          case (x>=7 && x<8):
            app.stage.addChild(texture6)
            texture.width=sticker_control_2.width;
            texture.height=sticker_control_2.height;  
            texture.rotation=sticker_control_2.rotation 
          break;
          
          case (x>=8 && x<9):
            app.stage.addChild(texture7)
            texture.width=sticker_control_2.width;
            texture.height=sticker_control_2.height;  
            texture.rotation=sticker_control_2.rotation 
          break;
          
          case (x>=9 && x<10):
            app.stage.addChild(texture8)
            texture.width=sticker_control_2.width;
            texture.height=sticker_control_2.height;  
            texture.rotation=sticker_control_2.rotation 
          break;
        default:
          // code block
      }
}

function sticker3(x: number){ 
    switch(true) {
        case (x < 1):
           
          break;
        case (x>=1 && x<2):
            app.stage.addChild(texture)
            texture.width=sticker_control_3.width;
            texture.height=sticker_control_3.height;  
            texture.rotation=sticker_control_3.rotation     
          break;

        case (x>=2 && x<3):
            app.stage.addChild(texture1)
            texture.width=sticker_control_3.width;
            texture.height=sticker_control_3.height;  
            texture.rotation=sticker_control_3.rotation   
          break;

          case (x>=3 && x<4):
            app.stage.addChild(texture2)
            texture.width=sticker_control_3.width;
            texture.height=sticker_control_3.height;  
            texture.rotation=sticker_control_3.rotation   
          break;

          case (x>=4 && x<5):
            app.stage.addChild(texture3)
            texture.width=sticker_control_3.width;
            texture.height=sticker_control_3.height;  
            texture.rotation=sticker_control_3.rotation   
          break;
          
          case (x>=5 && x<6):
            app.stage.addChild(texture4)
            texture.width=sticker_control_3.width;
            texture.height=sticker_control_3.height;  
            texture.rotation=sticker_control_3.rotation   
          break;
          
          case (x>=6 && x<7):
            app.stage.addChild(texture5)
            texture.width=sticker_control_3.width;
            texture.height=sticker_control_3.height;  
            texture.rotation=sticker_control_3.rotation   
          break;
          
          case (x>=7 && x<8):
            app.stage.addChild(texture6)
            texture.width=sticker_control_3.width;
            texture.height=sticker_control_3.height;  
            texture.rotation=sticker_control_3.rotation   
          break;
          
          case (x>=8 && x<9):
            app.stage.addChild(texture7)
            texture.width=sticker_control_3.width;
            texture.height=sticker_control_3.height;  
            texture.rotation=sticker_control_3.rotation   
          break;
          
          case (x>=9 && x<10):
            app.stage.addChild(texture8)
            texture.width=sticker_control_3.width;
            texture.height=sticker_control_3.height;  
            texture.rotation=sticker_control_3.rotation   
          break;
        default:
          // code block
      }
}

function sticker4(x: number){ 
    switch(true) {
        case (x < 1):
           
          break;
        case (x>=1 && x<2):
            app.stage.addChild(texture)
            texture.width=sticker_control_4.width;
            texture.height=sticker_control_4.height;  
            texture.rotation=sticker_control_4.rotation     
          break;

        case (x>=2 && x<3):
            app.stage.addChild(texture1)
            texture.width=sticker_control_4.width;
            texture.height=sticker_control_4.height;  
            texture.rotation=sticker_control_4.rotation 
          break;

          case (x>=3 && x<4):
            app.stage.addChild(texture2)
            texture.width=sticker_control_4.width;
            texture.height=sticker_control_4.height;  
            texture.rotation=sticker_control_4.rotation 
          break;

          case (x>=4 && x<5):
            app.stage.addChild(texture3)
            texture.width=sticker_control_4.width;
            texture.height=sticker_control_4.height;  
            texture.rotation=sticker_control_4.rotation 
          break;
          
          case (x>=5 && x<6):
            app.stage.addChild(texture4)
            texture.width=sticker_control_4.width;
            texture.height=sticker_control_4.height;  
            texture.rotation=sticker_control_4.rotation 
          break;
          
          case (x>=6 && x<7):
            app.stage.addChild(texture5)
            texture.width=sticker_control_4.width;
            texture.height=sticker_control_4.height;  
            texture.rotation=sticker_control_4.rotation 
          break;
          
          case (x>=7 && x<8):
            app.stage.addChild(texture6)
            texture.width=sticker_control_4.width;
            texture.height=sticker_control_4.height;  
            texture.rotation=sticker_control_4.rotation 
          break;
          
          case (x>=8 && x<9):
            app.stage.addChild(texture7)
            texture.width=sticker_control_4.width;
            texture.height=sticker_control_4.height;  
            texture.rotation=sticker_control_4.rotation 
          break;
          
          case (x>=9 && x<10):
            app.stage.addChild(texture8)
            texture.width=sticker_control_4.width;
            texture.height=sticker_control_4.height;  
            texture.rotation=sticker_control_4.rotation 
          break;
        default:
          // code block
      }
}

function sticker5(x: number){ 
    switch(true) {
        case (x < 1):
           
          break;
        case (x>=1 && x<2):
            app.stage.addChild(texture)
            texture.width=sticker_control_5.width;
            texture.height=sticker_control_5.height;  
            texture.rotation=sticker_control_5.rotation     
          break;

        case (x>=2 && x<3):
            app.stage.addChild(texture1)
            texture.width=sticker_control_5.width;
            texture.height=sticker_control_5.height;  
            texture.rotation=sticker_control_5.rotation     
          break;

          case (x>=3 && x<4):
            app.stage.addChild(texture2)
            texture.width=sticker_control_5.width;
            texture.height=sticker_control_5.height;  
            texture.rotation=sticker_control_5.rotation     
          break;

          case (x>=4 && x<5):
            app.stage.addChild(texture3)
            texture.width=sticker_control_5.width;
            texture.height=sticker_control_5.height;  
            texture.rotation=sticker_control_5.rotation     
          break;
          
          case (x>=5 && x<6):
            app.stage.addChild(texture4)
            texture.width=sticker_control_5.width;
            texture.height=sticker_control_5.height;  
            texture.rotation=sticker_control_5.rotation     
          break;
          
          case (x>=6 && x<7):
            app.stage.addChild(texture5)
            texture.width=sticker_control_5.width;
            texture.height=sticker_control_5.height;  
            texture.rotation=sticker_control_5.rotation     
          break;
          
          case (x>=7 && x<8):
            app.stage.addChild(texture6)
            texture.width=sticker_control_5.width;
            texture.height=sticker_control_5.height;  
            texture.rotation=sticker_control_5.rotation     
          break;
          
          case (x>=8 && x<9):
            app.stage.addChild(texture7)
            texture.width=sticker_control_5.width;
            texture.height=sticker_control_5.height;  
            texture.rotation=sticker_control_5.rotation     
          break;
          
          case (x>=9 && x<10):
            app.stage.addChild(texture8)
            texture.width=sticker_control_5.width;
            texture.height=sticker_control_5.height;  
            texture.rotation=sticker_control_5.rotation     
          break;
        default:
          // code block
      }
}

function move(png: PIXI.Sprite){
    png.x += 1
}
function interaction(){
    
}
//fucntions used to controll drag and drop of objects, used from https://pixijs.io/examples/#/interaction/custom-hitarea.js
function onDragStart(this: any, event: { data: any; }) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd(this: any) {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}

function onDragMove(this: any) {
    if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}
/*
//next steps 
  
    --try to add gifs  / make a check to make the images move 

    add audio
        -gui slider for music 


    add screenshot
        =https://pixijs.io/examples/#/demos-advanced/screenshot.js
*/

//ask about background and general implamentation is there a better way to layout code so that we don't have the saem sunction copy pasted ?