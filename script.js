// adders is an object with objects inside of it
// each subobject contains: 
//      multiplier(amount per adder)
//      amount(number of type)
//      cost(cost to buy the next one)
let adders = {
    adder1: { multiplier: 1,
              amount: 1,
              cost: 50
            },
    adder2: { multiplier: 5,
              amount: 0,
              cost: 500
            },
    adder3: { multiplier: 10,
              amount: 0,
              cost: 1500
            },
    adder4: { multiplier: 20,
              amount: 0,
              cost: 3000
            },
    adder5: { multiplier: 100, 
              amount: 0,
              cost: 10000
            }
};

let count = 0; // global count of all cookies
let click = 1; // how much each click gives
let cookieCount = document.getElementById('count');
let cookie = document.getElementById('click');

// when the cookie is clicked the global count variable is added to by how much click is
cookie.onclick = function() {
    count += click;
    cookieCount.innerHTML = count; // changes the html of the cookieCount variable
}

function addToCount() {
    for(let adder in adders) { // loops through all the adder objects 
        multiplier = adders[adder].multiplier; // gets the multiplier from the subobject
        amount = adders[adder].amount; // gets the amout from the subobject
        count += amount * multiplier; // adds to the count variable
    }
    cookieCount.innerHTML = count; // after all addition is done the count is updated in the html
}

setInterval(addToCount, 1000); //have this setInterval method run when the first "grandma" is bought rather than off rip.
//Also probably lower the multipliers for now so the first "grandma" item that we buy only generates +0.1/sec instead of 1 straight up.
//Lets just try to solidify the clicker and the first "grandma" generator first along with the upgrades to both the clicker and "grandma"