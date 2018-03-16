var oEmlCancelBtn = document.getElementById("eml_cancel_btn");
var oEmlConfirmBtn = document.getElementById("eml_confirm_btn");

var oReplaceMusicListName = document.getElementById("replace_music_list_name");
var oMusicListIntro = document.getElementById("music_list_intro");
var oUserMusicListPhoto = document.getElementById("user_music_list_photo");

var oReminderRmlName = document.getElementById("reminder_rml_name");
var oReminderRmlIntro = document.getElementById("reminder_rml_intro");

oEmlCancelBtn.onclick = function () {
    // window.location.href = null;
    var link = "myMusic.html";
    window.location.href = link;
};

oEmlConfirmBtn.onclick = function () {
    if (oReplaceMusicListName.value.length == 0) {
        oReminderRmlName.innerHTML = "请输入歌单名";
    } else if (oReplaceMusicListName.value.length > 30) {
        oReminderRmlName.innerHTML = "歌单名请勿超过30个字符";
    } else {
        oReminderRmlName.innerHTML = null;
        if (oMusicListIntro.value.length > 150) {
            oReminderRmlIntro.innerHTML = "介绍字数不能超过150个字！";
        } else {
            oReminderRmlIntro.innerHTML = null;



        }
    }
};

function getUrlParam(name) {
    var paramArr = decodeURIComponent(window.location.href.split('?')[1]);
    var subParamArr = paramArr.split('&');
    for (var i = 0; i < subParamArr.length; i++) {
        if (subParamArr[i].split('=')[0] == name) {
            return subParamArr[i].split('=')[1];
        } else {
            return null;
        }
    }
}

var musicListId = getUrlParam("musicListId");

$.ajax({
    url: ipAndHost + '/gdmusicserver/find/user/music/list/by/music/list/id/@query',
    type: 'GET',
    dataType: 'json',
    data: {
        user_music_list_id: musicListId
    },
    error:function () {
        customAlert("网络请求错误，请稍后重试！");
    },
    success:function (result) {
        if (!result.is_success) {
            customAlert(result.message);
        } else {
            var result = result.result;
            oReplaceMusicListName.value = result.music_list_name;
            oMusicListIntro.value= result.intro;
            oUserMusicListPhoto.src = result.music_list_photo;
        }
    }
});



