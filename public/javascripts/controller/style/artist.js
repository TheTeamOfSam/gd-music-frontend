var oAtsAllSpecial = document.getElementById("ats_all_special");
var aAASLis = oAtsAllSpecial.getElementsByTagName("li");
var oAtsIntroduction = document.getElementById("ats_introduction");

var oAtsTabBar = document.getElementById("ats_tab_bar");
var oATBLis = oAtsTabBar.getElementsByTagName("li");

var whichSelect = 0;

var heightRemainder = aAASLis.length % 4;
var heightLength;
if (heightRemainder == 0) {
    heightLength = aAASLis.length / 4 + 1;
} else {
    heightLength = aAASLis.length / 4;
}

oAtsAllSpecial.style.height = heightLength * (175 + 30) + 100 + "px";

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




