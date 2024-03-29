
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBAVz9HP38m-qf3L-WyAkzXi9-lHmjTirg",
    authDomain: "arcade-asteroids.firebaseapp.com",
    databaseURL: "https://arcade-asteroids.firebaseio.com",
    projectId: "arcade-asteroids",
    storageBucket: "arcade-asteroids.appspot.com",
    messagingSenderId: "581664934413",
    appId: "1:581664934413:web:9e7d1a9af919ccf7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var db = firebase.firestore();

//Clase que guarda el jugador para alacenarlo en firebase
class PlayerFirebase {
    constructor(_name, _score, _level) {
        this.name = _name;
        this.score = _score;
        this.level = _level;
    }
}

//Se le da formato a la fecha
function FechaModificada() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; 
    let yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    today = dd + '/' + mm + '/' + yyyy;
    return today;

};

//Guardamos el score en la bd
function saveScore(_player) {

    // Add a second document with a generated ID.
    db.collection("score").add({
        username: _player.name,
        score: _player.score,
        level: _player.level,
        fecha: FechaModificada()
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });


}

//Guardamos el nivel
function saveLevel(_level, _name) {

    db.collection("Levels").add(Object.assign({}, _level)).then(function () {
        console.log("Document successfully written!");
    });

}

//Nos autenticamos de modo anonimo
firebase.auth().signInAnonymously().catch(function (error) {

    var errorCode = error.code;
    var errorMessage = error.message;

});






