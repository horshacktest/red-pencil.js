# red-pencil.js

red pencil kata in javascript

## Description

_credit: Stefan Roock https://stefanroock.wordpress.com/2011/03/04/red-pencil-code-kata/_

>   We provide a shopping portal, where dealers can offer their goods (similiar to Amazon market place). We want to support red pencil promotions for reduced prices. During the red pencil promotion the old price is crossed out in red and the new reduced price is written next to it.
>   
>   To avoid misuse of red pencil promotions the red pencil promotions are activated and deactivated automatically.
>   
>   The scope of the Code Kata is the implementations of the rules for activation and end of red pencil promotions.
>   
>   1. A red pencil promotion starts due to a price reduction. The price has to be
>     reduced by at least 5% but at most bei 30% and the previous price had to be
>     stable for at least 30 days.
>   
>   2. A red pencil promotion lasts 30 days as the maximum length.
>   
>   3. If the price is further reduced during the red pencil promotion the promotion
>     will not be prolonged by that reduction.
>   
>   4. If the price is increased during the red pencil promotion the promotion will
>     be ended immediately.
>   
>   5. If the price if reduced during the red pencil promotion so that the overall
>     reduction is more than 30% with regard to the original price, the promotion is
>     ended immediately.
>   
>   6. After a red pencil promotion is ended additional red pencil promotions may
>     follow - as long as the start condition is valid: the price was stable for 30
>     days and these 30 days don't intersect with a previous red pencil promotion.

## Discussion

Red pencil promotions are not set explicitly. They become active as the result of a price change event that matches certain rules.

The code should run whenever a price change occurs on a good. It will decide if the promotion should be applied.

There should be a way to query a object to know if a promotion is in effect for a good.

## Rules
1. The price change must be between -5% and -30% of the current price to initiate the promotion. 

2. The price must have been the same for the previous 30 days.

3. The promotion cannot last longer than 30 days.

4. The promotion can not be re-initiated unless 30 days have passed in a non-promotion state.

5. The promotion will expire automatically 30 days after its start, if no qualifying event ends it first.

6. Any price increase during a promotion will end the promotion immediately.

7. Any price reduction during a promotion that would make the overall discount more than 30% (as a follow on to rule 1) will end the promotion. I find this rule a little unclear in the author's spec but this is how I am interpreting it.

