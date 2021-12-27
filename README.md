# @aminnairi/promise-sequence

Execute a sequence of functions that return a promise one after the other

## Requirements

- Node
- NPM

## Installation

```bash
npm install @aminnairi/promise-sequence
```

## Usage

### Simple

```javascript
import {sequence} from "@aminnairi/promise-sequence";

const resolveLater = value => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value);
    }, 1000);
  });
};

sequence([
  () => resolveLater(1),
  () => resolveLater(2),
  () => resolveLater(3)
]).then(([first, second, third]) => {
  console.log(first);
  console.log(second);
  console.log(third);
});
```

```
1
2
3
```

### Advanced


```javascript
import {sequence} from "@aminnairi/promise-sequence";

const resolveLater = value => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value);
    }, 1000);
  });
};

sequence([
  () => resolveLater(1),
  ([first]) => resolveLater(2 + first),
  ([first, second]) => resolveLater(3 + first + second)
]).then(([first, second, third]) => {
  console.log(first);
  console.log(second);
  console.log(third);
});
```

```
1
3
7
```

### Error

```javascript
import {sequence} from "@aminnairi/promise-sequence";

const resolveLater = value => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value);
    }, 1000);
  });
};

const fail = value => {
  return Promise.reject(new Error(`Failed to resolve ${value}`));
};

sequence([
  () => resolveLater(1),
  () => fail(2),
  () => resolveLater(3)
]).catch(({message}) => {
  console.error(message);
});
```

```
Failed to resolve 2
```

### Example

```javascript
import {sequence} from "@aminnairi/promise-sequence";
import {createInterface} from "readline/promises";
import {stdin as input, stdout as output} from "process";

const createQuestionFactory = ({createInterface, input, output}) => {
  return ({message}) => {
    const readlineInterface = createInterface({
      input,
      output
    });

    return readlineInterface.question(message).finally(() => {
      readlineInterface.close();
    });
  };
};

const question = createQuestionFactory({
  createInterface,
  input,
  output
});

sequence([
  () => question({message: "What is your name? "}),
  ([name]) => question({message: `Hello, ${name}. What is your age? `}),
  ([name, age]) => question({message: `So, ${name}, you are ${age} years old. What about your email? `})
]).then(([name, age, email]) => {
  console.log(`To sum up, ${name}, you are ${age} years old and your email is ${email}.`);
});
```

```
What is your name? John DOE
Hello, John DOE. What is your age? 42
So, John DOE, you are 42 years old. What about your email? john@doe.com
To sum up, John DOE, you are 42 years old and your email is john@doe.com.
```

## Changelog

See [`CHANGELOG.md`](https://github.com/aminnairi/promise-sequence/blob/production/CHANGELOG.md).

## Contributing

See [`CONTRIBUTING.md`](https://github.com/aminnairi/promise-sequence/blob/production/CONTRIBUTING.md).

## License

See [`LICENSE`](https://github.com/aminnairi/promise-sequence/blob/production/LICENSE).

## Code of conduct

See [`CODE_OF_CONDUCT.md`](https://github.com/aminnairi/promise-sequence/blob/production/CODE_OF_CONDUCT.md).
