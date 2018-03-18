var oComment = document.getElementById("comment");
var oCmtBtn = document.getElementById("cmt_btn");
var oResidueNum = document.getElementById("residue_num");

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
                        setTimeout(function () {
                            var link = "singleSong.html?musicId=" + musicId;
                            window.location.href = link;
                        }, 3000);
                    }
                }
            });
        }
    }
};

var musicId = getUrlParam("musicId");

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
