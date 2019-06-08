//Coger todos los div de menus
var menu = $("#Menu");
var menu_pause = $("#Menu-pause");
var menu_nivel = $("#Menu-nivel");
var publishStats = $("#PublishStats");
var menu_score = $("#Menu-score");
var Comunidad_score = $("#Comunidad-score");
var hud = $("#hud");
var levelStats = $("#levelStats");
var comunidad = $("#Comunidad-levels");
var poweups = $(".pwup");

//Ocultamos los div oportunos al inicio
menu_pause.hide();
menu_nivel.hide();
publishStats.hide();
menu_score.hide();
Comunidad_score.hide();
hud.hide();
poweups.hide();



$("#Jugar").click(function () {

    menu.hide();
    hud.show();
    if (player != null) {
        restartGame();
    } else
        startGame();

});

$("#Comunidad").click(function () {
    menu.hide();
    GetLevels();
    comunidad.show();
});

$("#Volver").click(function () {
    menu.show();
    comunidad.hide();

});
$("#Volver_score").click(function () {
    menu.show();
    Comunidad_score.hide();

});

$("#Salir_btn").click(function () {
    menu_pause.hide();
    menu.show();
    hud.hide();
    Comunidad_score.hide();
});

$("#score_Salir_btn").click(function () {

    menu_score.hide();
    menu_pause.hide();
    hud.hide();
    menu.show();
    Comunidad_score.hide();

});

$("#Creditos-btn").click(function () {
    window.open(
        'https://twitter.com/jorge_barcena3',
        '_blank'
    );

});
$("#Comunidad_score").click(function () {

    Comunidad_score.show();
    menu.hide();

    //Borramos el contenido del los score
    $("#tbody_container_score").empty();

    //COnsulta de los scores
    db.collection("score").orderBy("level", "desc").orderBy("score").get().then(function (querySnapshot) {

        querySnapshot.forEach(function (doc) {
            data = doc.data();
            let html = '<tr > <th scope="row">' + data.username + '</th> <td>' + data.level + '</td> <td>' + data.score + '</td><td>' + data.fecha + '</td></tr>';
            $("#tbody_container_score").append(html);
        });
    });


});

$("#Restart_btn").click(function () {

    ocultarComunidad();

    if (player != null) {
        restartGame();
    } else
        startGame();

});

$("#score_Restart_btn").click(function () {
    menu_score.hide();
    ocultarComunidad();
    if (player != null) {
        restartGame();
    } else
        startGame();

});

$("#continue_btn").click(function () {

    menu_pause.hide();
    jugando = true;

});

$("#Volver_menu").click(function () {

    menu_pause.show();
    menu_nivel.hide();

});
$("#level_btn").click(function () {

    menu_pause.hide();
    rellenarNivel();
    menu_nivel.show();

});
$("#GuardarNivel").click(function () {

    guardarNivel();
    hideAll();
    if (player != null) {
        restartGame();
    } else
        startGame();

});
$("#PublicarNivel").click(function () {

    levelStats.hide();
    publishStats.show();

});
$("#PublicarNivel_step02").click(function () {

    guardarNivel();
    PublicarNivel();

});

function hideAll() {
    Comunidad_score.hide();
    menu_pause.hide();
    menu_nivel.hide();
}

function ocultarComunidad() {
    Comunidad_score.hide();
    menu_pause.hide();
    menu.hide();
}

$(".Comunidad").hide();
$("#tabla-puntuaciones").hide();

//Caracteristicas del nivel
function rellenarNivel() {

    $("#VidaMaxima").val(myLevel.maxLife);
    $("#VelocidadBala").val(myLevel.bulletSpeed);
    $("#FrecuenciaDeDisparo").val(myLevel.frecuenciaDeDisparo);
    $("#DañoBase").val(myLevel.enemigosDamageBase);
    $("#EnemigosIniciales").val(myLevel.enemigosIniciales);
    $("#EnemigosSpawn").val(myLevel.enemigosSpawnTime);
    $("#VelocidadBase").val(myLevel.enemigosVelocidadBase);
    $("#AumentoVelocidad").val(myLevel.respawnSpeedAument);
    $("#FrecuenciaPwups").val(myLevel.spanwOfPwUps);
    $("#TiempoVelocidad").val(myLevel.speedPwUp.time);
    $("#ValorVelocidad").val(myLevel.speedPwUp.value);
    $("#TiempoDisparo").val(myLevel.shootPwUp.time);
    $("#ValorDisparo").val(myLevel.shootPwUp.value);
    $("#tiempoVida").val(myLevel.lifePwUp.time);
    $("#ValorVida").val(myLevel.lifePwUp.value);

}

//Guardamos el current nivel
function guardarNivel() {

    myLevel.maxLife = parseFloat($("#VidaMaxima").val());
    myLevel.bulletSpeed = parseFloat($("#VelocidadBala").val());
    myLevel.frecuenciaDeDisparo = parseFloat($("#FrecuenciaDeDisparo").val());
    myLevel.enemigosDamageBase = parseFloat($("#DañoBase").val());
    myLevel.enemigosIniciales = parseFloat($("#EnemigosIniciales").val());
    myLevel.enemigosSpawnTime = parseFloat($("#EnemigosSpawn").val());
    myLevel.enemigosVelocidadBase = parseFloat($("#VelocidadBase").val());
    myLevel.respawnSpeedAument = parseFloat($("#AumentoVelocidad").val());
    myLevel.spanwOfPwUps = parseFloat($("#FrecuenciaPwups").val());
    myLevel.speedPwUp.time = parseFloat($("#TiempoVelocidad").val());
    myLevel.speedPwUp.value = parseFloat($("#ValorVelocidad").val());
    myLevel.shootPwUp.time = parseFloat($("#TiempoDisparo").val());
    myLevel.shootPwUp.value = parseFloat($("#ValorDisparo").val());
    myLevel.lifePwUp.time = parseFloat($("#tiempoVida").val());
    myLevel.lifePwUp.value = parseFloat($("#ValorVida").val());
    myLevel.user.nombreDelNivel = myLevel.user.nombreDelNivel + "_modificado";

}

//Publicamos el nivel en la bbdd
function PublicarNivel() {

    let user = new UserConfig($("#AutorName").val().toUpperCase(), $("#LevelName").val().toUpperCase());
    myLevel.user = Object.assign({}, user);

    saveLevel(myLevel, myLevel.user.nombreDelNivel);

    $("#PublishStats").hide();
    $("#levelStats").show();
    rellenarNivel();
}

//Mostramos todos los niveles de la comunidad
function PintarNivelesDeLaComunidad(querySnapshot) {


    $("#tbody_container").empty();

    querySnapshot.forEach(function (doc) {

        data = doc.data();
        let html = '<tr onclick="playLevel(\'' + doc.id + '\')"> <th scope="row">' + data.user.nombreDelNivel + '</th> <td>' + data.user.autor + '</td> <td>' + data.user.puntuacion + '/5</td><td>' + data.user.fechaDeCreacion + '</td></tr>';
        $("#tbody_container").append(html);

    });

    $("#tabla-puntuaciones").show();

}

//Cogemos todos los niveles de la comunidad
function GetLevels() {

    db.collection("Levels").get().then(function (querySnapshot) {

        PintarNivelesDeLaComunidad(querySnapshot);
    });

}




//Jugamos al nivel elegido
function playLevel(_name) {

    db.collection("Levels").doc(_name).get().then(function (doc) {
        comunidad.hide();
        menu_pause.hide();
        menu_nivel.hide();
        hud.show();
        if (this.player != null) {
            restartGame(doc.data());
        } else
            startGame(doc.data());

    });

}


