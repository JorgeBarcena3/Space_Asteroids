class powerUpConfig {

    constructor(_type, _value, _time) {

        this.time = _time;
        this.type = _type;
        this.value = _value;

    }

}

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

        //Time of spawn of PwUps
        this.spanwOfPwUps = 10;
        this.speedPwUp = Object.assign({}, new powerUpConfig(3, 100, 10));
        this.lifePwUp = Object.assign({}, new powerUpConfig(1, 100, 1));
        this.shootPwUp = Object.assign({}, new powerUpConfig(2, 0.1, 10));

    }

}

var myLevel = new levelConfig();