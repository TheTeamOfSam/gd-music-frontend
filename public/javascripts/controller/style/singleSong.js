var oComment = document.getElementById("comment");
var oCmtBtn = document.getElementById("cmt_btn");
var oResidueNum = document.getElementById("residue_num");

var oCreateMusicListFrameBg = document.getElementById("create_music_list_frame_bg");
var oCloseAmlf = document.getElementById("close_amlf");
var oAddMusicListFrame = document.getElementById("add_music_list_frame");

var addInfo;

oComment.onfocus = function () {
    oComment.onkeydown = function () {
        var cmtValue = oComment.value;
        var residueNum = 150 - cmtValue.length;
        oResidueNum.innerHTML = residueNum;
        if (residueNum < 0) {
            oResidueNum.style.color = "red";
        } else {
            oResidueNum.style.color = "#999999";
        }
    };
};

oCmtBtn.onclick = function () {
    console.log(oComment.value);
};

function addTMusicToMusicList(musicId) {
    oCreateMusicListFrameBg.style.display = "block";
    oAddMusicListFrame.style.display = "block";
    addInfo = {musicId: musicId};
}


oCloseAmlf.onclick = function () {
    oCreateMusicListFrameBg.style.display = "none";
    oAddMusicListFrame.style.display = "none";
    addInfo = null;
};
