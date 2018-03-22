var userMusicListId = getUrlParam("userMusicListId");

var userMusicListUserId;

$.ajax({
    url: ipAndHost + '/gdmusicserver/show/a/user/music/list/by/user/music/list/id/@query',
    type: 'GET',
    dataType: 'json',
    data: {
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

            userMusicListUserId = result.user_id;

            $("#uml_photo").attr("src", result.user_music_list_photo);
            $("#tit").text(result.user_music_list_name);
            $("#crt_head_link").attr("href", "javascript:toUser(" + result.user_id + ");");
            $("#crt_head").attr("src", result.user_head_photo);
            $("#crt_usr").text(result.user_nickname).attr("href", "javascript:toUser(" + result.user_id + ");");

            var umlCreateTime = timestampToTime(result.user_music_list_created_time / 1000);
            $("#crt_time").html(umlCreateTime.year + "-" + umlCreateTime.month + "-" + umlCreateTime.day + "&nbsp;创建");

            $("#play_btn").attr("href", "javascript:playMusicList(" + result.user_music_list_id + ");");
            $("#collect_btn").attr("href", "javascript:collectUserMusicList(" + result.user_music_list_id + ");");

            if (result.user_music_list_intro.length != 0) {
                var musicListIntro = result.user_music_list_intro.split("\n");
                var mlIntro = "<b>介绍：</b><br>";
                for (var i = 0; i < musicListIntro.length; i++) {
                    mlIntro += (musicListIntro[i] + "<br>");
                }
                $("#uoi_h4").html(mlIntro);
            } else {
                $("#uoi_h4").html("");
            }

            $("#sontb_num").text(result.num_of_music_in_user_music_list + "首歌");


            $.ajax({
                url: ipAndHost + '/gdmusicserver/get/music/in/user/music/list/@query',
                type: 'GET',
                dataType: 'json',
                data: {
                    user_id: userMusicListUserId,
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

                        $("tr").remove("#m_table tr");

                        var thw1Div = $("<div class='wp' style='background: none;'></div>");
                        var thw1 = $("<th class='th_w1'></th>");
                        thw1.append(thw1Div);

                        var thw2Div = $("<div class='wp'>歌曲标题</div>");
                        var thw2 = $("<th class='th_w2'></th>");
                        thw2.append(thw2Div);

                        var thw3Div = $("<div class='wp'>时长</div>");
                        var thw3 = $("<th class='th_w3'></th>");
                        thw3.append(thw3Div);

                        var thw4Div = $("<div class='wp'>歌手</div>");
                        var thw4 = $("<th class='th_w4'></th>");
                        thw4.append(thw4Div);

                        var thw5Div = $("<div class='wp'>专辑</div>");
                        var thw5 = $("<th class='th_w5'></th>");
                        thw5.append(thw5Div);

                        var mTTr = $("<tr></tr>");
                        mTTr.append(thw1).append(thw2).append(thw3).append(thw4).append(thw5);
                        $("#m_table").append(mTTr);

                        $.each(result, function (n, result) {
                            var td1Span = $("<span class='num'>" + (n + 1) + "</span>");
                            var td1 = $("<td></td>");
                            td1.append(td1Span);

                            var td2DivLink = $("<a>" + result.music_name + "</a>").attr("href", "javascript:toSingleSong(" + result.music_id + ");");
                            var td2Div = $("<div class='music_title'></div>");
                            td2Div.append(td2DivLink);
                            var td2 = $("<td></td>");
                            td2.append(td2Div);

                            var td3Span = $("<span>" + getMusicDuration(result.music_duration) + "</span>");
                            var td3DivLink = $("<a class='add_music'></a>").attr("href", "javascript:addTheMusicToMusicList(" + result.music_id + ");");
                            var td3Div = $("<div class='opt_btn'></div>");
                            td3Div.append(td3DivLink);
                            var td3 = $("<td class='s-fc3'></td>");
                            td3.append(td3Span).append(td3Div);

                            var td4SpanLink = $("<a>"+result.artist_name+"</a>").attr("href","javascript:toArtist("+result.artist_id+");");
                            var td4Span = $("<span class='author'></span>");
                            td4Span.append(td4SpanLink);
                            var td4 = $("<td></td>");
                            td4.append(td4Span);

                            var td5SpanLink = $("<a>"+result.special_name+"</a>").attr("href","javascript:toSpecial("+result.special_id+");");
                            var td5Span = $("<span class='special'></span>");
                            td5Span.append(td5SpanLink);
                            var td5 = $("<td></td>");
                            td5.append(td5Span);

                            var mTTR = $("<tr></tr>");
                            mTTR.append(td1).append(td2).append(td3).append(td4).append(td5);

                            $("#m_table").append(mTTR);

                        });

                    }
                }
            });

        }
    }
});








