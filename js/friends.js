let searchBar = document.getElementById("searchUser");
if (searchBar){
    searchBar.onkeydown = function(input){
        if(input.key == "Enter"){
            input.preventDefault();
        }
        else if(input.key == "Tab"){
            let sugests = document.getElementById('sugestionUser').value;
            if(sugests != ""){
                let first = sugests.split("#")[0];
                this.value = first;
            }
        }
    }
}

function get_sugestions_from_db(){

    let input = document.getElementById('searchUser').value;
    if(input == ""){
        return;
    }
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            show_sugestions(this.responseText);
        }
    };
    xmlhttp.open("POST","actions/get_sugestions_user.php",true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("input=" + input);
}

let sugests = [];

function show_sugestions(sugestions){
    sugests = sugestions.split("#");
    document.getElementById('sugestionUser').value = "";
    let result = "";
    for(let i =0; i< sugests.length; i++){
        if(i != 0 && sugests[i] != ""){
            result += ", " + sugests[i];
        }
        else if(i == 0 && sugests[i] != ""){
            result += sugests[i];
        }
    }
    document.getElementById('sugestionUser').value = result;
}

function verifyExistsInput(){
    let input = document.getElementById('searchUser').value;
    let exists = false;
    for (var i= 0; i < sugests.length; i++) {
        if (sugests[i] == input && input != ""){
            exists = true;
            break;
        }
    }
    if(exists){
        visitProfile(input);
    }
    else {
        alert("User not exists");
    }
}

function visitProfile(input){
    window.location.replace("profile.php?username="+ input);
}

function redirectProfile(node){
    let tmp = node.getElementsByTagName('h2');
    let friend = tmp["0"].innerHTML;
    visitProfile(friend);
}

function get_user_friends(user){
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('display_friends_grid').innerHTML = this.responseText;
        }
    };
    xmlhttp.open("POST","actions/get_user_friends.php",true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}
