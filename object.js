
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
    constructor(_fromPoints, _toPoints, _branchLevel)
    {
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