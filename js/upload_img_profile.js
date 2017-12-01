$("#profile_bottom").click(function(e) {
    $("#imageUpload").click();
});

function fasterPreview( uploader ) {
    if ( uploader.files && uploader.files[0] ){
          $('#profileImage').attr('src', window.URL.createObjectURL(uploader.files[0]));
          $('#profileImage').attr("width", "70%");
          $('#profileImage').attr("height", "auto");
    }
}

$("#imageUpload").change(function(){
    fasterPreview( this );
});
