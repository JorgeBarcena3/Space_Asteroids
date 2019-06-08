function cargarImagenes() {

    //Imagen de los enemigos y powerUps
    EnemyIMG_0 = new Image();
    EnemyIMG_0.src = "./assets/Enemy_1_Neon.png";
    EnemyIMG_0.onload = function () {
        EnemyIMG_1 = new Image();
        EnemyIMG_1.src = "./assets/Enemy_2_Neon.png";
        EnemyIMG_1.onload = function () {
            EnemyIMG_2 = new Image();
            EnemyIMG_2.src = "./assets/Enemy_3_Neon.png";
            EnemyIMG_2.onload = function () {
                PlayerIMG = new Image();
                PlayerIMG.src = "./assets/ship.png";
                PlayerIMG.onload = function () {
                    PowerUp_0 = new Image();
                    PowerUp_0.src = "./assets/pwup_1.png";
                    PowerUp_0.onload = function () {
                        PowerUp_1 = new Image()
                        PowerUp_1.src = "./assets/pwup_2.png";
                        PowerUp_1.onload = function () {
                            PowerUp_2 = new Image()
                            PowerUp_2.src = "./assets/pwup_3.png";
                            PowerUp_2.onload = function () {
                                bulletIMG = new Image();
                                bulletIMG.src = "./assets/Player_Bullet.png";
                                bulletIMG.onload = function () {
                                    boostPlayer = new Image();
                                    boostPlayer.src = "./assets/Boost.png";
                                    boostPlayer.onload = function () {
                                        loadLevel("Default");

                                    }
                                }
                            }
                        }

                    }
                }
            }
        }



        //Imagen de la bala


    }
}