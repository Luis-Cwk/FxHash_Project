// "Caos armónico" es coreografía generativa que crea cuerpos representados por líneas vibrantes y coloridas, moviéndose en un espacio abstracto al compás de ritmos sincopados y frenéticos generados por algoritmos, ML e intervención humana. Permitete contemplar el cardumen! Estos cuerpos danzan de manera impredecible, influenciados por un factor de ruido aleatorio que les confiere un movimiento caótico y armónico al mismo tiempo. La obra es una exploración de la belleza encontrada en la interacción de lo aleatorio y lo armónico, creando una experiencia sensorialmente estimulante y evocativa. Los colores, vibrantes y variados, se fusionan y se separan en un constante juego de mezcla y separación, creando un espectáculo visualmente cautivador. "Caos armónico" es una danza que celebra la imprevisibilidad y la armonía en la complejidad del universo. // 

var colores = [
  "red",
  "orange",
  "blue",
  "indigo",
  "purple",
  "pink",
  "yellow", 
  "green",
  "cyan",
  "brown",
];
var x = [];
var y = [];
var sz = [];
var seed = fxrand;
var noiseScale = 0.2;
var velocidad = []; 
let circleX = 0;
let circleY = 0;
let xSpeed = 0;
let ySpeed = 0;

function genR(min, mx) { let result = 0; if (!mx) { result = fxrand() * (min - 0) + 0; } else { result = fxrand() * (mx - min) + min; } return result; }

function setup() {
  createCanvas(windowWidth - 1, windowHeight - 1);
  frameRate(30);
  for (var i = 0; i < 9; i++) {
    x = append(x, genR(-windowWidth / 2, windowWidth / 2));
    y = append(y, genR(-windowHeight / 2, windowHeight / 2));
    sz = append(sz, floor(genR(100)));
    velocidad = append(velocidad, genR(3));
  }
  extraCanvas = createGraphics(windowWidth, windowHeight);
}


function draw() {
  background(255);
  image(extraCanvas, 0, 0, windowWidth, windowHeight);
  
  for (var i = 0; i < x.length; i++) {

    extraCanvas.push();
    var steps = sz[i];
    
    for (var j = 1; j < y.length; j+=steps) {
      
      let noiseVal = noise(x[i] + noiseScale, y[j] * steps);
      
      x[noiseVal - 1] += genR(-sz[i], sz[i]);
      y[noiseVal - 1] += genR(-sz[i], sz[i]);

      x[j - 1] = constrain(x[j], 0, windowWidth);
      y[j - 1] = constrain(y[j], 0, windowHeight);
      
     
    
      var x1 = x[i] + angle;
      var y1 = sz[i] - angle;
      var x2 = y[i] * angle;
      var y2 = velocidad[i] + angle;

      extraCanvas.stroke(colores[i]);        
      extraCanvas.fill(genR(colores[i]));
              
      var tx = width / 2 + 50 * sin(x[i] + frameCount * 0.02);
      var ty = height / 2 + 51 * cos(y[i] + frameCount * 0.03); 
        
      extraCanvas.translate(tx, ty);
        
      extraCanvas.rotate(fract(angle,frameCount * 0.008,tx));
              
      circleX += xSpeed;
        if (circleX < x[i] || circleX > angle) {
          xSpeed *= -1;
        }

      circleY += ySpeed;
        if (circleY < y[i] || circleY > angle) {
          ySpeed *= -1;
        }

      let val = circleX * noiseVal / tx;

      extraCanvas.line(x1 || val, y1, x[j] || x1, y[j] || val, x2, val, x[j-1], y1);
    }   
    
    extraCanvas.pop();
  }
  
  if (frameCount == 3000) {
    noLoop();
  }  
}

if (isFxpreview == true) {
  fxpreview();
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

