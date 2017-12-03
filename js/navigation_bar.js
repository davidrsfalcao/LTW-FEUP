var focus = false;

function onFocus(){
    if(focus == false){
        document.getElementById('arrow_down').innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"'
        +' width="32" height="32" viewBox="0 0 32 32">'
        +'<title>minus</title>'
        +'<path d="M0 13v6c0 0.552 0.448 1 1 1h30c0.552 0 1-0.448'
        +' 1-1v-6c0-0.552-0.448-1-1-1h-30c-0.552 0-1 0.448-1 1z">'
        + '</path></svg>';
        onfocus = true;
    }
}
function onLeave(){
    focus = false;

    document.getElementById('arrow_down').innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"'
    +' width="32" height="32" viewBox="0 0 32 32">'
    +'<title>plus</title>'
    +'<path d="M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1'
    +' 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 '
    +'0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 '
    +'1-1v-6c0-0.552-0.448-1-1-1z"></path></svg>';
}

var onbrand = false;

function onBrand(){
    document.getElementById("logo_plus_name").style.color = "red";
}

function outBrand(){
    document.getElementById("logo_plus_name").style.color = "rgb(0,153,153)";
}
