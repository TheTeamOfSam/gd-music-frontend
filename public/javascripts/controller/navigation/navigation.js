window.onload = function () {

    $(".logo").click(function () {
        window.location.href = "index.html";
    });

    var oNavigationUl = document.getElementById("navigation_ul");
    var oNavLis = oNavigationUl.getElementsByTagName("li");

    for (var i = 0; i < oNavLis.length; i++) {
        oNavLis[i].index = i;
        oNavLis[i].onclick = function () {
            var index = this.index;
            if (index == 0) {
                window.location.href = "index.html";
            } else if (index == 1) {
                if ($.cookie("uId") == null || $.cookie("uId") == "") {
                    window.location.href = "login.html";
                } else {
                    window.location.href = "myMusic.html";
                }
            } else if (index == 2) {
                if ($.cookie("uId") == null || $.cookie("uId") == "") {
                    window.location.href = "login.html";
                } else {
                    window.location.href = "myCollection.html";
                }
            } else {
                if ($.cookie("uId") == null || $.cookie("uId") == "") {
                    window.location.href = "login.html";
                } else {
                    window.location.href = "settings.html";
                }
            }
        };
    }

    var isLogoutBtn = false;

    var oHeadPhoto = document.getElementById("head_photo");
    var headPhoto = $(".head_photo img");
    var oLoginBtn = document.getElementById("login_btn");
    var oLogoutBtn = document.getElementById("logout_btn");

    if ($.cookie("uId") == null) {
        oHeadPhoto.style.display = "none";
        headPhoto.attr("src", "");
        oLoginBtn.style.display = "block";
    } else {
        oHeadPhoto.style.display = "block";
        if ($.cookie("uHeadPhoto") == null || $.cookie("uHeadPhoto") == "") {
            headPhoto.attr("src", "/images/headphoto/default_head_photo.png");
        } else {
            headPhoto.attr("src", $.cookie("uHeadPhoto"));
        }
        oLoginBtn.style.display = "none";
    }

    oLoginBtn.onclick = function () {
        window.location.href = "login.html";
    };

    oHeadPhoto.onclick = function () {
        if (isLogoutBtn == false) {
            isLogoutBtn = true;
            oLogoutBtn.style.display = "block";
        } else {
            isLogoutBtn = false;
            oLogoutBtn.style.display = "none";
        }
    };

    oLogoutBtn.onclick = function () {
        $.cookie("uId", null, {
            expires: -1
        });
        $.cookie("uHeadPhoto", null, {
            expires: -1
        });
        window.location.href = "index.html";
    };


};