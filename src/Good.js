'use strict';

function Good(price, description) {
    this.description = description || '' ;
    this.pricehistory = [{ 'price': price || 0, date: new Date() }]; 
    this.promotion = { 
        type: '', // name of promotion type 
        date: new Date(), 
        info: {} // promotion metadata set by promotion processor
    };
    this.promotionhistory = []; // stores promotion objects in reverse chronological order
    this.promotions = {}; // stores current promotions. elements keyed by this.promotion.type, element data is {date:this.promotion.date, info:this.promotion.info }
}

Good.prototype.setDescription = function(description) {
    this.description = description;
};

Good.prototype.getPrice = function() {
    return this.getPriceHistory()[0].price;
};

Good.prototype.setPrice = function(newprice) {
    if ( this.pricehistory[0].price !== newprice ) // don't add a new price history if price stays the same
        this.pricehistory.unshift({ 'price': newprice, date: new Date() });
};

Good.prototype.getPriceHistory = function() {
    return this.pricehistory;
};

Good.prototype.getPromotions = function() {
    return this.promotions;
};

// to be called from the promotion processor
Good.prototype.setPromotion = function(promotion) {
    this.promotions[promotion.type] = { date: promotion.date, info: promotion.info };
};

Good.prototype.getPromotionHistory = function() {
    return this.promotionhistory; 
};

// to be called from the promotion processor
Good.prototype.setPromotionHistory = function(promotion) {
    // var p = Object.create(this.promotion);
    // p.type = promotion_name;
    // p.info = promotion_info;
    this.promotionhistory.unshift( promotion ); 
};

Good.prototype.removePromotion = function(promotion_name) {
    delete this.promotions[promotion_name];
};

module.exports = Good;