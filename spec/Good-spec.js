'use strict';
describe('a good for sale', function() {

    var Good = require('../src/Good');
    var good;

    beforeEach(function() {
        good = new Good();
    });

    it('should have a price of 0 if a price is not passed', function() {
        expect(good.getPrice()).toBe(0);
    });

    it('should allow the price to be set', function() {
        good.setPrice(20);
        expect(good.getPrice()).toBe(20);
    });

    it('should keep track of price history', function() {
        good.setPrice(20);
        good.setPrice(40);
        expect(good.getPriceHistory().length).toEqual(3);
    });

    it('should store the current price at the front of the price history array', function() {
        good.setPrice(10.00);
        good.setPrice(20.00);
        expect(good.getPriceHistory()[0].price).toEqual(20);
    });

    it('should store the current date when it sets a new current price', function() {
        var now = Date.now();
        var now_in_a_good;
        good.setPrice(20.00);
        now_in_a_good = good.getPriceHistory()[0].date.getTime();
        expect(now_in_a_good).toBeCloseTo(now, -3); 
    });

    xit('should handle currency properly', function() {

    });

});

describe('a good that stores promotion information', function() {

    var Good = require('../src/Good');
    var good = new Good();
    var promotiontype = 'mypromotion';
    var promotiondate = new Date(2015,0,10);
    var promotioninfo = {some_info_relevant_to_the_promo_type:'mypromotion started', some_price_info:20}
    var promotionobject = {type:promotiontype, date: promotiondate, info: promotioninfo };   

    it('should allow a promotion to be set', function() {
        expect(function(){good.setPromotion(promotionobject);}).not.toThrow();
    });
    
    it('should allow a promotion to be read', function() {
        expect(good.getPromotions()).toEqual({mypromotion:{date: promotiondate, info: promotioninfo}});
    });
    
    it('should allow a promotion to be removed', function() {
        good.removePromotion('mypromotion');
        expect(good.getPromotions()).toEqual({});
    });

    it('should add events to the promotion history', function() {
        good.setPromotionHistory(promotionobject);
        var ph = good.getPromotionHistory()[0];
        expect(ph.info.some_info_relevant_to_the_promo_type).toBe('mypromotion started');
    });

});
