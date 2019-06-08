var EnemyActive = new Array();
var EnemyInactive = new Array();
var Enemigos = new Array();

//Spawning Enemies
var timer = 0;
var totalTimeOfPlay = 0;

class Enemy {

    constructor(initialPosition, initialRotation, _velocity, _rotVelocity, _player, _damage) {

        //Get a random image
        let randomEnemy = Math.floor(Math.random() * (4));
        switch (randomEnemy) {
            case 0:
                this.type = 1;
                this.damage = _damage * 0.5;
                this.img = EnemyIMG_0;
                this.velocity = _velocity * 1.5;
                break;
            case 1:
                this.type = 2;
                this.damage = _damage;
                this.img = EnemyIMG_1;
                this.velocity = _velocity;
                break;
            case 2:
                this.type = 3;
                this.damage = _damage * 1.5;
                this.img = EnemyIMG_2;
                this.velocity = _velocity / 2;
                break;
            default:
                this.type = 1;
                this.damage = _damage * 0.5;
                this.img = EnemyIMG_0;
                this.velocity = _velocity * 1.5;
                break;
        }

        this.position = new vec2(initialPosition.x, initialPosition.y);
        this.rotation = 0;
        this.initialRotation = initialRotation;
        this.rotVelocity = _rotVelocity;
        this.imgHalfWidth = this.img.width / 2;
        this.imgHalfHeight = this.img.height / 2;
        this.radius = 0;
        this.radius2 = 0;
        this.player = _player;
        this.activo = true;

    }

    Start = function () {
        this.rotation = this.initialRotation;
        this.radius = 30;
        this.radius2 = this.radius * this.radius;
        EnemyActive.push(this);


    }

    Update = function (deltaTime) {

        if (this.activo) {
            // Movimiento
            var movement = {
                x: Math.cos(this.rotation) * this.velocity,
                y: Math.sin(this.rotation) * this.velocity
            };

            let direction = new vec2(0, 0);
            direction = this.player.position.Subtract(this.position);
            direction.normalize();

            this.position.x += direction.x * deltaTime * this.velocity;
            this.position.y += direction.y * deltaTime * this.velocity;

            this.rotation = Math.atan2(player.position.y - this.position.y, player.position.x - this.position.x) + 90;

            //Check collision with the player
            if (
                CheckCircleCollision(
                    this.position.x, this.position.y, this.radius,
                    this.player.position.x, this.player.position.y, this.player.animador.frameWidth / 2
                )
            ) {
                this.removeEnemy();
                this.player.life -= myLevel.enemigosDamageBase
            }

        }
    }

    Draw = function (ctx) {

        if (this.activo) {
            ctx.save();

            ctx.translate(this.position.x, this.position.y);
            ctx.rotate(this.rotation);

            ctx.save();
            ctx.scale(0.5, 0.5);
            ctx.drawImage(this.img, -this.imgHalfWidth, -this.imgHalfHeight);
            ctx.restore();

            ctx.fill();

            ctx.restore();
        }
    }

    removeEnemy = function () {

        this.activo = false;
        var indexActive = EnemyActive.indexOf(this);
        EnemyActive.splice(indexActive, 1);
        EnemyInactive.push(this);
    }
}
