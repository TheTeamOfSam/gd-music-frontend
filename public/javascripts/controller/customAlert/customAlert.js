var oReminderSearchContent = document.getElementById("reminder_search_content");

function customAlert(alertText) {
    oReminderSearchContent.innerHTML = alertText;
    oReminderSearchContent.style.display = "block";
    setTimeout(function () {
        oReminderSearchContent.style.display = "none";
    }, 3000);
}
