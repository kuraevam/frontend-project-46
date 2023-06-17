/* global describe test expect */

import path from 'path';
import genDiff from '../src/genDiff.js';

describe('Test 1', () => {
  test('Сравнения плоских json-файлов', async () => {
    const filepath1 = path.join(__dirname, '../__fixtures__/filepath1.json');
    const filepath2 = path.join(__dirname, '../__fixtures__/filepath2.json');

    const result = await genDiff(filepath1, filepath2);
    expect(result).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
  });
});
