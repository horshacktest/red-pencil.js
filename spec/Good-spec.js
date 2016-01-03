"use strict";
describe("a good for sale", function() {

    var Good = require("../src/Good");
    var good;

    beforeEach(function() {
        good = new Good();
    });

    it("should allow the price to be set", function() {
        good.setPrice(20);
        expect(good.price).toBe(20);
    });

    it("should keep track of price history", function() {
        good.setPrice(20);
        good.setPrice(30);
        expect(good.pricehistory.length).toEqual(3);
    });

    it('shold store the current price at the front of the price history', function() {
        good.setPrice(10.00);
        good.setPrice(20.00);
        expect(good.pricehistory[0].price).toEqual(20);
    });

});



// describe a good not eligible for promotion. 