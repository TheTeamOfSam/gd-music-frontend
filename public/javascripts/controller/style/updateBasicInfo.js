var oNickname = document.getElementById("nickname");
var oNicknameReminder = document.getElementById("nickname_reminder");

oNickname.onblur = function () {

    var nicknameValue = oNickname.value;
    console.log(nicknameValue);
    if (nicknameValue == "") {
        oNicknameReminder.style.display = "block";
        oNicknameReminder.innerText = "昵称不能为空，且长度控制在20个字符以内";
    } else if (nicknameValue.length > 20) {
        oNicknameReminder.style.display = "block";
        oNicknameReminder.innerText = "亲的昵称太长了，长度请控制在20个字符以内";
    } else {
        oNicknameReminder.style.display = "none";
    }

};

var oIntroduction = document.getElementById("introduction");
var oResidueText = document.getElementById("residue_text");

oIntroduction.onfocus = function () {
    oIntroduction.onkeydown = function () {
        var introductionValue = oIntroduction.value;
        var residueText = 150 - introductionValue.length;
        oResidueText.innerHTML = "" + residueText;
        if (residueText < 0) {
            oResidueText.innerHTML = "字数超出";
            oIntroduction.style.color = "#C20C0C";
        } else {
            oIntroduction.style.color = "#333333";
        }
    };
};


