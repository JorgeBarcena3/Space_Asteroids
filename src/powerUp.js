powerUpActive = new Array();
powerUpInactive = new Array();
powerUps = new Array();
powerUpTimeSpawner = 0;

class PowerUp {

    constructor(_type, _time, _position, _player, _value) {

        switch (_type) {
            case 1: //Vida
                this.img = PowerUp_1;
                this.type = _type;
                this.time = _time;
                break;
            case 2: //Disparo mas rapido
                this.img = PowerUp_2;
                this.type = _type;
                this.time = _time;
                break;
            default: //Mas velocidad
                this.img = PowerUp_0;
                this.type = _type;
                this.time = _time;
                break;
        }

        this.amount = _value;
        this.position = _position;
        this.player = _player;
        this.active = true;

    }

    Start = function () {
        powerUpActive.push(this);
    }

    Update = function (deltaTime) {

        if (this.active) {
            if (
                this.player.powerup == null
                &&
                CheckCircleCollision(
                    this.position.x, this.position.y, 15,
                    this.player.position.x, this.player.position.y, this.player.radius
                )
            ) {
                this.player.powerup = this;
                this.active = false;
                powerUpInactive.push(this);
                let index = powerUpActive.indexOf(this);
                powerUpActive = powerUpActive.slice(index, 1);

            }
        }
    }

    Draw = function (ctx) {

        if (this.active) {
            ctx.save();

            ctx.translate(this.position.x, this.position.y);
            ctx.rotate(this.rotation);

            ctx.save();
            ctx.scale(1,1);
            ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
            ctx.restore();

            // ctx.beginPath();
            // ctx.fillStyle = 'rgba(0, 255, 255, 0.2)';
            // ctx.arc(0, 0, 15, 0, 2 * Math.PI);
            // ctx.fill();

            ctx.restore();
        }

    }
}