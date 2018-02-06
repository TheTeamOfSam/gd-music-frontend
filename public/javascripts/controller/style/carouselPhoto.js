// window.onload = function () {

    var inde = 0;
    var cpArr = ['CarouselPhoto1.png', 'CarouselPhoto2.png', 'CarouselPhoto3.png',
        'CarouselPhoto4.png', 'CarouselPhoto5.png', 'CarouselPhoto6.png'];
    var imgSrc = "/images/carouselPhoto/";

    var oTabBtn = document.getElementById("tab_btn");
    var oLis = oTabBtn.getElementsByTagName("li");

    var oPreBtn = $(".middle_content_min .click_btnl");
    var oNextBtn = $(".middle_content_min .click_btnr");

    var middleImg = $(".middle_image img");

    var oMiddleContent = document.getElementById("middle_content");

    var timer = null;

    timer = setInterval(function () {
        inde++;
        for (var j = 0; j < oLis.length; j++) {
            oLis[j].style.backgroundColor = "#F1F1F1";
        }
        oLis[inde % 6].style.backgroundColor = "#B90B0A";
        if (inde / 6 == 1) {
            inde = 0;
        }
        middleImg.attr("src", imgSrc + cpArr[inde]);
    }, 4000);

    for (var i = 0; i < oLis.length; i++) {
        oLis[i].index = i;
        oLis[i].onclick = function () {
            var index = this.index;
            inde = this.index;
            for (var j = 0; j < oLis.length; j++) {
                oLis[j].style.backgroundColor = "#F1F1F1";
            }
            oLis[index].style.backgroundColor = "#B90B0A";
            middleImg.attr("src", imgSrc + cpArr[index]);
        };
    }

    oNextBtn.click(function () {
        inde++;
        if (inde >= 6) {
            inde = 0;
        }
        for (var j = 0; j < oLis.length; j++) {
            oLis[j].style.backgroundColor = "#F1F1F1";
        }
        oLis[inde].style.backgroundColor = "#B90B0A";
        middleImg.attr("src", imgSrc + cpArr[inde]);
    });

    oPreBtn.click(function () {
        inde--;
        if (inde < 0) {
            inde = 5;
        }
        for (var j = 0; j < oLis.length; j++) {
            oLis[j].style.backgroundColor = "#F1F1F1";
        }
        oLis[inde].style.backgroundColor = "#B90B0A";
        middleImg.attr("src", imgSrc + cpArr[inde]);
    });

    oMiddleContent.onmouseover = function () {
        clearInterval(timer);
    };

    oMiddleContent.onmouseout = function () {
        timer = setInterval(function () {
            inde++;
            for (var j = 0; j < oLis.length; j++) {
                oLis[j].style.backgroundColor = "#F1F1F1";
            }
            oLis[inde % 6].style.backgroundColor = "#B90B0A";
            if (inde / 6 == 1) {
                inde = 0;
            }
            middleImg.attr("src", imgSrc + cpArr[inde]);
        }, 4000);
    };
// };