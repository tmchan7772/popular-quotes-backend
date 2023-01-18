/**
 * Execute a function and return a result after a <ms> miliseconds if a function takes less 
 * than <ms> miliseconds to be done
 * @param  {Function} fn - a async func to run
 * @param  {number} ms - how much time to delay in milliseconds
 */
async function runWithMinDelay(fn, ms) {
  const delay = () => new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });

  const [_delayResult, fnResult] = await Promise.all([delay(), fn()]);

  return fnResult;
}

export default runWithMinDelay;
