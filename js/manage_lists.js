var green = {background:"#00CC66", color:"white"};
var grey = {background:"#C0C0C0", color:"rgb(0,153,153)"};
var blue = {background:"rgb(0,153,153)", color:"white"};
// var yellow = {background:"#FFFF66", color:"black"};
// var red = {background:"#FF9999", color:"black"};
var colors = [];
colors[0] = green;
colors[1] = blue;
colors[2] = grey;
// colors[3] = yellow;
// colors[4] = red;

function orderBy(value){
    showOrderSettings(value);
}

function showOrderSettings(value){
    document.getElementById('select_order').innerHTML =
    '<form>' +
    '<label for="users">Order </label>' +
    '<select name="users" onchange="displayLists(value, this.value)">' +
    '<option value=""></option>'+
    '<option value="1">Ascendant</option>'+
    '<option value="2">Descendant</option>'+
    '</select>'+
    '</form>';
    createAddList();

}

function displayLists(value1, value2){

}

function getListID(html){
    var id = html.match(/<span id=(.*?)<\/span>/g).map(function(val){
        return val.replace(/<\/?b>/g,'');
    });
    id = id.toString().match(/\d/g);
    let result = 0;
    let size= id.length;
    for(let i=0; i<size; i++){
        let exp = parseInt(id[i]);
        result += exp * Math.pow(10,(size-i-1));
    }
    return result;
}

let mouseIsOver = true;
function zoom(html){
    let id = getListID(html);
    let div = document.createElement('div');
    div.setAttribute('onclick', 'verifyClickZoomBox(this)');
    div.className='zoom_background';

    let box = document.createElement('div');

    if(id == 0){
        box.innerHTML = displayCreateList();
        box.style.background = colors[0].background;
        box.style.color = colors[0].color;
    }
    else {
        box.innerHTML = html;
        let cc = (id % (colors.length -1)) + 1;
        box.style.background = colors[cc].background;
        box.style.color = colors[cc].color;}

    box.className='zoom_box';
    box.setAttribute('onmousemove', 'mouseIsOverZoomBox(true)');
    box.setAttribute('onmouseleave', 'mouseIsOverZoomBox(false)');


    div.appendChild(box);
    document.body.appendChild(div);
}

function verifyClickZoomBox(elem){
    if(mouseIsOver == false){
        elem.parentNode.removeChild(elem);
    }
}

function mouseIsOverZoomBox(state){
    mouseIsOver = state;
}

function displayCreateList(box){
     let html =
        '<h1>Create your List</h1>'
        + '<p><span>List Name: </h2>'
        + '<input type="text" name="list_name" id="list_name"/></p>'
        + '<button type="button">Concluir</button>'
        +'<form>'
        +'<label for="users">Type </label>'
        +'<select name="type" onchange="addItem(this.value)">'
        +'<option value=""></option>'
        +'<option value="0">Note</option>'
        +'<option value="1">Checklist</option>'
        +'<option value="2">Photolist</option>'
        +'</select>'
        +'</form>'
        +'<div id="zoom_box_item"></div>'
        ;

    return html;
}

function testeLists(){
    for(let k=1; k<30; k++){
        let div = document.createElement('div');
        div.className='list';
        div.setAttribute('onclick', 'zoom(this.innerHTML)');
        div.innerHTML = '<span id="listID">'+k+'</span>List '+k;
        let cc = (k % (colors.length -1)) + 1;
        div.style.background = colors[cc].background;
        div.style.color = colors[cc].color;
        document.getElementById('display_lists_grid').appendChild(div);
    }
}

function createAddList(){
    document.getElementById('display_lists_grid').innerHTML = null;
    let div = document.createElement('div');
    div.classList.add('list','add');
    div.setAttribute('onclick', 'zoom(this.innerHTML)');
    div.innerHTML = '<span id="listID">0</span><img src="images/templates/plus.png" />';
    document.getElementById('display_lists_grid').appendChild(div);
    div.style.background = colors[0].background;
    div.style.color = colors[0].color;
    testeLists();
}

function addItem(value){
    let content;
    value = parseInt(value);
    switch(value){
        case 0:
            content = addTextItem();
            break;
        case 1:
            content = addCheckBoxItem();
            break;
        case 2:
            content = addPhotoItem();
            break;

        default:
            break;
    }

    document.getElementById('zoom_box_item').innerHTML = content;
    return content;
}

let checklist = false;

function addTextItem(){
    checklist = false;
    let content = '<div class="text_box">'
                + '<input type="text" class="input_text_box" id="input_text_box"/>'
                + '</div>';
    return content;
}

function addCheckBoxItem(){

    let content ='<div class="checklist_item_box" style="width=100px;height=100px;background=white;">'
                + '<input type="text" class="input_checklist_box" id="input_checklist_box"/>'
                + '</div>';

    if(checklist == false){
        content = '<div class="checklist_zomm_box" id="checklist_box">' + content + '</div>';
        checklist = true;
    }
    else {
        let tmp = document.getElementById('checklist_box').innerHTML;
        content = tmp + content;
    }

    return content;
}

function addPhotoItem(){
    checklist = false;
}
