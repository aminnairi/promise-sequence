import {sequence} from "./index.mjs";

sequence([
  () => Promise.resolve("1"),
  ([first]) => Promise.resolve(`${first}2`),
  ([first, second]) => Promise.resolve(`${first}${second}3`)
]).then(([first, second, third]) => {
  if (first !== "1") {
    return Promise.reject(new Error(`${JSON.stringify(first)} should equal to ${JSON.stringify(1)}`));
  }

  if (second !== "12") {
    return Promise.reject(new Error(`${JSON.stringify(second)} should equal to ${JSON.stringify(12)}`));
  }

  if (third !== "1123") {
    return Promise.reject(new Error(`${JSON.stringify(third)} should equal to ${JSON.stringify("1123")}`));
  }
});

sequence([
  () => Promise.resolve("1"),
  () => Promise.resolve("2"),
  () => Promise.reject(new Error("error"))
]).then(() => {
  return Promise.reject(new Error("Unexpected"));
}).catch(({message}) => {
  if (message !== "error") {
    return Promise.reject(new Error(`${JSON.stringify("Unexpected")} should equal to ${JSON.stringify("error")}`));
  }
});
