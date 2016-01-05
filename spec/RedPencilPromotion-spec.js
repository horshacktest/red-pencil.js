"use strict";

describe('a red-pencil promotion processor', function() {
    var RedPencilPromotion = require('../src/RedPencilPromotion');
    var Good = require('../src/Good');
    var good, rpp;

    jasmine.clock().install();

    beforeEach(function() {
        jasmine.clock().mockDate(new Date(2014, 11, 9));
        good = new Good(20, "A fine object that looks great in any decor.");
        rpp = new RedPencilPromotion(good);
    });

    it('should return a "good" object passed to it after it has inspected and changed any promotions on that good', function() {
        var rppgood = new RedPencilPromotion(good).process();
        expect(rppgood instanceof Good ).toBe( true );
    });

    it('should check if the last price change is within the allowed discount range', function() {
        // bad prices based on 20
        good.setPrice(20.00);
        good.setPrice(13.99);
        expect(rpp.testPriceChangeRange()).toBeFalsy();
        good.setPrice(20.00);
        expect(rpp.testPriceChangeRange()).toBeFalsy();
        good.setPrice(19.01);
        expect(rpp.testPriceChangeRange()).toBeFalsy();
        // good prices based on 20
        good.setPrice(20.00);
        good.setPrice(14.00);
        expect(rpp.testPriceChangeRange()).toBeTruthy();
        good.setPrice(20.00);
        good.setPrice(16.00);
        expect(rpp.testPriceChangeRange()).toBeTruthy();
        good.setPrice(20.00);
        good.setPrice(19.00);
        expect(rpp.testPriceChangeRange()).toBeTruthy();
    });

    it('should check if the price has not been changed in the last 30 days', function() {
        jasmine.clock().mockDate(new Date(2014, 11, 9));
        good.setPrice(14.00);
        jasmine.clock().mockDate(new Date(2015, 0, 8));
        good.setPrice(12.00);
        expect(rpp.testPriceChangeWaitingPeriod()).toBe(true);
        jasmine.clock().mockDate(new Date(2015, 0, 18));
        good.setPrice(12.00);
        expect(rpp.testPriceChangeWaitingPeriod()).toBe(false);
    });

    it('should check for a price increase', function() {
        good.setPrice(14.00);
        good.setPrice(14.01);
        expect(rpp.testPriceIncrease()).toBe(true);
    });

    describe('a good to be evaluated for red-pencil promotions', function() {
        
        describe("a good eligible for the red pencil promotion", function() {

            it("should enable the promotion when price reduction is between 5 and 30 %", function() {
            })

        })

        describe('a good not eligible for the red pencil promotion', function() {
            
            // Rule 2
            it('should not allow a promotion to be applied if the price has changed within 30 days', function() {
                
            });

        });

        describe('a good with the red pencil promotion applied', function() {
            jasmine.clock().mockDate(new Date(2014, 11, 9));

            //Rule 3   
            it('should cancel the promotion after it has been in effect for 30 days', function() {
                
            });

        });

        // describe a good not eligible for promotion. 

    });

    jasmine.clock().uninstall();

});


