var item = 0;
var currency = 0;
var extraCost = 0;
var costTotal = 0;
var costDiff = 0;
var shippingMethod = 0;
var receiptInformation = 0;
var TitleDB = [
    "Authentic Pig Soop Provider<span id='blinkingcursor'>|</span>", "Ghost Hobo Beanie<span id='blinkingcursor'>|</span>",
    "Shef Kerbi Hat<span id='blinkingcursor'>|</span>", "Your Local Russian Trashdonalds<span id='blinkingcursor'>|</span>",
    "Soulja Boi (no loop)<span id='blinkingcursor'>|</span>"
];
var NameDB = [
    "Authentic Pig Soop Provider",
    "Ghost Hobo Beanie",
    "Shef Kerbi Hat",
    "Your Local Russian Trashdonalds",
    "Soulja Boi (no loop)"
];
var CatchDB = [
    "for Carmes",
    "Mexican Ghost Dad - Ghost Hobo",
    "Shef Kerbi",
    "Чармес",
    "Old School Shef Kerbi's Apparel"
];
var DescriptionDB = [
    "Would you like to show your loyalty, dedication and commitment to Pig Soop? You can use this shirt to prove to everyone that you are the TRUE Pig Soop champion of the group and will go out and give Pig Soop to others who are unable or who don't often get the enjoy the nice refreshing taste of Pig Soop!<br>",
    "A replica of the hat worn by Mexican Ghost Dad™'s Ghost Dog, the Ghost Hobo Beanie is the perfect tool to keep your big brain warm and to show people that you are a fan of Mexican Ghost Dad. This beanie is also in celebration of the resurrection of Mexican Ghost Dad due to huge fan support.",
    "Despite a change in management and a complete website redesign, we are still keeping by our promise. The Shef Kerbi hat is available and will be available indefinetly. Note that the hat may not be designed to fit on your head though, as this is a 1:1 scale copy of Shef Kerbi's own Shef Hat.",
    "Trashdonalds, the fast food chain that serves up the best trash from Dreem Lend is an international brand spanning many countries. Trashdonalds Russia had this to say: &ldquo;[Trashdonalds is] disgusting. Our food can make hygeine inspectors say 'Yuck!', yet they always seem to come back for more [Trashdonalds].&rdquo;",
    "A remixed track of Soulja Boy's 'Crank That', created by Apple the Cat. It was designed for Shef Kerbi's Apparel Collection 4 before our company decided to change direction with our approach to our website.<br>Click purchase to get a download link for this remix (note that the quantity and shipping selection means nothing here)."
];
var currencyConversion = [1, 1.6, 5];
var shefDollarPrices = [79.99, 69.99, 149.99, 94.99, 0.01];
var ghostDollarPrices = [127.99, 111.99, 239.99, 151.99, 0.01];
var starCoinPrices = [399.99, 349.99, 749.99, 474.99, 0.01];

function setCurrency(cash) {
    currency = cash;
    if (currency == 0) {
        for (i = 0; i < item + 1; i++) {
            costDiff = extraCost * currencyConversion[currency];
            costTotal = shefDollarPrices[i] + costDiff;
            document.getElementById('productprice').innerHTML = "$" + costTotal;
            document.getElementById('currency_option').innerHTML = "Shef Dollars";
            if (shippingMethod == 2) {
                document.getElementById('shipping_option').innerHTML = "Predictve Shipping (+$" + costDiff + ")";
            } else if (shippingMethod == 3) {
                document.getElementById('shipping_option').innerHTML = "VERY Predictve Shipping (+$" + costDiff + ")";
            }
        }
    } else if (currency == 1) {
        for (i = 0; i < item + 1; i++) {
            costDiff = extraCost * currencyConversion[currency];
            costTotal = ghostDollarPrices[i] + costDiff;
            document.getElementById('productprice').innerHTML = "~$" + costTotal;
            document.getElementById('currency_option').innerHTML = "Ghost Dollars";
            if (shippingMethod == 2) {
                document.getElementById('shipping_option').innerHTML = "Predictve Shipping (+~$" + costDiff + ")";
            } else if (shippingMethod == 3) {
                document.getElementById('shipping_option').innerHTML = "VERY Predictve Shipping (+~$" + costDiff + ")";
            }
        }
    } else if (currency == 2) {
        for (i = 0; i < item + 1; i++) {
            costDiff = extraCost * currencyConversion[currency];
            costTotal = starCoinPrices[i] + costDiff;
            document.getElementById('productprice').innerHTML = "☆" + costTotal;
            document.getElementById('currency_option').innerHTML = "Star Coins";
            if (shippingMethod == 2) {
                document.getElementById('shipping_option').innerHTML = "Predictve Shipping (+☆" + costDiff + ")";
            } else if (shippingMethod == 3) {
                document.getElementById('shipping_option').innerHTML = "VERY Predictve Shipping (+☆" + costDiff + ")";
            }
        }
    } else {
        alert('what');
    }
}

function setShipping(number) {
    shippingMethod = number + 1;
    if (number == 0) {
        extraCost = 0;
        setCurrency(currency);
        document.getElementById('shipping_option').innerHTML = "Same Second Shipping";
    } else if (number == 1) {
        extraCost = 5;
        setCurrency(currency);
        if (currency == 0) {
            document.getElementById('shipping_option').innerHTML = "Predictve Shipping (+$" + costDiff + ")";
        } else if (currency == 1) {
            document.getElementById('shipping_option').innerHTML = "Predictve Shipping (+~$" + costDiff + ")";
        } else if (currency == 2) {
            document.getElementById('shipping_option').innerHTML = "Predictve Shipping (+☆" + costDiff + ")";
        }
    } else if (number == 2) {
        extraCost = 10;
        setCurrency(currency);
        if (currency == 0) {
            document.getElementById('shipping_option').innerHTML = "VERY Predictve Shipping (+$" + costDiff + ")";
        } else if (currency == 1) {
            document.getElementById('shipping_option').innerHTML = "VERY Predictve Shipping (+~$" + costDiff + ")";
        } else if (currency == 2) {
            document.getElementById('shipping_option').innerHTML = "VERY Predictve Shipping (+☆" + costDiff + ")";
        }
    }
}

function hideDialogBox(number) {
    document.getElementById('productdialog').style.display = "none";
}

function openDialogBox(number) {
    item = number;
    document.getElementById('productdialog').style.display = "flex";
    document.getElementById('productdialog_itempreviewlink').href = "clothes/ska/shirt" + Number(item + 1) + ".jpg";
    document.getElementById('productdialog_itempreviewimage').src = "clothes/ska/shirt" + Number(item + 1) + ".jpg";
    document.getElementById('productdialog_itemnameactualname').innerHTML = TitleDB[item];
    document.getElementById('productdialog_itemdescription').innerHTML = DescriptionDB[item];
    document.getElementById('productdialog_itemnamecreator').innerHTML = CatchDB[item];
    document.getElementById('productprice').innerHTML = "$" + shefDollarPrices[item];
}

function showHelpDialog() {
    document.getElementById('helpdialog').style.display = "inline";
}

function hideHelpDialog() {
    document.getElementById('helpdialog').style.display = "none";
}

function displayHelp(number) {
    if (number == 0) {
        document.getElementById('helpdialog_informationdisplay').innerHTML = "Same Second Shipping. First trialed earlier this year to provide people with the instant gratification that they would receive when buying something digital online.";
    } else if (number == 1) {
        document.getElementById('helpdialog_informationdisplay').innerHTML = "Predictive Shipping. Created by Wingull to the specifications of SKA. Uses neural networks and browser tracking to determine if someone is planning to buy something.";
    } else if (number == 2) {
        document.getElementById('helpdialog_informationdisplay').innerHTML = "VERY Predictive Shipping. Predictive Shipping but you receive the item before you buy it, while not giving the person enough time to react to it and to not click the purchase button.";
    } else if (number == 3) {
        document.getElementById('helpdialog_informationdisplay').innerHTML = "SKA uses three methods of shipping. We have three methods of shipping due to the extra cost that Predictive and VERY Predictive Shipping have.";
    } else if (number == 4) {
        document.getElementById('helpdialog_informationdisplay').innerHTML = "Nothing will go wrong since our shipping and clothing fabrication methods are perfect, but you can contact us by going <a href='https://scratch.mit.edu/users/CatsUnited'>here. <i class='fas fa-external-link-alt'></i></a>";
    } else if (number == 5) {
        document.getElementById('helpdialog_informationdisplay').innerHTML = "Our clothes are made using the highest quality materials, which are but not limited to cotton, latex, silk, star material, carbon fibre and graphene.";
    } else if (number == 6) {
        document.getElementById('helpdialog_informationdisplay').innerHTML = "The size of our clothing is now fully determined by our servers, since we now have code that is capable of automatically detecting someone's size.";
    }
}

function purchaseItem(number) {
    if (costTotal < 50 || document.getElementById('shipping_option').innerHTML == "No Shipping Selected" || document.getElementById('itemquantity').value < 1) {
        showErrorDialog();
    } else {
        receiptInformation = item;
        document.getElementById('productdialog').style.display = "none";
        document.getElementById('purchasedialog').style.display = "inline";
        document.getElementById('itempurchaseditembar').innerHTML = "<span style='font-weight: bold;'>Authentic Pig Soop Provider</span>";
        if (currency == 0) {
            if (item == 4) {
                document.getElementById('purchasedialog_purchaseinformation').innerHTML = "<a href='SouljaBoiNotLoop.mp3'>Link to Song</a><br><a href='https://www.youtube.com?v=zc2i6DqCRHM'>Link to Full Song</a>";
                document.getElementById('purchasedialog_purchaseinformation2').innerHTML = "";
            } else {
                document.getElementById('purchasedialog_purchaseinformation').innerHTML = "<div id='purchasedialog_genericseparator'><span style='font-weight: bold;'>" + document.getElementById('itemquantity').value + "x " + NameDB[item] + "</span></div><div id='genericseparator'>" + document.getElementById('itemquantity').value + "x $" + costTotal + "</div>";
                document.getElementById('purchasedialog_purchaseinformation2').innerHTML = "<div id='purchasedialog_genericseparator'><span style='font-weight: bold;'>Total:</span></div> <div id='purchasedialog_genericseparator'>$" + round_to_precision(document.getElementById('itemquantity').value * costTotal, 0.01).toFixed(2) + "</div>";
            }
            receiptInformation = document.getElementById('itemquantity').value + "x " + NameDB[item] + " " + document.getElementById('itemquantity').value + "x $" + costTotal + ". Total: $" + round_to_precision(document.getElementById('itemquantity').value * costTotal, 0.01).toFixed(2);
        } else if (currency == 1) {
            if (item == 4) {
                document.getElementById('purchasedialog_purchaseinformation').innerHTML = "<a href='SouljaBoiNotLoop.mp3'>Link to Song</a><br><a href='https://www.youtube.com?v=zc2i6DqCRHM'>Link to Full Song</a>";
                document.getElementById('purchasedialog_purchaseinformation2').innerHTML = "";
            } else {
                document.getElementById('purchasedialog_purchaseinformation').innerHTML = "<div id='purchasedialog_genericseparator'><span style='font-weight: bold;'>" + document.getElementById('itemquantity').value + "x " + NameDB[item] + "</span></div><div id='genericseparator'>" + document.getElementById('itemquantity').value + "x ~$" + costTotal + "</div>";
                document.getElementById('purchasedialog_purchaseinformation2').innerHTML = "<div id='purchasedialog_genericseparator'><span style='font-weight: bold;'>Total:</span></div> <div id='purchasedialog_genericseparator'>~$" + round_to_precision(document.getElementById('itemquantity').value * costTotal, 0.01) + "</div>";
            }
            receiptInformation = document.getElementById('itemquantity').value + "x " + NameDB[item] + " " + document.getElementById('itemquantity').value + "x ~$" + costTotal + ". Total: ~$" + round_to_precision(document.getElementById('itemquantity').value * costTotal, 0.01).toFixed(2);
        } else if (currency == 2) {
            if (item == 4) {
                document.getElementById('purchasedialog_purchaseinformation').innerHTML = "<a href='SouljaBoiNotLoop.mp3'>Link to Song</a><br><a href='https://www.youtube.com?v=zc2i6DqCRHM'>Link to Full Song</a>";
                document.getElementById('purchasedialog_purchaseinformation2').innerHTML = "";
            } else {
                document.getElementById('purchasedialog_purchaseinformation').innerHTML = "<div id='purchasedialog_genericseparator'><span style='font-weight: bold;'>" + document.getElementById('itemquantity').value + "x " + NameDB[item] + "</span></div><div id='genericseparator'>" + document.getElementById('itemquantity').value + "x ☆" + costTotal + "</div>";
                document.getElementById('purchasedialog_purchaseinformation2').innerHTML = "<div id='purchasedialog_genericseparator'><span style='font-weight: bold;'>Total:</span></div> <div id='purchasedialog_genericseparator'>☆" + round_to_precision(document.getElementById('itemquantity').value * costTotal, 0.01) + "</div>";
            }
            receiptInformation = document.getElementById('itemquantity').value + "x " + NameDB[item] + " " + document.getElementById('itemquantity').value + "x ☆" + costTotal + ". Total: ☆" + round_to_precision(document.getElementById('itemquantity').value * costTotal, 0.01).toFixed(2);
        }
        document.getElementById('purchasedialog_previewimage').src = "clothes/ska/shirt" + String(number + 1) + ".jpg"
    }
}

function hidePurchaseDialog() {
    document.getElementById('purchasedialog').style.display = "none";
}

function showErrorDialog() {
    document.getElementById('errordialog').style.display = "inline";
    document.getElementById('errordialog_missingparameters').innerHTML = "";
    if (document.getElementById('shipping_option').innerHTML == "No Shipping Selected") {
        document.getElementById('errordialog_missingparameters').innerHTML = "No Shipping Method Selected. ";
    }
    if (document.getElementById('itemquantity').value < 1) {
        document.getElementById('errordialog_missingparameters').innerHTML += "No Quantity Selected. ";
    }
}

function hideErrorDialog() {
    document.getElementById('errordialog').style.display = "none";
}

function round_to_precision(x, precision) { // stolen from Mozilla Development Network
    var y = +x + (precision === undefined ? 0.5 : precision / 2);
    return y - (y % (precision === undefined ? 1 : +precision));
}

function copyToClipboard(str) { // stolen from Apple the Cat who stole it from techoverflow.net
    var text = document.createElement('textarea');
    text.value = str;
    text.setAttribute('readonly', '');
    text.style = {
        position: 'absolute',
        left: '-9999px'
    };
    document.body.appendChild(text);
    text.select();
    document.execCommand('copy');
    document.body.removeChild(text);

    document.getElementById("copied_dialogbox").style.display = "flex";
    setTimeout(function() {
        document.getElementById("copied_dialogbox").style.display = "none";
    }, 3000);
}

function hideCopiedDialog() {
    document.getElementById("copied_dialogbox").style.display = "none";
}

function showAboutDialog() {
    document.getElementById('aboutdialog').style.display = "flex";
}

function hideAboutDialog() {
    document.getElementById('aboutdialog').style.display = "none";
}
document.addEventListener('keyup', function() {
    if (event.defaultPrevented) {
        return;
    }
    var key = event.key;
    if (key === 'Escape' || key === 'Esc') {
        hideCopiedDialog();
        hideErrorDialog();
        hideAboutDialog();
        hidePurchaseDialog();
        hideDialogBox();
        hideHelpDialog();
    }
})