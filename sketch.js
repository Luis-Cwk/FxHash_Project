// Como esa noche de discoteca, cuando se baila, se goza, hay brillos, colores, cierro los ojos y solo vibro, pero tambien tengo en la mente el 7,8... //

// Esta pieza juega con el algoritmo, baila con él, lo ejecuta al ritmo del ordenador, dependiendo de tu maquina, es tu rendimiento, tu performance, en el mío dura como 20 seg en renderizarse, 56 es el frame de inicio para que aparezca la luz, en el 78 termina. Baila cuantas veces quieras, siempre sentiras difente. Petra 13/11/22 //

var colores = [
  "blue",
  "brown",
  "purple",
  "pink",
  "#F7A4A4",
  "#FEBE8C", 
  "#B6E2A1",
  "#7743DB",
];
var x = [];
var y = [];
var sz = [];
var col = [];
var seed = fxrand;

function genR(min, max) { let result = 0; if (!max) { result = fxrand() * (min - 0) + 0; } else { result = fxrand() * (max - min) + min; } return result; }

function setup() {
  
  genR(seed);
  createCanvas(windowWidth, windowHeight);
  extraCanvas = createGraphics(windowWidth, windowHeight);
    frameRate (8);

  
  for(var i = 0; i<88; i++){
    x = append(x,genR(width));
    y = append(y,genR(height));
    sz = append(sz,genR(0,150));
  }
}

function draw() {
  
  background(genR(255), genR(8, 255), genR(8, 255), genR(3));
  image(extraCanvas, 0,0);

  for(var i = 0; i<x.length; i++){
    
    extraCanvas.push();
    extraCanvas.translate(x[i], y[i]);
    
    var steps = sz[i]/8;
    
    for (var j = 0; j < sz[i]; j += steps){
      
      let ang = frameCount * genR(8); 
      
      extraCanvas.rotate(ang);
      
      extraCanvas.strokeWeight(genR(.2));
      extraCanvas.stroke(genR(255), genR(255), genR(255),genR(8));

      extraCanvas.rectMode(CENTER);

      extraCanvas.rect(8*j, 8/j, ang/.2, 8/steps, steps/8 , 8/j);

      extraCanvas.fill(genR(0, 250), genR(0, 250), genR (250), genR(3)); 
    
    }
    extraCanvas.translate(width, height);
    extraCanvas.translate(p5.Vector.fromAngle(millis() / seed, seed)); 
    
    extraCanvas.pop();  
  }
  if (isFxpreview == true) {
    fxpreview();
  }
  if (frameCount == 56) {
    extraCanvas.blendMode(ADD);
  }
  console.log(frameCount);
  if (frameCount == 88) {
		noLoop();
  }
}

function keyPressed() {
    if (key === 's') {
        saveGif('mySketch', 5);
    }
}

// DATA // 
function getFeatureString(value) {
  if (value
    < 0.5) return "low"
  if (value < 0.9) return "medium"
  else return "high"
}

window.$fxhashFeatures = {
  // feature can only be "low", "medium" or "high"
  "☁ Dance ☁": getFeatureString(fxrand())
}

