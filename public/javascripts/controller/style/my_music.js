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

var musicIndex = 0;

// 删除歌曲的信息
var deleteInfo;

// 歌单信息
var myMusicList;


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

$.ajax({
    url: ipAndHost + '/gdmusicserver/find/user/music/list/by/user/id/@query',
    type: 'GET',
    dataType: 'json',
    data: {
        user_id: $.cookie("uId")
    },
    error: function () {
        customAlert("网络请求错误，请稍候重试");
    },
    success: function (result) {
        if (!result.is_success) {
            customAlert(result.message);
        } else {
            var result = result.result;
            myMusicList = result;
            $("li").remove("#my_music_list li");

            $.each(result, function (n, result) {

                var mliImg = $("<img>").attr("src", result.user_music_list_photo);
                var mliDiv = $("<div class='music_list_img'></div>");
                mliDiv.append(mliImg);

                var mlnDiv = $("<div class='music_list_name'>" + result.user_music_list_name + "</div>");
                var mnSpan = $("<span class='music_num'>" + result.num_of_music_in_user_music_list + "首</span>");
                var mlnuDiv = $("<div class='music_list_num'></div>");
                mlnuDiv.append(mnSpan);

                var mlnanDiv = $("<div class='music_list_name_and_num'></div>");
                mlnanDiv.append(mlnDiv);
                mlnanDiv.append(mlnuDiv);

                var mlbLink1 = $("<a class='edit_btn'></a>").attr("href", "javascript:editMusicList(" + result.user_music_list_id + ");");
                var mlbLink2 = $("<a class='delete_btn'></a>").attr("href", "javascript:deleteMusicList(" + result.user_music_list_id + ");");
                var mlbSpan = $("<span class='music_list_btns'></span>");
                mlbSpan.append(mlbLink1);
                mlbSpan.append(mlbLink2);

                var mmlLi = $("<li></li>");
                mmlLi.append(mliDiv);
                mmlLi.append(mlnanDiv);
                mmlLi.append(mlbSpan);

                $("#my_music_list").append(mmlLi);
            });
        }
    }
});

function selectMyMusicList() {
    for (var j = 0; j < oMMLLis.length; j++) {
        oMMLLis[j].index = j;
        oMMLLis[j].onmouseover = function () {
            var index = this.index;
            oMMLLis[index].onmouseover = function () {
                // if (index == musicIndex) {
                //     oMMLLis[index].style.backgroundColor = "#E6E6E6";
                // } else {
                //     oMMLLis[index].style.backgroundColor = "#E6E6E6";
                // }
                oMMLLis[index].style.backgroundColor = "#E6E6E6";
            };
            oMMLLis[index].onmouseout = function () {
                if (index == musicIndex) {
                    oMMLLis[index].style.backgroundColor = "#E6E6E6";
                } else {
                    oMMLLis[index].style.backgroundColor = "#F9F9F9";
                }
            };
            oMMLLis[index].onclick = function () {

                console.log(myMusicList[index]);

                musicIndex = index;

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
                    "                            <a href=\"javascript:;\" class=\"user_nickname\">\n" +
                    "                                sam1995\n" +
                    "                            </a>\n" +
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
                    "                            <a href=\"javascript:;\" class=\"add_music\" onclick=\"addTheMusicToMusicList(1)\"></a>\n" +
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
                    "                            <a href=\"javascript:;\" class=\"add_music\" onclick=\"addTheMusicToMusicList(2)\"></a>\n" +
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
}

// 页面加载完成绑定事件
// if (document.attachEvent) {
//     window.attachEvent("onload", selectMyMusicList);
// } else {
//     window.addEventListener('load', selectMyMusicList, false);
// }

// $(function(){
//     selectMyMusicList();
// });

$(window).on('load', function () {
    selectMyMusicList();
});

// 创建歌单按钮点击时
oCreateMusicListBtn.onclick = function () {
    oCreateMusicListFrameBg.style.display = "block";
    oCreateMusicListFrame.style.display = "block";
};

// 创建歌单弹窗取消按钮点击时
oCancelBtn.onclick = function () {
    oCreateMusicListName.value = null;
    oReminderCmlfName.innerHTML = null;
    oCreateMusicListFrameBg.style.display = "none";
    oCreateMusicListFrame.style.display = "none";
};

// 创建歌单弹窗创建按钮点击时
oCreateBtn.onclick = function () {
    if (oCreateMusicListName.value == null || oCreateMusicListName.value == "" || oCreateMusicListName.value.length == 0) {
        oReminderCmlfName.innerHTML = "歌单名不能为空";
    } else {
        oReminderCmlfName.innerHTML = null;
        $.ajax({
            url: ipAndHost + '/gdmusicserver/user/music/list/@create',
            type: 'POST',
            dataType: 'json',
            data: {
                user_id: $.cookie("uId"),
                music_list_name: oCreateMusicListName.value
            },
            error: function () {
                customAlert("哦，网络开小差了！");
            },
            success: function (result) {
                if (!result.is_success) {
                    customAlert(result.message);
                } else {
                    oCreateMusicListName.value = null;
                    oReminderCmlfName.innerHTML = null;
                    oCreateMusicListFrameBg.style.display = "none";
                    oCreateMusicListFrame.style.display = "none";
                }
            }
        });
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


