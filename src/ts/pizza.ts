import {ingredients, adjectives, nouns} from './data';
import {randomFromArray, capitalize, itemize} from './utils';

const adjectiveCategories = Object.keys(adjectives);
const nounCategories = Object.keys(nouns);

export class Pizza {
  public name: string;
  public meats: Array<string> = [];
  public nonMeats: Array<string> = [];
  public cheeses: Array<string> = [];
  public sauce: string;
  public crust: string;

  constructor() {
    this.generateName();
    this.selectRandomMeats();
    this.selectRandomNonMeats();
    this.selectRandomCheeses();
    this.selectRandomSauce();
    this.selectRandomCrust();

    return this;
  }

  public html(elID: string|number = 0, elClasses: string = 'randomPizzaContainer') {
    let itemsString = '';
    itemsString += itemize(this.meats);
    itemsString += itemize(this.nonMeats);
    itemsString += itemize(this.cheeses);
    itemsString += itemize(this.sauce);
    itemsString += itemize(this.crust);

    let $pizza = document.createElement('div');
    $pizza.id = `pizza${elID}`;
    $pizza.className = elClasses;
    $pizza.innerHTML = `
      <div class="col-md-6"><img src="img/pizza.png" class="img-responsive"></div>
      <div class="col-md-6">
        <h4>${this.name}</h4>
        <ul>
          ${itemsString}
        </ul>
      </div>
    `;

    return $pizza;
  }

  public generateName() {
    let randomAdjectiveCategory = randomFromArray(adjectiveCategories);
    let randomNounCategory = randomFromArray(nounCategories);

    let randomAdjective = randomFromArray(adjectives[randomAdjectiveCategory]);
    let randomNoun = randomFromArray(nouns[randomNounCategory]);

    this.name = `The ${capitalize(randomAdjective)} ${capitalize(randomNoun)}`;

    return this;
  }

  public selectRandomMeats() {
    let numberOfMeats = Math.floor((Math.random() * 4));

    for (let x = 0; x < numberOfMeats; x++) {
      this.meats.push(randomFromArray(ingredients.meats));
    }

    return this;
  }

  public selectRandomNonMeats() {
    let numberOfNonMeats = Math.floor((Math.random() * 3));

    for (let x = 0; x < numberOfNonMeats; x++) {
      this.nonMeats.push(randomFromArray(ingredients.nonMeats));
    }

    return this;
  }

  public selectRandomCheeses() {
    let numberOfCheeses = Math.floor((Math.random() * 2));

    for (let x = 0; x < numberOfCheeses; x++) {
      this.cheeses.push(randomFromArray(ingredients.cheeses));
    }

    return this;
  }

  public selectRandomSauce() {
    this.sauce = randomFromArray(ingredients.sauces);

    return this;
  }

  public selectRandomCrust() {
    this.crust = randomFromArray(ingredients.crusts);

    return this;
  }
}
