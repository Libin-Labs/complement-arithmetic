# @lp-labs/complement-arithmetic

Exact fixed-width two-complement words and addition flags.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/complement-arithmetic
```

## Working example

```js
import { toWord, fromWord } from '@lp-labs/complement-arithmetic';
if (fromWord(toWord(-42n, 8), 8) !== -42n) throw new Error('Word');
```

CommonJS: `const api = require('@lp-labs/complement-arithmetic')`.

## Behavior, customization and limits

toWord/fromWord convert signed bigint and unsigned words for width1..4096. addWords sums two unsigned words and returns wrapped word,carry and signed overflow; no carry-in. Signed range[-2^(w-1),2^(w-1)-1],word range[0,2^w-1]. Exact bigint,constant count of O(width) bigint arithmetic; no implicit truncation of invalid inputs.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function toWord(value: bigint, width: number): bigint;
export declare function fromWord(value: bigint, width: number): bigint;
export declare function addWords(
  a: bigint,
  b: bigint,
  width: number,
): {
  word: bigint;
  carry: boolean;
  overflow: boolean;
};
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
