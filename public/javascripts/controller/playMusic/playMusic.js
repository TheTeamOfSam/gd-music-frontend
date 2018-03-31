$(function () {
    //浏览器时下窗口可视区域高度
    var windowHeight = $(window).height();
    // var documentHeight = $(document).height();
    // var oMusicList = $(".music_list");
    var oMiddleContent = $(".middle_content_min");

    // oMusicList.css("height", (windowHeight - 75) + "px");
    oMiddleContent.css("height", (windowHeight - 128) + "px");
});

//当浏览器大小变化时
$(window).resize(function () {
    //浏览器时下窗口可视区域高度
    var windowHeight = $(window).height();
    // var documentHeight = $(document).height();
    // var oMusicList = $(".music_list");
    var oMiddleContent = $(".middle_content_min");

    // oMusicList.css("height", (windowHeight - 75) + "px");
    oMiddleContent.css("height", (windowHeight - 128) + "px");
});

var oAudio = new Audio();

var userMusicListId = getUrlParam("userMusicListId");

var mscplist;

var musicIndex = 0;

$.ajax({
    url: ipAndHost + '/gdmusicserver/get/music/play/list/@query',
    type: 'GET',
    dataType: 'json',
    async: false,
    data: {
        user_music_list_id: userMusicListId
    },
    error: function () {
        customAlert("网络开小差了");
    },
    success: function (result) {
        if (!result.is_success) {
            customAlert(result.message);
        } else {
            var result = result.result;

            if (result.length == 0) {
                $("#special_cover").attr("src", "http://p1.music.126.net/tGHU62DTszbFQ37W9qPHcg==/2002210674180197.jpg?param=200y200");
                $("#special_title").text("");
                $("#music_name").text("");
                $("#music_title").text("");
                $("#artist_title").text("");
                $("#music_author").text("");
                $("#music_duration").text("00:00");
                // $("#m_audio").attr("src", "");

                $("tr").remove("#m_table tr");

                var thw1Div = $("<div class='wp' style='background: none;'></div>");
                var thw1 = $("<th class='th_w1'></th>");
                thw1.append(thw1Div);

                var thw2Div = $("<div class='wp'>歌曲标题</div>");
                var thw2 = $("<th class='th_w2'></th>");
                thw2.append(thw2Div);

                var thw3Div = $("<div class='wp'>时长</div>");
                var thw3 = $("<th class='th_w3'></th>");
                thw3.append(thw3Div);

                var thw4Div = $("<div class='wp'>歌手</div>");
                var thw4 = $("<th class='th_w4'></th>");
                thw4.append(thw4Div);

                var thw5Div = $("<div class='wp'>专辑</div>");
                var thw5 = $("<th class='th_w5'></th>");
                thw5.append(thw5Div);

                var mTTr = $("<tr></tr>");
                mTTr.append(thw1).append(thw2).append(thw3).append(thw4).append(thw5);
                $("#m_table").append(mTTr);

            } else {
                mscplist = result;

                $("tr").remove("#m_table tr");

                var thw1Div = $("<div class='wp' style='background: none;'></div>");
                var thw1 = $("<th class='th_w1'></th>");
                thw1.append(thw1Div);

                var thw2Div = $("<div class='wp'>歌曲标题</div>");
                var thw2 = $("<th class='th_w2'></th>");
                thw2.append(thw2Div);

                var thw3Div = $("<div class='wp'>时长</div>");
                var thw3 = $("<th class='th_w3'></th>");
                thw3.append(thw3Div);

                var thw4Div = $("<div class='wp'>歌手</div>");
                var thw4 = $("<th class='th_w4'></th>");
                thw4.append(thw4Div);

                var thw5Div = $("<div class='wp'>专辑</div>");
                var thw5 = $("<th class='th_w5'></th>");
                thw5.append(thw5Div);

                var mTTr = $("<tr></tr>");
                mTTr.append(thw1).append(thw2).append(thw3).append(thw4).append(thw5);
                $("#m_table").append(mTTr);

                $.each(result, function (n, result) {
                    var td1Span = $("<span class='num'>" + (n + 1) + "</span>");
                    var td1Link = $("<a class='play_music'></a>").attr("href", "javascript:setProperty(" + n + ");");
                    var td1 = $("<td></td>");
                    td1.append(td1Span);
                    td1.append(td1Link);

                    var td2DivLink = $("<a>" + result.music_name + "</a>").attr("href", "javascript:toSingleSong(" + result.music_id + ");");
                    var td2Div = $("<div class='music_title'></div>");
                    td2Div.append(td2DivLink);
                    var td2 = $("<td></td>");
                    td2.append(td2Div);

                    var td3Span = $("<span>" + getMusicDuration(result.music_duration) + "</span>");
                    var td3DivLink = $("<a class='add_music'></a>").attr("href", "javascript:addTheMusicToMusicList(" + result.music_id + ");");
                    var td3Div = $("<div class='opt_btn'></div>");
                    td3Div.append(td3DivLink);
                    var td3 = $("<td class='s-fc3'></td>");
                    td3.append(td3Span).append(td3Div);

                    var td4SpanLink = $("<a>" + result.artist_name + "</a>").attr("href", "javascript:toArtist(" + result.artist_id + ");");
                    var td4Span = $("<span class='author'></span>");
                    td4Span.append(td4SpanLink);
                    var td4 = $("<td></td>");
                    td4.append(td4Span);

                    var td5SpanLink = $("<a>" + result.special_name + "</a>").attr("href", "javascript:toSpecial(" + result.special_id + ");");
                    var td5Span = $("<span class='special'></span>");
                    td5Span.append(td5SpanLink);
                    var td5 = $("<td></td>");
                    td5.append(td5Span);

                    var mTTR = $("<tr></tr>");
                    mTTR.append(td1).append(td2).append(td3).append(td4).append(td5);

                    $("#m_table").append(mTTR);

                    setProperty(musicIndex);

                });
            }
        }
    }
});

function toArtist(artistId) {
    var link = "artist.html?artistId=" + artistId;
    window.open(link);
}

function toSpecial(specialId) {
    var link = "special.html?specialId=" + specialId;
    window.open(link);
}

function toSingleSong(musicId) {
    var link = "singleSong.html?musicId=" + musicId;
    window.open(link);
}

function setProperty(mscIndex) {
    var sMusic = mscplist[mscIndex];
    if (sMusic == null) {
        $("#special_cover").attr("src", "http://p1.music.126.net/tGHU62DTszbFQ37W9qPHcg==/2002210674180197.jpg?param=200y200");
        $("#special_title").text("");
        $("#music_name").text("");
        $("#music_title").text("");
        $("#artist_title").text("");
        $("#music_author").text("");
        $("#music_duration").text("00:00");
    } else {
        $("#special_cover").attr("src", sMusic.special_photo).attr("href", "javascript:toSpecial(" + sMusic.special_id + ");");
        $("#special_title").text(sMusic.special_name).attr("href", "javascript:toSpecial(" + sMusic.special_id + ");");
        $("#music_name").text(sMusic.music_name).attr("href", "javascript:toSingleSong(" + sMusic.music_id + ");");
        $("#music_title").text(sMusic.music_name).attr("href", "javascript:toSingleSong(" + sMusic.music_id + ");");
        $("#artist_title").text(sMusic.artist_name).attr("href", "javascript:toArtist(" + sMusic.artist_id + ");");
        $("#music_author").text(sMusic.artist_name).attr("href", "javascript:toArtist(" + sMusic.artist_id + ");");
        $("#music_duration").text(getMusicDuration(sMusic.music_duration));
        oAudio.src = sMusic.music_path;
        oAudio.play();
    }
}


// 暂停播放状态
var isMusicPlay = false;

// 播放暂定按钮点击时
$("#ply").click(function () {
    if (isMusicPlay) {
        $("#ply").removeClass("ply");
        $("#ply").addClass("pause");
        oAudio.play();
        isMusicPlay = false;
    } else {
        $("#ply").removeClass("pause");
        $("#ply").addClass("ply");
        oAudio.pause();
        isMusicPlay = true;
    }
});

var timer;
timer = setInterval(function () {
    var currentT = oAudio.currentTime;
    var durationT = oAudio.duration;
    var scale = currentT / durationT;
    var disLeft = (oProgress.offsetWidth - oProgressBtn.offsetWidth / 2 + 5) * scale;

    oProgressBtn.style.left = disLeft + 'px';
    oCurPgs.style.width = (scale * 100) + "%";

    $("#currect_time_text").html(getMusicDuration(oAudio.currentTime));

    if (oAudio.ended) {
        next_music();
    }

}, 500);

// 进度条和进度条按钮以及进度初始化距离
var oProgress = document.getElementById("progress");
var oCurPgs = document.getElementById("cur_pgs");
var oProgressBtn = document.getElementById("progress_btn");
var disProgress = 0;

oProgressBtn.onmousedown = function (ev) {
    var oEvent = ev || event;
    disProgress = oEvent.clientX - oProgressBtn.offsetLeft;

    oAudio.pause();

    clearInterval(timer);

    document.onmousemove = function (ev) {
        var oEvent = ev || event;
        var progressL = oEvent.clientX - disProgress;
        if (progressL < 0) {
            progressL = 0;
        } else if (progressL > oProgress.offsetWidth - oProgressBtn.offsetWidth / 2 + 5) {
            progressL = oProgress.offsetWidth - oProgressBtn.offsetWidth / 2 + 5;
        }

        oProgressBtn.style.left = progressL + 'px';

        var scale = progressL / (oProgress.offsetWidth - oProgressBtn.offsetWidth / 2 + 5);

        oCurPgs.style.width = (scale * 100) + "%";

        oAudio.currentTime = scale * oAudio.duration;

    };
    document.onmouseup = function () {
        oProgress.onmousedown = null;
        document.onmousemove = null;

        timer = setInterval(function () {
            var currentT = oAudio.currentTime;
            var durationT = oAudio.duration;
            var scale = currentT / durationT;
            var disLeft = (oProgress.offsetWidth - oProgressBtn.offsetWidth / 2 + 5) * scale;

            oProgressBtn.style.left = disLeft + 'px';
            oCurPgs.style.width = (scale * 100) + "%";

            $("#currect_time_text").html(getMusicDuration(oAudio.currentTime));

            if (oAudio.ended) {
                next_music();
            }

        }, 500);

        oAudio.play();
    };
};

// 进度条鼠标点击事件
oProgress.onclick = function (ev) {
    var oEvent = ev || event;

    var proL = oEvent.clientX - $("#progress").offset().left;

    // 判断有没有超出边界
    if (proL < 0) { // 超出了左边边界
        proL = 0;
    } else if (proL > oProgress.offsetWidth - oProgressBtn.offsetWidth / 2 + 5) { // 超出了右边边界
        proL = oProgress.offsetWidth - oProgressBtn.offsetWidth / 2 + 5;
    }
    // 设置和左边的距离
    oProgressBtn.style.left = proL + 'px';
    // 计算进度条的进度
    var scale = proL / (oProgress.offsetWidth - oProgressBtn.offsetWidth / 2 + 5);

    oCurPgs.style.width = (scale * 100) + "%";

    oAudio.currentTime = scale * oAudio.duration;

};

// 音量条和音量条按钮以及音量初始化距离
var oVolume = document.getElementById("volume_bar");
var oCurrVolume = document.getElementById("curr_volume");
var oVolumeBtn = document.getElementById("volume_btn");
var disVolume = 0;

// 音量条事件，原理和进度条类似
oVolumeBtn.onmousedown = function (ev) {
    var oEvent = ev || event;
    disVolume = oEvent.clientY - oVolumeBtn.offsetTop;
    document.onmousemove = function (ev) {
        var oEvent = ev || event;
        var volumeL = oEvent.clientY - disVolume;
        if (volumeL < 0) {
            volumeL = 0;
        } else if (volumeL > oVolume.offsetHeight - oVolumeBtn.offsetHeight / 2) {
            volumeL = oVolume.offsetHeight - oVolumeBtn.offsetHeight / 2;
        }
        oVolumeBtn.style.top = volumeL + 'px';
        var volumeScale = 1 - volumeL / (oVolume.offsetHeight - oVolumeBtn.offsetHeight / 2);

        if (volumeScale == 0) {
            $("#volume").removeClass("volume");
            $("#volume").addClass("no_volume");
        } else {
            $("#volume").removeClass("no_volume");
            $("#volume").addClass("volume");
        }

        oCurrVolume.style.height = (volumeScale * 100) + "%";

        oAudio.volume = volumeScale;

    };
    document.onmouseup = function () {
        oVolume.onmousedown = null;
        document.onmousemove = null;
    };
};
// 进度条点击事件
oVolume.onclick = function (ev) {
    var oEvent = ev || event;
    var volL = oEvent.clientY - $("#volume_bar").offset().top;
    if (volL < 0) {
        volL = 0;
    } else if (volL > oVolume.offsetHeight - oVolumeBtn.offsetHeight / 2) {
        volL = oVolume.offsetHeight - oVolumeBtn.offsetHeight / 2;
    }
    oVolumeBtn.style.top = volL + 'px';
    var volumeScale = 1 - volL / (oVolume.offsetHeight - oVolumeBtn.offsetHeight / 2);
    // audio.volume = volumeScale;

    if (volumeScale == 0) {
        $("#volume").removeClass("volume");
        $("#volume").addClass("no_volume");
    } else {
        $("#volume").removeClass("no_volume");
        $("#volume").addClass("volume");
    }

    oCurrVolume.style.height = (volumeScale * 100) + "%";

    oAudio.volume = volumeScale;

};

// 音量条是否显示
var isVolumeBarShow = false;

$("#volume").click(function () {
    if (isVolumeBarShow) {
        $("#m_vol").css("display", "none");
        isVolumeBarShow = false;
    } else {
        $("#m_vol").css("display", "block");
        isVolumeBarShow = true;
    }
});

/**
 * 播放模式：
 * 余数为0的是随机
 * 余数为1的是循环
 * 余数为2的是单曲循环
 * @type {number}
 */
var playMode = 0;

$("#play_mode").click(function () {
    playMode++;
    if (playMode % 3 == 0) {
        $("#play_mode").removeClass("mode_one");
        $("#play_mode").removeClass("mode_loop");
        $("#play_mode").addClass("mode_random");
        playModeTip("随机");

    } else if (playMode % 3 == 1) {
        $("#play_mode").removeClass("mode_one");
        $("#play_mode").removeClass("mode_random");
        $("#play_mode").addClass("mode_loop");
        playModeTip("循环");

    } else {
        $("#play_mode").removeClass("mode_random");
        $("#play_mode").removeClass("mode_loop");
        $("#play_mode").addClass("mode_one");
        playModeTip("单曲循环");

    }
});

function playModeTip(tipText) {
    $("#tip").css("display", "block").text(tipText);
    setTimeout(function () {
        $("#tip").css("display", "none");
    }, 3000);
}

$("#prv").click(function () {
    prev_music();
});

$("#nxt").click(function () {
    next_music();
});

// 下一曲封装函数
function next_music() {
    if (playMode % 3 == 0) {
        var randomIndex = Math.ceil(Math.random() * mscplist.length);
        musicIndex = randomIndex;
        setProperty(musicIndex - 1);
    } else if (playMode % 3 == 1) {
        musicIndex++;
        if (musicIndex == mscplist.length) {
            musicIndex = 0;
        }
        setProperty(musicIndex);
    } else {
        setProperty(musicIndex);
    }
}

// 上一曲封装函数
function prev_music() {
    if (playMode % 3 == 0) {
        var randomIndex = Math.ceil(Math.random() * mscplist.length);
        musicIndex = randomIndex;
        setProperty(musicIndex - 1);
    } else if (playMode % 3 == 1) {
        musicIndex--;
        if (musicIndex == -1) {
            musicIndex = mscplist.length - 1;
        }
        setProperty(musicIndex);
    } else {
        setProperty(musicIndex);
    }
}

