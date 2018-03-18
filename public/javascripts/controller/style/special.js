var specialId = getUrlParam("specialId");

$.ajax({
    url: ipAndHost + '/gdmusicserver/find/special/by/special/id/@query',
    type: 'GET',
    dataType: 'json',
    data: {
        special_id: specialId
    },
    error: function () {
        customAlert("网络开小差了");
    },
    success: function (result) {
        if (!result.is_success) {
            customAlert(result.message);
        } else {
            var result = result.result;

            $("#special_cover").attr("src", result.special_photo);
            $("#s_title").text(result.special_name);
            $("#ats_of_special").text(result.artist_name).attr("href", "javascript:toArtist(" + result.artist_id + ");");
            var spd = timestampToTime(result.publish_time / 1000);
            var spdTitle = spd.year + "-" + spd.month + "-" + spd.day;
            $("#pbls_of_special").html("<b>发行时间：</b>" + spdTitle);
            $("#pbcp_of_special").html("<b>发行公司：</b>" + result.publish_company);
            $("#sontb_num").text(result.num_of_music_in_special + "首歌");

        }
    }
});

$.ajax({
    url: ipAndHost + '/gdmusicserver/find/music/in/special/by/special/id/@query',
    type: 'GET',
    dataType: 'json',
    data: {
        special_id: specialId
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

            var th1Div = $("<div class='wp' style='background: none;'></div>");
            var th1 = $("<th class='th_w1'></th>");
            th1.append(th1Div);

            var th2Div = $("<div class='wp'>歌曲标题</div>");
            var th2 = $("<th class='th_w2'></th>");
            th2.append(th2Div);

            var th3Div = $("<div class='wp'>时长</div>");
            var th3 = $("<th class='th_w3'></th>");
            th3.append(th3Div);

            var th4Div = $("<div class='wp'>歌手</div>");
            var th4 = $("<th class='th_w4'></th>");
            th4.append(th4Div);

            var mTTr = $("<tr></tr>");
            mTTr.append(th1).append(th2).append(th3).append(th4);

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

                var musicDuration = getMusicDuration(result.music_duration);
                var td3Span = $("<span>" + musicDuration + "</span>");
                var td3DivLink = $("<a class='add_music'></a>").attr("href", "javascript:addTheMusicToMusicList(" + result.music_id + ");");
                var td3Div = $("<div class='opt_btn'></div>");
                td3Div.append(td3DivLink);
                var td3 = $("<td class='s-fc3'></td>");
                td3.append(td3Span).append(td3Div);

                var td4SpanLink = $("<a>" + result.artist_name + "</a>").attr("href", "javascript:toArtist(" + result.artist_id + ");");
                var td4Span = $("<span class='author'></span>");
                td4Span.append(td4SpanLink);
                var td4 = $("<td></td>");
                td4.append(td4Span);

                var mTTR = $("<tr></tr>");
                mTTR.append(td1).append(td2).append(td3).append(td4);

                $("#m_table").append(mTTR);

            });
        }
    }
});

