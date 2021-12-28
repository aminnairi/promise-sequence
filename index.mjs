export const sequence = (callbacks) => {
  // If the first argument is not an array
  if (!Array.isArray(callbacks)) {
    return Promise.reject(new TypeError("callbacks should be an array in sequence(callbacks)"));
  }

  // If the first argument is not an array of functions
  if (!callbacks.every(callback => typeof callback === "function")) {
    return Promise.reject(new TypeError("callbacks should be an array of functions in sequence(callbacks)"));
  }

  // For each callback
  return callbacks.reduce((previousPromise, callback) => {
    // Resolve the previous state of previous reduce iteration
    return previousPromise.then(previousState => {
      // Store the return value of the callback, called with the previous state
      const callbackReturnValue = callback(previousState);

      // If the callback does not return a promise
      if (!(callbackReturnValue instanceof Promise)) {
        return Promise.reject(new TypeError("callbacks should be an array of functions returning a promise in sequence(callbacks)"));
      }

      // Return the aggregation of the previous state and the next state of the promise
      return callbackReturnValue.then(newState => {
        return [
          ...previousState,
          newState
        ];
      });
    });
  }, Promise.resolve([]));
};
