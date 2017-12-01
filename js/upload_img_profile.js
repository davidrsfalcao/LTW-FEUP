$("#profile_bottom").click(function(e) {
    $("#imageUpload").click();

});

function upload( uploader ) {
    if ( uploader.files && uploader.files[0] ){
            $("#form").submit();
    }
}

$("#imageUpload").change(function(){
    upload( this );

});
