
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

class PlayerFirebase {
    constructor(_name, _score) {
        this.userId = Math.floor(Math.random() * 100);
        this.name = _name;
        this.score = _score;
    }
}

function saveScore(_player) {


    // Add a second document with a generated ID.
    db.collection("score").add({
        username: _player.name,
        score: _player.score
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });


}

function saveLevel(_level, _name) {

    db.collection("Levels").add(Object.assign({}, _level)).then(function () {
        console.log("Document successfully written!");
    });

}





