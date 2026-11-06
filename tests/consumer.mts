import { toWord, fromWord } from '@lp-labs/complement-arithmetic';
if (fromWord(toWord(-42n, 8), 8) !== -42n) throw new Error('Word');
// @ts-expect-error invalid argument must be rejected by declarations
toWord(-42, 8);
