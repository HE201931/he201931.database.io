"use strict";

let globalConnexionIDs= {};
let connectedID = "";
/**
 * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/charCodeAt
 * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/fromCharCode
 * @param stringToHash {string}: une chaine de caractère à hasher
 * @returns {string} : une string "hashée"
 */
function someSimpleHashFunctions(password, username){
    let hashedString= "";
    for(let i of password){
        //console.log(i.charCodeAt(0));
        let calc = String.fromCharCode(i.charCodeAt(0) ^  password.indexOf(i)  ^ password.length - i ^ password.length);
        let calc2 = String.fromCharCode(calc.charCodeAt(0)  ^ username.length ^ username.length - 1  );
        hashedString += calc + calc2;
    }
    return hashedString;
}
function loadDatabases(){

    let Y  ="<form id=\"formUserAdd\"  action=\"#\" onSubmit=\"return addUsers(this)\">\n" +
        "                <fieldset>\n" +
        "                    <legend>Ajouter un utilisateur dans la base de données</legend>\n" +
        "                    <label for=\"email\">Email :</label>\n" +
        "                    <input type=\"text\" id=\"email\" name=\"email\" required>\n" +

        "                    <label for=\"user2\">Nom d'utilisateur :</label>\n" +
        "                    <input type=\"text\" id=\"user2\" name=\"username2\" required>\n" +
        "\n" +
        "                    <label for=\"pass2\">Mot de passe :</label>\n" +
        "                    <input type=\"text\" id=\"pass2\" name=\"password2\" required>\n" +
        "\n" +
        "                    <input type=\"submit\" value=\"Ajouter utilisateur\">\n" +
        "\n" +
        "                </fieldset>\n" +
        "            </form>" +

        "    <table>\n" +
        "            <thead>\n" +
        "            <th>Addresse Mail</th>\n" +
        "            <th>Nom d'utilisateur</th>\n" +
        "            <th>Mot de Passe</th>\n" +
        "            </thead>\n" +
        "\n" +
        "            <tbody id='connectionData'>\n" +


        "\n" +
        "            </tbody>\n" +
        "        </table>";


    document.getElementsByTagName("section")[1].innerHTML +=Y;

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

/**
 *utility : enregistre un client , son mdp "hashé" et sa future base de données
 * @param obj
 */
function registers(obj){

    let newUser = {user: {username : obj.username.value, password : someSimpleHashFunctions(obj.password.value, obj.username.value), savedSession : [] }};
    let checkIfExist =globalConnexionIDs[obj.username.value.toString()];

    console.log(newUser.user.password);

    switch (checkIfExist){
        case undefined:
            globalConnexionIDs[obj.user.value] = newUser;
            break;
        default:
        //console.log("Already Used");
        document.getElementById("loggedUser").innerHTML +=  "Log: Already Used <br>"  ;

    }
    obj.login.checked = false;
}

/**
 * utility : charge un client et sa base de données
 * @param obj
 */
function loadUsers(obj){

    let checkIfExist =globalConnexionIDs[obj.username.value.toString()];

    switch (checkIfExist){

        case undefined:
            document.getElementById("loggedUser").innerHTML +="Log: Not Found <br>";
            break;
        default:
            if(checkIfExist.user.password ==someSimpleHashFunctions(obj.password.value , obj.username.value))
            {

                //console.log (globalConnexionIDs[obj.username.value.toString()]);
                document.getElementById("loggedUser").innerHTML +=`Hello ${obj.username.value.toString()} !<br>` //"Log: Not Found <br>";

                connectedID= obj.username.value.toString();

                document.getElementById("connectionData").innerHTML = "";


                globalConnexionIDs[connectedID].user.savedSession.forEach(function (x){document.getElementById("connectionData").innerHTML +=`<tr> <td>${x[0]}</td>   <td>${x[1]}</td>   <td>${x[2]}</td>  <td><button  id=${x[1]} onclick="deleteUser(this)">Supprimer</button></td> </tr>`});

                //  loadDatabases(globalConnexionIDs[obj.username.value.toString()]);
            }
            else
            {
                console.log("Wrong Password");
            }

    }
}

/**
 * Utility : ajoute un utilisateur dans la base de données d'un client
 * @param obj
 * @returns {boolean}
 */
function addUsers(obj){
   // obj.connectionData.innerHTML += "<tr>Test</tr><tr>sqdqsdqs</tr>"
    let itemToAdd =  globalConnexionIDs[connectedID].user.savedSession.find(function (x){return x[1] == obj.user2.value;});

    switch (itemToAdd){
        case undefined:
            globalConnexionIDs[connectedID].user.savedSession.push([obj.email.value ,obj.user2.value , obj.pass2.value]);


            document.getElementById("connectionData").innerHTML +=`<tr> <td>${obj.email.value}</td>   <td>${obj.user2.value}</td>   <td>${obj.pass2.value}</td>  <td><button  id=${obj.user2.value} onclick="deleteUser(this)">Supprimer</button></td> </tr>`

        default:

            console.log("Alreadyexiotsdd");
    }


    return false;

}

/**
 * Utility : supprime un utilisateur dans la base de données d'un client
 * @param obj
 */
function deleteUser(obj){

   let itemToDelete =  globalConnexionIDs[connectedID].user.savedSession.find(function (x){return x[1] == obj.id.toString();});

   switch (itemToDelete){

       case undefined:
           console.log("dfu cc");

       default:

           globalConnexionIDs[connectedID].user.savedSession.splice(itemToDelete.index,1);

   }

   document.getElementById("connectionData").innerHTML = "";
   globalConnexionIDs[connectedID].user.savedSession.forEach(function (x){document.getElementById("connectionData").innerHTML +=`<tr> <td>${x[0]}</td>   <td>${x[1]}</td>   <td>${x[2]}</td>  <td><button  id=${x[1]} onclick="deleteUser(this)">Supprimer</button></td> </tr>`});

}



