window.onload = function () {

    $(".logo").click(function () {
        window.location.href="index.html";
    });

    var oNavigationUl = document.getElementById("navigation_ul");
    var oNavLis = oNavigationUl.getElementsByTagName("li");

    for (var i = 0; i < oNavLis.length; i++) {
        oNavLis[i].index = i;
        oNavLis[i].onclick = function () {
            var index = this.index;
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