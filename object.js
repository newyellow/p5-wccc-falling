
class NYColor {
    constructor(_h, _s, _b, _a = 1.0) {
        this.h = _h;
        this.s = _s;
        this.b = _b;
        this.a = _a;
    }

    copy() {
        return new NYColor(this.h, this.s, this.b, this.a);
    }

    slightRandomize(_hDiff = 10, _sDiff = 12, _bDiff = 12, _aDiff = 0.0) {
        this.h += random(-0.5 * _hDiff, 0.5 * _hDiff);
        this.s += random(-0.5 * _sDiff, 0.5 * _sDiff);
        this.b += random(-0.5 * _bDiff, 0.5 * _bDiff);
        this.a += random(-0.5 * _aDiff, 0.5 * _aDiff);

        this.h = processHue(this.h);
    }

    color() {
        return color(this.h, this.s, this.b, this.a);
    }

    static newRandomColor(_mainHue) {
        let h = processHue(_mainHue + random(-60, 60));
        let s = random(40, 80);
        let b = random(60, 100);

        return new NYColor(h, s, b);
    }
}

class TreeNode {
    constructor(_fromPoints, _toPoints, _branchLevel) {
        this.fromPoints = _fromPoints;
        this.toPoints = _toPoints;
        this.branchLevel = _branchLevel;
    }
}

class LeafNode {
    constructor(_x, _y, _width, _height) {
        this.x = _x;
        this.y = _y;
        this.width = _width;
        this.height = _height;
        this.leafZSeed = random(-10000000, 10000000);
    }
}

class NoiseSet {
    constructor(_xScale = 0.01, _yScale = 0.01, _zScale = 0.01) {
        this.noiseXStart = random(-1000000, 1000000);
        this.noiseYStart = random(-1000000, 1000000);
        this.noiseZStart = random(-10000, 10000);
        this.noiseXScale = _xScale;
        this.noiseYScale = _yScale;
        this.noiseZScale = _zScale;
    }

    noiseValue(_x, _y = 1.0, _z = 1.0) {
        let noiseX = this.noiseXStart + _x * this.noiseXScale;
        let noiseY = this.noiseYStart + _y * this.noiseYScale;
        let noiseZ = this.noiseZStart + _z * this.noiseZScale;

        return noise(noiseX, noiseY, noiseZ);
    }
}

class ColorSet {
    constructor() {
        this.treeHueA = [0, 60];
        this.treeSatA = [40, 60];
        this.treeBriA = [60, 100];

        this.treeHueB = [0, 60];
        this.treeSatB = [40, 60];
        this.treeBriB = [60, 100];

        this.landHueUp = [0, 60];
        this.landSatUp = [40, 60];
        this.landBriUp = [60, 100];

        this.landHueBot = [0, 60];
        this.landSatBot = [40, 60];
        this.landBriBot = [60, 100];

        this.skyHueA = [0, 60];
        this.skyHueB = [0, 60];
        this.skyHueC = [0, 60];
        this.skyHueC = [0, 60];
        this.skySat = [40, 60];
        this.skyBri = [60, 100];
    }

    getRandomTreeColor(_index = 0) {

        if (_index == 0) {
            let h = processHue(random(this.treeHueA[0], this.treeHueA[1]));
            let s = random(this.treeSatA[0], this.treeSatA[1]);
            let b = random(this.treeBriA[0], this.treeBriA[1]);

            return new NYColor(h, s, b);
        }
        else {
            let h = processHue(random(this.treeHueB[0], this.treeHueB[1]));
            let s = random(this.treeSatB[0], this.treeSatB[1]);
            let b = random(this.treeBriB[0], this.treeBriB[1]);

            return new NYColor(h, s, b);
        }
    }

    getRandomLandColor(_index) {
        if (_index == 0) {
            let h = processHue(random(this.landHueUp[0], this.landHueUp[1]));
            let s = random(this.landSatUp[0], this.landSatUp[1]);
            let b = random(this.landBriUp[0], this.landBriUp[1]);
            return new NYColor(h, s, b);
        }
        else {
            let h = processHue(random(this.landHueBot[0], this.landHueBot[1]));
            let s = random(this.landSatBot[0], this.landSatBot[1]);
            let b = random(this.landBriBot[0], this.landBriBot[1]);
            return new NYColor(h, s, b);
        }
    }

    getSkyColor(_skyIndex = 0) {

        let h = processHue(random(this.skyHueA[0], this.skyHueA[1]));

        if (_skyIndex == 1)
            h = processHue(random(this.skyHueB[0], this.skyHueB[1]));
        else if (_skyIndex == 2)
            h = processHue(random(this.skyHueC[0], this.skyHueC[1]));
        else if (_skyIndex == 3)
            h = processHue(random(this.skyHueD[0], this.skyHueD[1]));

        let s = random(this.skySat[0], this.skySat[1]);
        let b = random(this.skyBri[0], this.skyBri[1]);

        return new NYColor(h, s, b);
    }
}