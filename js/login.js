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
Resquests the database to confirm the password
*/
function verifyPassword(user) {
    var pass = document.getElementById("pwd").value;

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
            document.getElementById('login_form').submit();
            }
            else {
                document.getElementById("pwd").style.background = "#FF6666";
                document.getElementById("pwd").value = null;
            }
        }
    };
    xmlhttp.open("POST","action_verify_password.php",true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("username="+user+"&password="+pass);
}

/**
Verify if exist erros on form, otherwise submit the form
*/
function next(){
    if(user_exist){
        var username = document.getElementById("user").value;
        window.location.replace("login_step2.php?username="+username);
    }
    else {
        document.getElementById("user").style.background = "#FF6666";
    }
}

/*
Activate Listeners
*/
if(document.getElementById("user") != null){
    document.getElementById("user").addEventListener('input', handlerInputUser);
}
if(document.getElementById("pwd") != null){
    document.getElementById("pwd").addEventListener('input', handlerInputPassword);
}



/*
Handler input username
*/
function handlerInputUser(){
    verifyUser();
    document.getElementById("user").style.background = "transparent";
}

/*
Handler input password
*/
function handlerInputPassword(){
    document.getElementById("pwd").style.background = "transparent";
}
