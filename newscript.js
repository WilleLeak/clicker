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
        Game.globalSpsMultiplier = 1;


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

            Game.stringsPerSec = 
            Game.globalSpsMultiplier = multiplier;
            Game.recalculateSps = false;
        }


        //========================================================================
        // GAME BUILDINGS
        //========================================================================
       
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

            this.amount = 0;

            this.getPrice = function() { // returns price of building
                var price = this.basePrice * Math.pow(Game.priceMultiplier, Math.max(0, this.amount));
                return Math.ceil(price);
            }


            this.getSellMultiplier = function() {
                var multiplier = .25;

                return multiplier;
            }

            this.buy = function() {
                var success = false;
                var bought = 0;

                bought++;
                Game.spend(price);
                this.amount++;
                price=this.getPrice();
                this.price = price;


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

    }

    Game.Draw = function() {

    }



}