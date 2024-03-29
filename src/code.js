const PI2 = Math.PI * 2;
const PIH = Math.PI * 0.5;

//Estado del juego
var jugando = true;
var finDelJuego = false;

//Canvas y contexto
var canvas;
var ctx;

//Delta time
var deltaTime = 0;
var targetDT = (1 / 60) * 1000;
var targetDTSeconds = (1 / 60);

//Variable de estadisticas
var time = 0,
    FPS = 0,
    frames = 0,
    acumDelta = 0;


window.requestAnimationFrame = (function (evt) {
    return window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, targetDT);
        };
})();

//Obtenemos el canvas
canvas = document.getElementById("my_canvas");

function AcabarElJuego(){
    $("#menu_score_puntuacion").html(this.player.score);
    $("#Menu-score").show();
}
function mostrarMenu() {
    $(".menu").show();

}

function startGame(gamemode) {

    if (gamemode != null)
        this.myLevel = gamemode;

    if (canvas) {
        ctx = canvas.getContext("2d");
        if (ctx) {

            //Mouse and key boar events
            SetupKeyboardEvents();
            SetupMouseEvents();

            //Carga de imagenes
            cargarImagenes();

        }
    }

}


async function loadLevel(_name) {

    var docRef = db.collection("Levels").doc(_name);

    docRef.get().then(function (doc) {
        if (doc.exists) {

            this.myLevel = (doc.data());
            Start();
        }
    }).catch(function (error) {
        Start();
    });
}

function Start() {

    //Inicializamos el player
    this.player = new Player(
        PlayerIMG,
        boostPlayer,
        { x: canvas.width / 2, y: canvas.height / 2 },
        0,  // initialRotation
        this.myLevel.velocidadPlayer, // velocity
        this.myLevel.maxLife, //Maxima vida
        this.myLevel.frecuenciaDeDisparo //Frecuencia de disparo
    );


    //Inicializamos los enemigos
    for (var i = 0; i < this.myLevel.enemigosIniciales; i++) {

        let positionOfSpawn = pointOutsideRect(0, canvas.width, 0, canvas.height, 100);

        let enemy = new Enemy(
            positionOfSpawn, //Initial position
            Math.random() * Math.PI,  // initialRotation
            this.myLevel.enemigosVelocidadBase, // velocity
            0.5 * Math.random(), // rotVelocity
            this.player, //Referencial al player
            this.myLevel.enemigosDamageBase //Daño del enemigo
        );

        enemy.Start();
        Enemigos.push(enemy)
    }
    //   CanvasGamepad.setup();
    Loop();

}

function Loop() {

    requestAnimationFrame(Loop);

    // compute FPS
    var now = Date.now();
    deltaTime = now - time;
    // si el tiempo es mayor a 1 seg: se descarta
    if (deltaTime > 1000)
        deltaTime = 0;
    time = now;

    frames++;
    acumDelta += deltaTime;

    if (acumDelta > 1000) {
        FPS = frames;
        frames = 0;
        acumDelta -= 1000;
    }

    if (this.player.life <= 0 && jugando != false) {
        jugando = false;
        finDelJuego = true;
        AcabarElJuego(this.player.score);
       
    } else

        if (input.isKeyPressed(KEY_SCAPE)) {
            jugando = false;
            $("#titulo_nivel").html(this.myLevel.user.nombreDelNivel);
            $("#Autor_nivel").html(this.myLevel.user.autor);
            $("#Menu-pause").show();

        } else
            if (input.isKeyPressed(KEY_0)) {
                jugando = true;
            }
    if (jugando) {
        totalTimeOfPlay += deltaTime / 1000;

        Update(deltaTime / 1000);
        Draw();
    }
}

function restartGame(gamemode) {

    //Reiniciar el juego
    if (gamemode != null)
        this.myLevel = gamemode;
    this.player = null;
    this.EnemyActive = new Array();
    this.EnemyInactive = new Array();
    this.Enemigos = new Array();
    this.powerUps = this.powerUpInactive = this.powerUpActive = new Array();
    this.bulletsActive = new Array();
    this.bulletsInactive = new Array();
    this.bullets = new Array();
    this.totalTimeOfPlay = 0;
    this.Start();
    this.jugando = true;
    this.finDelJuego = true;
}



function Update(deltaTime) {


    //Enemigos
    Enemigos.forEach(m => m.Update(deltaTime));
    this.spawnEnemies(deltaTime);

    //Player
    this.player.Update(deltaTime);

    //PowerUps
    this.powerUps.forEach(m => m.Update(deltaTime));
    this.spawnPowerUps(deltaTime);


    //Check collision with bullets and enemies
    for (let i = 0; i < bulletsActive.length; i++) {

        for (let j = 0; j < EnemyActive.length; j++) {
            if (
                CheckCircleCollision(
                    bulletsActive[i].position.x, bulletsActive[i].position.y, bulletsActive[i].radius,
                    EnemyActive[j].position.x, EnemyActive[j].position.y, EnemyActive[j].radius
                )
            ) {
                bulletsActive[i].removeBullet();
                EnemyActive[j].removeEnemy();
                this.player.score += 10
                j = EnemyActive.length;
                i = bulletsActive.length;
            }
        }
    }

}

function spawnPowerUps(deltaTime) {

    powerUpTimeSpawner += deltaTime;
    let timeOfSpawn = logInv(totalTimeOfPlay) + this.myLevel.spanwOfPwUps;

    if (powerUpTimeSpawner > timeOfSpawn) {
        let typeOfEnemy = Math.floor(Math.random() * 3);

        initialPosition = new vec2(
            Math.random() * (canvas.width),
            Math.random() * (canvas.height)
        );


        switch (typeOfEnemy) {
            case 1:
                aux = new PowerUp(
                    1,
                    this.myLevel.lifePwUp.time,
                    initialPosition,
                    this.player,
                    this.myLevel.lifePwUp.value
                );
                aux.Start();
                powerUps.push(aux);
                break;
            case 2:
                aux = new PowerUp(
                    2,
                    this.myLevel.shootPwUp.time,
                    initialPosition,
                    this.player,
                    this.myLevel.shootPwUp.value
                );
                aux.Start();
                powerUps.push(aux);
                break;

            default:
                aux = new PowerUp(
                    3,
                    this.myLevel.speedPwUp.time,
                    initialPosition,
                    this.player,
                    this.myLevel.speedPwUp.value
                );
                aux.Start();
                powerUps.push(aux);
                break;
        }

        powerUpTimeSpawner = 0;

    }



}

function spawnEnemies(deltaTime) {

    timer += deltaTime;

    let timeOfSpawn = logInv(totalTimeOfPlay) + this.myLevel.enemigosSpawnTime;

    //Cada x segundos spawneamos un enemigo
    if (timer > timeOfSpawn) {

        let positionOfSpawn = pointOutsideRect(0, canvas.width, 0, canvas.height, 100);


        if (EnemyInactive.length > 0) {


            EnemyInactive[0].position = positionOfSpawn;
            EnemyInactive[0].rotation = Math.random() * Math.PI;
            EnemyInactive[0].velocity += this.myLevel.respawnSpeedAument;
            EnemyInactive[0].rotVelocity = 0.5 * Math.random();
            EnemyInactive[0].activo = true;
            EnemyActive.push(EnemyInactive[0]);
            EnemyInactive.shift();

        } else {

            let enemy = new Enemy(
                positionOfSpawn, //Initial position
                Math.random() * Math.PI,  // initialRotation
                this.myLevel.enemigosVelocidadBase, // velocity
                0.5 * Math.random(), // rotVelocity
                this.player, //Referencial al player
                this.myLevel.enemigosDamageBase //Daño del enemigo
            );

            enemy.Start();
            Enemigos.push(enemy)

        }

        timer = 0;

    }


}

function Draw() {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Enemies stuff
    this.Enemigos.forEach(m => m.Draw(ctx));

    //Player stuff
    this.player.bullets.forEach(m => { if (m.active) m.Draw(ctx); });
    this.player.Draw(ctx);

    //PowerUps
    this.powerUps.forEach(m => m.Draw(ctx));

    // FPS
    ctx.fillStyle = "white";
    ctx.font = "12px Comic Sans MS";
   
}

$("#score_Options_btn").click(function () {

   $("#menu-score-autor").val(myLevel.user.nombreDelNivel);
    let pfb = new PlayerFirebase($('#Nombre_score').val(), player.score, myLevel.user.nombreDelNivel);
    saveScore(pfb);
    $("#Menu-score").hide();
    $("#Menu-pause").hide();
    $("#hud").hide();

    $("#Menu").show();
    $(".Comunidad").hide();

});