
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
        let h = processHue(_mainHue + random(-80, 80));
        let s = random(40, 100);
        let b = random(60, 100);

        return new NYColor(h, s, b);
    }
}

class NoiseSet {
    constructor(_xScale = 0.01, _yScale = 0.01, _zScale = 0.0) {
        this.noiseXStart = random(-1000000, 1000000);
        this.noiseYStart = random(-1000000, 1000000);
        this.noiseZStart = random(-10000, 10000);
        this.noiseXScale = 0.01;
        this.noiseYScale = 0.01;
        this.noiseZScale = 0.01;
    }

    noiseValue(_x, _y, _z = 1.0) {
        let noiseX = this.noiseXStart + _x * this.noiseXScale;
        let noiseY = this.noiseYStart + _y * this.noiseYScale;
        let noiseZ = this.noiseZStart + _z * this.noiseZScale;

        return noise(noiseX, noiseY, noiseZ);
    }
}