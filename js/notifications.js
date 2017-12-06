let i = 0;
function timeCount(){
    postMessage(i);
    i++;
    setTimeout("timeCount()",30000);
}

timeCount();
