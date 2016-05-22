import {ingredients, adjectives, nouns} from './data'; // REFACTOR: Moved string arrays to separate file
import {randomFromArray, capitalize, itemize} from './utils';

const adjectiveCategories = Object.keys(adjectives);
const nounCategories = Object.keys(nouns);

/**
 * Pizza Model Class
 * Randomized name and ingredients with ability to convert to a HTML element.
 */
export class Pizza {
  public name: string;
  public meats: Array<string> = [];
  public nonMeats: Array<string> = [];
  public cheeses: Array<string> = [];
  public sauce: string;
  public crust: string;

  /**
   * Create Pizza instance with random name and ingredients
   * @return {this} Pizza instance
   */
  constructor() {
    this.generateName();
    this.selectRandomMeats();
    this.selectRandomNonMeats();
    this.selectRandomCheeses();
    this.selectRandomSauce();
    this.selectRandomCrust();

    return this;
  }

 /**
  * Returns an HTMLElement repesentation of the pizza
  * @param  {string|number = 0}                      elID      Desired element ID attribute
  * @param  {string        = 'randomPizzaContainer'} elClasses Desired element class attribute
  * @return {HTMLElement}                                      Pizza HTML
  */
  public html(elID: string|number = 0, elClasses: string = 'randomPizzaContainer'): HTMLElement {
    // Create <li>s from ingredients
    let itemsString = '';
    itemsString += itemize(this.meats);
    itemsString += itemize(this.nonMeats);
    itemsString += itemize(this.cheeses);
    itemsString += itemize(this.sauce);
    itemsString += itemize(this.crust);

    // Create HTMLElement
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

  /**
   * Assign random name
   * @return {this} Pizza instance
   */
  public generateName() {
    let randomAdjectiveCategory = randomFromArray(adjectiveCategories);
    let randomNounCategory = randomFromArray(nounCategories);

    let randomAdjective = randomFromArray(adjectives[randomAdjectiveCategory]);
    let randomNoun = randomFromArray(nouns[randomNounCategory]);

    this.name = `The ${capitalize(randomAdjective)} ${capitalize(randomNoun)}`;

    return this;
  }

  /**
   * Assign random meats
   * @return {this} Pizza instance
   */
  public selectRandomMeats() {
    let numberOfMeats = Math.floor((Math.random() * 4));

    for (let x = 0; x < numberOfMeats; x++) {
      this.meats.push(randomFromArray(ingredients.meats));
    }

    return this;
  }

  /**
   * Assign random non-meats
   * @return {this} Pizza instance
   */
  public selectRandomNonMeats() {
    let numberOfNonMeats = Math.floor((Math.random() * 3));

    for (let x = 0; x < numberOfNonMeats; x++) {
      this.nonMeats.push(randomFromArray(ingredients.nonMeats));
    }

    return this;
  }

  /**
   * Assign random cheeses
   * @return {this} Pizza instance
   */
  public selectRandomCheeses() {
    let numberOfCheeses = Math.floor((Math.random() * 2));

    for (let x = 0; x < numberOfCheeses; x++) {
      this.cheeses.push(randomFromArray(ingredients.cheeses));
    }

    return this;
  }

  /**
   * Assign random sauce
   * @return {this} Pizza instance
   */
  public selectRandomSauce() {
    this.sauce = randomFromArray(ingredients.sauces);

    return this;
  }

  /**
   * Assign random crust
   * @return {this} Pizza instance
   */
  public selectRandomCrust() {
    this.crust = randomFromArray(ingredients.crusts);

    return this;
  }
}
