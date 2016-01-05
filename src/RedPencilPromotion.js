"use strict";

function RedPencilPromotion(good) {
    this.good = good;
    this.goodpricehistory = good.getPriceHistory();
    
    var eligibleforpromotion;

    //if there is only one price it can't be eligible 
    if ( this.goodpricehistory.length < 2 ) {
        //return good;
    }

    if (eligibleforpromotion) {
        // set the promotion
    }
    else if (!eligibleforpromotion) {
        // end the promotion
    }
    else {
        //do nothing
    }

}

RedPencilPromotion.prototype.datediff = function(date1, date2) {
    var A_DAY_OF_MILLISECONDS = 86400000;
    var diffms = date1.getTime() - date2.getTime();
    return diffms / A_DAY_OF_MILLISECONDS;
};

RedPencilPromotion.prototype.process = function() {
    return this.good;
};


RedPencilPromotion.prototype.priceChangeFactor = function() {}

RedPencilPromotion.prototype.testPriceChangeRange = function() {
    // constants to test if the most recent price change is in the required range
    var UPPER = 0.95;
    var LOWER = 0.70;
    var pricechange = this.goodpricehistory[0].price / this.goodpricehistory[1].price;
    //console.log(pricechange);
    if ( LOWER <= pricechange && pricechange <= UPPER  ) 
        return true;
    else
        return false;
};

RedPencilPromotion.prototype.testPriceChangeWaitingPeriod = function() {
    // for a price change to be able to initiate a new promotion the price muct have been stable for 30 days
    var WAITING_PERIOD = 30;
    var dateofpreviouspricechange = this.good.getDaysSinceLastPriceChange();
    console.log(dateofpreviouspricechange);
    if ( dateofpreviouspricechange >= WAITING_PERIOD )
        return true;
    else
        return false;
};


    // check for reduction in range



module.exports = RedPencilPromotion;