var addInfo;

var userMusicList;

var oCreateMusicListFrameBg = document.getElementById("create_music_list_frame_bg");
var oCloseAmlf = document.getElementById("close_amlf");
var oAddMusicListFrame = document.getElementById("add_music_list_frame");

function addTheMusicToMusicList(musicId) {
    oCreateMusicListFrameBg.style.display = "block";
    oAddMusicListFrame.style.display = "block";
    addInfo = {musicId: musicId};
    $.ajax({
        url: ipAndHost + '/gdmusicserver/find/user/music/list/by/user/id/@query',
        type: 'GET',
        dataType: 'json',
        data: {
            user_id: $.cookie("uId")
        },
        error: function () {
            customAlert("网络请求错误");
        },
        success: function (result) {
            if (!result.is_success) {
                customAlert(result.message);
            } else {
                var result = result.result;
                userMusicList = result;

                $("li").remove("#amlf_middle li");

                $.each(result, function (n, result) {

                    var ailImg = $("<img>").attr("src", result.user_music_list_photo);
                    var ailDIv = $("<div class='amlfm_item_left'></div>");
                    ailDIv.append(ailImg);

                    var aitDiv = $("<p class='amlfm_item_title'>" + result.user_music_list_name + "</p>");
                    var ainDiv = $("<p class='amlfm_item_num'>" + result.num_of_music_in_user_music_list + "首</p>");

                    var aiDiv = $("<div class='amlfm_item'></div>");
                    aiDiv.append(ailDIv);
                    aiDiv.append(aitDiv);
                    aiDiv.append(ainDiv);

                    var amLis = $("<li></li>");
                    amLis.append(aiDiv);

                    $("#amlf_middle").append(amLis);
                });
            }
        }
    });
}

oCloseAmlf.onclick = function () {
    oCreateMusicListFrameBg.style.display = "none";
    oAddMusicListFrame.style.display = "none";
    addInfo = null;
};


