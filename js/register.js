var error = false;
var user_exist = false;

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

function try_submit(){
    verifyErrors();
    if(!error){
        $('#form_register').submit();
    }
}

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
Handler input username
*/
$('#user').on('input',function(e){
    verifyUser();
    document.getElementById("user").style.background = "transparent";
});

/*
Handler input first name
*/
$('#f_n').on('input',function(e){
    document.getElementById("f_n").style.background = "transparent";
});

/*
Handler input last name
*/
$('#l_n').on('input',function(e){
    document.getElementById("l_n").style.background = "transparent";
});

/*
Handler input password
*/
$('#pwd').on('input',function(e){
    document.getElementById("pwd").style.background = "transparent";
});
