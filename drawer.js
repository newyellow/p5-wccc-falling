let strokeDensity = 0.4;

function drawTree(_x, _y, _startWidth, _tall, _startAngle = 0) {
    let layerHeight = 20;
    let layers = _tall / layerHeight;

    let nowX = _x;
    let nowY = _y;
    let nowAngle = _startAngle;
    let nowWidth = _startWidth;
    let endWidth = 0;
    let remainHeight = _tall;

    // branch things
    let branchCount = int(random(1, 5));
    let branches = [];
    for(let i=0; i< branchCount; i++){
        branches.push({
            'posRatio': random(0.3, 0.9),
            'angle': random(30, 60)
        });
    }
    branches.sort((a, b) => a.posRatio - b.posRatio);
    let isLeftBranch = random() < 0.5;
    let nowBranchIndex = 0;

    for (let i = 0; i < layers; i++) {

        let t = i / (layers - 1);

        if(nowBranchIndex < branches.length)
        {
            if(t > branches[nowBranchIndex].posRatio){
                let branchAngle = branches[nowBranchIndex].angle;

                if(isLeftBranch)
                    branchAngle *= -1;

                isLeftBranch = !isLeftBranch;

                drawTree(nowX, nowY, nowWidth * random(0.6, 0.9), remainHeight * random(0.6, 1.4), branchAngle);
                nowBranchIndex++;
            }
        }

        let layerWidth = lerp(_startWidth, endWidth, easeInSine(t));

        let nowHeight = layerHeight * random(0.6, 1.8);
        remainHeight -= nowHeight;

        let toAngle = nowAngle + random(-3, 3);
        drawLayer(nowX, nowY, nowHeight, nowWidth, layerWidth, nowAngle, toAngle);

        nowX += nowHeight * sin(radians(toAngle));
        nowY += nowHeight * -cos(radians(toAngle));
        nowAngle = toAngle;
        nowWidth = layerWidth;
    }
}

function drawLayer(_x, _y, _height, _fromWidth, _toWidth, _fromAngle, _toAngle) {
    let lineCount = int(max(_fromWidth * strokeDensity, 3));

    let fromPoints = [];
    let nowBaseX = _x;
    let nowBaseY = _y;
    for (let i = 0; i < lineCount; i++) {
        let t = i / (lineCount - 1);
        let xRatio = lerp(-0.5, 0.5, t);

        let pointX = nowBaseX + xRatio * _fromWidth * sin(radians(_fromAngle + 90));
        let pointY = nowBaseY + xRatio * _fromWidth * -cos(radians(_fromAngle + 90));
        fromPoints.push({ 'x': pointX, 'y': pointY });
    }

    let toPoints = [];
    nowBaseX += _height * sin(radians(_fromAngle));
    nowBaseY += _height * -cos(radians(_fromAngle));
    for (let i = 0; i < lineCount; i++) {
        let t = i / (lineCount - 1);
        let xRatio = lerp(-0.5, 0.5, t);

        let pointX = nowBaseX + xRatio * _toWidth * sin(radians(_toAngle + 90));
        let pointY = nowBaseY + xRatio * _toWidth * -cos(radians(_toAngle + 90));
        toPoints.push({ 'x': pointX, 'y': pointY });
    }

    // draw white bg
    for(let i=0; i<fromPoints.length; i++){
        strokeWeight(10);
        stroke(0, 0, 100);
        line(fromPoints[i].x, fromPoints[i].y, toPoints[i].x, toPoints[i].y);
    }
    // draw lines
    for (let i = 0; i < fromPoints.length; i++) {
        strokeWeight(random(0.6, 1.6));
        stroke(0, 0, 6);
        line(fromPoints[i].x, fromPoints[i].y, toPoints[i].x, toPoints[i].y);
    }
} 