$(document).ready(function () {
    // Handler for .ready() called.
    var menu = $("#Menu");
    var menu_pause = $("#Menu-pause");
    menu_pause.hide();
    $("#Menu-nivel").hide();
    $("#PublishStats").hide();
    $("#Menu-score").hide();
    $("#Comunidad-score").hide();



    $("#Jugar").click(function () {

        menu.hide();
        if (player != null) {
            restartGame();
        } else
            startGame();

    });

    $("#Comunidad").click(function () {
        menu.hide();
        GetLevels();
        $(".Comunidad").show();
    });

    $("#Volver").click(function () {
        menu.show();
        $(".Comunidad").hide();
        Comunidad_score
    });
    $("#Volver_score").click(function () {
        menu.show();
        $("#Comunidad-score").hide();


    });

    $("#Salir_btn").click(function () {
        $("#Menu-pause").hide();
        menu.show();
        $(".Comunidad").hide();

    });
    $("#score_Salir_btn").click(function () {

        $("#Menu-score").hide();
        $("#Menu-pause").hide();
        menu.show();
        $(".Comunidad").hide();

    });
    $("#Creditos-btn").click(function () {
        window.open(
            'https://twitter.com/jorge_barcena3',
            '_blank'
        );

    });
    $("#Comunidad_score").click(function () {

        $("#Comunidad-score").show();
        $("#Menu").hide(); 
        $("#tbody_container_score").empty();

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
        $("#Menu-score").hide();
        ocultarComunidad();
        if (player != null) {
            restartGame();
        } else
            startGame();

    });

    $("#continue_btn").click(function () {

        $("#Menu-pause").hide();
        jugando = true;

    });

    $("#Volver_menu").click(function () {

        $("#Menu-pause").show();
        $("#Menu-nivel").hide();

    });
    $("#level_btn").click(function () {

        $("#Menu-pause").hide();
        rellenarNivel();
        $("#Menu-nivel").show();

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

        $("#levelStats").hide();
        $("#PublishStats").show();

    });
    $("#PublicarNivel_step02").click(function () {

        guardarNivel();
        PublicarNivel();

    });

    function hideAll() {
        $(".Comunidad").hide();
        $("#Menu-pause").hide();
        $("#Menu-nivel").hide();
    }

    function ocultarComunidad() {
        $(".Comunidad").hide();
        $("#Menu-pause").hide();
        menu.hide();
    }

    $(".Comunidad").hide();
    $("#tabla-puntuaciones").hide();

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
        myLevel.user.nombreDelNivel =  myLevel.user.nombreDelNivel + "_modificado";

    }

    function PublicarNivel() {

        let user = new UserConfig($("#AutorName").val().toUpperCase(), $("#LevelName").val().toUpperCase());
        myLevel.user = Object.assign({}, user);

        saveLevel(myLevel, myLevel.user.nombreDelNivel);


        $("#PublishStats").hide();
        $("#levelStats").show();
        rellenarNivel();



    }


    function PintarNivelesDeLaComunidad(querySnapshot) {


        $("#tbody_container").empty();

        querySnapshot.forEach(function (doc) {

            data = doc.data();
            let html = '<tr onclick="playLevel(\'' + doc.id + '\')"> <th scope="row">' + data.user.nombreDelNivel + '</th> <td>' + data.user.autor + '</td> <td>' + data.user.puntuacion + '/5</td><td>' + data.user.fechaDeCreacion + '</td></tr>';
            $("#tbody_container").append(html);

        });

        $("#tabla-puntuaciones").show();

    }

    function GetLevels() {

        db.collection("Levels").get().then(function (querySnapshot) {

            PintarNivelesDeLaComunidad(querySnapshot);
        });

    }


});


function playLevel(_name) {

    db.collection("Levels").doc(_name).get().then(function (doc) {
        $(".Comunidad").hide();
        $("#Menu-pause").hide();
        $("#Menu-nivel").hide();
        if (this.player != null) {
            restartGame(doc.data());
        } else
            startGame(doc.data());

    });

}


