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
var searchCtnt = searchContent;

var allImgExt = ".jpg|.jpeg|.bmp|.png";

var oTabBar = document.getElementById("tab_bar");
var aTBLis = oTabBar.getElementsByTagName("li");

var oSearchContentInput = document.getElementById("search_content_input");
var oSearchContent = document.getElementById("search_content");

oSearchContentInput.value = getUrlParam("search_content");
oSearchContent.value = getUrlParam("search_content");

var oSearchBtn = document.getElementById("search_btn");

var oFdMusicList = document.getElementById("fd_music_list");
var oFdArtistList = document.getElementById("fd_artist_list");
var oFdArtists = document.getElementById("fd_artists");
var oFdSpecialList = document.getElementById("fd_special_list");
var oFdSpecials = document.getElementById("fd_specials");
var oFdMusicListList = document.getElementById("fd_musicList_list");
var oFdUserList = document.getElementById("fd_user_list");
var oFdUsers = document.getElementById("fd_users");

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
            oSearchContentInput.value = searchCtnt;
            findLikeMusicName(oSearchContentInput.value);
        } else if (index == 1) {
            searchIndex = 1;
            oFdMusicList.style.display = "none";
            oFdArtistList.style.display = "block";
            oFdSpecialList.style.display = "none";
            oFdMusicListList.style.display = "none";
            oFdUserList.style.display = "none";
            oSearchContentInput.value = searchCtnt;
            findLikeArtistName(oSearchContentInput.value);
        } else if (index == 2) {
            searchIndex = 2;
            oFdMusicList.style.display = "none";
            oFdArtistList.style.display = "none";
            oFdSpecialList.style.display = "block";
            oFdMusicListList.style.display = "none";
            oFdUserList.style.display = "none";
            oSearchContentInput.value = searchCtnt;
            findLikeSpecialName(oSearchContentInput.value);
        } else if (index == 3) {
            searchIndex = 3;
            oFdMusicList.style.display = "none";
            oFdArtistList.style.display = "none";
            oFdSpecialList.style.display = "none";
            oFdMusicListList.style.display = "block";
            oFdUserList.style.display = "none";
            oSearchContentInput.value = searchCtnt;
            findLikeUserMusicListName(oSearchContentInput.value);
        } else if (index == 4) {
            searchIndex = 4;
            oFdMusicList.style.display = "none";
            oFdArtistList.style.display = "none";
            oFdSpecialList.style.display = "none";
            oFdMusicListList.style.display = "none";
            oFdUserList.style.display = "block";
            oSearchContentInput.value = searchCtnt;
            findLikeNickName(oSearchContentInput.value);
        }
    }
}

oSearchBtn.onclick = function () {
    if (oSearchContentInput.value == null || oSearchContentInput.value == "" || oSearchContentInput.value.length == 0) {
        customAlert("搜索内容不能为空！");
    } else {
        searchCtnt = oSearchContentInput.value;
        if (searchIndex == 0) {
            findLikeMusicName(oSearchContentInput.value);
        } else if (searchIndex == 1) {
            findLikeArtistName(oSearchContentInput.value);
        } else if (searchIndex == 2) {
            findLikeSpecialName(oSearchContentInput.value);
        } else if (searchIndex == 3) {
            findLikeUserMusicListName(oSearchContentInput.value);
        } else if (searchIndex == 4) {
            findLikeNickName(oSearchContentInput.value);
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
                    var musicLink = $("<a>" + result.music_name + "</a>").attr("href", "javascript:toSingleSong(" + result.music_id + ");");
                    var musicDiv = $("<div class='am_w1'></div>");
                    musicDiv.append(musicLink);
                    // 歌曲操作
                    var collectLink = $("<a class='collect_btn'></a>").attr("href", "javascript:addTheMusicToMusicList(" + result.music_id + ");");
                    var operateBtns = $("<div class='operate_btn'></div>");
                    operateBtns.append(collectLink);
                    var amW2 = $("<div class='am_w2'></div>");
                    amW2.append(operateBtns);
                    // 歌曲艺人链接
                    var artistLink = $("<a>" + result.artist_name + "</a>").attr("href", "javascript:toArtist(" + result.artist_id + ");");
                    var artistDiv = $("<div class='am_w3'></div>")
                    artistDiv.append(artistLink);
                    // 专辑链接
                    var specialLink = $("<a>" + result.special_name + "</a>").attr("href", "javascript:toSpecial(" + result.special_id + ");");
                    var specialDiv = $("<div class='am_w4'></div>");
                    specialDiv.append(specialLink);
                    // 歌曲时长信息
                    var durationInfo = getMusicDuration(result.music_duration);
                    var musicDurationDiv = $("<div class='am_w5'>" + durationInfo + "</div>");
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

function findLikeArtistName(artistName) {
    $.ajax({
        url: ipAndHost + '/gdmusicserver/artist/special/music/find/like/artist/name/@query',
        type: 'GET',
        dataType: 'json',
        data: {
            artist_name: artistName
        },
        error: function () {
            customAlert("网络请求异常");
        },
        success: function (result) {
            if (!result.is_success) {
                customAlert(result.message);
            } else {
                var resLength = result.result.length;
                var shouldLength = 0;
                if (resLength % 6 == 0) {
                    shouldLength = Math.floor(resLength / 6);
                } else {
                    shouldLength = Math.floor(resLength / 6 + 1);
                }

                oFdArtistList.style.height = (shouldLength * 184 + 50) + "px";
                oFdArtists.style.height = (shouldLength * 184 + 50) + "px";

                $("li").remove("#fd_artists li");
                $.each(result.result, function (n, result) {

                    var facLinkImg = $("<img>").attr("src", result.artist_head_photo_small);
                    var facLinkSpan = $("<span></span>");
                    var facLink = $("<a></a>").attr("href", "javascript:toArtist(" + result.id + ");");
                    facLink.append(facLinkImg);
                    facLink.append(facLinkSpan);
                    var fac = $("<div class='fd_artist_cover'></div>");
                    fac.append(facLink);

                    var pLink = $("<a>" + result.artist_name + "</a>").attr("href", "javascript:toArtist(" + result.id + ");");
                    var p = $("<p></p>");
                    p.append(pLink);

                    var fdli = $("<li></li>");
                    fdli.append(fac);
                    fdli.append(p);

                    $("#fd_artists").append(fdli);

                })
            }
        }
    });
}

function findLikeSpecialName(specialName) {
    $.ajax({
        url: ipAndHost + '/gdmusicserver/artist/special/music/find/like/special/name/@query',
        type: 'GET',
        dataType: 'json',
        data: {
            special_name: specialName
        },
        error: function () {
            customAlert("网络请求异常");
        },
        success: function (result) {
            if (!result.is_success) {
                customAlert(result.message);
            } else {
                var resLength = result.result.length;
                var shouldLength = 0;
                if (resLength % 6 == 0) {
                    shouldLength = Math.floor(resLength / 5);
                } else {
                    shouldLength = Math.floor(resLength / 5 + 1);
                }

                oFdSpecialList.style.height = (shouldLength * 208 + 50) + "px";
                oFdSpecials.style.height = (shouldLength * 208 + 50) + "px";

                $("li").remove("#fd_specials li");
                $.each(result.result, function (n, result) {

                    var facLinkImg = $("<img>").attr("src", result.special_photo);
                    var facLinkSpan = $("<span></span>");
                    var facLink = $("<a></a>").attr("href", "javascript:toSpecial(" + result.special_id + ");");
                    facLink.append(facLinkImg);
                    facLink.append(facLinkSpan);
                    var fac = $("<div></div>");
                    fac.append(facLink);

                    var pLink = $("<a>" + result.special_name + "</a>").attr("href", "javascript:toSpecial(" + result.special_id + ");");
                    var p = $("<p></p>");
                    p.append(pLink);

                    var pLink2 = $("<a>" + result.artist_name + "</a>").attr("href", "javascript:toArtist(" + result.artist_id + ");");
                    var p2 = $("<p></p>");
                    p2.append(pLink2);

                    var fdli = $("<li></li>");
                    fdli.append(fac);
                    fdli.append(p);
                    fdli.append(p2);

                    $("#fd_specials").append(fdli);

                })
            }
        }
    });
}

function findLikeUserMusicListName(userMusicListName) {
    $.ajax({
        url: ipAndHost + '/gdmusicserver/find/like/user/music/list/name/@query',
        type: 'GET',
        dataType: 'json',
        data: {
            user_music_list_name: userMusicListName
        },
        error: function () {
            customAlert("网络请求错误");
        },
        success: function (result) {
            if (!result.is_success) {
                customAlert(result.message);
            } else {
                var result = result.result;
                $.each(result, function (n, result) {
                    console.log(result);
                })
            }
        }
    });
}

function findLikeNickName(nickName) {
    $.ajax({
        url: ipAndHost + '/gdmusicserver/user/service/find/like/nickname/@query',
        type: 'GET',
        dataType: 'json',
        data: {
            nickname: nickName
        },
        error: function () {
            customAlert("网络请求错误！");
        },
        success: function (result) {
            if (!result.is_success) {
                customAlert(result.message);
            } else {
                var result = result.result;

                var size = result.length;
                oFdUserList.style.height = (size * 64 + 50) + "px";
                oFdUsers.style.height = (size * 64 + 50) + "px";

                $("li").remove("#fd_users li");
                $.each(result, function (n, result) {

                    var uhpLinkImg = $("<img>");
                    if (result.head_photo.toLowerCase().match(allImgExt) == null) {
                        uhpLinkImg.attr("src", "/images/headphoto/default_head_photo.png")
                    } else {
                        uhpLinkImg.attr("src", result.head_photo);
                    }
                    var uhpLinkSpan = $("<span></span>");
                    var uhpLink = $("<a></a>").attr("href", "javascript:toUser(" + result.id + ");");
                    uhpLink.append(uhpLinkImg);
                    uhpLink.append(uhpLinkSpan);
                    var uhpDiv = $("<div class='user_head_photo'></div>");
                    uhpDiv.append(uhpLink);

                    var userNickname = $("<div class='user_nickname'>" + result.nickname + "</div>");
                    var userSex = $("<span class='sex'></span>");
                    if (result.sex == 1) {
                        userSex.css("background-position", "-70px -20px");
                    } else if (result.sex == 2) {
                        userSex.css("background-position", "-70px 0");
                    } else {
                        userSex.css("display", "none");
                    }
                    var unasLink = $("<a class='user_nickname_and_sex'></a>").attr("href", "javascript:toUser(" + result.id + ");");
                    unasLink.append(userNickname);
                    unasLink.append(userSex);
                    var userIntro = $("<div class='user_intro'>" + result.introduction + "</div>");
                    var userInfo = $("<div class='user_info'></div>");

                    userInfo.append(unasLink);
                    userInfo.append(userIntro);

                    var userLi = $("<li></li>");
                    userLi.append(uhpDiv);
                    userLi.append(userInfo);

                    $("#fd_users").append(userLi);

                });
            }
        }
    });
}

findLikeMusicName(searchContent);


