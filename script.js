// adders is an object with objects inside of it
// each subobject contains: 
//      name(name of the adder)
//      multiplier(amount per adder)
//      amount(number of type)
//      cost(cost to buy the next one)
var adders = {
    adder1: { name: 'Knitting Needles',
              multiplier: .1,
              amount: 0,
              cost: 10
            },
    adder2: { name: 'Grandma',
              multiplier: 1,
              amount: 0,
              cost: 100
            },
    adder3: { name: 'Sewing Machine',
              multiplier: 8,
              amount: 0,
              cost: 1100
            },
    adder4: { name: 'Cat',
              multiplier: 24,
              amount: 0,
              cost: 3400
            },
    adder5: { name: 'Shrine',
              multiplier: 86, 
              amount: 0,
              cost: 10000
            },
    adder6: { name: 'Church',
              multiplier: 195,
              amount: 0,
              cost: 120000
            },
    adder7: { name: 'Cat Serum',
              multiplier: 498,
              amount: 0,
              cost: 500000
            }
};
var totalCookiesBaked = 0;                                      // total cookies baked in game session - can ONLY increase
var globalCount = 0;                                            // global count of all cookies
var click = 1;                                              // how much each click gives
var cookieCount = document.getElementById('count');             // number display for cookie
var cookie = document.getElementById('click');                  // actual cookie to click
var cookiesPerSecond = 0;                                       // cookies baked per second
const buySticks = document.getElementById('knitting-needles');  // first adder
const grandma = document.getElementById('grandma');             // second adder

function updateCookiesDisplaySmooth() { // smoothly updates global count of cookies - no longer need updateCookieDisplay()
    globalCount += cookiesPerSecond / 1000; // calculation for cookies per 1 ms because setInterval runs function each ms
    if(globalCount >= 10000) {
        cookieCount.innerHTML = Math.round(globalCount, 1); // no decimal if globalCount > 10000
    } else {
    cookieCount.innerHTML = globalCount.toFixed(1); // shows decimal to one place
    }
}

// when the cookie is clicked the global count variable is added to by how much click is
cookie.onclick = function() {
    globalCount += click;
}

const updateButtonDisplay = (button, adder) => {
    button.innerHTML = `${adder.name} - Cost: ${adder.cost}, Amount: ${adder.amount}`;
};

const addToGlobalCount = () => {
    Object.values(adders).forEach(adder => { // for each to loop through each value in the adder object
        globalCount += adder.multiplier * adder.amount; // adds to the global count
   });
};

const calculatePerSecItems = () => {
    var cps = 0;
    Object.keys(adders).forEach(function(adder) { cps += adders[adder].multiplier * adders[adder].amount });
    cookiesPerSecond = cps;
    
};

// unified event listener for all purchase buttons instead of one function per button (i hope this does what i think im making it do)
document.addEventListener('click', function(purchaseButton) {
    if(purchaseButton.target.classList.contains('adder-purchase-button')) {
        var buttonElement = document.getElementById(purchaseButton.target.id); // button that is being modified
        var adderKey = purchaseButton.target.dataset.adderKey; // adder key to object being referenced
        var adder = adders[adderKey]; // specific adder object

        if(globalCount >= adder.cost) {
            globalCount -= adder.cost;
            adder.amount++;
            adder.cost = Math.round(adder.cost * 1.18, 1);
            updateButtonDisplay(buttonElement, adder);
            calculatePerSecItems();
        }
    }
}); 

// all functions running continuously
setInterval(updateCookiesDisplaySmooth, 1);
setInterval(addToGlobalCount, 1000);