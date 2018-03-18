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
    console.log(oComment.value);
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
            $("#collect_btn").attr("href","javascript:addTheMusicToMusicList("+result.music_id+");");

        }
    }
});
