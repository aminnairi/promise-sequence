export const sequence = (callbacks) => {
  if (!Array.isArray(callbacks)) {
    return Promise.reject(new TypeError("callbacks should be an array in sequence(callbacks)"));
  }

  if (!callbacks.every(promise => typeof promise === "function")) {
    return Promise.reject(new TypeError("callbacks should be an array of functions in sequence(callbacks)"));
  }

  return callbacks.reduce((previousPromise, callback) => {
    return previousPromise.then(previousState => {
      const callbackReturnValue = callback(previousState);

      if (!(callbackReturnValue instanceof Promise)) {
        return Promise.reject(new TypeError("callbacks should be an array of functions returning a promise in sequence(callbacks)"));
      }

      return callbackReturnValue.then(newState => {
        return [
          ...previousState,
          newState
        ];
      });
    });
  }, Promise.resolve([]));
};
