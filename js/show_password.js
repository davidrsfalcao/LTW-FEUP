function show() {
    var p = document.getElementById('pwd');
    p.setAttribute('type', 'text');
    document.getElementById('eye_visibility').src="images/eye-closed.png"
}

function hide() {
    var p = document.getElementById('pwd');
    p.setAttribute('type', 'password');
    document.getElementById('eye_visibility').src="images/eye.png"
}

var pwShown = 0;

document.getElementById("eye").addEventListener("click", function () {

    if (pwShown == 0) {
        pwShown = 1;
        show();
    } else {
        pwShown = 0;
        hide();
    }
}, false);
