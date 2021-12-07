/*global chrome*/

var imgURL = chrome.runtime.getURL("img/cursors/");

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "update") {
            // console.log(request,imgURL)
            document.body.style.cursor = `url(${imgURL}arrows/${request.id}.png), auto`;
            var items = document.getElementsByTagName("a");
            for (var i = 0; i < items.length; i++) {
                items[i].style.cursor = "url(" + imgURL + "pointers/" + request.id + ".png), auto";
            }
        }
        else if (request.msg === "reset") {
            document.body.style.cursor = "auto";
            items = document.getElementsByTagName("a");
            for (i = 0; i < items.length; i++) {
                items[i].style.cursor = "auto";
            }
        }
    });


