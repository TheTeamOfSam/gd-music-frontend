var oCancelBtn = document.getElementById("cancel_btn");
var oSaveHeadPhotoBtn = document.getElementById("save_head_photo_btn");

var oUploadSelectBtn = document.getElementById("upload_select_btn");

var oUserHeadPhoto = document.getElementById("user_head_photo");

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
            // document.getElementById("head_preview").innerHTML = "<img id='user_head_photo' src='" + path + "'>";
            oUserHeadPhoto.src = path;
            //document.getElementById("img1").src = path;
        }
    }
}

$.ajax({
    url: 'http://localhost:7200/gdmusicserver/user/service/info/@get',
    type: 'POST',
    dataType: 'json',
    data: {
        uID: $.cookie("uId")
    },
    error: function () {
        alert("网络请求错误，请稍候重试！");
    },
    success: function (result) {
        if (!result.is_success) {
            alert(result.message);
        } else {
            var user = result.result;
            var allImgExt = ".jpg|.jpeg|.bmp|.png";
            if (user.head_photo.toLowerCase().match(allImgExt) == null) {
                // oUserHeadPhoto.src = "/images/headphoto/default_head_photo.png";
                oUserHeadPhoto.src = "/images/headphoto/default_head_photo.png";
            } else {
                // oUserHeadPhoto.src = user.head_photo;
                oUserHeadPhoto.src = user.head_photo;
            }
        }
    }
});

oCancelBtn.onclick = function () {
    window.location.href = "settings.html";
};

oSaveHeadPhotoBtn.onclick = function () {
    //获取文件对象，files是文件选取控件的属性，存储的是文件选取控件选取的文件对象，类型是一个数组
    var fileObj = oUploadSelectBtn.files[0];
    if (typeof(fileObj) == "undefined"){
        alert("请上传图片");
    } else {
        //创建formdata对象，formData用来存储表单的数据，表单数据时以键值对形式存储的。
        var formData = new FormData();
        formData.append('head_photo', fileObj);
        formData.append('userId', $.cookie("uId"));
        $.ajax({
            url: 'http://localhost:7200/gdmusicserver/user/service/head/photo/@change',
            type: 'POST',
            dataType: 'json',
            processData: false,
            contentType: false,
            data: formData,
            error: function () {
                alert("网络请求错误，请稍候重试！");
            },
            success: function (data) {
                if (!data.is_success) {
                    alert(data.message);
                } else {
                    var result = data.result;
                    console.log(result);
                    window.location.href= "settings.html";
                }
            }
        });
    }
};



