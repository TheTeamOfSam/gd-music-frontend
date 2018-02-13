var oEmlCancelBtn = document.getElementById("eml_cancel_btn");
var oEmlConfirmBtn = document.getElementById("eml_confirm_btn");

var oReplaceMusicListName = document.getElementById("replace_music_list_name");

var oReminderRmlName = document.getElementById("reminder_rml_name");

oEmlCancelBtn.onclick = function () {
    window.location.href = "myMusic.html";
};

oEmlConfirmBtn.onclick = function () {
    if (oReplaceMusicListName.value.length == 0) {
        oReminderRmlName.innerHTML = "请输入歌单名";
    } else if (oReplaceMusicListName.value.length > 30) {
        oReminderRmlName.innerHTML = "歌单名请勿超过30个字符";
    } else {
        oReminderRmlName.innerHTML = null;
    }

};



