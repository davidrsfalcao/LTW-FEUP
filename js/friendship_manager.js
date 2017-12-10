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
    xmlhttp.open("GET","action_add_friend.php?user1=root&user2=davidrsfalcao",true);
    xmlhttp.send();
}
