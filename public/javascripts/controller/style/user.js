var userId = getUrlParam("userId");

$.ajax({
    url: ipAndHost + '/gdmusicserver/show/user/page/info/and/num/of/created/and/collected/@query',
    type: 'GET',
    dataType: 'json',
    data: {
        user_id: userId
    },
    error: function () {
        customAlert("网络开小差了");
    },
    success: function (result) {
        if (!result.is_success) {
            customAlert(result.message);
        } else {
            var result = result.result;




            $("#ui_head_photo").attr("src", result.user_head_photo);
            $("#ui_name").text(result.user_nickname);
            if (result.user_sex == 1) {
                $("#ui_sex").css("backgroundPosition", "-41px -57px");
            } else if (result.user_sex == 2) {
                $("#ui_sex").css("backgroundPosition", "-41px -27px");
            } else {
                $("#ui_sex").css("display", "none");
            }
            if (result.user_introduction == null || result.user_introduction == "") {
                $("#ui_intro").css("display", "none");
            } else {
                $("#ui_intro").text("个人介绍：" + result.user_introduction);
            }
            $("#ui_area").text("所在地区：" + result.user_province + "-" + result.user_city);
            $("#user_created_mlt").text(result.user_nickname + "创建的歌单（" + result.num_of_user_created_music_list + "）");
            $("#user_collected_mlt").text(result.user_nickname + "收藏的歌单（" + result.num_of_user_collected_music_list + "）");

        }
    }
});

$.ajax({
    url: ipAndHost + '/gdmusicserver/find/user/music/list/by/user/id/@query',
    type: 'GET',
    dataType: 'json',
    data: {
        user_id: userId
    },
    error: function () {
        customAlert("网络开小差了");
    },
    success: function (result) {
        if (!result.is_success) {
            customAlert(result.message);
        } else {
            var result = result.result;

            $("li").remove("#user_created_ml li");
            $.each(result, function (n, result) {
                var userMusicListLinkImg = $("<img>").attr("src", result.user_music_list_photo);
                var userMusicListLinkSpan = $("<span class='msk'></span>");
                var userMusicListLink = $("<a></a>")
                    .attr("href", "javascript:toUserMusicList(" + result.user_music_list_id + ");");
                userMusicListLink.append(userMusicListLinkImg);
                userMusicListLink.append(userMusicListLinkSpan);

                var decLink = $("<a>" + result.user_music_list_name + "</a>")
                    .attr("href", "javascript:toUserMusicList(" + result.user_music_list_id + ");");
                var decDiv = $("<p class='dec'></p>");
                decDiv.append(decLink);

                var ucmlLI = $("<li></li>");
                ucmlLI.append(userMusicListLink);
                ucmlLI.append(decDiv);

                $("#user_created_ml").append(ucmlLI);
            });
        }
    }
});

$.ajax({
    url: ipAndHost + '/gdmusicserver/show/collected/other/user/music/list/by/user/id/@query',
    type: 'GET',
    dataType: 'json',
    data: {
        user_id: userId
    },
    error: function () {
        customAlert("网络开小差了");
    },
    success: function (result) {
        if (!result.is_success) {
            customAlert(result.message);
        } else {
            var result = result.result;
            $("li").remove("#user_collected_ml li");
            $.each(result, function (n, result) {
                var userMusicListLinkImg = $("<img>").attr("src", result.user_music_list_photo);
                var userMusicListLinkSpan = $("<span class='msk'></span>");
                var userMusicListLink = $("<a></a>")
                    .attr("href", "javascript:toUserMusicList(" + result.user_music_list_id + ");");
                userMusicListLink.append(userMusicListLinkImg);
                userMusicListLink.append(userMusicListLinkSpan);

                var decLink = $("<a>" + result.user_music_list_name + "</a>")
                    .attr("href", "javascript:toUserMusicList(" + result.user_music_list_id + ");");
                var decDiv = $("<p class='dec'></p>");
                decDiv.append(decLink);

                var ucmlLI = $("<li></li>");
                ucmlLI.append(userMusicListLink);
                ucmlLI.append(decDiv);

                $("#user_collected_ml").append(ucmlLI);
            });
        }
    }
});







