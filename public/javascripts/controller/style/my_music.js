var oMyMusicList = document.getElementById("my_music_list");
var oMMLLis = oMyMusicList.getElementsByTagName("li");

var oMusicTable = document.getElementById("music_table");

var oMimlTt = document.getElementById("miml_top");

var oCreateMusicListBtn = document.getElementById("create_music_list_btn");
var oCreateMusicListFrameBg = document.getElementById("create_music_list_frame_bg");
var oCreateMusicListFrame = document.getElementById("create_music_list_frame");
var oCreateMusicListName = document.getElementById("create_music_list_name");
var oReminderCmlfName = document.getElementById("reminder_cmlf_name");
var oCreateBtn = document.getElementById("create_btn");
var oCancelBtn = document.getElementById("cancel_btn");

var oDeleteMusiListFrame = document.getElementById("delete_music_list_frame");
var oDmConfirmBtn = document.getElementById("dm_confirm_btn");
var oDmlfCancelBtn = document.getElementById("dmlf_cancel_btn");

var oDeleteMusic = document.getElementById("delete_music");

var oDMCancelBtn = document.getElementById("dm_cancel_btn");

var oAddMusicListFrame = document.getElementById("add_music_list_frame");
var oCloseAmlf = document.getElementById("close_amlf");


var deleteInfo;

var addInfo;


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
        // oMusicListBtns.style.display = "block";
        var oEditBtn = oMusicListBtns.getElementsByClassName("edit_btn")[0];
        var oDeleteBtn = oMusicListBtns.getElementsByClassName("delete_btn")[0];
        oDeleteBtn.onclick = function () {
            oCreateMusicListFrameBg.style.display = "block";
            oDeleteMusiListFrame.style.display = "block";
        };

        oMMLLis[index].onclick = function () {
            for (var k = 0; k < oMMLLis.length; k++) {
                oMMLLis[k].style.backgroundColor = "#F9F9F9";
            }
            oMMLLis[index].style.backgroundColor = "#E6E6E6";

            oMimlTt.innerHTML = "";
            oMusicTable.innerHTML = "";

            var musicListInfo = "<div class=\"miml_tt\" id=\"miml_tt\">\n" +
                "                    <div class=\"music_list_cover\">\n" +
                "                        <img src=\"http://p1.music.126.net/yjVbsgfNeF2h7fIvnxuZDQ==/18894007811887644.jpg?param=130y130\"\n" +
                "                             alt=\"\">\n" +
                "                    </div>\n" +
                "                    <div class=\"music_list_info\">\n" +
                "                        <div class=\"mli_top\">\n" +
                "                            <div class=\"music_list_icon\"></div>\n" +
                "                            <span class=\"music_list_title\">The&nbsp;Playlist&nbsp;of&nbsp;Sam</span>\n" +
                "                            <a href=\"javascript:;\" class=\"edit_music_list_btn\" onclick=\"editMusicList(0);\">编辑</a>\n" +
                "                        </div>\n" +
                "                        <div class=\"mli_middle\">\n" +
                "                            <div class=\"user_head_photo\">\n" +
                "                                <img src=\"/images/headphoto/IMG_0416.JPG\" alt=\"\">\n" +
                "                            </div>\n" +
                "                            <span class=\"user_nickname\">\n" +
                "                                sam1995\n" +
                "                            </span>\n" +
                "                            <span class=\"user_created_time\">\n" +
                "                                2014-11-01&nbsp;创建\n" +
                "                            </span>\n" +
                "                        </div>\n" +
                "                        <div class=\"mli_bottom\">\n" +
                "                            <a class=\"play_btn\" href=\"javascript:;\">\n" +
                "                                <em class=\"play_start\"></em>\n" +
                "                                播放\n" +
                "                            </a>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "                <div class=\"miml_tb\">\n" +
                "                    <h3>\n" +
                "                        <span class=\"miml_tb_ml_title\">\n" +
                "                            歌曲列表\n" +
                "                        </span>\n" +
                "                    </h3>\n" +
                "                    <span class=\"miml_tb_ml_num\">\n" +
                "                        <span id=\"miml_tb_ml_num\">\n" +
                "                            162\n" +
                "                        </span>首歌\n" +
                "                    </span>\n" +
                "                </div>";

            var innerHTML = "<tr>\n" +
                "                    <th class=\"first_mt_column\">\n" +
                "                        &nbsp;\n" +
                "                    </th>\n" +
                "                    <th class=\"second_mt_column\">\n" +
                "                        歌曲标题\n" +
                "                    </th>\n" +
                "                    <th class=\"third_mt_column\">\n" +
                "                        时长\n" +
                "                    </th>\n" +
                "                    <th class=\"fourth_mt_column\">\n" +
                "                        歌手\n" +
                "                    </th>\n" +
                "                    <th class=\"fifth_mt_column\">\n" +
                "                        专辑\n" +
                "                    </th>\n" +
                "                </tr>\n" +
                "                <tr>\n" +
                "                    <td>1</td>\n" +
                "                    <td>\n" +
                "                        <a href=\"javascript:;\">\n" +
                "                            当\n" +
                "                        </a>\n" +
                "                    </td>\n" +
                "                    <td>\n" +
                "                        <span class=\"music_duration\">\n" +
                "                            04:53\n" +
                "                        </span>\n" +
                "                        <div class=\"music_operation\">\n" +
                "                            <a href=\"javascript:;\" class=\"add_music\" onclick=\"addMusicToMusicList(1)\"></a>\n" +
                "                            <a href=\"javascript:;\" class=\"delete_music\" onclick=\"deleteMusicInMusicList(1, 0);\"></a>\n" +
                "                        </div>\n" +
                "                    </td>\n" +
                "                    <td>\n" +
                "                        <a href=\"javascript:;\">\n" +
                "                            动力火车\n" +
                "                        </a>\n" +
                "                    </td>\n" +
                "                    <td>\n" +
                "                        <a href=\"javascript:;\">\n" +
                "                            就是红&nbsp;辉煌全纪录\n" +
                "                        </a>\n" +
                "                    </td>\n" +
                "                </tr>\n" +
                "                <tr>\n" +
                "                    <td>2</td>\n" +
                "                    <td>\n" +
                "                        <a href=\"javascript:;\">\n" +
                "                            稻香\n" +
                "                        </a>\n" +
                "                    </td>\n" +
                "                    <td>\n" +
                "                        <span class=\"music_duration\">\n" +
                "                            03:43\n" +
                "                        </span>\n" +
                "                        <div class=\"music_operation\">\n" +
                "                            <a href=\"javascript:;\" class=\"add_music\" onclick=\"addMusicToMusicList(2)\"></a>\n" +
                "                            <a href=\"javascript:;\" class=\"delete_music\" onclick=\"deleteMusicInMusicList(2, 0);\"></a>\n" +
                "                        </div>\n" +
                "                    </td>\n" +
                "                    <td>\n" +
                "                        <a href=\"javascript:;\">\n" +
                "                            周杰伦\n" +
                "                        </a>\n" +
                "                    </td>\n" +
                "                    <td>\n" +
                "                        <a href=\"javascript:;\">\n" +
                "                            摩羯座\n" +
                "                        </a>\n" +
                "                    </td>\n" +
                "                </tr>";

            oMimlTt.innerHTML = musicListInfo;
            oMusicTable.innerHTML = innerHTML;

        };

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

oDMCancelBtn.onclick = function () {
    oCreateMusicListFrameBg.style.display = "none";
    oDeleteMusic.style.display = "none";
};

function deleteMusicInMusicList(musicId, musicListId) {
    oCreateMusicListFrameBg.style.display = "block";
    oDeleteMusic.style.display = "block";
    deleteInfo = {musicId: musicId, musicListId: musicListId};
}

oDmConfirmBtn.onclick = function () {
    console.log(deleteInfo.musicId + "\n" + deleteInfo.musicListId + "\n");
};

function editMusicList(musicListId) {
    var href = "editMusicList.html?musicListId=" + musicListId;
    window.location.href = href;
}

oCloseAmlf.onclick = function () {
    oCreateMusicListFrameBg.style.display = "none";
    oAddMusicListFrame.style.display = "none";
    addInfo = null;
};

function addMusicToMusicList(musicId) {
    oCreateMusicListFrameBg.style.display = "block";
    oAddMusicListFrame.style.display = "block";
    addInfo = {musicId: musicId};
}


