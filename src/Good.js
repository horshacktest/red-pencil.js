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

Good.prototype.removePromotion = function(promotion_name, promotion_info) {
    this.promotions[promotion_name] = promotion_info;
}
Good.prototype.getDaysSinceLastPriceChange = function() {

}

module.exports = Good;