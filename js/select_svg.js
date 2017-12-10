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
            let path = this.responseText;
            let result = path.match(/<path(.*?)<\/path>/g).map(function(val){
                return val.replace(/<\/?b>/g,'');
            });
            let style = window.getComputedStyle(elem, null).getPropertyValue('font-size');
            let fontSize = parseFloat(style);
            let header = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"' +
            ' width="' + fontSize + '" height="'+ fontSize +'" '
            +'viewBox="0 0 32 32">';
            elem.innerHTML = header + result + "</svg>";
        }
    };
    xmlhttp.open("GET","actions/read_svg_file.php?filename="+filename,true);
    xmlhttp.send();
}
