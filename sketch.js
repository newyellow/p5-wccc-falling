//
// Weekly Creative Coding Challenge Topic 'Falling'
//

// Check the challenge page if you would like to join:
// https://openprocessing.org/curation/78544 


// This week, I attempted to create a forest with falling leaves.
// I also wanted to experiment with tree and landscape drawing techniques
// since I recently had a project related to this topic.
//
// Although the final result was not what I had initially expected,
// I am still happy to have something to keep up with the challenge! 
// 💪💪

let layerNoise;
let leafShapeNoise;
let bgLeafSizeNoise;
let bgLeafOffsetNoise;

let landCurveNoise;
let landLineSizeNoise;
let landLineOffsetNoise;

let mainHue = 0;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);

  colorMode(HSB);

  // noise sets
  layerNoise = new NoiseSet(0.01, 0.01, 0.01);
  bgLeafSizeNoise = new NoiseSet(0.06, 0.18, 0.01);
  bgLeafOffsetNoise = new NoiseSet(0.01, 0.01, 0.01);
  leafShapeNoise = new NoiseSet(0.01, 0.01, 0.1);

  landCurveNoise = new NoiseSet(0.001, 0.01, 0.01);
  landLineSizeNoise = new NoiseSet(0.06, 0.18, 0.01);
  landLineOffsetNoise = new NoiseSet(0.006, 0.01, 0.01);

  // some settings
  let treeBaseWidth = random(30, 60);
  mainHue = processHue(random(300, 400));


  // background
  let backgroundColorLU = NYColor.newRandomColor(0);
  let backgroundColorRU = NYColor.newRandomColor(300);
  let backgroundColorLD = NYColor.newRandomColor(60);
  let backgroundColorRD = NYColor.newRandomColor(240);

  let xCount = int(width / random(1, 3));
  let yCount = int(height / random(2, 6));

  let xSize = width / xCount;
  let ySize = height / yCount;

  for (let x = 0; x < xCount; x++) {

    if(x % 10 == 0)
      await sleep(1);

    let xt = x / (width - 1);
    let upColor = NYLerpColor(backgroundColorLU, backgroundColorRU, xt);
    let downColor = NYLerpColor(backgroundColorLD, backgroundColorRD, xt);

    for (let y = 0; y < yCount; y++) {
      let yt = y / (height - 1);
      let nowColor = NYLerpColor(upColor, downColor, yt);
      noStroke();
      fill(nowColor.h, nowColor.s, nowColor.b);
      rect(x * xSize, y * ySize, xSize, ySize);
    }
  }

  // bg lines
  let bgLines = (width + 200) * 0.1;
  for (let i = 0; i < bgLines; i++) {

    if(i % 10 == 0)
      await sleep(1);

    let t = i / (bgLines - 1);
    let nowX = lerp(-100, width + 100, t);

    drawBGLine(nowX, 0, nowX, height);
  }


  stroke(0, 0, 20);

  let landLayers = int(random(6, 12));
  let landStartY = random(0.4, 0.8) * height;
  let landYDiff = (height - landStartY) / landLayers;
  let landCurveRange = 0.4 * height;
  let landZAdd = random(10, 1000);
  let landZStart = random(-10000, 10000);

  for (let i = 0; i < landLayers; i++) {
    let landY = landStartY + landYDiff * i + random(-0.2, 0.2) * landYDiff;
    let landZ = landZStart + landZAdd * i;

    // draw trees
    let treeCount = int(random(1, 3));

    for (let i = 0; i < treeCount; i++) {
      let treeX = random(0.1, 0.9) * width;
      let treeY = getLandY(landY, landCurveRange, landZ, treeX) + 40;
      let treeWidth = random(0.6, 1.4) * treeBaseWidth;
      let treeHeight = random(0.6, 1.2) * height;

      await drawTree(treeX, treeY, treeWidth, treeHeight);
      await sleep(1);
    }


    // draw land
    stroke(0, 0, 100);
    await drawLandLine(landY, landCurveRange, landZ, true);

    stroke(0, 0, 6);
    await drawLandLine(landY, landCurveRange, landZ);

    await sleep(1);
  }

}



// async sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}