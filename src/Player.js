var player = null;

//Jugador
class Player {

    constructor(_img, _img2, initialPosition, initialRotation, _velocity, _life, _frecuenciaDeDisparo) {
        this.animador = new animation(_img);
        this.animadorBoost = new animation(_img2, 8);
        this.currentAnimation = this.animador;
        this.position = new vec2(initialPosition.x, initialPosition.y);
        this.rotation = 0;
        this.initialRotation = initialRotation;
        this.velocity = _velocity;
        this.imgHalfWidth = _img.width / 2;
        this.imgHalfHeight = _img.height / 2;
        this.radius = 0;
        this.radius2 = 0;
        this.bullets = new Array();
        this.life = this.maxLife = _life;
        this.score = 0;
        this.frecuenciaDeDisparo = _frecuenciaDeDisparo;
        this.timer = this.frecuenciaDeDisparo;
        //PowerUps
        this.powerup = null;
        this.powerupApplied = false;
        this.timerPowerUp = 0;
    }

    Start = function () {
        this.rotation = this.initialRotation;
        this.radius = Math.sqrt((this.imgHalfWidth * this.imgHalfWidth) + (this.imgHalfHeight * this.imgHalfHeight));
        this.radius2 = this.radius * this.radius;

    }

    Update = function (deltaTime) {

        if (this.powerup != null)
            this.applyPowerUp(deltaTime);

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
                    myLevel.bulletSpeed
                );
                aux.Start();
                this.bullets.push(aux);
            }
            this.timer = 0;

            shoot.currentTime = 0;
            shoot.play();

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

        //Animador
        this.currentAnimation.Update(deltaTime);


    }

    Draw = function (ctx) {

        ctx.save();

        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);

        this.pintarVidaYPowerups();

        this.currentAnimation.Draw(ctx);

        ctx.fill();

        ctx.restore();
    }

    pintarVidaYPowerups() {

        var porcentajeVida = (this.life * 100) / this.maxLife;
        var stringVida = porcentajeVida.toString() + "%";
        $("#barra_vida").css("width", stringVida);
        var x = $("#score_points");
        x.html(this.score);
    }

    //Aplicamos un pw
    applyPowerUp(deltaTime) {

        if (!this.powerupApplied) {

            switch (this.powerup.type) {
                case 1: //Vida
                    this.life = this.powerup.amount + this.life > this.maxLife ? this.maxLife : this.life + this.powerup.amount;
                    LifePwup.currentTime = 0;
                    LifePwup.play();
                    break;
                case 2: //Disparo mas rapido
                    this.frecuenciaDeDisparo = this.powerup.amount;
                    ShootPwup.currentTime = 0;
                    $(".pwup_3__active").fadeIn();
                    break;
                default: //Mas velocidad
                    this.velocity += this.powerup.amount;
                    SpeedPwup.currentTime = 0;
                    SpeedPwup.play();
                    $(".pwup_1__active").fadeIn();
                    break;
            }

            this.currentAnimation = this.animadorBoost;
            this.powerupApplied = true;

        } else if (this.timerPowerUp < this.powerup.time) {
            this.timerPowerUp += deltaTime;         

        } else {

            switch (this.powerup.type) {
                case 1: //Vida

                    break;
                case 2: //Disparo mas rapido
                    this.frecuenciaDeDisparo = myLevel.frecuenciaDeDisparo;
                    break;
                default: //Mas velocidad
                    this.velocity -= this.powerup.amount;
                    break;
            }
            this.timerPowerUp = 0;
            this.powerup = null;
            this.powerupApplied = false;
            this.currentAnimation = this.animador;
            $(".pwup").fadeOut();
        }
    }
}
