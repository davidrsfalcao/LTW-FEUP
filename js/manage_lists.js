var green = {background:"#00CC66", color:"white"};
var grey = {background:"#C0C0C0", color:"rgb(0,153,153)"};
var blue = {background:"rgb(0,153,153)", color:"white"};

var colors = [];
colors[0] = green;
colors[1] = blue;
colors[2] = grey;

let user;

function setUser(username){
    user = username;
}

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
        box.style.color = colors[cc].color;
    }

    box.className='zoom_box';
    box.setAttribute('onmousemove', 'mouseIsOverZoomBox(true)');
    box.setAttribute('onmouseleave', 'mouseIsOverZoomBox(false)');

    div.appendChild(box);
    document.body.appendChild(div);
    if(id == 0){
        addItem(0);
    }
}

function verifyClickZoomBox(elem){
    if(mouseIsOver == false){
        elem.parentNode.removeChild(elem);
    }
}

function mouseIsOverZoomBox(state){
    mouseIsOver = state;
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
    //testeLists();
}

function createFormatedDate(){
    let date = new Date();
    let day = date.getDay() +1;
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let finalDate = "";

    finalDate += year;
    finalDate += "-";

    if(month < 10){
        finalDate += "0" + month;
    }
    else {
        finalDate += month;
    }
    finalDate += "-";

    if(day < 10){
        finalDate += "0" + day;
    }
    else {
        finalDate += day;
    }
    finalDate += "T";

    if(hour < 10){
        finalDate += "0" + hour;
    }
    else {
        finalDate += hour;
    }
    finalDate += ":";

    if(minutes < 10){
        finalDate += "0" + minutes;
    }
    else {
        finalDate += minutes;
    }
    return finalDate;
}

function displayCreateList(box){

    let finalDate = createFormatedDate();
    let html ='<h1>Create your List</h1>'
    +'<p>List Name '
    +'<input type="text" name="list_name" id="list_name"/></p>'
    +'<p><label for="reminder_date">Reminder date </label>'
    +'<input type="datetime-local" name="reminder_date" id="reminder_date" value="'+ finalDate+'"/></p>'
    +'<form>'
    +'<label for="users">Type </label>'
    +'<select name="type" onchange="addItem(this.value)">'
    +'<option value="0">Note</option>'
    +'<option value="1">Checklist</option>'
    +'<option value="2">Photolist</option>'
    +'</select>'
    +'</form>'
    +'<div id="zoom_box_item"></div>';

    return html;
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
let list_name;
let reminder_date;

function verifyForms(){
    if(document.getElementById('list_name').value == ""){
        return false;
    }
    else {
        list_name = document.getElementById('list_name').value;
    }

    if(document.getElementById('reminder_date').value ==""){
        return false;
    }
    else {
        reminder_date = document.getElementById('reminder_date').value;
    }

    return true;
}

function addTextItem(){
    checklist = false;
    let content = '<div class="text_box">'
    + '<textarea name="content" class="input_text_box" id="input_text_box"></textarea>'
    + '</div>'
    + '<button type="button" onclick="submitText()" class="zoom_box_button">Submit</button>';
    return content;
}


function submitText(){

    if(!verifyForms()){
        return;
    }

    if(document.getElementById('input_text_box').value == ""){
        return;
    }
    else {
        var content = document.getElementById('input_text_box').value;
    }

    let url = 'list_name='+list_name+'&reminder_date='+ reminder_date + '&content=' + content + '&type=0';
    submitList(url);
}

let checklistText = [];
function addCheckBoxItem(){
    let index = checklistText.length;
    let content;
    if(checklist == false){
        content ='<div class="checklist_item_box">'
        + '<p><input type="text" class="input_checklist_box" id="input_checklist_box' + index+'"/>'
        +'<button type="button" onclick="addCheckBoxItem()" class="add_checkbox_item_button" id="add_checkbox_item_button">Add item</button></p>'
        + '</div>';
        content = '<div class="checklist_zomm_box" id="checklist_box">' + content + '</div>'
        + '<button type="button" onclick="submitCheckList()" class="zoom_box_button">Submit</button>';
        checklist = true;
    }
    else {
        document.getElementById('add_checkbox_item_button').remove();
        content ='<div class="checklist_item_box">'
        + '<p><input type="text" class="input_checklist_box" id="input_checklist_box' + (index+1) +'"/>'
        +'<button type="button" onclick="addCheckBoxItem()" class="add_checkbox_item_button" id="add_checkbox_item_button">Add item</button></p>'
        + '</div>';
        for(let k=0; k<(index+1); k++){
            checklistText[k] = document.getElementById('input_checklist_box'+k).value;
        }
        let tmp = document.getElementById('checklist_box').innerHTML;
        content = tmp + content;
        document.getElementById('checklist_box').innerHTML = content;

        for(let k=0; k<index+1; k++){
            document.getElementById('input_checklist_box'+k).value = checklistText[k];
        }
        content = document.getElementById('zoom_box_item').innerHTML;
    }

    return content;
}

function submitCheckList(){

    if(!verifyForms()){
        return;
    }
    else {
        checklistText=[];
    }
    let child = document.getElementById('checklist_box').getElementsByTagName('div');
    let j=0;
    for(let i=0; i<child.length; i++){
        let temp = document.getElementById('input_checklist_box'+i).value;
        if(temp != ''){
            checklistText[j] = temp;
            j++;
        }
    }
    let url ='list_name='+list_name+'&reminder_date='+ reminder_date + '&content=' + checklistText + '&type=1';
    checklistText=[];
    submitList(url);
}

function addPhotoItem(){
    checklist = false;
    checklistText = [];
    let content = '<form action="" method="post" enctype="multipart/form-data" id="form">'
    + '<input type="file"'
    + 'name="input_photo" placeholder="Photo" id="input_photo" required="required">'
    + '</form>'
    + '<button type="button" onclick="submitPhotoItem()" class="add_photo_item_button" id="add_photo_item_button">Submit</button>';
    return content;
}

function submitPhotoItem(){
    if(!verifyForms()){
        return;
    }
    let file = document.getElementById("input_photo").files[0];
    if(document.getElementById("input_photo").value == ""){
        return;
    }
    var formData = new FormData();
    formData.append('photos', file, file.name);
    let url = 'list_name='+list_name+'&reminder_date='+ reminder_date + '&content=' + "nulo" + '&type=2';
    savePhoto(formData, url);
}

function submitList(url) {
    let fullURL = "action_save_lists.php?username="+user + "&" + url;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    xmlhttp.open("GET",fullURL,true);
    xmlhttp.send();
}

function savePhoto(formData, url){
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText == "sucess"){
                submitList(url);
            }
        }
    };
    xmlhttp.open("POST","action_save_tmp_file.php",true);
    xmlhttp.send(formData);
}
