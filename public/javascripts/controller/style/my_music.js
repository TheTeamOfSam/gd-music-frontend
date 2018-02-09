$(function () {
    //浏览器时下窗口可视区域高度
    var windowHeight = $(document).height();
    var oMiddleContent = $(".middle_content");

    oMiddleContent.css("height", (windowHeight - 75) + "px");

});

//当浏览器大小变化时
$(window).resize(function () {
    //浏览器时下窗口可视区域高度
    var windowHeight = $(document).height();
    var oMiddleContent = $(".middle_content");

    oMiddleContent.css("height", (windowHeight - 75) + "px");

});