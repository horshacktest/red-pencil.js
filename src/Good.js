"use strict";

function Good(price, description) {
    this.price = price || 0 ;
    this.description = description || "" ;
    this.pricehistory = [{ "price": price, date: new Date() }]; 
    this.promotions = [];
}

Good.prototype.setPrice = function(newprice) {
    this.price = newprice;
    this.pricehistory.unshift({ "price": newprice, date: new Date() });
};

Good.prototype.setDescription = function(description) {
    this.description = description;
}

Good.prototype.getPriceHistory = function() {
    return this.pricehistory;
}

Good.prototype.getDaysSinceLastPriceChange = function() {
        
}

module.exports = Good;