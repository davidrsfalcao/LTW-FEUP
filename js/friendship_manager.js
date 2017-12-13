let userPage;

function add_friendship(){
    let user1 = 'root';
    let user2 = 'davidrsfalcao';

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    xmlhttp.open("GET","actions/add_friend.php?user1=root&user2=davidrsfalcao",true);
    xmlhttp.send();
}

function get_friendship_status(user){
    userPage = user;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            switch (parseInt(this.responseText)) {
                case 0: {//not friends and not request
                    document.getElementById("btn_4").style.visibility = "visible";
                    document.getElementById("btn_5").style.visibility = "hidden";
                    document.getElementById("btn_6").style.visibility = "hidden";
                    break;
                }

                case 1: { // already friends
                    document.getElementById("btn_4").style.visibility = "hidden";
                    document.getElementById("btn_5").style.visibility = "visible";
                    document.getElementById("btn_6").style.visibility = "hidden";
                    break;
                }

                case 2: { // request sent
                    document.getElementById("btn_4").style.visibility = "hidden";
                    document.getElementById("btn_5").style.visibility = "hidden";
                    document.getElementById("btn_6").style.visibility = "visible";
                    break;
                }
                    break;
                default:
                break;
            }
        }
    };
    xmlhttp.open("POST","actions/get_friendship_status.php",true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("user2="+user);
}

function handlerFriendships(n){
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            get_friendship_status(userPage);
        }
    };
    xmlhttp.open("POST","actions/handler_friendships.php",true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("user2="+userPage+"&type="+n);
}
