class vec2 {

    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }

    normalize() {
        let long = this.longitud();
        this.x = this.x / long;
        this.y = this.y / long;
    }

    longitud() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    Subtract(_rhs) {
        let x = this.x - _rhs.x;
        let y = this.y - _rhs.y;
        return new vec2(x, y);
    }

    Mult(_rhs) {

        return new vec2(
            this.x * _rhs,
            this.y * _rhs
        );
    }

}

function log(x) {
    return 1/Math.log(x + 1);
}