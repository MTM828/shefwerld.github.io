function start() {
    setTimeout(canvas.mainLoop, 0);
    document.querySelector('.startbutton').style.display = 'none';
    document.querySelector('.thumbnail').style.display = 'none';
    document.removeEventListener("keypress", startOnEnter);
}
function startOnEnter(event) {
    if (event.which == 13) {start();}
}
document.addEventListener("keypress", startOnEnter, false);
window.onload = function() {
    document.querySelector(".startbutton").style.left =
        (document.querySelector("#canvas").offsetWidth /2) - (document.querySelector(".startbutton").offsetWidth /2);
    document.querySelector(".startbutton").style.top  =
        (document.querySelector("#canvas").offsetHeight/2) - (document.querySelector(".startbutton").offsetHeight/2);
    document.querySelector(".thumbnail"  ).style.left =
        (document.querySelector("#canvas").offsetWidth /2) - (document.querySelector(".thumbnail"  ).offsetWidth /2);
    document.querySelector(".thumbnail"  ).style.top  =
        (document.querySelector("#canvas").offsetHeight/2) - (document.querySelector(".thumbnail"  ).offsetHeight/2);
};