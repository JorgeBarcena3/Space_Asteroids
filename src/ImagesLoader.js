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

    //Imagenes del powerUp
    PowerUp_0 = new Image();
    PowerUp_0.src = "./assets/pwup_1.png";
    PowerUp_1 = new Image();
    PowerUp_1.src = "./assets/pwup_2.png";


    //Imagen de la bala
    bulletIMG = new Image();
    bulletIMG.src = "./assets/Player_Bullet.png";
    bulletIMG.onload = function () {
        Start();
        Loop();
    }

}