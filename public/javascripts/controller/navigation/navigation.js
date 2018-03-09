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

        $.ajax({
            url: 'http://localhost:7200/gdmusicserver/user/service/info/@get',
            type: 'POST',
            dataType: 'json',
            data: {
                uID: $.cookie("uId")
            },
            error: function () {
                alert("网络请求错误，请稍候重试！");
            },
            success: function (result) {
                if (!result.is_success) {
                    alert(result.message);
                } else {
                    var user = result.result;
                    var allImgExt = ".jpg|.jpeg|.bmp|.png";
                    if (user.head_photo.toLowerCase().match(allImgExt) == null) {
                        // oUserHeadPhoto.src = "/images/headphoto/default_head_photo.png";
                        headPhoto.attr("src", "/images/headphoto/default_head_photo.png");
                    } else {
                        // oUserHeadPhoto.src = user.head_photo;
                        headPhoto.attr("src", user.head_photo);
                    }
                }
            }
        });

        // if ($.cookie("uHeadPhoto") == null || $.cookie("uHeadPhoto") == "") {
        //     headPhoto.attr("src", "/images/headphoto/default_head_photo.png");
        // } else {
        //     headPhoto.attr("src", $.cookie("uHeadPhoto"));
        // }
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

    var oSearchContent = document.getElementById("search_content");

    oSearchContent.onkeydown = function (ev) {
        var oEvent = ev || event;
        if (oEvent.keyCode == 13) {
            var link = "findMusic.html?search_content=" + this.value;
            window.location.href = link;
        }
    };


};