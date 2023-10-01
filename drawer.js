let treeStrokeDensity = 0.6;

let bgLeafStrokeDensity = 0.3;
let bgLeafDotDensity = 0.8;

let landStrokeDensity = 0.16;

let lineDrawCount = 0;

let leafLineUpColor;
let leafLineBotColor;

let landLineUpColor;
let landLineBotColor;

async function drawTree(_x, _y, _startWidth, _tall) {
    let data = getTreeData(_x, _y, _startWidth, _tall, random(-10, 10), 0);

    let treeNodes = data.treeNodes;
    let backLeaves = data.backLeaves;
    let frontLeaves = data.frontLeaves;

    leafLineUpColor = NYColor.newRandomColor(mainHue);
    leafLineUpColor.s = random(40, 100);
    leafLineUpColor.b = random(60, 100);
    
    leafLineBotColor = NYColor.newRandomColor(mainHue);
    leafLineBotColor.b = random(20, 60);

    // back leave layer
    stroke('white');
    fill('white');
    for (let i = 0; i < backLeaves.length; i++) {
        drawLeafNode(backLeaves[i], true);
        await sleep(1);
    }

    stroke(0, 0, 6);
    fill(0, 0, 6);
    for (let i = 0; i < backLeaves.length; i++) {
        drawLeafNode(backLeaves[i]);
        await sleep(1);
    }

    // tree layer
    treeNodes.sort((a, b) => {
        if (a.branchLevel > b.branchLevel)
            return -1;
        else
            return 1;
    });


    for (let i = 0; i < treeNodes.length; i++) {
        drawTreeNode(treeNodes[i]);
    }

    // front leave layer
    stroke('white');
    fill('white');
    for (let i = 0; i < frontLeaves.length; i++) {
        drawLeafNode(frontLeaves[i], true);
        await sleep(1);
    }

    stroke(0, 0, 6);
    fill(0, 0, 6);
    for (let i = 0; i < frontLeaves.length; i++) {
        drawLeafNode(frontLeaves[i]);
        await sleep(1);
    }
}

function getLandY(_startY, _yDiff, _noiseZValue, _x) {
    return _startY + lerp(-0.5, 0.5, landCurveNoise.noiseValue(_x, _noiseZValue)) * _yDiff;
}

async function drawLandLine(_startY, _yDiff, _noiseZValue, _isOutline = false) {
    let xStart = -200;
    let xEnd = width + 200;
    let lineCount = (xEnd - xStart) * landStrokeDensity;

    landLineUpColor = NYColor.newRandomColor(0);
    landLineUpColor.s = random(40, 60);
    landLineUpColor.b = random(60, 100);

    landLineBotColor = NYColor.newRandomColor(60);
    landLineBotColor.s = random(40, 60);
    landLineBotColor.b = random(30, 100);

    for (let i = 0; i < lineCount; i++) {
        let t = i / (lineCount - 1);

        let x = lerp(xStart, xEnd, t);
        let y = _startY + lerp(-0.5, 0.5, landCurveNoise.noiseValue(x, _noiseZValue)) * _yDiff;

        await drawLandBGLine(x, y, x, height, _isOutline);
    }
}

async function drawLandBGLine(_x1, _y1, _x2, _y2, _isOutline = false) {
    let dotCount = dist(_x1, _y1, _x2, _y2) * bgLeafDotDensity;

    for (let i = 0; i < dotCount; i++) {
        let t = i / (dotCount - 1);
        let dotX = lerp(_x1, _x2, t);
        let dotY = lerp(_y1, _y2, t);

        let xOffset = landLineOffsetNoise.noiseValue(dotX, dotY) * 60.0;
        let dotSize = landLineSizeNoise.noiseValue(dotX, dotY) * 6.0;

        dotX += xOffset;

        if (_isOutline) {
            fill('white');
            strokeWeight(12);
            circle(dotX, dotY, dotSize);
        }
        else {
            let nowColor = NYLerpColor(landLineUpColor, landLineBotColor, t);
            nowColor.slightRandomize(20, 30, 20);
            stroke(nowColor.h, nowColor.s, nowColor.b, 1.0);
            strokeWeight(dotSize);
            point(dotX, dotY);
        }
    }

    if (++lineDrawCount % 10 == 0)
        await sleep(1);
}

function drawTreeNode(_treeNode) {
    // // draw white bg
    for (let i = 0; i < _treeNode.fromPoints.length; i++) {
        strokeWeight(6);
        stroke(0, 0, 100);
        line(_treeNode.fromPoints[i].x, _treeNode.fromPoints[i].y, _treeNode.toPoints[i].x, _treeNode.toPoints[i].y);
    }

    // draw lines
    for (let i = 0; i < _treeNode.fromPoints.length; i++) {
        strokeWeight(random(0.6, 1.6));
        stroke(0, 0, 6);
        line(_treeNode.fromPoints[i].x, _treeNode.fromPoints[i].y, _treeNode.toPoints[i].x, _treeNode.toPoints[i].y);
    }
}

function drawLeafNode(_leafNode, _isOutline = false) {

    let lineCount = _leafNode.width * bgLeafStrokeDensity;

    let startX = _leafNode.x - 0.5 * _leafNode.width;
    let endX = _leafNode.x + 0.5 * _leafNode.width;

    let middleY = _leafNode.y + 0.2 * _leafNode.height; // mid line

    let upperHeight = 0.7 * _leafNode.height;
    let lowerHeight = 0.3 * _leafNode.height;

    for (let i = 0; i < lineCount; i++) {
        let t = i / (lineCount - 1);
        let lineX = lerp(startX, endX, t);

        let noiseAddValue = leafShapeNoise.noiseValue(lineX, 0.0, _leafNode.leafZSeed) * 1.5;

        if (t < 0.5) {
            let curveT = easeOutCirc(t * 2);

            let lineYUp = middleY - (noiseAddValue * curveT * upperHeight);
            let lineYDown = middleY + (noiseAddValue * curveT * lowerHeight);

            if (_isOutline)
                drawBGLeafOutLine(lineX, lineYUp, lineX, lineYDown);
            else
                drawBGLeafLine(lineX, lineYUp, lineX, lineYDown);
        }
        else {
            let curveT = 1.0 - easeInCirc((t - 0.5) * 2);

            let lineYUp = middleY - (noiseAddValue * curveT * upperHeight);
            let lineYDown = middleY + (noiseAddValue * curveT * lowerHeight);

            if (_isOutline)
                drawBGLeafOutLine(lineX, lineYUp, lineX, lineYDown);
            else
                drawBGLeafLine(lineX, lineYUp, lineX, lineYDown);
        }
    }
}

function drawBGLeafOutLine(_x1, _y1, _x2, _y2) {
    let dotCount = dist(_x1, _y1, _x2, _y2) * bgLeafDotDensity;

    for (let i = 0; i < dotCount; i++) {
        let t = i / (dotCount - 1);
        let dotX = lerp(_x1, _x2, t);
        let dotY = lerp(_y1, _y2, t);

        let xOffset = bgLeafOffsetNoise.noiseValue(dotX, dotY) * 60.0;
        let dotSize = bgLeafSizeNoise.noiseValue(dotX, dotY) * 3.0;

        dotX += xOffset;
        strokeWeight(12);
        circle(dotX, dotY, dotSize);
    }
}

function drawBGLeafLine(_x1, _y1, _x2, _y2) {
    let dotCount = dist(_x1, _y1, _x2, _y2) * bgLeafDotDensity;

    for (let i = 0; i < dotCount; i++) {
        let t = i / (dotCount - 1);
        let dotX = lerp(_x1, _x2, t);
        let dotY = lerp(_y1, _y2, t);

        let xOffset = bgLeafOffsetNoise.noiseValue(dotX, dotY) * 60.0;
        let dotSize = bgLeafSizeNoise.noiseValue(dotX, dotY) * 3.0;

        let nowColor = NYLerpColor(leafLineUpColor, leafLineBotColor, t);

        dotX += xOffset;
        strokeWeight(dotSize);
        stroke(nowColor.h, nowColor.s, nowColor.b, nowColor.a);
        point(dotX, dotY);
    }
}

function drawBGLine(_x1, _y1, _x2, _y2) {
    let dotCount = dist(_x1, _y1, _x2, _y2) * 0.9;

    for (let i = 0; i < dotCount; i++) {
        let t = i / (dotCount - 1);
        let dotX = lerp(_x1, _x2, t);
        let dotY = lerp(_y1, _y2, t);

        let xOffset = bgLeafOffsetNoise.noiseValue(dotX, dotY) * 30.0;
        let dotSize = bgLeafSizeNoise.noiseValue(dotX, dotY) * 3.0;

        dotX += xOffset;
        
        stroke('white');
        strokeWeight(dotSize);
        point(dotX, dotY);
    }
}