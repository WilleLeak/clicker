// adders is an object with objects inside of it
// each subobject contains: 
//      multiplier(amount per adder)
//      amount(number of type)
//      cost(cost to buy the next one)


let adders = {
    adder1: { multiplier: .1,
              amount: 1,
              cost: 50
            },
    adder2: { multiplier: 1,
              amount: 0,
              cost: 100
            },
    adder3: { multiplier: 8,
              amount: 0,
              cost: 1100
            },
    adder4: { multiplier: 24,
              amount: 0,
              cost: 3400
            },
    adder5: { multiplier: 86, 
              amount: 0,
              cost: 10000
            }
};
var totalCookiesBaked = 0; // total cookies baked in game session - can ONLY increase
var globalCount = 0; // global count of all cookies
var click = 1; // how much each click gives
var cookieCount = document.getElementById('count');
var cookie = document.getElementById('click');
var workingAdders = new Set(); // all the functioning adders (set so no duplicates)
var cookiesPerSecond = 0;

// when the cookie is clicked the global count variable is added to by how much click is
cookie.onclick = function() {
    globalCount += click;
    cookieCount.innerHTML = globalCount.toFixed(1); // changes the html of the cookieCount variable
}

function startAdding() { // if the count of an adder is > 0 its added to the workingAdders set
    for(let item in adders) {
        if(adders[item].amount > 0) {
            workingAdders.add(adders[item]);
        }
    }
}

const addToCount = () => { // arrow function (no params)
    console.log(workingAdders);
    workingAdders.forEach(function(adder) { // for each with anonymous function that adds to the global count for each element in the set
        let cookiesBaked = adder.multiplier * adder.amount;
        globalCount += cookiesBaked;
        totalCookiesBaked += cookiesBaked;
        cookieCount.innerHTML = globalCount.toFixed(1); // modifies the count html
    });
};

const perSecond = () => { // calculates cookies per second
    let cps = 0;
    workingAdders.forEach(function(adder) { cps += adder.multiplier * adder.amount }); // adds cookies per second created from each adder
    cookiesPerSecond = cps; // assigns cookies per second to global version
};


setInterval(startAdding, 100);
setInterval(addToCount, 1000);
 //have this setInterval method run when the first "grandma" is bought rather than off rip.
//Also probably lower the multipliers for now so the first "grandma" item that we buy only generates +0.1/sec instead of 1 straight up.
//Lets just try to solidify the clicker and the first "grandma" generator first along with the upgrades to both the clicker and "grandma"