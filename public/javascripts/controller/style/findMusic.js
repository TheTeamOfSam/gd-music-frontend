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

console.log(getUrlParam("search_content"));

var oTabBar = document.getElementById("tab_bar");
var aTBLis = oTabBar.getElementsByTagName("li");

var oSearchContentInput = document.getElementById("search_content_input");
var oSearchContent = document.getElementById("search_content");

oSearchContentInput.value = getUrlParam("search_content");
oSearchContent.value = getUrlParam("search_content");

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
            console.log("单曲");
            oFdMusicList.style.display = "block";
            oFdArtistList.style.display = "none";
            oFdSpecialList.style.display = "none";
            oFdMusicListList.style.display = "none";
            oFdUserList.style.display = "none";
        } else if (index == 1) {
            console.log("歌手");
            oFdMusicList.style.display = "none";
            oFdArtistList.style.display = "block";
            oFdSpecialList.style.display = "none";
            oFdMusicListList.style.display = "none";
            oFdUserList.style.display = "none";
        } else if (index == 2) {
            console.log("专辑");
            oFdMusicList.style.display = "none";
            oFdArtistList.style.display = "none";
            oFdSpecialList.style.display = "block";
            oFdMusicListList.style.display = "none";
            oFdUserList.style.display = "none";
        } else if (index == 3) {
            console.log("歌单");
            oFdMusicList.style.display = "none";
            oFdArtistList.style.display = "none";
            oFdSpecialList.style.display = "none";
            oFdMusicListList.style.display = "block";
            oFdUserList.style.display = "none";
        } else if (index == 4) {
            console.log("用户");
            oFdMusicList.style.display = "none";
            oFdArtistList.style.display = "none";
            oFdSpecialList.style.display = "none";
            oFdMusicListList.style.display = "none";
            oFdUserList.style.display = "block";
        }
    }
}


