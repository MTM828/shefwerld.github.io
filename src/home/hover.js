"use strict";

const mouse = {
    x: 0,
    y: 0
};

function ye() {
    document.onmousemove = handleMouseMove;

    function handleMouseMove(event) {
        event = event || window.event;
        mouse.x = event.x;
        mouse.y = event.y - document.getElementById('muralimage').offsetTop + window.scrollY
    }

    function getMousePosition() {
        var pos = mouse;
        var PerPosX = pos.x / document.getElementById('muralimage').clientWidth * 100 - 13;
        var PerPosY = pos.y / document.getElementById('muralimage').clientHeight * 100 + 5;
        var character;
        if        (PerPosX > 37 && PerPosX < 45 && PerPosY > 89 && PerPosY < 100) {
            character = 0; // Kerbi
        } else if (PerPosX > 51 && PerPosX < 60 && PerPosY > 70 && PerPosY < 92) {
            character = 1; // Mr MemeoftheWeek
        } else if (PerPosX > 42 && PerPosX < 50 && PerPosY > 75 && PerPosY < 95) {
            character = 2; // Tom Nook
        } else if (PerPosX > 31 && PerPosX < 37 && PerPosY > 75 && PerPosY < 95) {
            character = 3; // Kawsaki
        } else if (PerPosX > 37 && PerPosX < 42 && PerPosY > 78 && PerPosY < 89) {
            character = 4; // Blayyd Nite
        } else if (PerPosX > 60 && PerPosX < 64 && PerPosY > 59 && PerPosY < 68) {
            character = 5; // Jerry Springer
        } else if (PerPosX > 41 && PerPosX < 45 && PerPosY > 60 && PerPosY < 72) {
            character = 6; // Mexican Ghost Dad
        } else if (PerPosX > 48 && PerPosX < 53 && PerPosY > 58 && PerPosY < 70) {
            character = 7; // Cynthia
        } else if (PerPosX > 54 && PerPosX < 58 && PerPosY > 60 && PerPosY < 68) {
            character = 8; // TSM_Liquid_FaZe_Ninja
        } else if (PerPosX > 29 && PerPosX < 37 && PerPosY > 95 && PerPosY < 105) {
            character = 9; // Snivy
        } else if (PerPosX > 27 && PerPosX < 31 && PerPosY > 75 && PerPosY < 90) {
            character = 10; // Apple the Cat
        } else if (PerPosX > 9 && PerPosX < 16 && PerPosY > 90 && PerPosY < 105) {
            character = 11; // Reali
        } else if (PerPosX > 19 && PerPosX < 23 && PerPosY > 70 && PerPosY < 94) {
            character = 12; // Bon Starbuckle
        } else if (PerPosX > 10 && PerPosX < 19 && PerPosY > 76 && PerPosY < 94) {
            character = 13; // John Gameman
        } else if (PerPosX > 23 && PerPosX < 29 && PerPosY > 68 && PerPosY < 78) {
            character = 14; // Carmes
        } else if (PerPosX > 24 && PerPosX < 28 && PerPosY > 84 && PerPosY < 92) {
            character = 15; // Bon's Cat
        } else if (PerPosX > 17 && PerPosX < 24 && PerPosY > 94 && PerPosY < 103) {
            character = 16; // Gernfald
        } else if (PerPosX > 35 && PerPosX < 42 && PerPosY > 61 && PerPosY < 81) {
            character = 17; // Keynsun DDDO
        } else if (PerPosX > 4 && PerPosX < 20 && PerPosY > 55 && PerPosY < 70) {
            character = 18; // CrazeePi's Disembodied Voice
        } else if (PerPosX > 28 && PerPosX < 33 && PerPosY > 61 && PerPosY < 71) {
            character = 19; // Zeke Teddy
        } else if (PerPosX > 47 && PerPosX < 53 && PerPosY > 86 && PerPosY < 102) {
            character = 20; // Tom Nook Kids
        } else if (PerPosX > 21 && PerPosX < 31 && PerPosY > 44 && PerPosY < 55) {
            character = 21; // Wingull
        } else if (PerPosX > 57 && PerPosX < 62 && PerPosY > 67 && PerPosY < 80) {
            character = 22; // Ryk
        } else if (PerPosX > 58 && PerPosX < 68 && PerPosY > 71 && PerPosY < 81) {
            character = 23; // Diet Bathwater 
        } else if (PerPosX > 58 && PerPosX < 63 && PerPosY > 82 && PerPosY < 102) {
            character = 24; // Scratch Cat
        } else if (PerPosX > 63 && PerPosX < 68 && PerPosY > 80 && PerPosY < 95) {
            character = 25; // Isabelle
        } else if (PerPosX > 71 && PerPosX < 75 && PerPosY > 76 && PerPosY < 89) {
            character = 26; // Gardevoir 
        } else if (PerPosX > 67 && PerPosX < 80 && PerPosY > 87 && PerPosY < 105) {
            character = 27; // The SKA Hypebeast
        } else if (PerPosX > 76 && PerPosX < 86 && PerPosY > 33 && PerPosY < 43) {
            character = 28; // Metar Nite 
        } else {
            character = 29; // blank
        }
        document.getElementById('character_icon_image').src = "usericon/" + character + ".jpg";
        document.getElementById('character_name').innerHTML = characternames[character]
        document.getElementById('character_description').innerHTML = characterdescription[character];
    }
    handleMouseMove();
    getMousePosition();
}