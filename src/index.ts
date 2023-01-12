import { generate } from './core/generate';

const inputFile = process.argv[2];
const outputFile = process.argv[3];
generate(inputFile, outputFile);