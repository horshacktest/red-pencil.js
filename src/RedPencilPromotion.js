"use strict";

function RedPencilPromotion(good) {
    var eligibleforpromotion;
    var goodpricehistory = good.getPriceHistory()

    function testPriceChangeRange() {
        // constants to test if the most recent price change is in the required range
        var UPPER = .95;
        var LOWER = .70;
        var PRICECHANGE = goodpricehistory[0].price / goodpricehistory[1].price
        console.log(PRICECHANGE)
        if ( LOWER <= PRICECHANGE && PRICECHANGE <= UPPER  ) 
            return true;
        else
            return false;
    }




    //if there is only one price it can't be eligible 
    if ( goodpricehistory.length < 2 ) {
        return good;
    } 

    console.log(testPriceChangeRange());

    if (eligibleforpromotion) {
        // set the promotion
    }
    else if (!eligibleforpromotion) {
        // end the promotion
    }
    else {
        //do nothing
    }
    return good;
}

    // check for stable price
    // check for reduction in range



module.exports = RedPencilPromotion;