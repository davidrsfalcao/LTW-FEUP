var green = {background:"#00CC66", color:"white"};
var grey = {background:"#C0C0C0", color:"rgb(0,153,153)"};
var blue = {background:"rgb(0,153,153)", color:"white"};

var colors = [];
colors[0] = green;
colors[1] = blue;
colors[2] = grey;

let user;
let fullListDetails = false;

function setUser(username){
    user = username;
}

function orderBy(value){
    if(document.getElementById('orderBySelec').value < 4){
        document.getElementById('select_order').innerHTML =
        '<form>' +
        '<label for="orderByASCDES">Order </label>' +
        '<select name="orderByASCDES" id="orderByASCDES" onchange="refreshGrid()">' +
        '<option value="1">Ascendant</option>'+
        '<option value="2">Descendant</option>'+
        '</select>'+
        '</form>';
    }
    else {
        document.getElementById('select_order').innerHTML =
        '<form>' +
        '<label for="orderByASCDES">Search: </label>' +
        '<input type="text" name="orderByASCDES" id="orderByASCDES" onkeydown="searchInput(event)" onkeyup="refreshGrid()"/>' +
        '</form>';
    }

    refreshGrid();
}

function searchInput(input){
    if(input.key == "Enter"){
        input.preventDefault();
    }
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
		fullListDetails = false;
    }
}

function mouseIsOverZoomBox(state){
    mouseIsOver = state;
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
}

function createFormatedDate(){
    let date = new Date();
    let day = date.getDate();
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

function createReadableDate(dateString){
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let finalDate = "";

    finalDate += year;
    finalDate += "/";

    if(month < 10){
        finalDate += "0" + month;
    }
    else {
        finalDate += month;
    }
    finalDate += "/";

    if(day < 10){
        finalDate += "0" + day;
    }
    else {
        finalDate += day;
    }
    finalDate += " ";

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
    let error = false;
    if(document.getElementById('list_name').value == ""){
        document.getElementById("list_name").style.borderColor = "#FF0000";
        error = true;
    }
    else {
        list_name = document.getElementById('list_name').value;
        document.getElementById("list_name").style.borderColor = "";
    }

    if(document.getElementById('reminder_date').value ==""){
        document.getElementById("reminder_date").style.borderColor = "#FF0000";
        error = true;
    }
    else {
        reminder_date = document.getElementById('reminder_date').value;
        document.getElementById("reminder_date").style.borderColor = "";
    }

    if(error){
        return false;
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
    let error = false;
    if(!verifyForms()){
        error = true;
    }

    if(document.getElementById('input_text_box').value == ""){
        document.getElementById("input_text_box").style.borderColor = "#FF0000";
        error = true;
    }
    else {
        var content = document.getElementById('input_text_box').value;
        document.getElementById("input_text_box").style.borderColor = "";
    }

    if(error){
        return;
    }

    let creation_date = createFormatedDate();
    let url = 'list_name='+list_name+'&creation_date='+creation_date+'&reminder_date='+ reminder_date + '&content=' + content + '&type=0';
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
    let creation_date = createFormatedDate();
    let url ='list_name='+list_name+'&creation_date='+creation_date+'&reminder_date='+ reminder_date + '&content=' + checklistText + '&type=1';
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
    let creation_date = createFormatedDate();
    let url = 'list_name='+list_name+'&creation_date='+creation_date+'&reminder_date='+ reminder_date + '&content=' + "nulo" + '&type=2';
    savePhoto(formData, url);
}

function submitList(url) {
    let fullURL = "actions/save_lists.php?username="+user + "&" + url;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            refreshGrid();
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
            if(this.responseText == "Success"){
                submitList(url);
            }
        }
    };
    xmlhttp.open("POST","actions/save_tmp_file.php",true);
    xmlhttp.send(formData);
}

function getUserLists(){
    let order = document.getElementById('orderBySelec').value;
    let orderType = document.getElementById('orderByASCDES').value;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText != ''){
                handlerInputReceived(this.responseText);
            }
            console.log(this.responseText);
        }
    };
    xmlhttp.open("GET","actions/get_user_lists.php?order="+order + "&orderType="+orderType,true);
    xmlhttp.send();
}
let userLists=[];

function handlerInputReceived(input){
    let lists = input.split("#END_LIST#");
    for (let i = 0; i < lists.length; i++) {
        let type = lists[i].split("#ITEM#");
        formatInputList(type);
    }
    updateGridLists();
}

function formatInputList(tmp_lists){
    let tmp_list = tmp_lists[0].split("#SPACE#");
    let list = tmp_list;
    let id = parseInt(list[0]);
    let creator_id = list[1];
    let tit = list[2];
    let creation_d = list[3];
    let reminder_d = list[4];
    let tp = parseInt(list[5]);
    let itens1 = [];
    for (let i = 1; i < tmp_lists.length; i++) {
        let tmp_list = tmp_lists[i].split("#SPACE#");
        let id_i = parseInt(tmp_list[0]);
        let list_id = parseInt(tmp_list[1]);
        let cont = tmp_list[2];
        let vis = parseInt(tmp_list[3]);

        let item = {ID: id_i, list_ID: list_id, content: cont, visibility: vis};
        itens1.push(item);
    }

    let final_list = {ID: id, creator_ID: creator_id, title: tit, creation_date: creation_d, reminder_date: reminder_d, type: tp, itens: itens1};
    userLists.push(final_list);
}

function updateGridLists(){

    for (let i = 0; i < userLists.length; i++) {
        let div = document.createElement('div');
        div.className='list';
        div.setAttribute('onclick', 'zoom(this.innerHTML)');
        let type = userLists[i].type;

        let html = '<div class="inside_list" onclick="showFullDetails(this)" onmouseenter="showListHandler(this)" onmouseleave="hideDetails(this)"><span id="listID">'+(i+1)+'</span>';

        let cc = ((i+1) % (colors.length -1)) + 1;
        div.style.background = colors[cc].background;
        div.style.color = colors[cc].color;
        if(type == 2){
            let itemId = userLists[i].itens[0].ID;
            let url = 'images/list/' + itemId + '.jpg';
            div.style.background = "#f3f3f3 url("+url+") no-repeat center center";
            div.style.backgroundSize = "cover";

        }
        else {
            html += '<h1 class="centered_in_box">' + userLists[i].title + '</h1>';
        }
        div.innerHTML = html;
        document.getElementById('display_lists_grid').appendChild(div);
    }

}

function showDetails(elem){
    let id = getListID(elem.innerHTML);
    let cc = ((id) % (colors.length -1)) + 1;
    elem.parentNode.style.background = colors[cc].background;
    elem.parentNode.style.color = colors[cc].color;
    let html = '<span id="listID">'+(id)+'</span>'
    +'<h1>' + userLists[id-1].title + '</h1>'
    + '<br>'
    + '<span>Creator: </span>';

    if (userLists[id-1].creator_ID == user){
        html += 'Me';
    }
    else {
        html += userLists[id-1].creator_ID;
    }
    html += '<br>';

    let creationDate = createReadableDate(userLists[id-1].creation_date);
    let reminderDate = createReadableDate(userLists[id-1].reminder_date);

    html += '<span>Created: </span>' + creationDate + '<br>';
    html += '<span>Reminder: </span>' + reminderDate + '<br>';
    html += '<span>Type: </span>';

    switch (userLists[id-1].type) {
        case 0:{
            html += 'Text';
            break;
        }
        case 1:{
            html += 'Checklist';
            break;
        }
        case 2:{
            html += 'Photo';
            break;
        }

        default:{
            html += 'Error';
            break;
        }

    }

    html += '<br><br><br><p class="details_message" id="details_message">Click to full view</p>';

    elem.innerHTML = html;

}

function showFullDetails(elem){
    fullListDetails = true;
    let id = getListID(elem.innerHTML);
    let cc = ((id) % (colors.length -1)) + 1;
    elem.parentNode.style.background = colors[cc].background;
    elem.parentNode.style.color = colors[cc].color;
    let html = '<span id="listID">'+(id)+'</span>'
        +'<h1>' + userLists[id-1].title + '</h1>'
        + '<br>'
        + '<span>Creator: </span>';

    if (userLists[id-1].creator_ID == user){
        html += 'Me';
    }
    else {
        html += userLists[id-1].creator_ID;
    }
    html += '<br>';

    let creationDate = createReadableDate(userLists[id-1].creation_date);
    let reminderDate = createReadableDate(userLists[id-1].reminder_date);

    html += '<span>Created: </span>' + creationDate + '<br>';
    html += '<span>Reminder: </span>' + reminderDate + '<br>';
    html += '<span>Type: </span>';

    switch (userLists[id-1].type) {
        case 0:{
            html += 'Text';
            break;
        }
        case 1:{
            html += 'Checklist';
            break;
        }
        case 2:{
            html += 'Photo';
            break;
        }

        default:{
            html += 'Error';
            break;
        }

    }

    if(userLists[id-1].type !== 2){
        html += '<br><span>Content: </span><br>';
        for(i = 0; i < userLists[id-1].itens.length; i++){
            if(userLists[id-1].itens[i].visibility === 1){
                html += '<p>' + userLists[id-1].itens[i].content + '</p>';
            }
        }
    }

    elem.innerHTML = html;
}

function showListHandler(elem){
    if(fullListDetails){
        showFullDetails(elem);
    }
    else{
        showDetails(elem);
    }
}

function hideDetails(elem){

    let id = getListID(elem.innerHTML);
    let html = '<span id="listID">'+(id)+'</span>';
    let type = userLists[id-1].type;

    if(type == 2){
        let itemId = userLists[id-1].itens[0].ID;
        let url = 'images/list/' + itemId + '.jpg';
        elem.parentNode.style.background = "#f3f3f3 url("+url+") no-repeat center center";
        elem.parentNode.style.backgroundSize = "cover";

    }
    else {
        html += '<h1 class="centered_in_box">' + userLists[id-1].title + '</h1>';
    }

    elem.innerHTML = html;
}

function refreshGrid(){
    userLists=[];
    document.getElementById('display_lists_grid').innerHTML = "";
    createAddList();
    getUserLists();
    let zoom_box = document.getElementsByClassName('zoom_background')[0];
    if(zoom_box != null){
        zoom_box.parentNode.removeChild(zoom_box);
    }

}
