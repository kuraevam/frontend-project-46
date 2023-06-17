import path from 'path';
import { readFile } from 'fs/promises';
import { cwd } from 'node:process';
import yaml from 'js-yaml';

function getPathAbsolute(filePath) {
  return path.isAbsolute(filePath) ? filePath : path.resolve(cwd(), filePath);
}

async function getJsonFromFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const bufferData = await readFile(filePath);

  if (['.yaml', '.yml'].includes(ext)) {
    return yaml.load(bufferData);
  }

  if (['.json'].includes(ext)) {
    return JSON.parse(bufferData);
  }

  throw new Error(`not support ext ${ext}`);
}

function sort(a, b) {
  if (a > b) {
    return 1;
  }
  if (a === b) {
    return 0;
  }
  return -1;
}

function getBuildString(char, key, value) {
  return `  ${char} ${key}: ${value}`;
}

function genDiff(json1, json2) {
  const keys = [...Object.keys(json1), ...Object.keys(json2)]
    .reduce((acc, value) => [...(acc.includes(value) ? acc : [...acc, value])], [])
    .sort(sort);

  const diffList = keys.flatMap((key) => {
    const lines = [];

    if (json1[key] === json2[key]) {
      lines.push(getBuildString(' ', key, json1[key]));
    }

    if (lines.length > 0) {
      return lines;
    }

    if (Object.hasOwn(json1, key)) {
      lines.push(getBuildString('-', key, json1[key]));
    }

    if (Object.hasOwn(json2, key)) {
      lines.push(getBuildString('+', key, json2[key]));
    }

    return lines;
  });

  return `{\n${diffList.join('\n')}\n}`;
}

export default async (filePath1, filePath2) => {
  const filePathAbsolute1 = getPathAbsolute(filePath1);
  const filePathAbsolute2 = getPathAbsolute(filePath2);

  const json1 = await getJsonFromFile(filePathAbsolute1);
  const json2 = await getJsonFromFile(filePathAbsolute2);

  return genDiff(json1, json2);
};
