

function cargarImagenes() {

    //Imagen de los enemigos
    EnemyIMG = new Image();
    EnemyIMG.src = "./assets/Enemy_1_Neon.png";


    //Imagen del Enemigo
    PlayerIMG = new Image();
    PlayerIMG.src = "./assets/ship.png";


    //Imagen de la bala
    bulletIMG = new Image();
    bulletIMG.src = "./assets/Player_Bullet.png";
    bulletIMG.onload = function () {
        Start();
        Loop();
    }

}