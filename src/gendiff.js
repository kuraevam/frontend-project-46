import path from 'path';
import { readFile } from 'fs/promises'
import { cwd } from 'node:process';

export default async (filePath1, filePath2) => {
   const filePathAbsolute1 = getPathAbsolute(filePath1);
   const filePathAbsolute2 = getPathAbsolute(filePath2);
   const json1 = await getJsonFromFile(filePathAbsolute1);
   const json2 = await getJsonFromFile(filePathAbsolute2);
   return genDiff(json1, json2);
}

function getPathAbsolute(filePath) {
    return path.isAbsolute(filePath)? filePath : path.resolve(cwd(), filePath);
}

async function getJsonFromFile(filePath){
    const bufferData = await readFile(filePath);
    return JSON.parse(bufferData);
}

function genDiff(json1, json2) {
   const keys = [...Object.keys(json1), ...Object.keys(json2)]
                    .reduce((acc, value)=>[...(acc.includes(value) ? acc : [...acc, value] )], [])
                    .sort((a, b)=> a > b ? 1 : a === b ? 0 : -1);

   const diffList = keys.flatMap((key) => {

        const space = ' '.repeat(2);

        if (json1[key] === json2[key]) {
            return `${space}  ${key}: ${json1[key]}`
        }

        const lines = []
        if (Object.hasOwn(json1, key)) {
            lines.push(`${space}- ${key}: ${json1[key]}`);
        }

        if (Object.hasOwn(json2, key)) {
            lines.push(`${space}+ ${key}: ${json2[key]}`);
        }

        return lines;
   });

   return `{\n${diffList.join('\n')}\n}`;
}