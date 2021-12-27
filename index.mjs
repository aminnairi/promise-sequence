export const sequence = (promises) => {
  return promises.reduce((previousPromise, currentPromise) => {
    return previousPromise.then(previousState => {
      return currentPromise(previousState).then(newState => {
        return [
          ...previousState,
          newState
        ];
      });
    });
  }, Promise.resolve([]));
};
