'use strict';

function RedPencilPromotion(good) {
    this.good = good;
    this.goodpricehistory = good.getPriceHistory();
    this.goodpromotionhistory = good.getPromotionHistory();
    // var eligibleforpromotion;


}

RedPencilPromotion.prototype.isEligible = function() {
     
    // Use the eligible var if one of the tests depends on further tests
    var eligible; //boolean
    // At the end of the function, return the eligible variable 

    // some tests are individually conclusive and we can return early

    //if there is only one price in the history it can't have a price reduction and it can't be eligible 
    if ( this.goodpricehistory.length < 2 ) {
        return false;
    }

    if ( this.testPriceChangeRange() ) {}
        eligible = true;

    // read at least 60 days of price history
    // maybe only 30 if I can check for rpp expirations

    return eligible;
};

RedPencilPromotion.prototype.fetchRedPencilPromotion = function() {
    return this.good.promotions.redpencil;
};

RedPencilPromotion.prototype.datediff = function(date1, date2) {
    var A_DAY_OF_MILLISECONDS = 86400000;
    var diffms = date1.getTime() - date2.getTime();
    return diffms / A_DAY_OF_MILLISECONDS;
};

RedPencilPromotion.prototype.getDaysSinceLastPriceChange = function() {
    var date0 = new Date();
    var price1 = this.goodpricehistory[0].price;
    var date1 = this.goodpricehistory.find(
        function(historyitem) {
            return historyitem.price !== price1; 
        }).date;

    // var date1 = this.goodpricehistory[0].date;
    // var date2 = this.goodpricehistory[1].date || date1;
    return this.datediff(date0,date1);
};

RedPencilPromotion.prototype.getDaysSinceLastRedPencil = function() {
    //var date0 = new Date();
    // var date1 = this.goodpromotionhistory[0].date;
    // var date2 = this.goodpromotionhistory[1].date || date1;
    // return this.datediff(date1,date2);
};


RedPencilPromotion.prototype.process = function() {
    
    this.processRedPencilRemoval(); // 

    if ( this.isEligible() ) {
        //set RPP
    }

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
    if ( this.getDaysSinceLastPriceChange() >= WAITING_PERIOD )
        return true;
    else
        return false;
};

RedPencilPromotion.prototype.testCurrentRedPencilPriceToPrePromotionPrice = function() {
    //find original price in promotions object 
    //comopare to current price to see if promotion should be removed
};

RedPencilPromotion.prototype.removeRedPencilIfExpired = function(startdate) {
    // test to see if there is a redpencil promo applied that needs to be expired
    var now = new Date();
    if ( this.datediff( now, startdate ) > 30 ) {
        this.removeRedPencilPromotion();
    }
};

RedPencilPromotion.prototype.processRedPencilRemoval = function() {
    var activepromotion = this.fetchRedPencilPromotion();
        if ( activepromotion) {
            this.removeRedPencilIfExpired(activepromotion.date);
        }
};

RedPencilPromotion.prototype.removeRedPencilPromotion = function() {
    this.good.removePromotion('redpencil');
     // TODO log this to the good's promotionhistory
};

RedPencilPromotion.prototype.setRedPencilPromotion = function() {
    var rpp = Object.create(this.good.promotion);
    rpp.type = 'redpencil';
    rpp.info = {message:'rpp created'};

    //find the date of the price change that 
    // set the rpp in the promotions object
    // log it to the history object
};



module.exports = RedPencilPromotion;