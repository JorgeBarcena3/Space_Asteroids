//Classe vector2 para realizar algunas operaciones
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

//Devuelve la inversa del logaritmo de x
function logInv(x) {
    return 1 / Math.log(x + 1);
}
//Devuelve el logaritmo de x
function log(x) {
    return Math.log(x + 1);
}

//Obtiene un punto fuera de un rectangulo para el respawn
function pointOutsideRect(x1, x2, y1, y2, _error) {

    let x = (Math.floor(Math.random() * (2 - 0)) + 0) == 0 ?
        (Math.floor(Math.random() * (x1) - (x1 - _error)) + (x1 - _error)) : (Math.floor(Math.random() * (x2 + _error) - (x2)) + (x2));
    let y = (Math.floor(Math.random() * (2 - 0)) + 0) == 0 ?
        (Math.floor(Math.random() * (y1) - (y1 - _error)) + (y1 - _error)) : (Math.floor(Math.random() * (y2 + _error) - (y2)) + (y2));

    return new vec2(x, y);


}