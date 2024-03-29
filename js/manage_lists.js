var green = {background:"#00CC66", color:"white"};
var grey = {background:"#c7c7c7", color:"rgb(0,153,153)"};
var blue = {background:"rgb(0,153,153)", color:"white"};

var colors = [];
colors[0] = green;
colors[1] = blue;
colors[2] = grey;

let user;
let fullListDetails = false;
let refreshTime = 60000; /* 1 minuto */
setInterval(updateGridLists, refreshTime);

function setUser(username){
    user = username;
}

function orderBy(value){
    if(document.getElementById('orderBySelec').value < 4 || document.getElementById('orderBySelec').value == 6){
        document.getElementById('select_order').innerHTML =
        '<form>' +
        '<label for="orderByASCDES">Order </label>' +
        '<select name="orderByASCDES" id="orderByASCDES" onchange="refreshGrid()">' +
        '<option value="1">Ascendant</option>'+
        '<option value="2">Descendant</option>'+
        '</select>'+
        '</form>';
    }
    else if(document.getElementById('orderBySelec').value == 5){
        document.getElementById('select_order').innerHTML =
        '<form>' +
        '<label for="orderByASCDES">Search: </label>' +
        '<input type="text" name="orderByASCDES" id="orderByASCDES" onkeydown="searchInput(event)" onkeyup="refreshGrid()"/>' +
        '</form>';
    }
    else if(document.getElementById('orderBySelec').value == 4){
        document.getElementById('select_order').innerHTML =
        '<form>' +
        '<label for="orderByASCDES">Order </label>' +
        '<select name="orderByASCDES" id="orderByASCDES" onchange="refreshGrid()">' +
        '<option value="1">Not Completed</option>'+
        '<option value="2">Completed</option>'+
        '</select>'+
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
        let trash = '<form>'
        +'<span class="trash_icon" onclick="deleteList(this)" >'
        +'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">'
        +'<title>bin</title>'
        +'<path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>'
        +'<path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>'
        +'</svg></span>'
        +'</form>';

        let share = '<form>'
        +'<span class="share_icon" onclick="get_user_friends()" >'
        +'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">'
        +'<title>share</title>'
        +'<path d="M8 20c0 0 1.838-6 12-6v6l12-8-12-8v6c-8 0-12 4.99-12 10zM22 24h-18v-12h3.934c0.315-0.372 0.654-0.729 1.015-1.068 1.374-1.287 3.018-2.27 4.879-2.932h-13.827v20h26v-8.395l-4 2.667v1.728z"></path>'
        +'</svg></span>'
        +'</form>';

        box.innerHTML = showFullDetails(id) + share + trash;
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

function getMinutesBetweenDates(date1, date2){
    let MS_PER_MINUTE = 1000 * 60;

    let date_1 = new Date(date1);
    let date_2 = new Date(date2);

    return (date_2 - date_1) / MS_PER_MINUTE;
}

function displayDays(number){
    if(number >= 1){
        return (number + "d ");
    }

    return "";
}

function displayHours(number){

    if(number >= 1){
        return (number + "h ");
    }


    return "";
}

function displayMinutes(number){
    if(number >= 1){
        return (number + "min ");
    }

    return "";
}

function displayTimeBetweenDates(min){
    let type;
    if(min == 0){
        return '<span class="time">Now</span>';
    }

    if(min > 0){
        type = 1;
    }
    else {
        type = 2;
    }

    min = Math.abs(min);
    let days = displayDays(Math.floor(min/1440));
    let hours = displayHours(Math.floor(min%1440/60));
    let minutes = displayMinutes(Math.floor(min%1440%60));

    let result = days + hours + minutes;

    switch (type) {
        case 1:
        return '<span class="time time_remaining">'+ result +'</span>';
        break;

        case 2:
        return '<span class="time time_late">'+ result +'</span>';
        break;

    }
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

function denySpecialChars(string){
    var alphaExp = /^[a-zA-Z0-9,.! ^`´~-]+$/;
    if(string.match(alphaExp)){
        return false;
    }else{
        alert("Input denied.\n");
        return true;
    }
}

function verifyForms(){
    let error = false;
    if(document.getElementById('list_name').value == "" || denySpecialChars(document.getElementById('list_name').value)){
        document.getElementById("list_name").style.borderColor = "#FF0000";
        error = true;
    }
    else {
        list_name = document.getElementById('list_name').value;
        document.getElementById("list_name").style.borderColor = "";
        error = denySpecialChars(list_name);
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

    if(document.getElementById('input_text_box').value == "" || denySpecialChars(document.getElementById('input_text_box').value)){
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
        if(temp != '' && !denySpecialChars(document.getElementById('input_checklist_box'+i).value)){
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
    createAddList();
    for (let i = 0; i < userLists.length; i++) {
        let div = document.createElement('div');
        div.className='list';
        div.setAttribute('onclick', 'zoom(this.innerHTML)');
        let type = userLists[i].type;

        let html = '<div class="inside_list" onmouseenter="showDetails(this)" onmouseleave="hideDetails(this)"><span id="listID">'+(i+1)+'</span>';

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
        let date2 = userLists[i].reminder_date;
        let date1 = createFormatedDate();
        let time = getMinutesBetweenDates(date1, date2);
        let string_time = displayTimeBetweenDates(time);

        html += '<h2 class="centered_bottom_box">' + string_time + '</h2>';
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
    let remainingDays = getMinutesBetweenDates(userLists[id-1].creation_date, userLists[id-1].reminder_date);

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

function showFullDetails(id){

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

        //Display first all unchecked
        for(i = 0; i < userLists[id-1].itens.length; i++){
            if(userLists[id-1].itens[i].visibility == 1){
                html += '<div class="content_checking">'
                + '<p><input type="checkbox" onchange="generate_random_token_for_edit(this.id, this.parentNode)" id="'+ userLists[id-1].itens[i].ID +'" unchecked />'
                + '<label for="'+ userLists[id-1].itens[i].ID +'">'+ userLists[id-1].itens[i].content + '</label></p></div>';
            }

        }
        //So after display the checked ones
        for(i = 0; i < userLists[id-1].itens.length; i++){
            if(userLists[id-1].itens[i].visibility == 0){
                html += '<div class="content_checking">'
                + '<p><input type="checkbox" onchange="generate_random_token_for_edit(this.id, this.parentNode)" id="'+ userLists[id-1].itens[i].ID +'" checked />'
                + '<label for="'+ userLists[id-1].itens[i].ID +'">'+ userLists[id-1].itens[i].content + '</label></p></div>';
            }
        }
    }
    else {
        let state;
        if(userLists[id-1].itens[0].visibility == 1){
            state= "unchecked";
        }
        else state= "checked";
        html += '<div class="content_checking">'
        + '<p><input type="checkbox" onchange="generate_random_token_for_edit(this.id, this.parentNode)" id="'+ userLists[id-1].itens[0].ID +'" '+state+' />'
        + '<label for="'+ userLists[id-1].itens[0].ID +'">'+ 'photo' + '</label></p></div>';
    }
    return html;
}

function updateItemVisibility(id, token, list_ID){
    let visibility_tmp = !document.getElementById(id).checked;
    let visibility = visibility_tmp ? 1 : 0;
    let url = 'id='+ parseInt(id) +'&visibility='+visibility +'&validation='+token;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "Success"){
                for(let i=0; i<userLists[list_ID-1].itens.length;i++ ){
                    if(userLists[list_ID-1].itens[i].ID == id){
                        userLists[list_ID-1].itens[i].visibility = ! userLists[list_ID-1].itens[i].visibility;
                    }
                }
            }
        }
    };
    xmlhttp.open("POST","actions/update_item_visibility.php",true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(url);

}

function generate_random_token_for_edit(id, parentNode) {
    let html = parentNode.parentNode.parentNode.innerHTML;
    let index = getListID(html);
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let token = this.responseText;
            updateItemVisibility(id, token, index);
        }
    };
    xmlhttp.open("POST","actions/generate_random_token.php",true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
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
    let date2 = userLists[id-1].reminder_date;
    let date1 = createFormatedDate();
    let time = getMinutesBetweenDates(date1, date2);
    let string_time = displayTimeBetweenDates(time);

    html += '<h2 class="centered_bottom_box">' + string_time + '</h2>';
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

function deleteList(childnode){
    let html = childnode.parentNode.parentNode.innerHTML;
    let index = getListID(html);
    let id = userLists[index-1].ID;

    if(confirm('Are you sure you want to delete this list?\nThis is irreversible') == false){
        return;
    }
    else generate_random_token_for_delete(id);


}

function generate_random_token_for_delete(id) {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let token = this.responseText;
            action_delete_list(id, token);
        }
    };
    xmlhttp.open("POST","actions/generate_random_token.php",true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

function action_delete_list(id, token){
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
                for(let i=0; i< userLists.length; i++){
                    if(userLists[i].ID == id){
                        userLists.splice(i,1);
                    }
                }
                if(document.getElementsByClassName('zoom_background').length == 1){
                    let zoom = document.getElementsByClassName('zoom_background')[0];
                    document.getElementsByClassName('zoom_background')[0].parentNode.removeChild(zoom);
                }
                updateGridLists();
            }
        }
    };
    xmlhttp.open("POST","actions/delete_list.php",true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("id=" + id + "&validation=" + token);

}

function share_list(){
    let html = document.getElementsByClassName('share_icon')[0].parentNode.parentNode.innerHTML;
    let index = getListID(html);
    let id = userLists[index-1].ID;
    let list = this.responseText.split('##');

    let share_with=[];

    for (var i = 0; i < list.length; i++) {
        if(list[i] != ""){
            let res = confirm("Do you want to share this list with "+ list[i]+"?");
            if(res){
                share_with.push(list[i]);
            }
        }
    }
    let result = "";
    for (var i = 0; i < share_with.length; i++) {
        if(i==0){
            result += share_with[i];
        }
        else result += ("/" + share_with[i]);
    }
    console.log(id);
    share(result, id);
}

function share(friends, id){
    let request = new XMLHttpRequest();
    request.open('get', 'actions/share_list_with_friends.php?friends='+friends + "&id="+id, true);
    request.addEventListener('load', teste1);
    request.send();
}

function teste1(){
    console.log(this.responseText);
}

function get_user_friends(){
    let request = new XMLHttpRequest();
    request.open('get', 'actions/get_user_friends_username.php', true);
    request.addEventListener('load', share_list);
    request.send();
}
