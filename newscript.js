var Game = {};

// entire game fits in this function and then call this function to launch game
Game.Launch = function() {

    var css = document.createElement('style');
    css.type = 'text/css';

    Game.init = function() {
        // game variables that are useful
        Game.totalStringsEarned = 0; // total strings earned in runthrough
        Game.currentStrings = 0; // current amount of strings
        Game.stringDisplay = 0; // display of strings
        Game.stringsPerSec = 0; // strings per second (recalculate each purchase)
        Game.stringsPerSecRaw = 0; // raw Sps, no buffs applied
        Game.yarnClicks = 0; // +1 per click
        Game.yarnMadeFromClicking = 0; // increases each time per yarn click
        Game.globalSpsMultiplier = 1; // multiplier for sps
        Game.buildingSps = 0;
        Game.buildingsOwned = 0;
        Game.fps = 30;


        Game.windowH = window.innerHeight;
        Game.windowW = window.innerWidth;
        Game.scale = 1;

        //========================================================================
        // GAME ECONOMY
        //========================================================================

        Game.Earn = function(amount) { // earning strings to buy stuff
            Game.currentStrings += amount;
            Game.totalStringsEarned += amount;
        }

        Game.Spend = function(amount) { // spending strings to buy stuff
            Game.currentStrings -= amount;
        }

        Game.mouseSps = function() { // mouse strings per second

        }

        //========================================================================
        // SPS CALCULATOR
        //========================================================================

        Game.recalculateSps = true;
        Game.calculateSps = function () {
            Game.stringsPerSec = 0;
            var multiplier = 1;

            for(var i in Game.Objects) {
                var building = Game.Objects[i];
                building.storedSps = building.sps;
                building.storedTotalSps = building.amount * me.storedSps;
                Game.stringsPerSec += building.storedTotalSps;
            }
            Game.buildingSps = Game.stringsPerSec; // only building sps

            Game.globalSpsMultiplier = multiplier;
            Game.stringsPerSec *= globalSpsMultiplier;
            Game.recalculateSps = false;
        }


        //========================================================================
        // GAME BUILDINGS
        //========================================================================
        Game.Objects = {}
        Game.priceMultiplier = 1.15;
        Game.Building = function(name, description, icon, price, sps, buyFunction) {
            this.name = name;
            this.description = description;
            this.icon = icon;
            this.basePrice = price;
            this.price = this.basePrice;
            this.baseSps = sps;
            this.sps = this.baseSps;
            this.buyFunction = buyFunction;
            this.eachFrame = 0;

            this.amount = 0;

            this.getPrice = function() { // returns price of building
                var price = this.basePrice * Math.pow(Game.priceMultiplier, Math.max(0, this.amount)); // price of item x
                return Math.ceil(price); // round up
            }


            this.getSellMultiplier = function() {
                var multiplier = .25; // sell stuff for 1/4 of purchase price
                return multiplier;
            }

            this.buy = function() {
                var success = false;

                var price = this.getPrice();
                Game.spend(price);
                this.amount++;
                price=this.getPrice();
                this.price = price;
                Game.recalculateSps = true;
                Game.buildingsOwned++;

                success = true;
            }

            this.sell = function() {
                var success = false;

                var price = this.getPrice();
                var returnMultipler = this.getSellMultiplier();
                price = Math.floor(price * returnMultipler);
                Game.currentStrings += price;
                this.amount--;
                this.price = price;
                Game.buildingsOwned++;
                Game.recalculateSps = true;

                success = true;
            }
        }





        //========================================================================
        // GAME UPGRADES
        //========================================================================

        Game.Upgrades = {};
        Game.UpgradeById = {};
        Game.UpgradesInStore = [];
        Game.UpgradesOwned = 0;
        Game.Upgrade = function(name, description, price, icon, buyFunction) {
            this.name = name;
            this.description = description
            this.price = price;
            this.icon = icon;
            this.buyFunction = buyFunction;
            this.unlocked = false;
            this.bought = false;
        }
        
        Game.Has = function(what) { // returns true or false depending on if upgrade is owned
            var it = Game.upgrades[what];
            return (it ? it.bought : false); // if it exists return true else false
        }


    } // end of initialization

    Game.Logic = function() {
        if(Game.recalculateSps) { Game.calculateSps() }


    }

    Game.Draw = function() {

    }

    Game.Loop = function() {
        
    }



}