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
    adder4: { name: 'LATER1',
              multiplier: 24,
              amount: 0,
              cost: 3400
            },
    adder5: { name: 'LATER2',
              multiplier: 86, 
              amount: 0,
              cost: 10000
            }
};
var totalCookiesBaked = 0;                                      // total cookies baked in game session - can ONLY increase
var globalCount = 0;                                            // global count of all cookies
var click = 100;                                                // how much each click gives
var cookieCount = document.getElementById('count');             // number display for cookie
var cookie = document.getElementById('click');                  // actual cookie to click
var cookiesPerSecond = 0;                                       // cookies baked per second
const buySticks = document.getElementById('knitting-needles');  // first adder
const grandma = document.getElementById('grandma');             // second adder

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

const updateButtonDisplay = (button, adder) => {
    button.innerHTML = `${adder.name} - Cost: ${adder.cost}, Amount: ${adder.amount}`;
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
        adders.adder1.cost = Math.round(adders.adder1.cost * 1.18, 1); // increase cost of adder
        updateCookieDisplay();
        updateButtonDisplay(buySticks, adders.adder1);
    } // if you wanna add an alert you can i just feel like thats annoying to have to click away
});
// unified event listener for all purchase buttons instead of one function per button (i hope this does what i think im making it do)
// document.addEventListener('click', function(purchaseButton) {
//     if(purchaseButton.target.classList.contains('adder-purchase-button')) {
//         var buttonId = purchaseButton.target.id;
//         var button = purchaseButton.getElementById(buttonId);
        
//         if(globalCount.adders)
//     }
// })


setInterval(addToCount, 1000);