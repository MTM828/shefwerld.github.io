"use strict";

const news = {
    timeZone: "",
    date: "",
    number: 0,
}
const newsArticles = [
    "The Full Soulja Boy Remix Track is now available on SKA!",
    "The Shef Kerbi News Network site has gone through a redesign!",
    "Shef Kerbi News Network #43 is ready to view now! You can read this issue by <a href='shefnews/news/43.html' id='colorlink'>clicking here</a> or visiting the SKNN website."
]

const date = new Date();
const month = date.getMonth() + 1;
var timeZone;

if (date.getTimezoneOffset() / -60 > 0) {
    timeZone = "+" + date.getTimezoneOffset() / -60 + " ";
} else {
    timeZone = date.getTimezoneOffset() / -60 + " ";
}

if (date.getMinutes().length === 2) {
    news.date =
        date.getHours()+":0"+date.getMinutes()+", "+date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()+" ("+timeZone+" UTC )";
} else {
    news.date =
        date.getHours()+":" +date.getMinutes()+", "+date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()+" ("+timeZone+"UTC )";
}

document.getElementById('shefwerldnews').innerHTML =
    "Welcome to Shef Werld! (This text changes every 10 seconds). Date and Time is currently " + news.date;

setInterval(function() {
    news.number = Math.floor(Math.random() * 3);
    if (!document.getElementById('shefwerldnews').innerHTML == newsArticles[news.number]) {
        document.getElementById('shefwerldnews').innerHTML = newsArticles[news.number];
    }
}, 10000);