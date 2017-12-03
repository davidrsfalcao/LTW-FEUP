var error = false;
var user_exist = false;

/*
Request the database to confirm if user exists
*/
function verifyUser() {
    var user = document.getElementById("user").value;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText == 1){
                document.getElementById("user").style.background = "#FF6666";
                user_exist = true;
            }
            else {
                user_exist = false;
            }
        }
    };
    xmlhttp.open("GET","action_verify_username.php?username="+user,true);
    xmlhttp.send();
}

/*
Submit the form if not exist errors
*/
function try_submit(){
    verifyErrors();
    if(!error){
        document.getElementById('form_register').submit();
    }
}
/*
Verifies if exist errors on the form
*/
function verifyErrors(){
    error = false;

    //First name not null
    if(document.getElementById("f_n").value == ""){
        error = true;
        document.getElementById("f_n").style.background = "#FF6666";
    }

    //Last name not null
    if(document.getElementById("l_n").value == ""){
        error = true;
        document.getElementById("l_n").style.background = "#FF6666";
    }

    //username not null and not already exist
    if(document.getElementById("user").value == "" || user_exist){
        error = true;
        document.getElementById("user").style.background = "#FF6666";
    }

    //password not null
    if(document.getElementById("pwd").value == ""){
        error = true;
        document.getElementById("pwd").style.background = "#FF6666";
    }

}
/*
Activate Listeners
*/
document.getElementById("user").addEventListener('input', handlerInputUser);
document.getElementById("f_n").addEventListener('input', handlerInputFirstName);
document.getElementById("l_n").addEventListener('input', handlerInputLastName);
document.getElementById("pwd").addEventListener('input', handlerInputPassword);
/*
Handler input username
*/
function handlerInputUser(){
    verifyUser();
    document.getElementById("user").style.background = "transparent";
}

/*
Handler input first name
*/
function handlerInputFirstName(){
    document.getElementById("f_n").style.background = "transparent";
}

/*
Handler input last name
*/
function handlerInputLastName(){
    document.getElementById("l_n").style.background = "transparent";
}

/*
Handler input password
*/
function handlerInputPassword(){
    document.getElementById("pwd").style.background = "transparent";
}
