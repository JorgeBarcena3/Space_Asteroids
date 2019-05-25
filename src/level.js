class levelConfig {

    constructor() {
        
        //Enemies config
        this.enemigosIniciales = 5;
        this.enemigosVelocidadBase = 110;
        this.enemigosSpawnTime = 1;
        this.enemigosDamageBase = 5;
        this.respawnSpeedAument = 5;

        //Player config
        this.velocidadPlayer = 100;
        this.maxLife = 100;
        this.frecuenciaDeDisparo = 0.3;
        this.bulletSpeed = 1000;

    }

}

var myLevel = new levelConfig();