function getUrlParam(name) {
    var paramArr = decodeURIComponent(window.location.href.split('?')[1]);
    var subParamArr = paramArr.split('&');
    for (var i = 0; i < subParamArr.length; i++) {
        if (subParamArr[i].split('=')[0] == name) {
            return subParamArr[i].split('=')[1];
        } else {
            return null;
        }
    }
}

var searchContent = getUrlParam("search_content");

var searchIndex = 0;

var oTabBar = document.getElementById("tab_bar");
var aTBLis = oTabBar.getElementsByTagName("li");

var oSearchContentInput = document.getElementById("search_content_input");
var oSearchContent = document.getElementById("search_content");

oSearchContentInput.value = getUrlParam("search_content");
oSearchContent.value = getUrlParam("search_content");

var oSearchBtn = document.getElementById("search_btn");

var oFdMusicList = document.getElementById("fd_music_list");
var oFdArtistList = document.getElementById("fd_artist_list");
var oFdSpecialList = document.getElementById("fd_special_list");
var oFdMusicListList = document.getElementById("fd_musicList_list");
var oFdUserList = document.getElementById("fd_user_list");

for (var i = 0; i < aTBLis.length; i++) {
    aTBLis[i].index = i;
    aTBLis[i].onclick = function () {
        var index = this.index;
        for (var j = 0; j < aTBLis.length; j++) {
            var oTBLiA = aTBLis[j].getElementsByTagName("a")[0];
            oTBLiA.className = null;
        }
        var oTBLiSltA = aTBLis[index].getElementsByTagName("a")[0];
        oTBLiSltA.className = "tb_slt";
        if (index == 0) {
            searchIndex = 0;
            oFdMusicList.style.display = "block";
            oFdArtistList.style.display = "none";
            oFdSpecialList.style.display = "none";
            oFdMusicListList.style.display = "none";
            oFdUserList.style.display = "none";
            findLikeMusicName(oSearchContentInput.value);
        } else if (index == 1) {
            searchIndex = 1;
            oFdMusicList.style.display = "none";
            oFdArtistList.style.display = "block";
            oFdSpecialList.style.display = "none";
            oFdMusicListList.style.display = "none";
            oFdUserList.style.display = "none";
        } else if (index == 2) {
            searchIndex = 2;
            oFdMusicList.style.display = "none";
            oFdArtistList.style.display = "none";
            oFdSpecialList.style.display = "block";
            oFdMusicListList.style.display = "none";
            oFdUserList.style.display = "none";
        } else if (index == 3) {
            searchIndex = 3;
            oFdMusicList.style.display = "none";
            oFdArtistList.style.display = "none";
            oFdSpecialList.style.display = "none";
            oFdMusicListList.style.display = "block";
            oFdUserList.style.display = "none";
        } else if (index == 4) {
            searchIndex = 4;
            oFdMusicList.style.display = "none";
            oFdArtistList.style.display = "none";
            oFdSpecialList.style.display = "none";
            oFdMusicListList.style.display = "none";
            oFdUserList.style.display = "block";
        }
    }
}

oSearchBtn.onclick = function () {
    if (oSearchContentInput.value==null||oSearchContentInput.value==""||oSearchContentInput.value.length==0) {
        customAlert("搜索内容不能为空！");
    } else {
        if (searchIndex == 0) {
            findLikeMusicName(oSearchContentInput.value);
        } else if (searchIndex == 1) {

        } else if (searchIndex == 2) {

        } else if (searchIndex == 3) {

        } else if (searchIndex == 4) {

        }
    }
};

function findLikeMusicName(musicName) {
    $.ajax({
        url: ipAndHost + '/gdmusicserver/artist/special/music/find/like/music/name/@query',
        type: 'GET',
        dataType: 'json',
        data: {
            music_name: musicName
        },
        error: function () {
            customAlert("网络异常，请求更新信息失败！");
        },
        success: function (result) {
            if (result.is_success) {
                var result = result.result;
                oFdMusicList.style.height = (result.length * 43) + 50 + "px";
                $("div").remove("#fd_music_list .a_music");
                $.each(result, function (n, result) {
                    // console.log(result);
                    // 歌曲链接
                    var musicLink = $("<a>"+result.music_name+"</a>").attr("href","javascript:toSingleSong("+result.music_id+");");
                    var musicDiv = $("<div class='am_w1'></div>");
                    musicDiv.append(musicLink);
                    // 歌曲操作
                    var collectLink = $("<a class='collect_btn'></a>").attr("href", "javascript:addTheMusicToMusicList("+result.music_id+");");
                    var operateBtns = $("<div class='operate_btn'></div>");
                    operateBtns.append(collectLink);
                    var amW2 = $("<div class='am_w2'></div>");
                    amW2.append(operateBtns);
                    // 歌曲艺人链接
                    var artistLink = $("<a>"+result.artist_name+"</a>").attr("href", "javascript:toArtist("+result.artist_id+");");
                    var artistDiv = $("<div class='am_w3'></div>")
                    artistDiv.append(artistLink);
                    // 专辑链接
                    var specialLink = $("<a>"+result.special_name+"</a>").attr("href", "javascript:toSpecial("+result.special_id+");");
                    var specialDiv = $("<div class='am_w4'></div>");
                    specialDiv.append(specialLink);
                    // 歌曲时长信息
                    var durationInfo = getMusicDuration(result.music_duration);
                    var musicDurationDiv = $("<div class='am_w5'>"+durationInfo+"</div>");
                    // 一首歌的div
                    var aMusicDiv = $("<div class='a_music'></div>");
                    aMusicDiv.append(musicDiv);
                    aMusicDiv.append(amW2);
                    aMusicDiv.append(artistDiv);
                    aMusicDiv.append(specialDiv);
                    aMusicDiv.append(musicDurationDiv);
                    // 将歌曲加入列表中
                    $("#fd_music_list").append(aMusicDiv);
                });
            } else {
                customAlert(result.message);
            }
        }
    });
}

findLikeMusicName(searchContent);


