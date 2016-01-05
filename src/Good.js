'use strict';

function Good(price, description) {
    this.description = description || "" ;
    this.pricehistory = [{ "price": price || 0, date: new Date() }]; 
    this.promotions = {};
}

Good.prototype.setDescription = function(description) {
    this.description = description;
}

Good.prototype.getPrice = function() {
    return this.getPriceHistory()[0].price;
};

Good.prototype.setPrice = function(newprice) {
    this.pricehistory.unshift({ "price": newprice, date: new Date() });
};

Good.prototype.getPriceHistory = function() {
    return this.pricehistory;
}

Good.prototype.getPromotions = function() {
    return this.promotions;
}

Good.prototype.setPromotion = function(promotion_name, promotion_info) {
    this.promotions[promotion_name] = promotion_info;
}

Good.prototype.removePromotion = function(promotion_name) {
    delete this.promotions[promotion_name];
}
Good.prototype.getDaysSinceLastPriceChange = function() {
    function datediff(date1, date2) {
        var A_DAY_OF_MILLISECONDS = 86400000;
        var diffms = date1.getTime() - date2.getTime();
        return diffms / A_DAY_OF_MILLISECONDS;
    }
    //var date0 = new Date();
    var date1 = this.getPriceHistory()[0].date;
    var date2 = this.getPriceHistory()[1].date || date1;
    return datediff(date1,date2);
}

module.exports = Good;