"use strict";
describe('a good for sale', function() {

    var Good = require('../src/Good');
    var good;

    beforeEach(function() {
        good = new Good();
    });

    it('should allow the price to be set', function() {
        good.setPrice(20);
        expect(good.price).toBe(20);
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

    it('should handle currency properly', function() {

    });

});


describe('a good with a price history', function() {

    var dateDiff = function(date1, date2) {
        var A_DAY_OF_MILLISECONDS = 86400000;
        var diffms = date1.getTime() - date2.getTime();
        return diffms / A_DAY_OF_MILLISECONDS;
    }
    
    var Good = require('../src/Good');
    var good;

    beforeEach(function() {
        jasmine.clock().install();
        good = new Good();
    });

    it('should be able to calculate the number of days between the current price change and next most recent price change', function() {
        jasmine.clock().mockDate(new Date(2014, 11, 9));
        good.setPrice(20);
        jasmine.clock().mockDate(new Date(2015, 0, 8));
        good.setPrice(10);
        var date1 = good.getPriceHistory()[0].date;
        var date2 = good.getPriceHistory()[1].date;
        console.log(dateDiff(date1, date2));
    });

});