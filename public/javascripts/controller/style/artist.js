var oAtsAllSpecial = document.getElementById("ats_all_special");

var oAtsIntroduction = document.getElementById("ats_introduction");

var oAtsTabBar = document.getElementById("ats_tab_bar");
var oATBLis = oAtsTabBar.getElementsByTagName("li");

var whichSelect = 0;

for (var i = 0; i < oATBLis.length; i++) {
    oATBLis[i].index = i;
    oATBLis[i].onmouseover = function () {
        var index = this.index;
        if (index != whichSelect) {
            var oASlt = oATBLis[index].getElementsByTagName("a")[0];
            var oEmSlt = oASlt.getElementsByTagName("em")[0];
            oEmSlt.style.backgroundPosition = "right -45px";
        }
        oATBLis[index].onmouseout = function () {
            var index = this.index;
            if (index != whichSelect) {
                var oASlt = oATBLis[index].getElementsByTagName("a")[0];
                var oEmSlt = oASlt.getElementsByTagName("em")[0];
                oASlt.style.background = "url(\"../../../images/style/tab.png\") 0 9999px no-repeat;";
                oEmSlt.style.background = "url(\"../../../images/style/tab.png\") 0 9999px no-repeat";
            }
        };
    };
    oATBLis[i].onclick = function () {
        var index = this.index;
        whichSelect = index;
        for (var j = 0; j < oATBLis.length; j++) {
            var oA = oATBLis[j].getElementsByTagName("a")[0];
            var oEm = oA.getElementsByTagName("em")[0];
            oA.style.background = "url(\"../../../images/style/tab.png\") 0 9999px no-repeat";
            oEm.style.background = "url(\"../../../images/style/tab.png\") 0 9999px no-repeat";
        }
        var oASlt = oATBLis[index].getElementsByTagName("a")[0];
        var oEmSlt = oASlt.getElementsByTagName("em")[0];
        oASlt.style.backgroundPosition = "left -90px";
        oEmSlt.style.backgroundPosition = "right -90px";
        if (index == 0) {
            oAtsAllSpecial.style.display = "block";
            oAtsIntroduction.style.display = "none";
        } else {
            oAtsAllSpecial.style.display = "none";
            oAtsIntroduction.style.display = "block";
        }
    };
}

var artistId = getUrlParam("artistId");

$.ajax({
    url: ipAndHost + '/gdmusicserver/find/artist/by/artist/id/@query',
    type: 'GET',
    dataType: 'json',
    data: {
        artist_id: artistId
    },
    error: function () {
        customAlert("网络开小差了")
    },
    success: function (result) {
        if (!result.is_success) {
            customAlert(result.message);
        } else {
            var result = result.result;
            $("#ats_name").text(result.artist_name);
            $("#ats_other_name").text(result.artist_other_name);
            $("#ats_head_photo_big").attr("src", result.artist_head_photo_big);
            $("#ats_introduction h2").html("<i>&nbsp;</i>" + result.artist_name + "简介");
            $("#ats_introduction p").text(result.artist_intro);
        }
    }
});

$.ajax({
    url: ipAndHost + '/gdmusicserver/find/specials/by/artist/id/@query',
    type: 'GET',
    dataType: 'json',
    data: {
        artist_id: artistId
    },
    error: function () {
        customAlert("网路开小差了");
    },
    success: function (result) {
        if (!result.is_success) {
            customAlert(result.message);
        } else {
            var result = result.result;

            $("li").remove("#ats_all_special li");

            $.each(result, function (n, result) {

                var ascLinkImg = $("<img>").attr("src", result.special_photo);
                var ascLinkSpan = $("<span class='ats_sc_msk'></span>");
                var ascLinik = $("<a></a>").attr("href", "javascript:toSpecial(" + result.id + ");");
                ascLinik.append(ascLinkImg).append(ascLinkSpan);
                var ascDiv = $("<div class='ats_special_cover'></div>");
                ascDiv.append(ascLinik);

                var astLink = $("<a>" + result.special_name + "</a>").attr("href", "javascript:toSpecial(" + result.id + ");");
                var astP = $("<p class='ats_special_title'></p>");
                astP.append(astLink);

                var spd = timestampToTime(result.publish_time / 1000);
                var spdTitle = spd.year + "." + spd.month + "." + spd.day;
                var aspdSpan = $("<span class='ats_spd'>"+spdTitle+"</span>");
                var aspdP = $("<p class='ats_special_publish_date'></p>");
                aspdP.append(aspdSpan);

                var aasLi = $("<li></li>");
                aasLi.append(ascDiv).append(astP).append(aspdP);

                $("#ats_all_special").append(aasLi);
            });

        }
    }
});


