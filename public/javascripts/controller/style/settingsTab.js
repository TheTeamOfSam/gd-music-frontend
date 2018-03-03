var oSettingsTabBar = document.getElementById("settings_bar");
var oSettingsLis = oSettingsTabBar.getElementsByTagName("li");

var oUpdateForm = document.getElementById("update_form");
var oUpdatePassword = document.getElementById("update_password");

for (var i = 0; i < oSettingsLis.length; i++) {
    oSettingsLis[i].index = i;
    oSettingsLis[i].onclick = function () {
        var index = this.index;
        for (var j = 0; j < oSettingsLis.length; j++) {
            oSettingsLis[j].style.borderTop = "1px solid #CCCCCC";
            oSettingsLis[j].style.borderLeft = "1px solid #CCCCCC";
            oSettingsLis[j].style.borderRight = "1px solid #CCCCCC";
            oSettingsLis[j].style.borderBottom = "1px solid #CCCCCC";
            oSettingsLis[j].style.backgroundColor = "#F7F7F7";
        }
        oSettingsLis[index].style.borderTop = "1px solid #D13030";
        oSettingsLis[index].style.borderLeft = "1px solid #CCCCCC";
        oSettingsLis[index].style.borderRight = "1px solid #CCCCCC";
        oSettingsLis[index].style.borderBottom = "1px solid #FFFFFF";
        oSettingsLis[index].style.backgroundColor = "#FBFBFB";
        if (index == 0) {
            oUpdateForm.style.display = "block";
            oUpdatePassword.style.display = "none";
        } else {
            oUpdateForm.style.display = "none";
            oUpdatePassword.style.display = "block";
        }
    };
}




