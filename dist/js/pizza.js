!function e(a,r,i){function n(o,s){if(!r[o]){if(!a[o]){var l="function"==typeof require&&require;if(!s&&l)return l(o,!0);if(t)return t(o,!0);var c=new Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}var u=r[o]={exports:{}};a[o][0].call(u.exports,function(e){var r=a[o][1][e];return n(r?r:e)},u,u.exports,e,a,r,i)}return r[o].exports}for(var t="function"==typeof require&&require,o=0;o<i.length;o++)n(i[o]);return n}({1:[function(e,a,r){"use strict";var i=e("./utils"),n=function(){function e(){this.imagePath="img/pizza.png",this.imageWidth=73.333,this.imageHeight=100,this.spacing=256,this._$el=document.body,this._rows=0,this._cols=0,this._imageCSS="",this._ticking=!1,this._frame=0}return e.prototype.init=function(){var e=this;this._reset(),window.addEventListener("scroll",function(){e._requestTick()}),window.addEventListener("resize",function(){e._reset()})},e.prototype._reset=function(){var e=Math.ceil(window.innerHeight/this.spacing),a=Math.ceil(window.innerWidth/this.spacing);e===this._rows&&a===this._cols||(this._rows=e,this._cols=a,this._totalImages=e*a,this._imageCSS="",this._requestTick())},e.prototype._update=function(){if(this._frame++,window.performance.mark("mark_start_frame"),this._getImageCSS(),this._getPositionCSS(),this._ticking=!1,window.performance.mark("mark_end_frame"),window.performance.measure("measure_frame_duration","mark_start_frame","mark_end_frame"),this._frame%10===0){var e=window.performance.getEntriesByName("measure_frame_duration");i.logAverageFrame(e)}},e.prototype._requestTick=function(){var e=this;this._ticking||(window.requestAnimationFrame(function(){return e._update()}),this._ticking=!0)},e.prototype._calulatePositions=function(){for(var e=[],a=0,r=0;r<this._rows;r++)for(var i=0;i<this._cols;i++){var n=r*this.spacing,t=Math.sin(window.scrollY/1250+a%5),o=i*this.spacing+100*t;e[a]=[o,n],a++}return e},e.prototype._getImageCSS=function(){if(""===this._imageCSS){for(var e="",a='url("'+this.imagePath+'")',r=0;r<this._totalImages;r++)e+=a,r<this._totalImages-1&&(e+=",");this._imageCSS=e,this._$el.style.backgroundImage=e}},e.prototype._getPositionCSS=function(){for(var e=this._calulatePositions(),a="",r=0;r<this._totalImages;r++)a+=e[r][0]+"px "+e[r][1]+"px",r<this._totalImages-1&&(a+=",");this._$el.style.backgroundPosition=a},e}();r.bgAnimation=new n},{"./utils":5}],2:[function(e,a,r){"use strict";r.ingredients={meats:["Pepperoni","Sausage","Fennel Sausage","Spicy Sausage","Chicken","BBQ Chicken","Chorizo","Chicken Andouille","Salami","Tofu","Bacon","Canadian Bacon","Proscuitto","Italian Sausage","Ground Beef","Anchovies","Turkey","Ham","Venison","Lamb","Duck","Soylent Green","Carne Asada","Soppressata Picante","Coppa","Pancetta","Bresola","Lox","Guanciale","Chili","Beef Jerky","Pastrami","Kielbasa","Scallops","Filet Mignon"],nonMeats:["White Onions","Red Onions","Sauteed Onions","Green Peppers","Red Peppers","Banana Peppers","Ghost Peppers","Habanero Peppers","Jalapeno Peppers","Stuffed Peppers","Spinach","Tomatoes","Pineapple","Pear Slices","Apple Slices","Mushrooms","Arugula","Basil","Fennel","Rosemary","Cilantro","Avocado","Guacamole","Salsa","Swiss Chard","Kale","Sun Dried Tomatoes","Walnuts","Artichoke","Asparagus","Caramelized Onions","Mango","Garlic","Olives","Cauliflower","Polenta","Fried Egg","Zucchini","Hummus"],cheeses:["American Cheese","Swiss Cheese","Goat Cheese","Mozzarella Cheese","Parmesean Cheese","Velveeta Cheese","Gouda Cheese","Muenster Cheese","Applewood Cheese","Asiago Cheese","Bleu Cheese","Boursin Cheese","Brie Cheese","Cheddar Cheese","Chevre Cheese","Havarti Cheese","Jack Cheese","Pepper Jack Cheese","Gruyere Cheese","Limberger Cheese","Manchego Cheese","Marscapone Cheese","Pecorino Cheese","Provolone Cheese","Queso Cheese","Roquefort Cheese","Romano Cheese","Ricotta Cheese","Smoked Gouda"],sauces:["Red Sauce","Marinara","BBQ Sauce","No Sauce","Hot Sauce"],crusts:["White Crust","Whole Wheat Crust","Flatbread Crust","Stuffed Crust"]},r.adjectives={dark:["dark","morbid","scary","spooky","gothic","deviant","creepy","sadistic","black","dangerous","dejected","haunted","morose","tragic","shattered","broken","sad","melancholy","somber","dark","gloomy","homicidal","murderous","shady","misty","dusky","ghostly","shadowy","demented","cursed","insane","possessed","grotesque","obsessed"],color:["blue","green","purple","grey","scarlet","NeonGreen","NeonBlue","NeonPink","HotPink","pink","black","red","maroon","silver","golden","yellow","orange","mustard","plum","violet","cerulean","brown","lavender","violet","magenta","chestnut","rosy","copper","crimson","teal","indigo","navy","azure","periwinkle","brassy","verdigris","veridian","tan","raspberry","beige","sandy","ElectricBlue","white","champagne","coral","cyan"],whimsical:["whimsical","silly","drunken","goofy","funny","weird","strange","odd","playful","clever","boastful","breakdancing","hilarious","conceited","happy","comical","curious","peculiar","quaint","quirky","fancy","wayward","fickle","yawning","sleepy","cockeyed","dizzy","dancing","absurd","laughing","hairy","smiling","perplexed","baffled","cockamamie","vulgar","hoodwinked","brainwashed"],shiny:["sapphire","opal","silver","gold","platinum","ruby","emerald","topaz","diamond","amethyst","turquoise","starlit","moonlit","bronze","metal","jade","amber","garnet","obsidian","onyx","pearl","copper","sunlit","brass","brassy","metallic"],noise:["untuned","loud","soft","shrieking","melodious","musical","operatic","symphonic","dancing","lyrical","harmonic","orchestral","noisy","dissonant","rhythmic","hissing","singing","crooning","shouting","screaming","wailing","crying","howling","yelling","hollering","caterwauling","bawling","bellowing","roaring","squealing","beeping","knocking","tapping","rapping","humming","scatting","whispered","whispering","rasping","buzzing","whirring","whistling","whistled"],apocalyptic:["nuclear","apocalyptic","desolate","atomic","zombie","collapsed","grim","fallen","collapsed","cannibalistic","radioactive","toxic","poisonous","venomous","disastrous","grimy","dirty","undead","bloodshot","rusty","glowing","decaying","rotten","deadly","plagued","decimated","rotting","putrid","decayed","deserted","acidic"],insulting:["stupid","idiotic","fat","ugly","hideous","grotesque","dull","dumb","lazy","sluggish","brainless","slow","gullible","obtuse","dense","dim","dazed","ridiculous","witless","daft","crazy","vapid","inane","mundane","hollow","vacuous","boring","insipid","tedious","monotonous","weird","bizarre","backward","moronic","ignorant","scatterbrained","forgetful","careless","lethargic","insolent","indolent","loitering","gross","disgusting","bland","horrid","unseemly","revolting","homely","deformed","disfigured","offensive","cowardly","weak","villainous","fearful","monstrous","unattractive","unpleasant","nasty","beastly","snide","horrible","syncophantic","unhelpful","bootlicking"],praise:["beautiful","intelligent","smart","genius","ingenious","gorgeous","pretty","witty","angelic","handsome","graceful","talented","exquisite","enchanting","fascinating","interesting","divine","alluring","ravishing","wonderful","magnificient","marvelous","dazzling","cute","charming","attractive","nifty","delightful","superior","amiable","gentle","heroic","courageous","valiant","brave","noble","daring","fearless","gallant","adventurous","cool","enthusiastic","fierce","awesome","radical","tubular","fearsome","majestic","grand","stunning"],scientific:["scientific","technical","digital","programming","calculating","formulating","cyberpunk","mechanical","technological","innovative","brainy","chemical","quantum","astro","space","theoretical","atomic","electronic","gaseous","investigative","solar","extinct","galactic"]},r.nouns={animals:["flamingo","hedgehog","owl","elephant","pussycat","alligator","dachsund","poodle","beagle","crocodile","kangaroo","wallaby","woodpecker","eagle","falcon","canary","parrot","parakeet","hamster","gerbil","squirrel","rat","dove","toucan","raccoon","vulture","peacock","goldfish","rook","koala","skunk","goat","rooster","fox","porcupine","llama","grasshopper","gorilla","monkey","seahorse","wombat","wolf","giraffe","badger","lion","mouse","beetle","cricket","nightingale","hawk","trout","squid","octopus","sloth","snail","locust","baboon","lemur","meerkat","oyster","frog","toad","jellyfish","butterfly","caterpillar","tiger","hyena","zebra","snail","pig","weasel","donkey","penguin","crane","buzzard","vulture","rhino","hippopotamus","dolphin","sparrow","beaver","moose","minnow","otter","bat","mongoose","swan","firefly","platypus"],everyday:["mirror","knife","fork","spork","spoon","tupperware","minivan","suburb","lamp","desk","stereo","television","TV","book","car","truck","soda","door","video","game","computer","calender","tree","plant","flower","chimney","attic","kitchen","garden","school","wallet","bottle"],fantasy:["centaur","wizard","gnome","orc","troll","sword","fairy","pegasus","halfling","elf","changeling","ghost","knight","squire","magician","witch","warlock","unicorn","dragon","wyvern","princess","prince","king","queen","jester","tower","castle","kraken","seamonster","mermaid","psychic","seer","oracle"],gross:["slime","bug","roach","fluid","pus","booger","spit","boil","blister","orifice","secretion","mucus","phlegm","centipede","beetle","fart","snot","crevice","flatulence","juice","mold","mildew","germs","discharge","toilet","udder","odor","substance","fluid","moisture","garbage","trash","bug"],horror:["murderer","chainsaw","knife","sword","murder","devil","killer","psycho","ghost","monster","godzilla","werewolf","vampire","demon","graveyard","zombie","mummy","curse","death","grave","tomb","beast","nightmare","frankenstein","specter","poltergeist","wraith","corpse","scream","massacre","cannibal","skull","bones","undertaker","zombie","creature","mask","psychopath","fiend","satanist","moon","fullMoon"],jewelry:["earrings","ring","necklace","pendant","choker","brooch","bracelet","cameo","charm","bauble","trinket","jewelry","anklet","bangle","locket","finery","crown","tiara","blingBling","chain","rosary","jewel","gemstone","beads","armband","pin","costume","ornament","treasure"],places:["swamp","graveyard","cemetery","park","building","house","river","ocean","sea","field","forest","woods","neighborhood","city","town","suburb","country","meadow","cliffs","lake","stream","creek","school","college","university","library","bakery","shop","store","theater","garden","canyon","highway","restaurant","cafe","diner","street","road","freeway","alley"],scifi:["robot","alien","raygun","spaceship","UFO","rocket","phaser","astronaut","spaceman","planet","star","galaxy","computer","future","timeMachine","wormHole","timeTraveler","scientist","invention","martian","pluto","jupiter","saturn","mars","quasar","blackHole","warpDrive","laser","orbit","gears","molecule","electron","neutrino","proton","experiment","photon","apparatus","universe","gravity","darkMatter","constellation","circuit","asteroid"],music:["violin","flute","bagpipe","guitar","symphony","orchestra","piano","trombone","tuba","opera","drums","harpsichord","harp","harmonica","accordion","tenor","soprano","baritone","cello","viola","piccolo","ukelele","woodwind","saxophone","bugle","trumpet","sousaphone","cornet","stradivarius","marimbas","bells","timpani","bongos","clarinet","recorder","oboe","conductor","singer"],professions:["doctor","lawyer","ninja","writer","samurai","surgeon","clerk","artist","actor","engineer","mechanic","comedian","fireman","nurse","RockStar","musician","carpenter","plumber","cashier","electrician","waiter","president","governor","senator","scientist","programmer","singer","dancer","director","mayor","merchant","detective","investigator","navigator","pilot","priest","cowboy","stagehand","soldier","ambassador","pirate","miner","police"]}},{}],3:[function(e,a,r){"use strict";function i(e){window.performance.mark("mark_start_generating");for(var a=2;100>a;a++)e.appendChild((new o.Pizza).html(a));window.performance.mark("mark_end_generating")}function n(e,a,r){switch(window.performance.mark("mark_start_resize"),r){case"1":a.innerHTML="Small",e.className="row pizza-size--small";break;case"2":a.innerHTML="Medium",e.className="row pizza-size--medium";break;case"3":a.innerHTML="Large",e.className="row pizza-size--large";break;default:console.error(new Error("Bug in changeSliderLabel"))}window.performance.mark("mark_end_resize"),window.performance.measure("measure_pizza_resize","mark_start_resize","mark_end_resize");var i=window.performance.getEntriesByName("measure_pizza_resize");console.log("Time to resize pizzas: "+i[i.length-1].duration+"ms")}var t=e("./background"),o=e("./pizza");window.addEventListener("load",function(){var e=document.getElementById("sizeSlider"),a=document.getElementById("pizzaSize"),r=document.getElementById("randomPizzas");i(r),e.addEventListener("change",function(e){n(r,a,e.target.value)}),t.bgAnimation.init(),console.info("Webpage has finished loading."),window.performance.measure("measure_pizza_generation","mark_start_generating","mark_end_generating");var o=window.performance.getEntriesByName("measure_pizza_generation");console.log("Time to generate pizzas on load: "+o[0].duration+"ms"),window.performance.measure("measure_webfonts_loading","mark_start_webfonts","mark_end_webfonts");var s=window.performance.getEntriesByName("measure_webfonts_loading");console.log("Time to load webfonts: "+s[0].duration+"ms")})},{"./background":1,"./pizza":4}],4:[function(e,a,r){"use strict";var i=e("./data"),n=e("./utils"),t=Object.keys(i.adjectives),o=Object.keys(i.nouns),s=function(){function e(){return this.meats=[],this.nonMeats=[],this.cheeses=[],this.generateName(),this.selectRandomMeats(),this.selectRandomNonMeats(),this.selectRandomCheeses(),this.selectRandomSauce(),this.selectRandomCrust(),this}return e.prototype.html=function(e,a){void 0===e&&(e=0),void 0===a&&(a="randomPizzaContainer");var r="";r+=n.itemize(this.meats),r+=n.itemize(this.nonMeats),r+=n.itemize(this.cheeses),r+=n.itemize(this.sauce),r+=n.itemize(this.crust);var i=document.createElement("div");return i.id="pizza"+e,i.className=a,i.innerHTML='\n      <div class="col-md-6"><img src="img/pizza.png" class="img-responsive"></div>\n      <div class="col-md-6">\n        <h4>'+this.name+"</h4>\n        <ul>\n          "+r+"\n        </ul>\n      </div>\n    ",i},e.prototype.generateName=function(){var e=n.randomFromArray(t),a=n.randomFromArray(o),r=n.randomFromArray(i.adjectives[e]),s=n.randomFromArray(i.nouns[a]);return this.name="The "+n.capitalize(r)+" "+n.capitalize(s),this},e.prototype.selectRandomMeats=function(){for(var e=Math.floor(4*Math.random()),a=0;e>a;a++)this.meats.push(n.randomFromArray(i.ingredients.meats));return this},e.prototype.selectRandomNonMeats=function(){for(var e=Math.floor(3*Math.random()),a=0;e>a;a++)this.nonMeats.push(n.randomFromArray(i.ingredients.nonMeats));return this},e.prototype.selectRandomCheeses=function(){for(var e=Math.floor(2*Math.random()),a=0;e>a;a++)this.cheeses.push(n.randomFromArray(i.ingredients.cheeses));return this},e.prototype.selectRandomSauce=function(){return this.sauce=n.randomFromArray(i.ingredients.sauces),this},e.prototype.selectRandomCrust=function(){return this.crust=n.randomFromArray(i.ingredients.crusts),this},e}();r.Pizza=s},{"./data":2,"./utils":5}],5:[function(e,a,r){"use strict";function i(e){return e[Math.floor(Math.random()*e.length)]}function n(e){return e.charAt(0).toUpperCase()+e.slice(1)}function t(e){if("string"==typeof e)return"<li>"+e+"</li>";for(var a="",r=0;r<e.length;r++)a+="<li>"+e[r]+"</li>";return a}function o(e){for(var a=e.length,r=0,i=a-1;i>a-11;i--)r+=e[i].duration;console.log("Average time to generate last 10 frames: "+r/10+"ms")}r.randomFromArray=i,r.capitalize=n,r.itemize=t,r.logAverageFrame=o},{}]},{},[3]);