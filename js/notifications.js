
window.setInterval(refresh, 30000);


function refresh() {
  let request = new XMLHttpRequest();
  request.open('get', 'actions/search_friendship_requests.php', true);
  request.addEventListener('load', handlerFriendRequest);
  request.send();
}

refresh();

function handlerFriendRequest(){
    let response = this.responseText;
    let requests = response.split('$$');

    for(let i=0; i< requests.length; i++){
        if(requests[i] != ""){
            let msm = requests[i].split('##');
            let ID = parseInt(msm[0]);
            let user = msm[1];
            let message = "Notification: " + user + " wants to be your friend";
            let resp = confirm(message);
            send_response(ID, user, resp);
        }

    }

}



function send_response(id, user, res){
    let request = new XMLHttpRequest();
    request.open('get', 'actions/respond_friendship_request.php?id='+id+'&user='+user+'&response='+res, true);
    request.addEventListener('load', teste);
    request.send();
}

function teste(){
    console.log(this.responseText);
}
// function search_notifications(){
//     search_friendship_requests();
//     // TODO
//
// }
//
// function search_friendship_requests(){
//
// }
