import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('signed conversion', () => {
  assert.equal(api.toWord(-1n, 8), 255n);
  assert.equal(api.fromWord(128n, 8), -128n);
});
test('carry without overflow', () => {
  assert.deepEqual(api.addWords(255n, 1n, 8), { word: 0n, carry: true, overflow: false });
});
test('signed overflow', () => {
  assert.deepEqual(api.addWords(127n, 1n, 8), { word: 128n, carry: false, overflow: true });
});
test('all small words', () => {
  for (let n = -128n; n < 128n; n++) assert.equal(api.fromWord(api.toWord(n, 8), 8), n);
});
test('one-bit semantics', () => {
  assert.deepEqual(api.addWords(1n, 1n, 1), { word: 0n, carry: true, overflow: true });
});
test('width and value errors', () => {
  assert.throws(() => api.toWord(128n, 8));
  assert.throws(() => api.fromWord(256n, 8));
  assert.throws(() => api.addWords(0n, 0n, 0));
  assert.throws(() => api.toWord(1, 8));
});
