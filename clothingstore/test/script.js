"use strict";

const dialogBox = document.querySelector("#orderdialog");
const orderImg = document.querySelector("#orderimg");
var item;

function beginOrder(item) {
    dialogBox.style.display = "unset";
    orderImg.src = "../products/ska/product" + item + ".jpg";
    document.body.style.paddingRight = "17px";
    document.body.style.overflow = "hidden";
}
function finishOrder() {
    dialogBox.style.display = "none";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "0px";
}