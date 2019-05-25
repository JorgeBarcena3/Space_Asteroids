

function cargarImagenes() {

    //Imagen de los enemigos
    EnemyIMG_0 = new Image();
    EnemyIMG_0.src = "./assets/Enemy_1_Neon.png";
    EnemyIMG_1 = new Image();
    EnemyIMG_1.src = "./assets/Enemy_2_Neon.png";
    EnemyIMG_2 = new Image();
    EnemyIMG_2.src = "./assets/Enemy_3_Neon.png";


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