window.onload = function () {

    $(".logo_min").click(function () {
        window.location.href="index.html";
    });

    var oNavigationUl = document.getElementById("navigation_ul");
    var oLis = oNavigationUl.getElementsByTagName("li");

    for (var i=0;i<oLis.length;i++){
        oLis[i].index = i;
        oLis[i].onclick = function () {
            var index = this.index;
            if (index == 0) {
                window.location.href="index.html";
            } else if(index==1) {
                window.location.href="myMusic.html";
            } else if(index==2) {
                window.location.href="myCollection.html";
            } else {
                window.location.href="settings.html";
            }
        };
    }

};