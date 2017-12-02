var first_name;
var last_name;
var buttons = {btn_1: "hidden" , btn_2:"visible", btn_3:"hidden"};
var inputs = {name_1: false , name_2: false};


function begin_edit(){
    change_visibility();
    save_variables();
    change_input_type();
}

function change_visibility(){
    for (var key in buttons){
        if (buttons[key] == "visible"){
            buttons[key] = "hidden";
            document.getElementById(key).style.visibility = buttons[key];
        }
        else {
            buttons[key] = "visible";
            document.getElementById(key).style.visibility = buttons[key];
        }
    }
}

function change_input_type(){
    for (var key in inputs){
        document.getElementById(key).readOnly = inputs[key];
        inputs[key] = !inputs[key];
    }
}

function cancel_edit(){
    restore_variables();
    change_visibility();
    change_input_type();
}

function cancel_edit(){
    restore_variables();
    change_visibility();
    change_input_type();
}

function restore_variables(){
    document.getElementById("name_1").value = first_name;
    document.getElementById("name_2").value = last_name;
}

function save_variables(){
    first_name = document.getElementById("name_1").value;
    last_name = document.getElementById("name_2").value;
}

function save_edit(){
    change_visibility();
    change_input_type();
    if(has_changes()){
        document.getElementById("edit_form").submit();
    }
}

function has_changes(){
    if (first_name != document.getElementById("name_1").value){
        return true;
    }
    if (last_name != document.getElementById("name_2").value){
        return true;
    }

    return false;
}

// $('#name_1').on('input',function(e){
//     console.log(e.originalEvent.data);
//     if (e.originalEvent.data == " "){
//         document.getElementById("name_1").value = first_name1;
//     }
//     else first_name1 = document.getElementById("name_1").value;
// });
