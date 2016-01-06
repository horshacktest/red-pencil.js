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
    var promotionobject = {startdate: new Date(2015,0,10), };   
    var promotionhistoryobject = {message:'promotion started', originalprice:20,  };   

    it('should allow a promotion to be set', function() {
        // good.setPromotion('redpencil', promotionobject);
        expect(function(){good.setPromotion('redpencil', promotionobject);}).not.toThrow();
        //expect(good.setPromotion()).toBe(undefined);
    });
    
    it('should allow a promotion to be read', function() {
        expect(good.getPromotions()).toEqual({redpencil:promotionobject});
    });
    
    it('should allow a promotion to be removed', function() {
        good.removePromotion('redpencil');
        expect(good.getPromotions()).toEqual({});
    });

    it('should add events to the promotion history', function() {
        good.setPromotionHistory('redpencil' , promotionhistoryobject);
        var ph = good.getPromotionHistory();
        var phlast = ph[ph.length-1];
        expect(phlast.info.message).toBe('promotion started');
    });

});

describe('a good with a price history', function() {
    
    var Good = require('../src/Good');
    var good;

    beforeEach(function() {
        jasmine.clock().install();
    });

    afterAll(function() {
        jasmine.clock().uninstall();
    });

    it('should be able to calculate the number of days between the most recent price change and second most recent price change', function() {
        jasmine.clock().mockDate(new Date(2014, 11, 9));
        good = new Good();
        good.setPrice(20);
        jasmine.clock().mockDate(new Date(2015, 0, 8));
        good.setPrice(30);
        expect(good.getDaysSinceLastPriceChange()).toBe(30);
    });

});