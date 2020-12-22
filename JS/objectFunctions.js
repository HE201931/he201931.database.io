"use strict";

let globalConnexionIDs= {};
let connectedID = "";
/**
 * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/charCodeAt
 * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/fromCharCode
 * @param stringToHash {string}: une chaine de caractère à hasher
 * @returns {string} : une string "hashée"
 */
function someSimpleHashFunctions(password)
{
    let hashedString= "";
    for(let i of password)
    {
        //console.log(i.charCodeAt(0));
        let calc = String.fromCharCode(i.charCodeAt(0) ^  password.indexOf(i)  ^ password.length - i ^ password.length);
        let calc2 = String.fromCharCode(calc.charCodeAt(0)  ^ password.length ^ password.length - 1  );
        hashedString += calc + calc2;
    }
    return hashedString;
}
function loadDatabases()
{
    let Y  ="<form id=\"formUserAdd\"  action=\"#\" onSubmit=\"return addUsers(this)\">\n" +
        "                <fieldset>\n" +
        "                    <legend>Ajouter un utilisateur dans la base de données</legend>\n" +
        "                    <label for=\"email\">Email :</label>\n" +
        "                    <input type=\"text\" id=\"email\" name=\"email\" required>\n" +

        "                    <label for=\"user2\">Nom d'utilisateur :</label>\n" +
        "                    <input type=\"text\" id=\"user2\" name=\"username2\" required>\n" +
        "\n" +
        "                    <label for=\"pass2\">Mot de passe :</label>\n" +
        "                    <input type=\"password\" id=\"pass2\" name=\"password2\" required>\n" +
        "\n" +
        "                    <input type=\"submit\" value=\"Ajouter utilisateur\">\n" +
        "\n" +
        "                </fieldset>\n" +
        "            </form>" +
        "            <button onclick='triNom()'>Trier par nom</button>" +
        "            <button onclick='triMail()'>Trier par mail</button>" +
        "    <table>\n" +
        "            <thead>\n" +
        "            <th>Addresse Mail</th>\n" +
        "            <th>Nom d'utilisateur</th>\n" +
        "            <th>Mot de Passe (hashé)</th>\n" +
        "            </thead>\n" +
        "\n" +
        "            <tbody id='connectionData'>\n" +


        "\n" +
        "            </tbody>\n" +
        "        </table>";

    document.getElementsByTagName("section")[1].innerHTML +=Y;

}
function connections(obj)
{
    switch(obj.login.checked)
    {
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
function registers(obj)
{
    let newUser = {user: {username : obj.username.value, password : someSimpleHashFunctions(obj.password.value, obj.username.value), savedSession : [] }};
    let checkIfExist =globalConnexionIDs[obj.username.value.toString()];
    console.log(newUser.user.password);
    switch (checkIfExist)
    {
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
function loadUsers(obj)
{
    let checkIfExist =globalConnexionIDs[obj.username.value.toString()];
    switch (checkIfExist)
    {
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
 * Utility : ajoute un utilisateur dans la base de données du client connecté
 * @param obj
 * @returns {boolean}
 */
function addUsers(obj)
{
    let itemToAdd =  globalConnexionIDs[connectedID].user.savedSession.find(function (x){return x[1] == obj.user2.value || x[0] == obj.email.value ;});
    switch (itemToAdd)
    {
        case undefined:
            globalConnexionIDs[connectedID].user.savedSession.push([obj.email.value ,obj.user2.value , someSimpleHashFunctions(obj.pass2.value)]);
            document.getElementById("connectionData").innerHTML +=`<tr> <td>${obj.email.value}</td>   <td>${obj.user2.value}</td>   <td>${someSimpleHashFunctions(obj.pass2.value)}</td>  <td><button  id=${obj.user2.value} onclick="deleteUser(this)">Supprimer</button></td> </tr>`
        default:
            console.log("Alreadyexiotsdd");
    }
    return false;
}
/**
 * Utility : supprime un utilisateur dans la base de données du client connecté
 * @param obj
 */
function deleteUser(obj)
{
   let itemToDelete =  globalConnexionIDs[connectedID].user.savedSession.find(function (x){return x[1] == obj.id.toString();});
   switch (itemToDelete)
   {
       case undefined:
           console.log("Not found !");
       default:
           globalConnexionIDs[connectedID].user.savedSession.splice(itemToDelete.index,1);
   }

   document.getElementById("connectionData").innerHTML = "";
   globalConnexionIDs[connectedID].user.savedSession.forEach(function (x){document.getElementById("connectionData").innerHTML +=`<tr> <td>${x[0]}</td>   <td>${x[1]}</td>   <td>${x[2]}</td>  <td><button  id=${x[1]} onclick="deleteUser(this)">Supprimer</button></td> </tr>`});
}
function triNom()
{
    document.getElementById("connectionData").innerHTML = "";
    globalConnexionIDs[connectedID].user.savedSession.sort(function(a,b){
        //Pas de return 0 puisque les noms ne peuvent jamais être les mêmes dans ce cas-ci
        if(a[1] < b[1])
        {
            return -1;
        }
        if(a[1] > b[1])
        {
            return 1;
        }
    }).forEach(function (x){document.getElementById("connectionData").innerHTML +=`<tr> <td>${x[0]}</td>   <td>${x[1]}</td>   <td>${x[2]}</td>  <td><button  id=${x[1]} onclick="deleteUser(this)">Supprimer</button></td> </tr>`});
}
function triMail()
{
    document.getElementById("connectionData").innerHTML = "";
    globalConnexionIDs[connectedID].user.savedSession.sort(function(a,b){
        //Pas de return 0 puisque les mails ne peuvent jamais être les mêmes dans ce cas-ci
        if(a[0] < b[0])
        {
            return -1;
        }

        if(a[0] > b[0])
        {
            return 1;
        }
    }).forEach(function (x){document.getElementById("connectionData").innerHTML +=`<tr> <td>${x[0]}</td>   <td>${x[1]}</td>   <td>${x[2]}</td>  <td><button  id=${x[1]} onclick="deleteUser(this)">Supprimer</button></td> </tr>`});
}
