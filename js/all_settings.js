var isCorrect = false;
/*
Resquests the database to confirm the password
*/
let username;
let token;
function verifyPassword(user) {
	username = user;
    let pass = document.getElementById("pwd").value;
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
				document.getElementById("pwd").style.background = "";
				isCorrect = true;
				generate_random_token();
				showOptions();
            }
            else {
                document.getElementById("pwd").style.background = "#FF6666";
                document.getElementById("pwd").value = null;
            }
        }
    };
	xmlhttp.open("POST","actions/verify_password.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("username="+user+"&password="+pass);
}

/*
* If the password entered is correct, it will show the options
*/

function showOptions(){

	if(isCorrect == true){
		//show the two options
		//A button to delete the account
		//The two boxes to introduce the new password

		document.getElementById("old_password").style.display = 'none';
		document.getElementById("options").style.display = 'initial';

	}

}

/*
* Removes the red background when user starts to write again
*/
document.getElementById("pwd").addEventListener('input', handlerInputPassword);

function handlerInputPassword(){
    document.getElementById("pwd").style.background = "transparent";
}

/*
Handler input ENTER
*/
let pwdInput = document.getElementById("pwd");
if (pwdInput){
    pwdInput.onkeydown = function(input){

        if(input.key == "Enter"){
			input.preventDefault();
			if(isCorrect){
				document.getElementById('confirm_button').click();
			}
            else
            document.getElementById('form_button_old').click();
        }
    }
}

function changePassword(){

	let password;

	if(document.getElementById("password_1").value != document.getElementById("password_2").value && document.getElementById("password_1").value != ""){
		document.getElementById("password_2").style.background = "#FF6666";
		alert("Passwords do not match!");
		return;
	}
	else password = document.getElementById("password_1").value;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText == "Success"){
				window.location.replace("index.php?username="+username);
            }
        }
    };
    xmlhttp.open("POST","actions/update_password.php",true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("password=" + password + "&validation=" + token);

}

function generate_random_token() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            token = this.responseText;
        }
    };
    xmlhttp.open("POST","actions/generate_random_token.php",true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

/*
*Function to delete user
*/
function delete_user(){

	if(confirm("Are you sure you want to delete your account?\nThis is irreversible")== false){
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
            if(this.responseText == "Success"){
				window.location.replace("actions/logout.php");
            }
        }
    };
    xmlhttp.open("POST","actions/delete_user.php",true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("username=" + username+ "&validation=" + token);

}
