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

RedPencilPromotion.prototype.fetchRedPencilPromotion = function() {
    return this.good.promotions.redpencil ;
};

RedPencilPromotion.prototype.datediff = function(date1, date2) {
    var A_DAY_OF_MILLISECONDS = 86400000;
    var diffms = date1.getTime() - date2.getTime();
    return diffms / A_DAY_OF_MILLISECONDS;
};

RedPencilPromotion.prototype.process = function() {
    return this.good;
};


RedPencilPromotion.prototype.priceChangeFactor = function() {
    return this.goodpricehistory[0].price / this.goodpricehistory[1].price;
};

RedPencilPromotion.prototype.testPriceIncrease = function() {
    if ( this.priceChangeFactor() > 1 ) 
        return true;
    else
        return false;
};

RedPencilPromotion.prototype.testPriceChangeRange = function() {
    // constants to test if the most recent price change is in the required range
    var UPPER = 0.95;
    var LOWER = 0.70;
    var pricechange = this.priceChangeFactor();
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
    // console.log(dateofpreviouspricechange);
    if ( dateofpreviouspricechange >= WAITING_PERIOD )
        return true;
    else
        return false;
};

RedPencilPromotion.prototype.testCurrentRedPencilExpiry = function() {
    // test to see if there is a redpencil promo applied that needs to be expired
    var activepromotions = this.fetchRedPencilPromotion();
    var now = new Date();
    if ( this.datediff( now, activepromotions.startdate ) > 30 ) {
        this.good.removePromotion("redpencil");
    }
};





module.exports = RedPencilPromotion;