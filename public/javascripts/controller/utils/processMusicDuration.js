function getMusicDuration(musicDuration) {
    var minute = musicDuration / 60;
    var second = 0;
    if (musicDuration % 60 == 0) {
        second = 0;
    } else {
        second = musicDuration % 60;
    }
    var rM = "";
    if (minute < 10) {
        rM = "0" + Math.floor(minute);
    } else {
        rM = minute;
    }
    var rS = "";
    if (second < 10) {
        rS = "0" + Math.floor(second);
    } else {
        rS = second;
    }
    return rM + ":" + rS;
}
