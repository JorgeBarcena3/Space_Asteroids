powerUpActive = new Array();
powerUpInactive = new Array();
powerUps = new Array();

class PowerUp {

    constructor(_type, _amount, _position) {

        switch (_type) {
            case 1: //Vida
                this.img = PowerUp_0;
                this.type = _type;
                this.amount = _amount;
                break;
            case 2: //Disparo mas rapido
                this.img = PowerUp_1;
                this.type = _type;
                this.amount = _amount;
                break;
            default: //Mas velocidad
                this.img = PowerUp_0;
                this.type = _type;
                this.amount = _amount;
                break;
        }

        this.position = _position;

    }

    Start = function () {

        powerUpActive.push(this);

    }

    Update = function (deltaTime) {


    }

    Draw = function (ctx) {

        ctx.save();
        ctx.translate(this.position.x, this.position.y);      
        ctx.restore();

    }


}