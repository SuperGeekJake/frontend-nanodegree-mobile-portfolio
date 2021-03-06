import {bgAnimation} from './background';
import {Pizza} from './pizza';

interface EventChangeTarget {
  target: {
    value?: any;
  }
}

/**
 * Webpage scripting start - where the magic happens
 */
window.addEventListener('load', () => {
  // REFACTOR: Grouped and reduced DOM queries
  const $pizzaSize = document.getElementById('sizeSlider');
  const $pizzaSizeIndicator = document.getElementById('pizzaSize');
  const $pizzasContainer = document.getElementById('randomPizzas');

  // Pizzas UI Scripting
  generatePizzas($pizzasContainer);
  // REFACTOR: Used addEventListener vs onchange attribute
  $pizzaSize.addEventListener('change', (event: EventChangeTarget) => {
    resizePizzas($pizzasContainer, $pizzaSizeIndicator, event.target.value)
  });

  // Initialize background animation
  bgAnimation.init();

  console.info('Webpage has finished loading.');

  // Performance measuring

  // Pizza Generation
  window.performance.measure("measure_pizza_generation", "mark_start_generating", "mark_end_generating");
  let timeToGenerate = window.performance.getEntriesByName("measure_pizza_generation");
  console.log(`Time to generate pizzas on load: ${timeToGenerate[0].duration}ms`);
});

/**
 * Creates 100 random pizza elements
 * @param  {HTMLElement} $pizzasContainer Random pizza container
 */
function generatePizzas($pizzasContainer: HTMLElement) {
  window.performance.mark("mark_start_generating"); // collect timing data

  // This for-loop actually creates and appends all of the pizzas when the page loads
  for (var i = 2; i < 100; i++) {
    // REFACTOR: Moved random pizza implementation to a class
    $pizzasContainer.appendChild(new Pizza().html(i));
  }

  // User Timing API again. These measurements tell you how long it took to generate the initial pizzas
  window.performance.mark("mark_end_generating");
}

/**
 * Resize the pizza columns
 * @param  {HTMLElement} $pizzasContainer    Pizza columns container
 * @param  {HTMLElement} $pizzaSizeIndicator Pizza size indicator text
 * @param  {string}      size                Pizza size input value
 */
function resizePizzas($pizzasContainer: HTMLElement, $pizzaSizeIndicator: HTMLElement, size: string) {
  window.performance.mark("mark_start_resize");   // User Timing API function

  // REFACTOR: Implementation now modifies class names of parent instead of the properties of every child element
  switch(size) {
    case "1":
      $pizzaSizeIndicator.innerHTML = "Small";
      $pizzasContainer.className = "row pizza-size--small";
      break;

    case "2":
      $pizzaSizeIndicator.innerHTML = "Medium";
      $pizzasContainer.className = "row pizza-size--medium";
      break;

    case "3":
      $pizzaSizeIndicator.innerHTML = "Large";
      $pizzasContainer.className = "row pizza-size--large";
      break;

    default:
      console.error(new Error("Bug in changeSliderLabel"));
  }

  // User Timing API is awesome
  window.performance.mark("mark_end_resize");
  window.performance.measure("measure_pizza_resize", "mark_start_resize", "mark_end_resize");
  let timeToResize = window.performance.getEntriesByName("measure_pizza_resize");
  console.log(`Time to resize pizzas: ${timeToResize[timeToResize.length-1].duration}ms`);
}
