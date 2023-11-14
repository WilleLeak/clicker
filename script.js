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
        cost: 15400
    },
    adder5: { 
        name: 'Shrine',
        multiplier: 86, 
        amount: 0,
        cost: 120000
    },
    adder6: {
        name: 'Church',
        multiplier: 235,
        amount: 0,
        cost: 500000
    },
    adder7: {
        name: 'Cat Serum',
        multiplier: 1200,
        amount: 0,
        cost: 2000000
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
            name: 'Iron Finger',
            price: 10,
            requirements: {
                amount: 5
            },
            effects: {}
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
var Yps = document.getElementById('YpS');                       // yarn per second element


//                                  THESE FUNCTIONS UPDATE THE DISPLAYS IN THE GAME:
//                                          TITLE TAB, GLOBAL COUNT, YPS
// element - html element
// number - number being shortened
// messageString - string to write after the number
const updateElementNumbers = (element, number, messageString) => {
    if(number >= 1_000_000) { // only shorten number if >= 1 mil
        var suffixes = [' million', ' billion', ' trillion', 'quadrillion', ' quintillion'];
        var orderOfMagnitude = Math.floor(Math.log10(number) / 3); // this finds power of number
        var adjustedNum = number / Math.pow(1_000, orderOfMagnitude); // this finds new number ex: 1,500,000 / 1,000,000 = 1.5
        var formattedNum = adjustedNum.toFixed(3) + suffixes[orderOfMagnitude - 2]; // forces 3 decimals and then adds proper suffix
        element.innerHTML =`${formattedNum} ${messageString}`;
    } else if(number >= 10_000) {
        element.innerHTML = `${Math.round(number, 1)} ${messageString}`;
    } else {
        element.innerHTML = `${number.toFixed(1)} ${messageString}`;
    }
};

function updateCookiesDisplaySmooth() { // updates global cookie display html
    globalCount += cookiesPerSecond / 1_000; // cookies per second / 1_000 because this runs at 1ms intervals
    updateElementNumbers(cookieCount, globalCount, 'strings');
}

const updateWebsiteName = () => { // this updates the tab name, its just the number of strings you currently have
    updateElementNumbers(titleTab, globalCount, 'strings');
};

const updateYpS = () => { // updates the Yps counter below the total strings
    updateElementNumbers(Yps, cookiesPerSecond, 'strings per second');
};

//                                  END OF DISPLAY UPDATE FUNCTIONS


//                                  THESE FUNCTIONS UPDATE THE ADDERS / ADDER BUTTONS

// unified event listener for all purchase buttons instead of one function per button (i hope this does what i think im making it do)
document.addEventListener('click', function(purchaseButton) {
    if(purchaseButton.target.classList.contains('adder-purchase-button')) {
        var buttonElement = document.getElementById(purchaseButton.target.id); // button that is being modified
        var adderKey = purchaseButton.target.dataset.adderKey; // adder key to object being referenced
        var adder = adders[adderKey]; // specific adder object

        if(globalCount >= adder.cost) {
            globalCount -= adder.cost; // purchases adder
            adder.amount++; // adds to amount
            adder.cost = Math.round(adder.cost * 1.15, 1); // rounds cost so no decimal
            updateButtonDisplay(buttonElement, adder); // updates button with info
            calculatePerSecItems(); // changes cookiesPerSec calculation
            updateYpS();
        }
    }
});

const updateButtonDisplay = (button, adder) => {
    button.innerHTML = `${adder.name} - Cost: ${adder.cost}, Amount: ${adder.amount}`; // button format for now
};
//                                 THESE ARE ADDITION FUNCTIONS
//                                 THEY UPDATE THE GLOBAL COUNT

// when the cookie is clicked the global count variable is added to by how much click is
cookie.onclick = function() {
    globalCount += click;
    totalClicks++;
};

const addToGlobalCount = () => { // this is where the global count increases
    Object.values(adders).forEach(adder => { // for each to loop through each value in the adder object
        globalCount += adder.multiplier * adder.amount; // adds to the global count
   });
};

//                                 END OF ADDITION FUNCTIONS


//                                 MISC. FUNCTIONS
const calculatePerSecItems = () => {
    var cps = 0;
    Object.keys(adders).forEach(function(adder) { cps += adders[adder].multiplier * adders[adder].amount }); // loops through adders to add to cps
    cookiesPerSecond = cps;
};

//                                 END OF MISC. FUNCTIONS

//                                 UPGRADE FUNCTIONS
//                                 FUNCTIONS THAT AFFECT UPGRADES
const upgradeIsPurchaseable = (upgradeType, upgradeName, adder, ) => {
    const requiredAmount = upgrades[upgradeType][upgradeName].requirements.amount;
    if(requiredAmount >= adders[adder].amount) {
        return false;
    }
    return true;
};

const upgradeClick = () => {

};

// all functions running continuously
setInterval(updateCookiesDisplaySmooth, 1);
setInterval(addToGlobalCount, 1_000);
setInterval(updateWebsiteName, 5_000);