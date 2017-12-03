window.onload = function(){
    var elems = document.getElementsByClassName("icon");

    for (var i = 0; i < elems.length; i++) {
        var classList = elems[i].classList;
        if(classList.length > 1){
            var svg = elems[i].classList[1];
            setSVGContent(svg,elems[i]);
        }

    }
}
function setSVGContent(filename, elem) {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            elem.innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET","templates/read_svg_file.php?filename="+filename,true);
    xmlhttp.send();
}
