$("#Jugar").click(function () {

    $(".menu").hide();
    if (player != null) {
        restartGame();
    } else
        startGame();

});

$("#Comunidad").click(function () {

    $(".menu").hide();
    GetLevels();
    $(".Comunidad").show();


});

$("#Volver").click(function () {

    $(".menu").show();
    $(".Comunidad").hide();

});

$(".Comunidad").hide();
$("#tabla-puntuaciones").hide();


function PintarNivelesDeLaComunidad(querySnapshot) {


    $("#tbody_container").empty();

    querySnapshot.forEach(function (doc) {

        data = doc.data();
        let html = '<tr onclick="playLevel(\'' + doc.id + '\')"> <th scope="row">' + doc.id + '</th> <td>' + data.Creador + '</td> <td>' + data.Puntuacion + '/5</td><td>' + data.Creacion + '</td></tr>';
        $("#tbody_container").append(html);

    });

    $("#tabla-puntuaciones").show();

}

function GetLevels() {

    db.collection("Levels").get().then(function (querySnapshot) {
        PintarNivelesDeLaComunidad(querySnapshot);
    });

}

function playLevel(_name) {

    db.collection("Levels").doc(_name).get().then(function (doc) {
        console.log(doc.data());
        debugger;
        if (this.player != null) {
            restartGame(doc.data());
        } else
            startGame(doc.data());

    });

}