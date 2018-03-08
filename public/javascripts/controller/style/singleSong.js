var oComment = document.getElementById("comment");
var oCmtBtn = document.getElementById("cmt_btn");
var oResidueNum = document.getElementById("residue_num");

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
