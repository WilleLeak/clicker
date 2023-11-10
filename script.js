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

function updateCookieDisplay() {
    cookieCount.innerHTML = globalCount.toFixed(1); // changes the html of the cookieCount variable
}
// when the cookie is clicked the global count variable is added to by how much click is
cookie.onclick = function() {
    globalCount += click;
    updateCookieDisplay();
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
        updateCookieDisplay(); // modifies the count html
    });
};

const perSecond = () => { // calculates cookies per second
    let cps = 0;
    workingAdders.forEach(function(adder) { cps += adder.multiplier * adder.amount }); // adds cookies per second created from each adder
    cookiesPerSecond = cps; // assigns cookies per second to global version
};

const buySticks = document.getElementById('click-helper')
let stickCost = 10; //change this later to adder.adder1.cost
let stickCount = 0;

buySticks.addEventListener('click', () => {
    if (globalCount >= stickCost) //if you have enough yarn, you are able to buy sticks
    {
        globalCount -= stickCost; //subtract current cookies by the cost of the sticks
        stickCount++; //delete this after adder.adder1.amount is working
        adder.adder1.amount += 1; //need this to auto-update
        stickCost = Math.ceil(stickCost * 1.2); //stick
        updateCookieDisplay();
    }
    else
    {
        alert('Not enough yarn!');
    }
})


setInterval(startAdding, 100);
setInterval(addToCount, 1000);