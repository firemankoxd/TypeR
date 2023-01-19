import garbageitems from "./items/garbageitems.js";
import dotenv from 'dotenv'
dotenv.config()

// const MongoClient = require('mongodb').MongoClient;
import { MongoClient } from 'mongodb'
// const MongoClient = new Mongo.MongoClient;
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@typerdb.ztj7z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });
// onst bcrypt = require('bcrypt');
import bcrypt from 'bcrypt'

export function checkCommand(user, s, socket) {
    let array = s.split(" ");
    let commandName = array[0].substring(1).toLowerCase();
    if (!(commandName in commands)) {
      return "Zadany prikaz neexistuje!";
    }
    if (array.length <= 1) {
      return commands[commandName](user);
    } else {
      array.shift();
      return commands[commandName](user, ...array);
    }
}

var commands = {
    // TODO: Specifikuj ci sa ma command vypisat iba pre uzivatela alebo pre vsetkych
    duel: function(hrac1, hrac2) {
        // DB THINGS
        return `Hrac ${hrac1} zautocil na hraca ${hrac2}`
    },
    garbage: function(player) {
        // DB THINGS
        let randomNumber = Math.random();
        let garbageitem;
        for (let i = 0; i < garbageitems.length; i++) {
          if (randomNumber <= garbageitems[i].probability) {
            garbageitem = garbageitems[i].garbageitem;
            break;
          } else {
            randomNumber -= garbageitems[i].probability;
          }
        }
        return `Hrac ${player} nasel ${garbageitem}.`;
    },
    help: function() {
        return ["To view all possible commands, enter -commands.", 
                "Another line",
                "And another"]
    },
    bugreport: function(reportMessage) {
        return "";
    },
    playerinfo: function(playerName) {
        return "";
    },
    login: function(username, password) {
        let result = ""
        client.connect(async err => {
          const collection = client.db("typerdb").collection("users");
          // perform actions on the collection object
          const user = await collection.findOne({ username });
          if (!user) {
              console.log("Neexistujes")
              return "Neexistujes";
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
              console.log("Zle heslo")
              return "Zle heslo";
          } else {
              // generate a JWT token and send it to the client
              // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
              console.log("Prihlaseny")
              result = "Prihlaseny"
  }
          client.close();
        });
        return result;
    },
    register: function(username, password, passwordRepeat) {
        // TODO: Add password and password repeat validation, 
        let result;
        client.connect(async err => {
          const collection = client.db("typerdb").collection("users");
          // perform actions on the collection object
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = { username, password: hashedPassword };
          result = await collection.insertOne(newUser);
          client.close();
        });
        return result;
    }
}