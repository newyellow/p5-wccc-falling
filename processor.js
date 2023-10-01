function getTreeData(_x, _y, _startWidth, _tall, _startAngle = 0, _branchLevel = 0) {
    let layerHeight = 10;
    let layers = _tall / layerHeight;

    let nowX = _x;
    let nowY = _y;
    let nowAngle = _startAngle;
    let nowWidth = _startWidth;
    let endWidth = 0;
    let remainHeight = _tall;

    let treeAngleNoise = new NoiseSet(0.02, 0.02);

    // branch things
    let branchCount = int(random(1, 6));

    if (_branchLevel > 0)
        branchCount = 0;

    let branches = [];
    for (let i = 0; i < branchCount; i++) {
        let t = i / branchCount;
        let posRatio = 0.0;

        if (_branchLevel == 0) {
            posRatio = 0.4 + (0.5 * t);
            posRatio += random(-0.06, 0.06);
        }
        else if (_branchLevel > 0) {
            posRatio = 0.1 + (0.8 * t);
            posRatio += random(-0.06, 0.06);
        }

        branches.push({
            'posRatio': posRatio,
            'angle': random(30, 80)
        });
    }

    branches.sort((a, b) => a.posRatio - b.posRatio);
    let isLeftBranch = random() < 0.5;
    let nowBranchIndex = 0;

    let treeNodes = [];
    let backLeaves = [];
    let frontLeaves = [];
    for (let i = 0; i < layers; i++) {

        let t = i / (layers - 1);

        // random branches
        if (nowBranchIndex < branches.length) {
            if (t > branches[nowBranchIndex].posRatio) {
                let branchAngle = branches[nowBranchIndex].angle;

                if (isLeftBranch)
                    branchAngle *= -1;

                isLeftBranch = !isLeftBranch;

                let data = getTreeData(nowX, nowY, nowWidth * random(0.5, 0.9), remainHeight * random(0.6, 1.2), branchAngle, _branchLevel + 1);

                for (let j = 0; j < data.treeNodes.length; j++)
                    treeNodes.push(data.treeNodes[j]);


                for (let j = 0; j < data.frontLeaves.length; j++)
                    frontLeaves.push(data.frontLeaves[j]);


                for (let j = 0; j < data.backLeaves.length; j++)
                    backLeaves.push(data.backLeaves[j]);

                nowBranchIndex++;
            }
        }

        // random leaves
        if (t > 0.6 || _branchLevel > 0) {

            // back leaves
            if (random() < 0.6 || t > 0.95) {
                let leafX = nowX + random(-1.0, 1.0) * 80;
                let leafY = nowY + random(-1.0, 1.0) * 80;
                let leafWidth = random() * 300 + 30;
                let leafHeight = random() * 160 + 30;

                let newLeaf = new LeafNode(leafX, leafY, leafWidth, leafHeight);
                backLeaves.push(newLeaf);
            }

            // front leaves
            if (random() < 0.12 ) {
                let leafX = nowX + random(-1.0, 1.0) * 100;
                let leafY = nowY + random(-1.0, 1.0) * 100;
                let leafWidth = random() * 240 + 30;
                let leafHeight = random() * 240 + 30;

                let newLeaf = new LeafNode(leafX, leafY, leafWidth, leafHeight);
                frontLeaves.push(newLeaf);
            }
        }

        let layerWidth = lerp(_startWidth, endWidth, easeInQuad(t));

        let nowHeight = layerHeight * random(0.6, 1.8);
        remainHeight -= nowHeight;

        let angleNoise = treeAngleNoise.noiseValue(nowX, nowY);
        let toAngle = nowAngle + lerp(-6, 6, angleNoise);
        let nodePointData = getLayerPoints(nowX, nowY, nowHeight, nowWidth, layerWidth, nowAngle, toAngle);

        treeNodes.push(new TreeNode(nodePointData.fromPoints, nodePointData.toPoints, _branchLevel));
        nowX += nowHeight * sin(radians(toAngle));
        nowY += nowHeight * -cos(radians(toAngle));
        nowAngle = toAngle;
        nowWidth = layerWidth;
    }

    return {
        'treeNodes': treeNodes,
        'backLeaves': backLeaves,
        'frontLeaves': frontLeaves
    }
}

function getLayerPoints(_x, _y, _height, _fromWidth, _toWidth, _fromAngle, _toAngle) {
    let lineCount = int(max(_fromWidth * treeStrokeDensity, 3));

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

    return {
        'fromPoints': fromPoints,
        'toPoints': toPoints
    };
}