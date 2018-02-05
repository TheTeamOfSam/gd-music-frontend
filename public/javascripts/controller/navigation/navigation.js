window.onload = function () {

    var oIframe = $(".middle_content iframe");

    $(".logo_min").click(function () {
        oIframe.attr("src","findMusic.html");
    });

    var oNavigationUl = document.getElementById("navigation_ul");
    var oLis = oNavigationUl.getElementsByTagName("li");

    for (var i = 0; i < oLis.length; i++) {
        oLis[i].index = i;
        oLis[i].onclick = function () {
            for (var j = 0; j < oLis.length; j++) {
                oLis[j].style.backgroundColor = "#242424";
                oLis[j].style.color = "#CCCCCC";
            }
            var index = this.index;
            oLis[index].style.backgroundColor="#000000";
            oLis[index].style.color="#FFFFFF";
            if (index == 0) {
                oIframe.attr("src","findMusic.html");
            } else if (index == 1) {
                oIframe.attr("src","myMusic.html");
            } else if (index == 2) {
                oIframe.attr("src","myCollection.html");
            } else {
                oIframe.attr("src","settings.html");
            }
        };
    }

};