window.addEventListener("scroll", function(event) {
    let top = this.scrollY;

    if(top > 300){
        document.getElementById("myVideo").pause();
    }
    else {
        document.getElementById("myVideo").play();
    }
}, false);
