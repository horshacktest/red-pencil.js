"use strict";

function Good(price, description) {
    this.price = price || 0 ;
    this.description = description || "" ;
    this.pricehistory = [{ "price": price, date:Date() }]; 
    this.promotions = [];

}

Good.prototype.setPrice = function(newprice) {
    this.price = newprice;
    this.pricehistory.unshift({ "price": newprice, date:Date() });
};

module.exports = Good;