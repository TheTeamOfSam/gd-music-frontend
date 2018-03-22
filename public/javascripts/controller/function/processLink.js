function toArtist(artistId) {
    var link = "artist.html?artistId=" + artistId;
    window.location.href = link;
}

function toSpecial(specialId) {
    var link = "special.html?specialId=" + specialId;
    window.location.href = link;
}

function toSingleSong(musicId) {
    var link = "singleSong.html?musicId=" + musicId;
    window.location.href = link;
}

function toUser(userId) {
    var link = "user.html?userId=" + userId;
    window.location.href = link;
}

function toUserMusicList(userMusicListId) {
    var link = "userMusicList.html?userMusicListId=" + userMusicListId;
    window.location.href = link;
}

function playMusicList(userMusicListId) {
    var link = "playMusic.html?userMusicListId=" + userMusicListId;
    window.open(link);
}
