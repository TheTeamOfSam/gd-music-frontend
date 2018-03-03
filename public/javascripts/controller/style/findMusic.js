function getUrlParam(name) {
    var paramArr = window.location.href.split('?')[1];
    var subParamArr = paramArr.split('&');
    for (var i = 0; i < subParamArr.length; i++) {
        if (subParamArr[i].split('=')[0] == name) {
            return subParamArr[i].split('=')[1];
        } else {
            return null;
        }
    }
}

console.log(getUrlParam("search_content"));


