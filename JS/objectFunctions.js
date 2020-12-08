"use strict";

let globalConnexionIDs= {};
/**
 * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/charCodeAt
 * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/fromCharCode
 * @param stringToHash {string}: une chaine de caractère à hasher
 * @returns {string} : une string "hashée"
 */
function someSimpleHashFunctions(stringToHash){
    let hashedString= "";
    for(let i of stringToHash){
        //  hashedString += (255 ^ i.charCodeAt(0) ^  stringToHash.indexOf(i)  ^ stringToHash.length - i ^ stringToHash.length);
        //  hashedString += (255 ^ i.charCodeAt(1) ^  stringToHash.indexOf(i)  ^ stringToHash.length - i ^ stringToHash.length);
        hashedString += String.fromCharCode(255 ^ i.charCodeAt(0) ^  stringToHash.indexOf(i)  ^ stringToHash.length - i ^ stringToHash.length);
        hashedString += String.fromCharCode(255 ^ i.charCodeAt(1) ^  stringToHash.indexOf(i)  ^ stringToHash.length - i ^ stringToHash.length);
    }
    return hashedString;
}
function loadDatabases(userData){
    /**
    let Y  = "    <table>\n" +
        "            <thead>\n" +

        "            <th>Nom d'utilisateur</th>\n" +
        "            <th>Dernière date de connexion</th>\n" +
        "            </thead>\n" +
        "\n" +
        "            <tbody id='connectionData'>\n" +


        "\n" +
        "            </tbody>\n" +
        "        </table>";


    let YY  = "    <table>\n" +
        "            <thead>\n";

    for(let i of userData.savedSession.columnName){
        YY+=`<th>${i}</th>\n`;
    }

     YY+=    "            </thead>\n" +
         "\n" +
         "            <tbody id='connectionData'>\n"

    for(let i of userData.savedSession.columnData){
        YY+=`<tr><td>${i}</td><td>Une Deuxième Colonne</td></tr>`;
    }

    YY+= "\n" +
         "            </tbody>\n" +
         "        </table>";

    document.getElementsByTagName("section")[1].innerHTML += YY;
     */

}
function connections(obj){

    switch(obj.login.checked){
        case false:
            loadUsers(obj);
            break;
        case true:
            registers(obj);
            break;
    }
    return false;
}
function registers(obj){

    let newUser = {username : obj.username.value, password : someSimpleHashFunctions(obj.password.value), savedSession : {columnName: ["TestValue" ,"123" ] , columnData: ["Toto","456"] }};
    let checkIfExist =globalConnexionIDs[obj.username.value.toString()];

    switch (checkIfExist){
        case undefined:
            globalConnexionIDs[obj.username.value.toString()] = newUser;
            break;
        default:
        //console.log("Already Used");
        document.getElementById("loggedUser").innerHTML +=  "Log: Already Used <br>"  ;

    }
    obj.login.checked = false;
}
function loadUsers(obj){

    let checkIfExist =globalConnexionIDs[obj.username.value.toString()];

    switch (checkIfExist){

        case undefined:
            document.getElementById("loggedUser").innerHTML +="Log: Not Found <br>";
            break;
        default:
            //console.log (globalConnexionIDs[obj.username.value.toString()]);
            document.getElementById("loggedUser").innerHTML +=`Hello ${obj.username.value.toString()} !<br>` //"Log: Not Found <br>";
            loadDatabases(globalConnexionIDs[obj.username.value.toString()]);
    }
}



