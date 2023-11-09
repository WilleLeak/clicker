let click = 1;

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

let cookieCount = document.getElementById('count');

let cookie = document.getElementById('click');
let count = 0;

cookie.onclick = function() {
    count += click;
    cookieCount.innerHTML = count;
}

function addToCount() {
    for(let adder in adders) {
        multiplier = adders[adder].multiplier;
        amount = adders[adder].amount;
        count += amount * multiplier;
    }
    cookieCount.innerHTML = count;
}

setInterval(addToCount, 1000); //have this setInterval method run when the first "grandma" is bought rather than off rip.
//Also probably lower the multipliers for now so the first "grandma" item that we buy only generates +0.1/sec instead of 1 straight up.
//Lets just try to solidify the clicker and the first "grandma" generator first along with the upgrades to both the clicker and "grandma"