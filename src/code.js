const PI2 = Math.PI * 2;
const PIH = Math.PI * 0.5;

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
    acumDelta = 0,
    actualCollisions = 0;

//Si el juego esta parado
var gamePaused = false;

//Jugador
var player = null;
var bullets = new Array();

//Enemigos
var Enemigos;

//Spawning Enemies
var timer = 0;
var totalTimeOfPlay = 0;


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

if (canvas) {
    ctx = canvas.getContext("2d");
    if (ctx) {
        SetupKeyboardEvents();
        SetupMouseEvents();

        cargarImagenes();

    }
}

function Start() {

    //Inicializamos el player
    this.player = new Player(
        PlayerIMG,
        { x: Math.random() * canvas.width, y: Math.random() * canvas.height },
        Math.random() * Math.PI,  // initialRotation
        100, // velocity
        0.5 * Math.random(), // rotVelocity
    );

    //Inicializamos los enemigos
    Enemigos = new Array();
    for (var i = 0; i < 5; i++) {

        let enemy = new Enemy(
            EnemyIMG,
            { x: Math.random() * canvas.width, y: Math.random() * canvas.height },
            Math.random() * Math.PI,  // initialRotation
            100 + (Math.random() * 20), // velocity
            0.5 * Math.random(), // rotVelocity
            this.player
        );
        console.log("--Creando enemigos--");
        enemy.Start();
        Enemigos.push(enemy)
    }

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

    totalTimeOfPlay += deltaTime / 1000;

    Update(deltaTime / 1000);
    Draw();
}

function Update(deltaTime) {



    //Enemigos
    Enemigos.forEach(m => m.Update(deltaTime));
    //Player
    this.player.Update(deltaTime);

    this.spawnEnemies(deltaTime);

    //Check collision with bullets and enemies
    for (let i = 0; i < bulletsActive.length; i++) {

        for (let j = 0; j < EnemyActive.length; j++) {
            if (
                CheckCircleCollision(
                    bulletsActive[i].position.x, bulletsActive[i].position.y, 1,
                    EnemyActive[j].position.x, EnemyActive[j].position.y, EnemyActive[j].img.width / 2
                )
            ) {
                bulletsActive[i].removeBullet();
                EnemyActive[j].removeEnemy();

                j = EnemyActive.length;
                i = bulletsActive.length;
            }
        }
    }

}

function spawnEnemies(deltaTime) {

    timer += deltaTime;

    let timeOfSpawn = log(totalTimeOfPlay);
    console.log(timeOfSpawn);
    //Cada 5 segundos spawneamos un enemigo
    if (timer > timeOfSpawn) {

        let positionOfSpawn = new vec2(
            (Math.random() * (((canvas.width + 100)) - 0) + 0),
            (Math.random() * (((canvas.height + 100)) - 0) + 0),
        );


        if (EnemyInactive.length > 0) {


            EnemyInactive[0].position = positionOfSpawn;
            EnemyInactive[0].rotation = Math.random() * Math.PI;
            EnemyInactive[0].velocity = 100 + (Math.random() * 20);
            EnemyInactive[0].rotVelocity = 0.5 * Math.random();
            EnemyInactive[0].activo = true;
            EnemyActive.push(EnemyInactive[0]);
            EnemyInactive.shift();

        } else {

            let enemy = new Enemy(
                EnemyIMG,
                positionOfSpawn,
                Math.random() * Math.PI,  // initialRotation
                100 + (Math.random() * 20), // velocity
                0.5 * Math.random(), // rotVelocity
                this.player
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

    for (var i = 0; i < this.player.bullets.length; i++) {

        ctx.fillRect(10 + (10 * i), 60, 10, 10);

        ctx.strokeRect(10 + (10 * i), 60, 10, 10);
    }

    //Enemies stuff
    this.Enemigos.forEach(m => m.Draw(ctx));

    //Player stuff
    this.player.bullets.forEach(m => { if (m.active) m.Draw(ctx); });
    this.player.Draw(ctx);


    // FPS
    ctx.fillStyle = "white";
    ctx.font = "12px Comic Sans MS";
    ctx.fillText('FPS: ' + FPS, 10, 14);
    ctx.fillText('Total Enemigos: ' + Enemigos.length, 10, 56);
    ctx.fillText('Total collisions: ' + actualCollisions, 10, 76);
}

// rotate the point given (pointCoord) the angle towards the origCoord
function rotate(origCoord, pointCoord, angle) {
    var x = pointCoord.x,
        y = pointCoord.y,
        cx = origCoord.x,
        cy = origCoord.y;
    var rad = angle;//(Math.PI / 180) * angle;
    var cos = Math.cos(rad);
    var sin = Math.sin(rad);
    return {
        x: (cos * (x - cx)) + (sin * (y - cy)) + cx,
        y: (cos * (y - cy)) - (sin * (x - cx)) + cy
    };
}
