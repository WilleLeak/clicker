// adders is an object with objects inside of it
// each subobject contains: 
//      multiplier(amount per adder)
//      amount(number of type)
//      cost(cost to buy the next one)


let adders = {
    adder1: { multiplier: .1,
              amount: 0,
              cost: 10
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
var cookiesPerSecond = 0;
const buySticks = document.getElementById('click-helper');

function updateCookieDisplay() {
    cookieCount.innerHTML = globalCount.toFixed(1); // changes the html of the cookieCount variable
}

// when the cookie is clicked the global count variable is added to by how much click is
cookie.onclick = function() {
    globalCount += click;
    updateCookieDisplay();
}

// function startAdding() { // if the count of an adder is > 0 its added to the workingAdders set
//     for(let item in adders) {
//         if(adders[item].amount > 0) {
//             workingAdders.add(adders[item]);
//         }
//     }
// }

// const addToCount = () => { // arrow function (no params)
//     console.log(workingAdders);
//     workingAdders.forEach(function(adder) { // for each with anonymous function that adds to the global count for each element in the set
//         let cookiesBaked = adder.multiplier * adder.amount;
//         globalCount += cookiesBaked;
//         totalCookiesBaked += cookiesBaked;
//         updateCookieDisplay(); // modifies the count html
//     });
// };


const addToCount = () => {
    Object.values(adders).forEach(adder => { // for each to loop through each value in the adder object
        globalCount += adder.multiplier * adder.amount; // adds to the global count
        updateCookieDisplay();
   });
};


const perSecond = () => { // calculates cookies per second
    let cps = 0;
    workingAdders.forEach(function(adder) { cps += adder.multiplier * adder.amount }); // adds cookies per second created from each adder
    cookiesPerSecond = cps; // assigns cookies per second to global version
};

buySticks.addEventListener('click', function() {
    if(globalCount >= adders.adder1.cost) {
        globalCount -= adders.adder1.cost; // subtract cost of adder
        adders.adder1.amount++; // increase num of adders
        adders.adder1.cost *= 1.2; // increase cost of adder
    }
});


setInterval(addToCount, 1000);