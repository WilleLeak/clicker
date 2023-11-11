// adders is an object with objects inside of it
// each subobject contains: 
//      name(name of the adder)
//      multiplier(amount per adder)
//      amount(number of type)
//      cost(cost to buy the next one)
var adders = {
    adder1: { 
        name: 'Knitting Needles',
        multiplier: .1,
        amount: 0,
        cost: 10
    },
    adder2: {
        name: 'Grandma',
        multiplier: 1,
        amount: 0,
        cost: 100
    },
    adder3: {
        name: 'Sewing Machine',
        multiplier: 8,
        amount: 0,
        cost: 1100
    },
    adder4: { 
        name: 'Cat',
        multiplier: 24,
        amount: 0,
        cost: 3400
    },
    adder5: { 
        name: 'Shrine',
        multiplier: 86, 
        amount: 0,
        cost: 10000
    },
    adder6: {
        name: 'Church',
        multiplier: 195,
        amount: 0,
        cost: 120000
    },
    adder7: {
        name: 'Cat Serum',
        multiplier: 498,
        amount: 0,
        cost: 500000
    }
};
// upgrades is an object with objects inside of it
// each subobject contains:
//      upgrades(object with upgrade details)
//          name(name of upgrade)
//          price(cost of upgrade)
//          requirements(requirements for upgrade to appear and be purchased)
var upgrades = {
    mouseUpgrades:      {
        upgrade1: {
            name: 'name1',
            price: 0,
            requirements: {}
        },
        upgrade2: {
            name: 'name1',
            price: 0,
            requirements: {}
        },
        upgrade3: {
            name: 'name1',
            price: 0,
            requirements: {}
        }
    },
    needleUpgrades:     {
        upgrade1: {
            name: 'name1',
            price: 0,
            requirements: {}
        },
        upgrade2: {
            name: 'name1',
            price: 0,
            requirements: {}
        },
        upgrade3: {
            name: 'name1',
            price: 0,
            requirements: {}
        }
    },
    grandmaUpgrades:    {
        upgrade1: {
            name: 'name1',
            price: 0,
            requirements: {}
        },
        upgrade2: {
            name: 'name1',
            price: 0,
            requirements: {}
        },
        upgrade3: {
            name: 'name1',
            price: 0,
            requirements: {}
        }
    },
    sewingUpgrades:     {
        upgrade1: {
            name: 'name1',
            price: 0,
            requirements: {}
        },
        upgrade2: {
            name: 'name1',
            price: 0,
            requirements: {}
        },
        upgrade3: {
            name: 'name1',
            price: 0,
            requirements: {}
        }
    },
    catUpgrades:        {
        upgrade1: {
            name: 'name1',
            price: 0,
            requirements: {}
        },
        upgrade2: {
            name: 'name1',
            price: 0,
            requirements: {}
        },
        upgrade3: {
            name: 'name1',
            price: 0,
            requirements: {}
        }
    },
    shrineUpgrades:     {
        upgrade1: {
            name: 'name1',
            price: 0,
            requirements: {}
        },
        upgrade2: {
            name: 'name1',
            price: 0,
            requirements: {}
        },
        upgrade3: {
            name: 'name1',
            price: 0,
            requirements: {}
        }
    },
    churchUpgrades:     {
        upgrade1: {
            name: 'name1',
            price: 0,
            requirements: {}
        },
        upgrade2: {
            name: 'name1',
            price: 0,
            requirements: {}
        },
        upgrade3: {
            name: 'name1',
            price: 0,
            requirements: {}
        }
    },
    serumUpgrades:      {
        upgrade1: {
            name: 'name1',
            price: 0,
            requirements: {}
        },
        upgrade2: {
            name: 'name1',
            price: 0,
            requirements: {}
        },
        upgrade3: {
            name: 'name1',
            price: 0,
            requirements: {}
        }
    }
};
var totalCookiesBaked = 0;                                      // total cookies baked in game session - can ONLY increase
var globalCount = 0;                                            // global count of all cookies
var click = 1;                                                  // how much each click gives
var totalClicks = 0;                                            // total number of clicks
var cookieCount = document.getElementById('count');             // number display for cookie
var cookie = document.getElementById('click');                  // actual cookie to click
var cookiesPerSecond = 0;                                       // cookies baked per second
var titleTab = document.getElementById('website-title-tab');    // title of the tab of the website

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
    totalClicks++;
}

const updateButtonDisplay = (button, adder) => {
    button.innerHTML = `${adder.name} - Cost: ${adder.cost}, Amount: ${adder.amount}`; // button format for now
};

const addToGlobalCount = () => {
    Object.values(adders).forEach(adder => { // for each to loop through each value in the adder object
        globalCount += adder.multiplier * adder.amount; // adds to the global count
   });
};

const calculatePerSecItems = () => {
    var cps = 0;
    Object.keys(adders).forEach(function(adder) { cps += adders[adder].multiplier * adders[adder].amount }); // loops through adders to add to cps
    cookiesPerSecond = cps;
};

const updateWebsiteName = () => { 
    if(globalCount >= 10000) {
        titleTab.innerHTML = `${Math.round(globalCount, 1)} Strings`
    } else {
        titleTab.innerHTML = `${globalCount.toFixed(1)} Strings`;
    }
};

// unified event listener for all purchase buttons instead of one function per button (i hope this does what i think im making it do)
document.addEventListener('click', function(purchaseButton) {
    if(purchaseButton.target.classList.contains('adder-purchase-button')) {
        var buttonElement = document.getElementById(purchaseButton.target.id); // button that is being modified
        var adderKey = purchaseButton.target.dataset.adderKey; // adder key to object being referenced
        var adder = adders[adderKey]; // specific adder object

        if(globalCount >= adder.cost) {
            globalCount -= adder.cost; // purchases adder
            adder.amount++; // adds to amount
            adder.cost = Math.round(adder.cost * 1.18, 1); // rounds cost so no decimal
            updateButtonDisplay(buttonElement, adder); // updates button with info
            calculatePerSecItems(); // changes cookiesPerSec calculation
        }
    }
});


// all functions running continuously
setInterval(updateCookiesDisplaySmooth, 1);
setInterval(addToGlobalCount, 1000);
setInterval(updateWebsiteName, 5000);