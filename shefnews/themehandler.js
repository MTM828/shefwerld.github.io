"use strict";

var theme;
function themeswitcher(){
    try {
        if (window.localStorage.getItem('theme') == "light") {
            document.getElementById("pagetheme").setAttribute("href", "./src/themedark.css");
            document.getElementById("sknnlogo").setAttribute("src", "logodark.png");
            window.localStorage.setItem('theme', 'dark');
        } else  {
            theme = 0;
            document.getElementById("pagetheme").setAttribute("href", "./src/themelight.css");
            document.getElementById("sknnlogo").setAttribute("src", "logolight.png");
            window.localStorage.setItem('theme', 'light');
        }
    } catch (err) {
        theme = 0;
        document.getElementById("pagetheme").setAttribute("href", "./src/themelight.css");
        document.getElementById("sknnlogo").setAttribute("src", "logolight.png");
    }
}
function themeloader(){
    try {
        if (window.localStorage.getItem('theme') == "dark") {
          document.getElementById("pagetheme").setAttribute("href", "./src/themedark.css");
          document.getElementById("sknnlogo").setAttribute("src", "logodark.png");
        } else  {
          document.getElementById("pagetheme").setAttribute("href", "./src/themelight.css");
          document.getElementById("sknnlogo").setAttribute("src", "logolight.png");
          window.localStorage.setItem('theme', 'light');
        }
    } catch (err) {
        document.getElementById("pagetheme").setAttribute("href", "./src/themelight.css");
        document.getElementById("sknnlogo").setAttribute("src", "logolight.png");
    }
}
function updateThemeButton() {
    try {
        if (window.localStorage.getItem('theme') == "light") {
            document.getElementById("themeswitchbutton").innerHTML = "<i class='far fa-moon'></i>";
        } else  {
            document.getElementById("themeswitchbutton").innerHTML = "<i class='far fa-sun' style='color:#FCFCFC;'></i>";
        }
    } catch (err) {
        document.getElementById("themeswitchbutton").innerHTML = "<i class='far fa-sun' style='color:#FCFCFC;'></i>";
    }
}