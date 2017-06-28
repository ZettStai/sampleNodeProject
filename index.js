const express = require('express');
const app = express();
const port = process.env.PORT || 8081;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bodyParser = require('body-parser');
const path = require('path');

const url = '';

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  db.close();
});

function addPerson(person) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    db.collection('demo').insertOne(person);

    db.close();
  });
}

function getAllPeople(callback) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    db.collection('demo').find({}).toArray(function(err, docs){

  console.log('find', docs);
      callback(docs);
    });

    db.close();
  });
}

function deletePerson() {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        db.collection('demo').findOneAndDelete({name: "Arya"});

        // // var deleteDocument = function(db, callback) {
        // //     // Get the documents collection
        //     var collection = db.collection('demo');
        //     // Insert some documents
        //     collection.deleteOne({ name : "Arya" }, function(err, result) {
        //         assert.equal(err, null);
        //         assert.equal(1, result.result.n);
        //         console.log("Removed the document with the field a equal to Arya");
        //         // callback(result);
        //      });
        // // }

    });
}

/*function updatePerson(modPerson) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        var updateDocument = function(db, callback) {
            // Get the documents collection
            var collection = db.collection('demo');

        // Update document where name is Arya, set age equal to 1
        db.collection.updateOne({ name : Arya }
            , { $set: { age : 1 } }, function(err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                console.log("Updated the document with the field a equal to Lizette");
                callback(result);
            });
    }
}*/

app.post('/add', function(req, res) {
  let person = req.body;
  addPerson(person);
  res.send('Added!');
});

app.get('/read', function (req, res) {
    getAllPeople(function(people) {
     //console.log('get', people);
     res.send(people);
   });
 });

app.delete('/delete', function (req,res) {
    deletePerson();
    res.send('Deleted Arya');
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  getAllPeople(function(people) {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
  });
});

app.listen(port);

console.log('Listening on localhost:', port);
