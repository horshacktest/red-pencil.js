"use strict";

describe('a red-pencil promotion processor', function() {
    var RedPencilPromotion = require('../src/RedPencilPromotion');
    var Good = require('../src/Good');
    var good;

    jasmine.clock().install();

    beforeEach(function() {
        good = new Good(20, "A fine object that looks great in any decor.");
    });

    it('should return a "good" object passed to it after it has inspected and changed any promotions on that good', function() {
        var rppgood = RedPencilPromotion(good)
        expect(rppgood instanceof Good ).toBe( true );
    });

    it('should check if the last price change is within the allowed discount range', function() {
        jasmine.clock().mockDate(new Date(2014, 11, 9));
        good.setPrice(13.99);
        //console.dir(RedPencilPromotion);
        spyOn(RedPencilPromotion, "testPriceChangeRange");
        expect(RedPencilPromotion.testPriceChangeRange).toHaveBeenCalled();
        
    });

    describe('a good to be evaluated for red-pencil promotions', function() {
        
        describe("a good eligible for the red pencil promotion", function() {

            var rpp;
            var good;


            it("should enable the promotion when price reduction is between 5 and 30 %", function() {
            })



        })


        describe('a good not eligible for the red pencil promotion', function() {
            
            // Rule 2
            it('should not allow a promotion to be applied if the price has changed within 30 days', function() {
                
            });

        });

        describe('a good with the red pencil promotion applied', function() {

            //Rule 3   
            it('should cancel the promotion after it has been in effect for 30 days', function() {
                
            });

        });

        // describe a good not eligible for promotion. 

    });

    jasmine.clock().uninstall();

});


