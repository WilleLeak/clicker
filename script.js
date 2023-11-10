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
var totalCookiesBaked = 0;                                  // total cookies baked in game session - can ONLY increase
var globalCount = 0;                                        // global count of all cookies
var click = 1;                                              // how much each click gives
var cookieCount = document.getElementById('count');         // number display for cookie
var cookie = document.getElementById('click');              // actual cookie to click
var cookiesPerSecond = 0;                                   // cookies baked per second
const buySticks = document.getElementById('click-helper');  // first adder

// need to figure out how promises work a lil more before i get this properly working
// function updateCookieDisplaySmooth(targetCount) { // smooth increase of globalCount, mostly for adders to not add in one chunk
//     const startCount = parseFloat(cookieCount.innerHTML);
//     const startTime = new Date().getTime();

//     function update() {
//         const currentTime = new Date().getTime();
//         const elapsedTime = currentTime - startTime;

//         if(elapsedTime < 1000) { // 1000 ms = 1 sec
//             const progress = elapsedTime / 1000;
//             const newCount = startCount + (targetCount - startCount) * progress;
//             cookieCount.innerHTML = newCount.toFixed(1);
//         } else {
//             cookieCount.innerHTML = targetCount.toFixed(1);
//             clearInterval(interval);
//         }
//     }
//     const interval = setInterval(update, 10);
//}

function updateCookieDisplay() { // for one time things such as clicking
    cookieCount.innerHTML = globalCount.toFixed(1);
}

// when the cookie is clicked the global count variable is added to by how much click is
cookie.onclick = function() {
    globalCount += click;
    updateCookieDisplay();
}

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
        updateCookieDisplay();
    } // if you wanna add an alert you can i just feel like thats annoying to have to click away
});


setInterval(addToCount, 1000);