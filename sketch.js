
let layerNoise;

async function setup() {
  createCanvas(800, 1000);
  background(220);

  colorMode(HSB);

  // noise sets
  layerNoise = new NoiseSet(0.01, 0.01, 0.01);


  stroke(0, 0, 20);
  
  // blendMode(MULTIPLY);
  drawTree(400, 900, 60, 600);
}



// async sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}