document.getElementById("profile_bottom").addEventListener("click", handlerClick);


function handlerClick() {
    document.getElementById("imageUpload").click();
}


function upload( uploader ) {
    if ( uploader.files && uploader.files[0] ){
            document.getElementById("form").submit();
    }
}

function handlerInput(){
    upload( this );
};

document.getElementById("imageUpload").addEventListener("change", handlerInput);

function back_to_normal(){
    document.getElementById("profile_bottom").style.visibility = "visible";
}
