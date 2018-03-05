function getUrlParam(name) {
    var paramArr = window.location.href.split('?')[1];
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
        } else if (index == 1) {
            console.log("歌手");
        } else if (index == 2) {
            console.log("专辑");
        } else if (index == 3) {
            console.log("歌单");
        } else if (index == 4) {
            console.log("用户");
        }
    }
}


