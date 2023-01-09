import { Injectable } from '@angular/core';
import { TableCell } from '../interfaces/TableCell';

@Injectable({
  providedIn: 'root'
})
export class GridGenerationService {
  alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
  numberOfRows = 10;
  numberOfColumns = 10;
  numbersOfColumnsInArray = Array(this.numberOfColumns).fill(1).map((x, i) => i);
  numberOfCells: number = this.numberOfRows * this.numberOfColumns;
  arrayOfCellValues: string[][] = [...Array(this.numberOfRows)].map(_ => Array(this.numberOfColumns));
  mapOfLetterOcurrences = new Map<string, number>();
  writtenChar: string;
  weightOfWrittenChar = 0.2;
  amountOfWrittenChar = this.weightOfWrittenChar * this.numberOfCells;
  isLive = false;
  intervalId: number;
  gridHasValues: boolean;
  generatedCode: string;

  constructor() { }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  randomizeWrittenCharInGrid(numberOfRows: number, arrayOfCellValues: string[][]): string[][]{
    let i = 0;

    while (i < this.amountOfWrittenChar) {
      const randomPosition = this.getRandomInt(this.numberOfCells);
      const rowPosition = Math.floor(randomPosition / numberOfRows);
      const colPosition = randomPosition % numberOfRows;

      if (!arrayOfCellValues[rowPosition][colPosition]) {
        arrayOfCellValues[rowPosition][colPosition] = this.writtenChar;
        i++;
      }
    }

    this.mapOfLetterOcurrences.set(this.writtenChar, this.amountOfWrittenChar);

    return arrayOfCellValues;
  }

  randomizeGridValues(numberOfRows: number, numberOfCols: number, arrayOfCellValues: string[][], alphabetCopy: string[]): void{
    for (let i = 0; i < numberOfRows; i++) {
      for (let j = 0; j < numberOfCols; j++) {
        if (!arrayOfCellValues[i][j]) {
          const letter = alphabetCopy[this.getRandomInt(alphabetCopy.length)];
          arrayOfCellValues[i][j] = letter;

          let currentLetterOcurrences = this.mapOfLetterOcurrences.get(letter);
          if (!currentLetterOcurrences) {
            currentLetterOcurrences = 0;
          }
          this.mapOfLetterOcurrences.set(letter, currentLetterOcurrences += 1);
        }
      }
    }
  }

  randomGenerate2DArrayValues(numberOfRows: number, numberOfCols: number): string[][]{
    const arrayOfCellValues = [...Array(this.numberOfRows)].map(_ => Array(this.numberOfColumns));
    let alphabetCopy = Array.from(this.alphabet);
    this.mapOfLetterOcurrences.clear();

    if (this.writtenChar) {
      alphabetCopy = alphabetCopy.filter(x => x !== this.writtenChar);

      this.randomizeWrittenCharInGrid(numberOfRows, arrayOfCellValues);
    }

    this.randomizeGridValues(numberOfRows, numberOfCols, arrayOfCellValues, alphabetCopy);

    return arrayOfCellValues;
  }

  getCodeDigitsPositions(currentSeconds: number): TableCell[] {
    const positions = new Array<TableCell>();
    if (currentSeconds < 10) {
      positions.push({rowPosition: 0, colPosition: currentSeconds});
      positions.push({rowPosition: currentSeconds, colPosition: 0});

      return positions;
    }

    const digits = currentSeconds.toString().split('').map(Number);
    positions.push({rowPosition: digits[0], colPosition: digits[1]});
    positions.push({rowPosition: digits[1], colPosition: digits[0]});

    return positions;
  }

  getCharValue(charCount: number): number{
    if (charCount <= 9) {
      return charCount;
    }

    const num = Math.ceil(charCount / 9);
    charCount = Math.ceil(charCount / num);

    return charCount;
  }

  generateCode(arrayOfCellValues: string[][]): string{
    const date = new Date();
    const currentSeconds = date.getSeconds();

    const positions = this.getCodeDigitsPositions(currentSeconds);
    const firstChar = arrayOfCellValues[positions[0].rowPosition][positions[0].colPosition];
    const secondChar = arrayOfCellValues[positions[1].rowPosition][positions[1].colPosition];

    const firstCharCount = this.mapOfLetterOcurrences.get(firstChar);
    const secondCharCount = this.mapOfLetterOcurrences.get(secondChar);

    const firstCharNumber = this.getCharValue(firstCharCount);
    const secondCharNumber = this.getCharValue(secondCharCount);

    return firstCharNumber.toString() + secondCharNumber.toString();
  }

  startGridGeneration(numberOfRows: number, numberOfColumns: number): void{
    this.arrayOfCellValues = this.randomGenerate2DArrayValues(numberOfRows, numberOfColumns);
    this.generatedCode = this.generateCode(this.arrayOfCellValues);
    this.gridHasValues = true;
  }

  generate2DGrid(): void {
    this.isLive = true;

    this.startGridGeneration(this.numberOfRows, this.numberOfColumns);
    this.intervalId = setInterval(() => {
      this.startGridGeneration(this.numberOfRows, this.numberOfColumns);
    }, 2000);
  }

  clearGridValues(): void {
    this.arrayOfCellValues = [...Array(this.numberOfRows)].map(_ => Array(this.numberOfColumns));
    this.gridHasValues = false;
  }

  cancelGridGeneration(): void {
    this.isLive = false;
    clearInterval(this.intervalId);
  }

}
