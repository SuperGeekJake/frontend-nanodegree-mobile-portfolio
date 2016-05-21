/**
 * Returns the value of a random element in an array
 * @param  {Array<any>} arr Array of elemets to be selected from
 * @return {any}            Random element value
 */
export function randomFromArray(arr: Array<any>) {
  return arr[Math.floor((Math.random() * arr.length))];
}

/**
 * Capitalize first character of string
 * @param  {string} str Any word needing a cap
 * @return {string}     Rejuvinated word all happy and cappy!
 */
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Turn a string or array into HTML li items
 * @param  {string | Array<any>}  strOrArr Data just waiting to be <li>s
 * @return {string}                        Stringy <li>(s)
 */
export function itemize(strOrArr: string | Array<any>) {
  if (typeof strOrArr === 'string') return `<li>${strOrArr}</li>`;

  var val = '';
  for (let x = 0; x < strOrArr.length; x++) {
    val += `<li>${strOrArr[x]}</li>`;
  }

  return val;
}

/**
 * Logs the average amount of time per 10 frames needed to move the sliding background pizzas on scroll.
 * @param  {[type]} times [description]
 */
export function logAverageFrame(times: Array<PerformanceEntry>) {
  var numberOfEntries = times.length;
  var sum = 0;
  for (var i = numberOfEntries - 1; i > numberOfEntries - 11; i--) {
    sum = sum + times[i].duration;
  }
  console.log("Average time to generate last 10 frames: " + sum / 10 + "ms");
}
