var bulletsActive = new Array();
var bulletsInactive = new Array();
var bullets = new Array();

class Bullet {

    constructor(_img, initialPosition, _direction, _velocity) {
        this.img = _img;
        this.position = new vec2(initialPosition.x, initialPosition.y);
        this.velocity = _velocity;
        this.direction = _direction;
        this.active = true;
        this.radius = 5;
        bulletsActive.push(this);
    }

    Start = function () {
    }

    Update = function (deltaTime) {

        this.position.x += this.velocity * deltaTime * this.direction.x;// * Math.cos(this.rotation);
        this.position.y += this.velocity * deltaTime * this.direction.y;// * Math.sin(this.rotation);

        // Check world limits
        if (this.position.x >= canvas.width || this.position.x <= 0.0 || this.position.y <= 0.0 || this.position.y >= canvas.height) {
            this.active = false;
            bulletsInactive.push(this);
            bulletsActive.splice(this);

        }


    }

    removeBullet = function(){
        
        this.active = false;
        var indexActive = bulletsActive.indexOf(this);
        bulletsActive.splice(indexActive, 1);
        bulletsInactive.push(this);
    }

    Draw = function (ctx) {

        ctx.save();

        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation + PI2);
        ctx.drawImage(this.img, -this.img.width, -this.img.height);

        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 0, 0.2)';
        ctx.arc(0, -15, this.radius, 0, 2 * Math.PI);
        ctx.fill();

        ctx.restore();


    }
}