var oComment = document.getElementById("comment");
var oCmtBtn = document.getElementById("cmt_btn");
var oResidueNum = document.getElementById("residue_num");

var deleteMusicCommentId;

oComment.onfocus = function () {
    oComment.onkeydown = function () {
        var cmtValue = oComment.value;
        var residueNum = 150 - cmtValue.length;
        oResidueNum.innerHTML = residueNum;
        if (residueNum < 0) {
            oResidueNum.style.color = "red";
        } else {
            oResidueNum.style.color = "#999999";
        }
    };
};

oCmtBtn.onclick = function () {
    if ($.cookie("uId") == null) {
        customAlert("登录后才能进行评论哦");
    } else {
        if (oComment.value.length == 0 || oComment.value == "") {
            customAlert("评论内容不能为空！");
        } else if (oComment.value.length > 150) {
            customAlert("评论字数超过限制");
        } else {
            $.ajax({
                url: ipAndHost + '/gdmusicserver/comment/music/@comment',
                type: 'POST',
                dataType: 'json',
                data: {
                    user_id: $.cookie("uId"),
                    music_id: musicId,
                    comment_content: oComment.value
                },
                error: function () {
                    customAlert("网络开小差了");
                },
                success: function (result) {
                    if (!result.is_success) {
                        customAlert(result.message);
                    } else {
                        var result = result.result;
                        customAlert(result.message);
                        // setTimeout(function () {
                        //     var link = "singleSong.html?musicId=" + musicId;
                        //     window.location.href = link;
                        // }, 3000);

                        oComment.value = null;
                        oResidueNum.value = 150;

                        getMusicComment();

                    }
                }
            });
        }
    }
};

var musicId = getUrlParam("musicId");

function getMusicInfo() {
    $.ajax({
        url: ipAndHost + '/gdmusicserver/find/music/by/music/id/@query',
        type: 'GET',
        dataType: 'json',
        data: {
            music_id: musicId
        },
        error: function () {
            customAlert("网络请求错误");
        },
        success: function (result) {
            if (!result.is_success) {
                customAlert(result.message);
            } else {
                var result = result.result;

                $("#ss_cover").attr("src", result.special_photo);
                $("#ss_name").text(result.music_name);
                $("#ss_author").text(result.artist_name).attr("href", "javascript:toArtist(" + result.artist_id + ");");
                $("#ss_special").text(result.special_name).attr("href", "javascript:toSpecial(" + result.special_id + ");");
                $("#collect_btn").attr("href", "javascript:addTheMusicToMusicList(" + result.music_id + ");");

            }
        }
    });
}

getMusicInfo();

function getMyHeadPhoto() {
    if ($.cookie("uId") == null) {
        $("#my_head_photo").attr("src", "/images/headphoto/default_head_photo.png");
    } else {
        $.ajax({
            url: ipAndHost + '/gdmusicserver/user/service/info/@get',
            type: 'POST',
            dataType: 'json',
            data: {
                uID: $.cookie("uId")
            },
            error: function () {
                customAlert("网络请求错误，请稍候重试！");
            },
            success: function (result) {
                if (!result.is_success) {
                    customAlert(result.message);
                } else {
                    var user = result.result;
                    var allImgExt = ".jpg|.jpeg|.bmp|.png";
                    if (user.head_photo.toLowerCase().match(allImgExt) == null) {
                        $("#my_head_photo").attr("src", "/images/headphoto/default_head_photo.png");
                    } else {
                        $("#my_head_photo").attr("src", user.head_photo);
                    }
                }
            }
        });
    }
}

getMyHeadPhoto();

function getMusicComment() {
    $.ajax({
        url: ipAndHost + '/gdmusicserver/get/music/comment/by/music/id/or/user/id/@query',
        type: 'GET',
        dataType: 'json',
        data: {
            user_id: $.cookie("uId"),
            music_id: musicId
        },
        error: function () {
            customAlert("网络开小差了");
        },
        success: function (result) {
            if (!result.is_success) {
                customAlert(result.message);
            } else {
                var result = result.result;

                $("li").remove("#all_cmt li");

                $.each(result, function (n, result) {
                    console.log(result);

                    var headLinkImg = $("<img>").attr("src", result.user_head_photo);
                    var headLink = $("<a></a>").attr("href", "javascript:toUser(" + result.user_id + ");").append(headLinkImg);
                    var headDiv = $("<div class='head'></div>").append(headLink);

                    var ctLink = $("<a>" + result.user_nickname + "</a>").attr("href", "javascript:toUser(" + result.user_id + ");");
                    var dtDiv = $("<div class='cntwrap_top'></div>").append(ctLink).append("：" + result.music_comment_content);

                    var cntTime = timestampToTime(result.music_comment_time / 1000);
                    var cntT = $("<div class='cnt_time'></div>").append(cntTime.year + "年" + cntTime.month + "月" + cntTime.day + "日");

                    var cbDiv = $("<div class='cntwrap_bottom'></div>").append(cntT);

                    if (!result.is_me_like_comment) {
                        var lcbI = $("<i class='like_cmt'></i>").css("backgroundPosition", "-150px 0");
                        var lcbLink = $("<a class='like_comment_btn'></a>").attr("href", "javascript:likeComment("
                            + result.music_comment_id + ");").append(lcbI);
                        if (result.num_of_like_comment_of_music > 0) {
                            var lcbSpan = $("<span>&nbsp;(" + result.num_of_like_comment_of_music + ")</span>");
                            lcbLink.append(lcbSpan);
                        }
                        cbDiv.append(lcbLink);
                    } else {
                        var lcbI = $("<i class='like_cmt'></i>").css("backgroundPosition", "-170px 0");
                        var lcbLink = $("<a class='like_comment_btn'></a>").attr("href", "javascript:unLikeComment("
                            + result.music_comment_id + ");").append(lcbI);
                        if (result.num_of_like_comment_of_music > 0) {
                            var lcbSpan = $("<span>&nbsp;(" + result.num_of_like_comment_of_music + ")</span>");
                            lcbLink.append(lcbSpan);
                        }
                        cbDiv.append(lcbLink);
                    }

                    if (result.is_my_comment) {
                        var cbSpan = $("<span class='sep'>|</span>");
                        var cbLink = $("<a class='delete_comment_btn'>删除</a>").attr("href",
                            "javascript:deleteMusicComment(" + result.music_comment_id + ");");
                        cbDiv.append(cbSpan).append(cbLink);
                    }

                    var cntWrapDiv = $("<div class='cntwrap'></div>").append(dtDiv).append(cbDiv);

                    var acmtLi = $("<li></li>").append(headDiv).append(cntWrapDiv);

                    $("#all_cmt").append(acmtLi);
                });

            }
        }
    });
}

getMusicComment();

function likeComment(musicCommentId) {
    if ($.cookie("uId") == null) {
        customAlert("登录后才能给评论点赞哦");
    } else {
        $.ajax({
            url: ipAndHost + '/gdmusicserver/like/music/comment/@like',
            type: 'POST',
            dataType: 'json',
            data: {
                music_comment_id: musicCommentId,
                user_id: $.cookie("uId")
            },
            error: function () {
                customAlert("网络开小差了");
            },
            success: function (result) {
                if (!result.is_success) {
                    customAlert(result.message);
                } else {
                    var result = result.result;
                    customAlert(result.message);
                    // setTimeout(function () {
                    //     var link = "singleSong.html?musicId=" + musicId;
                    //     window.location.href = link;
                    // }, 3000);

                    getMusicComment();

                }
            }
        });
    }
}

function unLikeComment(musicCommentId) {
    $.ajax({
        url: ipAndHost + '/gdmusicserver/un/like/music/comment/@unlike',
        type: 'POST',
        dataType: 'json',
        data: {
            music_comment_id: musicCommentId,
            user_id: $.cookie("uId")
        },
        error: function () {
            customAlert("网络开小差了");
        },
        success: function (result) {
            if (!result.is_success) {
                customAlert(result.message);
            } else {
                var result = result.result;
                customAlert(result.message);
                // setTimeout(function () {
                //     var link = "singleSong.html?musicId=" + musicId;
                //     window.location.href = link;
                // }, 3000);

                getMusicComment();

            }
        }
    });
}

function deleteMusicComment(musicCommentId) {
    $("#create_music_list_frame_bg").css("display", "block");
    $("#delete_music_list_frame").css("display", "block");
    deleteMusicCommentId = musicCommentId;
}

$("#dmlf_confirm_btn").click(function () {
    deleteMC(deleteMusicCommentId);
});

$("#dmlf_cancel_btn").click(function () {
    $("#create_music_list_frame_bg").css("display", "none");
    $("#delete_music_list_frame").css("display", "none");
    deleteMusicCommentId = null;
});

function deleteMC(musicCommentId) {
    $.ajax({
        url: ipAndHost + '/gdmusicserver/delete/music/comment/@delete',
        type: 'POST',
        dataType: 'json',
        data: {
            music_comment_id: musicCommentId
        },
        error: function () {
            customAlert("网络开小差了");
        },
        success: function (result) {
            if (!result.is_success) {
                customAlert(result.message);
            } else {
                var result = result.result;
                $("#create_music_list_frame_bg").css("display", "none");
                $("#delete_music_list_frame").css("display", "none");
                customAlert(result.message);


                // setTimeout(function () {
                //     var link = "singleSong.html?musicId=" + musicId;
                //     window.location.href = link;
                // }, 3000);

                getMusicComment();

            }
        }
    });
}

