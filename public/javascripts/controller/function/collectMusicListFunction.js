function collectUserMusicList(userMusicListId) {
    if ($.cookie("uId") == null) {
        customAlert("登录后才能收藏歌单哦");
    } else {
        $.ajax({
            url: ipAndHost + '/gdmusicserver/collect/other/user/music/list/@collect',
            type: 'POST',
            dataType: 'json',
            data: {
                user_id: $.cookie("uId"),
                user_music_list_id: userMusicListId
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
                }
            }
        });
    }

}