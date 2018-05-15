var oCreateMusicListBtn = document.getElementById("create_music_list_btn");
var oCreateMusicListFrameBg = document.getElementById("create_music_list_frame_bg");
var oCreateMusicListFrame = document.getElementById("create_music_list_frame");
var oCreateMusicListName = document.getElementById("create_music_list_name");
var oReminderCmlfName = document.getElementById("reminder_cmlf_name");
var oCreateBtn = document.getElementById("create_btn");
var oCancelBtn = document.getElementById("cancel_btn");

var oDeleteMusiListFrame = document.getElementById("delete_music_list_frame");
var oDmConfirmBtn = document.getElementById("dm_confirm_btn");
var oDmlfConfirmBtn = document.getElementById("dmlf_confirm_btn");
var oDmlfCancelBtn = document.getElementById("dmlf_cancel_btn");

var oDeleteMusic = document.getElementById("delete_music");

var oDMCancelBtn = document.getElementById("dm_cancel_btn");

var oMusicListCover = document.getElementById("music_list_cover");
var oMusicListTitle = document.getElementById("music_list_title");
var oEditMusicListBtn = document.getElementById("edit_music_list_btn");
var oUserHeadPhotoLink = document.getElementById("user_head_photo_link");
var oUserHeadPhoto = document.getElementById("user_head_photo");
var oUserNickname = document.getElementById("user_nickname");
var oUserCreatedTime = document.getElementById("user_created_time");
var oPlayBtn = document.getElementById("play_btn");
var oMliIntro = document.getElementById("mli_intro");
var oMimlTbMlNum = document.getElementById("miml_tb_ml_num");

var musicIndex = 0;

// 删除歌曲的信息
var deleteInfo;

// 删除歌单的信息
var deleteMusicListId;

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
    $(".middle_content_min").css("height", (documentHeight - 75) + "px");
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
    $(".middle_content_min").css("height", (documentHeight - 75) + "px");
});

function getMyMusicList() {
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
                if (result.length == 0) {
                    $("#music_in_music_list").css("display", "none");
                    $("#my_music_list").css("display", "none");
                } else {
                    $("#music_in_music_list").css("display", "block");
                    $("#my_music_list").css("display", "block");

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

                    var aMusicList = myMusicList[0];
                    oMusicListCover.src = aMusicList.user_music_list_photo;
                    oMusicListTitle.innerHTML = aMusicList.user_music_list_name;
                    oEditMusicListBtn.href = "javascript:editMusicList(" + aMusicList.user_music_list_id + ");";
                    oUserHeadPhotoLink.href = "javascript:toUser(" + aMusicList.user_id + ");";
                    oUserHeadPhoto.src = aMusicList.user_head_photo;
                    oUserNickname.innerHTML = aMusicList.user_nickname;
                    oUserNickname.href = "javascript:toUser(" + aMusicList.user_id + ");";

                    var createTime = timestampToTime(aMusicList.user_music_list_created_time / 1000);
                    var createT = createTime.year + "-" + createTime.month + "-" + createTime.day + "&nbsp;创建";
                    oUserCreatedTime.innerHTML = createT;

                    oPlayBtn.href = "javascript:playMusicList(" + aMusicList.user_music_list_id + ");";

                    if (aMusicList.user_music_list_intro.length != 0) {
                        var musicListIntro = aMusicList.user_music_list_intro.split("\n");
                        var mlIntro = "<b>介绍：</b><br>";
                        for (var i = 0; i < musicListIntro.length; i++) {
                            mlIntro += (musicListIntro[i] + "<br>");
                        }
                        oMliIntro.innerHTML = mlIntro;
                    } else {
                        oMliIntro.innerHTML = "";
                    }
                    oMimlTbMlNum.innerHTML = aMusicList.num_of_music_in_user_music_list;

                    $.ajax({
                        url: ipAndHost + '/gdmusicserver/get/music/in/user/music/list/@query',
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            user_id: $.cookie("uId"),
                            user_music_list_id: aMusicList.user_music_list_id
                        },
                        error: function () {
                            customAlert("网络开小差了！");
                        },
                        success: function (result) {
                            if (!result.is_success) {
                                customAlert(result.message);
                            } else {

                                $("body,html").animate({scrollTop: 0}, 500);

                                var result = result.result;

                                if (result.length < 10) {
                                    var documentHeight = $(document).height();
                                    $(".middle_content_min").css("height", (documentHeight - 75) + "px");
                                } else {
                                    $(".middle_content_min").css("height", "auto");
                                }

                                $("tr").remove("#music_table tr");

                                var mtc1 = $("<th class='first_mt_column'>&nbsp;</th>");
                                var mtc2 = $("<th class='second_mt_column'>歌曲标题</th>");
                                var mtc3 = $("<th class='third_mt_column'>时长</th>");
                                var mtc4 = $("<th class='fourth_mt_column'>歌手</th>");
                                var mtc5 = $("<th class='fifth_mt_column'>专辑</th>");

                                var mtTR = $("<tr></tr>");
                                mtTR.append(mtc1).append(mtc2).append(mtc3).append(mtc4).append(mtc5);

                                $("#music_table").append(mtTR);


                                $.each(result, function (n, result) {
                                    var num = n + 1;
                                    var td1 = $("<td>" + num + "</td>");

                                    var td2Link = $("<a>" + result.music_name + "</a>").attr("href", "javascript:toSingleSong(" + result.music_id + ");");
                                    var td2 = $("<td></td>");
                                    td2.append(td2Link);

                                    var durationInfo = getMusicDuration(result.music_duration);
                                    var td3Span = $("<span class='music_duration'>" + durationInfo + "</span>");
                                    var td3DivLink1 = $("<a class='add_music'></a>").attr("href", "javascript:addTheMusicToMusicList(" + result.music_id + ");");
                                    var td3DivLink2 = $("<a class='delete_music'></a>").attr("href", "javascript:deleteMusicInMusicList(" + result.music_id + "," + aMusicList.user_music_list_id + ");");
                                    var td3Div = $("<div class='music_operation'></div>");
                                    td3Div.append(td3DivLink1).append(td3DivLink2);
                                    var td3 = $("<td></td>");
                                    td3.append(td3Span).append(td3Div);

                                    var td4Link = $("<a>" + result.artist_name + "</a>").attr("href", "javascript:toArtist(" + result.artist_id + ");");
                                    var td4 = $("<td></td>");
                                    td4.append(td4Link);

                                    var td5Link = $("<a>" + result.special_name + "</a>").attr("href", "javascript:toSpecial(" + result.special_id + ");");
                                    var td5 = $("<td></td>");
                                    td5.append(td5Link);

                                    var mTTR = $("<tr></tr>");

                                    mTTR.append(td1).append(td2).append(td3).append(td4).append(td5);

                                    $("#music_table").append(mTTR);
                                });
                            }
                        }
                    });

                }
            }
        }
    });
}

getMyMusicList();

function selectMyMusicList() {
    var oMyMusicList = document.getElementById("my_music_list");
    var oMMLLis = oMyMusicList.getElementsByTagName("li");

    for (var j = 0; j < oMMLLis.length; j++) {
        oMMLLis[j].index = j;
        oMMLLis[j].onmouseover = function () {
            var index = this.index;
            oMMLLis[index].onmouseover = function () {
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

                musicIndex = index;

                for (var k = 0; k < oMMLLis.length; k++) {
                    oMMLLis[k].style.backgroundColor = "#F9F9F9";
                }
                oMMLLis[index].style.backgroundColor = "#E6E6E6";

                var aMusicList = myMusicList[index];
                oMusicListCover.src = aMusicList.user_music_list_photo;
                oMusicListTitle.innerHTML = aMusicList.user_music_list_name;
                oEditMusicListBtn.href = "javascript:editMusicList(" + aMusicList.user_music_list_id + ");";
                oUserHeadPhotoLink.href = "javascript:toUser(" + aMusicList.user_id + ");";
                oUserHeadPhoto.src = aMusicList.user_head_photo;
                oUserNickname.innerHTML = aMusicList.user_nickname;
                oUserNickname.href = "javascript:toUser(" + aMusicList.user_id + ");";

                var createTime = timestampToTime(aMusicList.user_music_list_created_time / 1000);
                var createT = createTime.year + "-" + createTime.month + "-" + createTime.day + "&nbsp;创建";
                oUserCreatedTime.innerHTML = createT;

                oPlayBtn.href = "javascript:playMusicList(" + aMusicList.user_music_list_id + ");";

                if (aMusicList.user_music_list_intro.length != 0) {
                    var musicListIntro = aMusicList.user_music_list_intro.split("\n");
                    var mlIntro = "<b>介绍：</b><br>";
                    for (var i = 0; i < musicListIntro.length; i++) {
                        mlIntro += (musicListIntro[i] + "<br>");
                    }
                    oMliIntro.innerHTML = mlIntro;
                } else {
                    oMliIntro.innerHTML = "";
                }
                oMimlTbMlNum.innerHTML = aMusicList.num_of_music_in_user_music_list;

                $.ajax({
                    url: ipAndHost + '/gdmusicserver/get/music/in/user/music/list/@query',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        user_id: $.cookie("uId"),
                        user_music_list_id: aMusicList.user_music_list_id
                    },
                    error: function () {
                        customAlert("网络开小差了！");
                    },
                    success: function (result) {
                        if (!result.is_success) {
                            customAlert(result.message);
                        } else {

                            $("body,html").animate({scrollTop: 0}, 500);

                            var result = result.result;

                            if (result.length < 10) {
                                var documentHeight = $(document).height();
                                $(".middle_content_min").css("height", (documentHeight - 75) + "px");
                            } else {
                                $(".middle_content_min").css("height", "auto");
                            }

                            $("tr").remove("#music_table tr");

                            var mtc1 = $("<th class='first_mt_column'>&nbsp;</th>");
                            var mtc2 = $("<th class='second_mt_column'>歌曲标题</th>");
                            var mtc3 = $("<th class='third_mt_column'>时长</th>");
                            var mtc4 = $("<th class='fourth_mt_column'>歌手</th>");
                            var mtc5 = $("<th class='fifth_mt_column'>专辑</th>");

                            var mtTR = $("<tr></tr>");
                            mtTR.append(mtc1).append(mtc2).append(mtc3).append(mtc4).append(mtc5);

                            $("#music_table").append(mtTR);

                            $.each(result, function (n, result) {
                                var num = n + 1;
                                var td1 = $("<td>" + num + "</td>");

                                var td2Link = $("<a>" + result.music_name + "</a>").attr("href", "javascript:toSingleSong(" + result.music_id + ");");
                                var td2 = $("<td></td>");
                                td2.append(td2Link);

                                var durationInfo = getMusicDuration(result.music_duration);
                                var td3Span = $("<span class='music_duration'>" + durationInfo + "</span>");
                                var td3DivLink1 = $("<a class='add_music'></a>").attr("href", "javascript:addTheMusicToMusicList(" + result.music_id + ");");
                                var td3DivLink2 = $("<a class='delete_music'></a>").attr("href", "javascript:deleteMusicInMusicList(" + result.music_id + "," + aMusicList.user_music_list_id + ");");
                                var td3Div = $("<div class='music_operation'></div>");
                                td3Div.append(td3DivLink1).append(td3DivLink2);
                                var td3 = $("<td></td>");
                                td3.append(td3Span).append(td3Div);

                                var td4Link = $("<a>" + result.artist_name + "</a>").attr("href", "javascript:toArtist(" + result.artist_id + ");");
                                var td4 = $("<td></td>");
                                td4.append(td4Link);

                                var td5Link = $("<a>" + result.special_name + "</a>").attr("href", "javascript:toSpecial(" + result.special_id + ");");
                                var td5 = $("<td></td>");
                                td5.append(td5Link);

                                var mTTR = $("<tr></tr>");

                                mTTR.append(td1).append(td2).append(td3).append(td4).append(td5);

                                $("#music_table").append(mTTR);

                            });
                        }
                    }
                });

            };

        };
    }
}

// 绑定事件
$("#my_music_list").on('mouseover', 'li', function () {
    this.style.backgroundColor = "#E6E6E6";
    selectMyMusicList();
});

$("#my_music_list").on('mouseout', 'li', function () {
    if (this.index == musicIndex) {
        this.style.backgroundColor = "#E6E6E6";
    } else {
        this.style.backgroundColor = "#F9F9F9";
    }
    selectMyMusicList();
});

$("#my_music_list").on('click', 'li', function () {
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
    } else if (oCreateMusicListName.value.length > 30) {
        oReminderCmlfName.innerHTML = "歌单名不能大于30个字符";
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
                    // window.location.href = "myMusic.html";

                    getMyMusicList();

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

function deleteMusicList(musicListId) {
    oCreateMusicListFrameBg.style.display = "block";
    oDeleteMusiListFrame.style.display = "block";
    deleteMusicListId = musicListId;
}

// 删除歌单按钮的功能
oDmlfConfirmBtn.onclick = function () {
    $.ajax({
        url: ipAndHost + '/gdmusicserver/user/music/list/@delete',
        type: 'GET',
        dataType: 'json',
        data: {
            user_music_list_id: deleteMusicListId
        },
        error: function () {
            customAlert("网络请求错误");
        },
        success: function (result) {
            if (!result.is_success) {
                customAlert(result.message);
            } else {
                // window.location.href = "myMusic.html";


                oCreateMusicListFrameBg.style.display = "none";
                oDeleteMusiListFrame.style.display = "none";
                deleteMusicListId = null;

                getMyMusicList();

            }
        }
    });
};

// 删除我的歌单中收藏的音乐
oDmConfirmBtn.onclick = function () {
    // console.log(deleteInfo.musicId + "\n" + deleteInfo.musicListId + "\n");
    $.ajax({
        url: ipAndHost + '/gdmusicserver/un/collect/music/into/user/music/list/@uncollect',
        type: 'POST',
        dataType: 'json',
        data: {
            user_music_list_id: deleteInfo.musicListId,
            music_id: deleteInfo.musicId,
            user_id: $.cookie("uId")
        },
        error: function () {
            customAlert("网络开小差了");
        },
        success: function (result) {
            if (!result.is_success) {
                customAlert(result.message);
            } else {
                oCreateMusicListFrameBg.style.display = "none";
                oDeleteMusic.style.display = "none";
                var result = result.result;
                customAlert(result.message);
                // setTimeout(function () {
                //     window.location.href = "myMusic.html";
                // },3000);

                getMyMusicList();

            }
        }
    });
};

// 编辑歌单按钮的功能
function editMusicList(musicListId) {
    var href = "editMusicList.html?musicListId=" + musicListId;
    window.location.href = href;
}


