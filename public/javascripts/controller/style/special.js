var addInfo;

var oCreateMusicListFrameBg = document.getElementById("create_music_list_frame_bg");
var oCloseAmlf = document.getElementById("close_amlf");
var oAddMusicListFrame = document.getElementById("add_music_list_frame");


function addTheMusicToMusicList(musicId) {
    oCreateMusicListFrameBg.style.display = "block";
    oAddMusicListFrame.style.display = "block";
    addInfo = {musicId: musicId};
}

oCloseAmlf.onclick = function () {
    oCreateMusicListFrameBg.style.display = "none";
    oAddMusicListFrame.style.display = "none";
    addInfo = null;
};

