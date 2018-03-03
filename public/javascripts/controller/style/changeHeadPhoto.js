var oCancelBtn = document.getElementById("cancel_btn");
var oSaveHeadPhotoBtn = document.getElementById("save_head_photo_btn");

var oUploadSelectBtn = document.getElementById("upload_select_btn");

function imgPreView(imgFile) {
    var filextension = imgFile.value.substring(imgFile.value.lastIndexOf("."), imgFile.value.length);
    filextension = filextension.toLowerCase();
    if ((filextension != '.jpg') && (filextension != '.gif') && (filextension != '.jpeg') && (filextension != '.png') && (filextension != '.bmp')) {
        alert("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
        imgFile.focus();
    } else {
        var path;
        if (document.all)//IE
        {
            imgFile.select();
            path = document.selection.createRange().text;
            document.getElementById("head_preview").innerHTML = "";
            // oUserHeadPhoto.src = path;
            document.getElementById("head_preview").style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + path + "\")";//使用滤镜效果
        } else//FF
        {
            path = window.URL.createObjectURL(imgFile.files[0]);// FF 7.0以上
            //path = imgFile.files[0].getAsDataURL();// FF 3.0
            // document.getElementById("head_preview").innerHTML = "<img id='img1' width='120px' height='100px' src='" + path + "'/>";
            document.getElementById("head_preview").innerHTML = "<img id='user_head_photo' src='" + path + "'>";
            //document.getElementById("img1").src = path;
        }
    }
}


oCancelBtn.onclick = function () {
    window.location.href = "settings.html";
};

oSaveHeadPhotoBtn.onclick = function () {
    console.log(oUploadSelectBtn.value);
};




