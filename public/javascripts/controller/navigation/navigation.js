window.onload = function () {

    // var oIframe = $(".middle_content iframe");

    $(".logo").click(function () {
        window.location.href="index.html";
    });

    var oNavigationUl = document.getElementById("navigation_ul");
    var oLis = oNavigationUl.getElementsByTagName("li");

    for (var i = 0; i < oLis.length; i++) {
        oLis[i].index = i;
        oLis[i].onclick = function () {
            // for (var j = 0; j < oLis.length; j++) {
            //     oLis[j].style.backgroundColor = "#242424";
            //     oLis[j].style.color = "#CCCCCC";
            // }
            var index = this.index;
            // oLis[index].style.backgroundColor="#000000";
            // oLis[index].style.color="#FFFFFF";
            if (index == 0) {
                window.location.href="index.html";
            } else if (index == 1) {
                window.location.href="myMusic.html";
            } else if (index == 2) {
                window.location.href="myCollection.html";
            } else {
                window.location.href="settings.html";
            }
        };
    }

};