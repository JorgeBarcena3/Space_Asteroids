class Player {

    constructor(_img, initialPosition, initialRotation, _velocity, _rotVelocity) {
        this.img = _img;
        this.position = new vec2(initialPosition.x, initialPosition.y);
        this.rotation = 0;
        this.initialRotation = initialRotation;
        this.velocity = _velocity;
        this.rotVelocity = _rotVelocity;
        this.imgHalfWidth = _img.width / 2;
        this.imgHalfHeight = _img.height / 2;
        this.radius = 0;
        this.radius2 = 0;
        this.bullets = new Array();
        this.frecuenciaDeDisparo = 0.1;
        this.timer = this.frecuenciaDeDisparo;
    }

    Start = function () {
        this.rotation = this.initialRotation;
        this.radius = Math.sqrt((this.imgHalfWidth * this.imgHalfWidth) + (this.imgHalfHeight * this.imgHalfHeight));
        this.radius2 = this.radius * this.radius;

    }

    Update = function (deltaTime) {

        // Movimiento
        var movement = new vec2(0, 0);

        if (input.isKeyPressed(KEY_RIGHT) || input.isKeyPressed(KEY_D)) {
            movement.x += this.velocity;
            movement.y += 0;
        }
        else if (input.isKeyPressed(KEY_LEFT) || input.isKeyPressed(KEY_A)) {
            movement.x += this.velocity * -1;
            movement.y += 0;
        }
        if (input.isKeyPressed(KEY_UP) || input.isKeyPressed(KEY_W)) {
            movement.x += 0;
            movement.y += this.velocity * -1;
        }
        else if (input.isKeyPressed(KEY_DOWN) || input.isKeyPressed(KEY_S)) {
            movement.x += 0;
            movement.y += this.velocity;
        }

        this.position.x += movement.x * deltaTime;
        this.position.y += movement.y * deltaTime;


        this.rotation = Math.atan2(input.mouse.y - this.position.y, input.mouse.x - this.position.x) + PIH;



        //Check for shoot
        if (input.isKeyPressed(KEY_SPACE) && this.timer >= this.frecuenciaDeDisparo) {
            let directionForShoot = new vec2(input.mouse.x - this.position.x, input.mouse.y - this.position.y);
            directionForShoot.normalize();
            let positionForSpawn = new vec2(this.position.x, this.position.y);
            if (bulletsInactive.length > 0) {

                bulletsInactive[0].position = positionForSpawn;
                bulletsInactive[0].direction = directionForShoot;
                bulletsInactive[0].active = true;
                bulletsActive.push(bulletsInactive[0]);
                bulletsInactive.shift();

             } 
             else {
                let aux = new Bullet(
                    bulletIMG,
                    positionForSpawn,
                    directionForShoot,
                    1000
                );
                aux.Start();
                this.bullets.push(aux);
            }
            this.timer = 0;
        }
        this.bullets.forEach(m => { if (m.active) m.Update(deltaTime); });

        this.timer += deltaTime;


        // Check world limits
        if (this.position.x >= canvas.width) {
            this.position.x = canvas.width - 1;
        }
        else if (this.position.x <= 0.0) {
            this.position.x = 1;
        }

        if (this.position.y >= canvas.height) {
            this.position.y = canvas.height - 1;
        }
        else if (this.position.y <= 0.0) {
            this.position.y = 1;
        }



    }

    Draw = function (ctx) {

        ctx.save();

        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);
        //ctx.scale(2, 2);

        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.strokeStyle = 'red';
        // ctx.fillRect(-this.imgHalfWidth, -this.imgHalfHeight, this.img.width, this.img.height);
        ctx.strokeRect(-this.imgHalfWidth / 2, -this.imgHalfHeight / 2, this.img.width / 2, this.img.height / 2);

        ctx.save();
        ctx.scale(0.5, 0.5);
        ctx.drawImage(this.img, -this.imgHalfWidth, -this.imgHalfHeight);
        ctx.restore();

        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        ctx.fill();

        ctx.restore();
    }
}
