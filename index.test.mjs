import {describe, it} from "mocha";
import {expect} from "chai";
import {sequence} from "./index.mjs";

const resolve = value => Promise.resolve(value);

describe("sequence", () => {
  it("should return an error if the first argument is not an array", () => {
    return sequence(null).then(() => {
      return expect.fail("Unexpected value");
    }).catch(({name, message}) => {
      expect(name).to.equal("TypeError");
      expect(message).to.equal("callbacks should be an array in sequence(callbacks)");
    });
  });

  it("should return an error if the first argument is not an array of callbacks", () => {
    return sequence([null, null, null]).then(() => {
      return expect.fail("Unexpected value");
    }).catch(({name, message}) => {
      expect(name).to.equal("TypeError");
      expect(message).to.equal("callbacks should be an array of functions in sequence(callbacks)");
    });
  });

  it("should return an error if the first argument is not an array of callbacks returning a promise", () => {
    return sequence([() => null, () => null, () => null]).then(() => {
      return expect.fail("Unexpected value");
    }).catch(({name, message}) => {
      expect(name).to.equal("TypeError");
      expect(message).to.equal("callbacks should be an array of functions returning a promise in sequence(callbacks)");
    });
  });

  it("should return the sequence correctly", () => {
    return sequence([
      () => resolve(1),
      () => resolve(2),
      () => resolve(3)
    ]).then(value => {
      expect(value).to.deep.equal([1, 2, 3]);
    });
  });

  it("should return the sequence with accumulation correctly", () => {
    return sequence([
      () => resolve(1),
      ([first]) => resolve(2 + first),
      ([first, second]) => resolve(3 + first + second)
    ]).then(value => {
      expect(value).to.deep.equal([1, 3, 7]);
    });
  });
});
