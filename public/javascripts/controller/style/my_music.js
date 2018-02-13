var oMyMusicList = document.getElementById("my_music_list");
var oMMLLis = oMyMusicList.getElementsByTagName("li");

var oMusicTable = document.getElementById("music_table");
var oMTTrs = oMusicTable.getElementsByTagName("tr");

var oCreateMusicListBtn = document.getElementById("create_music_list_btn");
var oCreateMusicListFrameBg = document.getElementById("create_music_list_frame_bg");
var oCreateMusicListFrame = document.getElementById("create_music_list_frame");
var oCreateMusicListName = document.getElementById("create_music_list_name");
var oReminderCmlfName = document.getElementById("reminder_cmlf_name");
var oCreateBtn = document.getElementById("create_btn");
var oCancelBtn = document.getElementById("cancel_btn");

var oEditMusicListBtn = document.getElementsByClassName("edit_music_list_btn")[0];

var oDeleteMusiListFrame = document.getElementById("delete_music_list_frame");

var oDmlfCancelBtn = document.getElementById("dmlf_cancel_btn");

$(function () {
    //浏览器时下窗口可视区域高度
    var windowHeight = $(window).height();
    var documentHeight = $(document).height();
    var oMusicList = $(".music_list");
    var oMiddleContent = $(".middle_content");

    oMusicList.css("height", (windowHeight - 75) + "px");
    oMiddleContent.css("height", (documentHeight - 75) + "px");
});

//当浏览器大小变化时
$(window).resize(function () {
    //浏览器时下窗口可视区域高度
    var windowHeight = $(window).height();
    var documentHeight = $(document).height();
    var oMusicList = $(".music_list");
    var oMiddleContent = $(".middle_content");

    oMusicList.css("height", (windowHeight - 75) + "px");
    oMiddleContent.css("height", (documentHeight - 75) + "px");
});

for (var j = 0; j < oMMLLis.length; j++) {
    oMMLLis[j].index = j;
    oMMLLis[j].onmouseover = function () {
        var index = this.index;
        var oMusicListBtns = oMMLLis[index].getElementsByClassName("music_list_btns")[0];
        oMusicListBtns.style.display = "block";
        var oEditBtn = oMusicListBtns.getElementsByClassName("edit_btn")[0];
        var oDeleteBtn = oMusicListBtns.getElementsByClassName("delete_btn")[0];
        oDeleteBtn.onclick = function () {
            oCreateMusicListFrameBg.style.display = "block";
            oDeleteMusiListFrame.style.display = "block";
        };
        oEditBtn.onclick = function () {
            window.location.href = "editMusicList.html";
        };
    };
    oMMLLis[j].onmouseout = function () {
        var index = this.index;
        var oMusicListBtns = oMMLLis[index].getElementsByClassName("music_list_btns")[0];
        oMusicListBtns.style.display = "none";
    };
}

oEditMusicListBtn.onclick = function () {
    window.location.href = "editMusicList.html";
};

for (var i = 0; i < oMTTrs.length; i++) {
    oMTTrs[i].index = i;
    oMTTrs[i].onmouseover = function () {
        var index = this.index;
        if (index > 0) {
            var timeTd = oMTTrs[index].getElementsByTagName("td")[2];
            var oMusicOperation = timeTd.getElementsByTagName("div")[0];
            timeTd.onmouseover = function () {
                oMusicOperation.style.display = "block";
            };
            timeTd.onmouseout = function () {
                oMusicOperation.style.display = "none";
            };
        }
    };
}

oCreateMusicListBtn.onclick = function () {
    oCreateMusicListFrameBg.style.display = "block";
    oCreateMusicListFrame.style.display = "block";
};

oCancelBtn.onclick = function () {
    oCreateMusicListName.value = null;
    oReminderCmlfName.innerHTML = null;
    oCreateMusicListFrameBg.style.display = "none";
    oCreateMusicListFrame.style.display = "none";
};

oCreateBtn.onclick = function () {
    if (oCreateMusicListName.value == null || oCreateMusicListName.value == "" || oCreateMusicListName.value.length == 0) {
        oReminderCmlfName.innerHTML = "歌单名不能为空";
    } else {
        oReminderCmlfName.innerHTML = null;
    }
};

oDmlfCancelBtn.onclick = function () {
    oCreateMusicListFrameBg.style.display = "none";
    oDeleteMusiListFrame.style.display = "none";
};






