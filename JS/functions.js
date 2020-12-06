"use strict";

let globalConnexionID= [];

/**
 * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/charCodeAt
 * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/fromCharCode
 * @param stringToHash {string}: une chaine de caractère à hasher
 * @returns {string} : une string "hashée"
 */
function connection(obj){

    return false;
}
function register(obj){

    let newUser = {username : obj.username.value, password : someSimpleHashFunctions(obj.password.value), savedSession : {columnName: ["Test"] , columnData: ["1" , "2"]}};
    let checkIfExist = globalConnexionID.find(function(user){
        return  user.username == obj.username.value;
    });
    switch (checkIfExist){

        case undefined:
            console.log("not used yet !");
            globalConnexionID.push(newUser);
            break;
        default:
            console.log("already used");
    }
}

function loadUser(obj){

    let existUser = globalConnexionID.find(function(user){
        return  user.username == obj.username.value && user.password == someSimpleHashFunctions(obj.password.value);

    });
    switch (existUser){

        case undefined:
            console.log("User not found !");
            break;
        default:



    }



}



