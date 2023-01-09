import { Injectable } from '@angular/core';
import { TableCell } from '../interfaces/TableCell';

@Injectable({
  providedIn: 'root'
})
export class GridGenerationService {
  alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
  numberOfRows: number = 10;
  numberOfColumns: number = 10;
  numbersOfColumnsInArray = Array(this.numberOfColumns).fill(1).map((x,i)=>i);
  numberOfCells: number = this.numberOfRows*this.numberOfColumns;
  arrayOfCellValues: string[][] = [...Array(this.numberOfRows)].map(_=>Array(this.numberOfColumns));
  mapOfLetterOcurrences = new Map<string, number>();
  writtenChar: string;
  weightOfWrittenChar: number = 0.2;
  amountOfWrittenChar = this.weightOfWrittenChar*this.numberOfCells
  isLive: boolean = false;
  intervalId: number;
  gridHasValues: boolean;
  generatedCode: string;

  constructor() { }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  randomizeWrittenCharInGrid(numberOfRows: number, arrayOfCellValues: string[][]) : string[][]{
    let i = 0;

    while(i < this.amountOfWrittenChar) {
      let randomPosition = this.getRandomInt(this.numberOfCells);
      let rowPosition = Math.floor(randomPosition/numberOfRows);
      let colPosition = randomPosition % numberOfRows;

      if(!arrayOfCellValues[rowPosition][colPosition]) {
        arrayOfCellValues[rowPosition][colPosition] = this.writtenChar;
        i++;
      }
    }

    this.mapOfLetterOcurrences.set(this.writtenChar, this.amountOfWrittenChar);

    return arrayOfCellValues;
  }

  randomizeGridValues(numberOfRows: number, numberOfCols: number, arrayOfCellValues: string[][], alphabetCopy: string[]) {
    for (var i = 0; i < numberOfRows; i++) {
      for (var j = 0; j < numberOfCols; j++) {
        if(!arrayOfCellValues[i][j]) {
          let letter = alphabetCopy[this.getRandomInt(alphabetCopy.length)];
          arrayOfCellValues[i][j] = letter;

          let currentLetterOcurrences = this.mapOfLetterOcurrences.get(letter);
          if(!currentLetterOcurrences) {
            currentLetterOcurrences = 0;
          }
          this.mapOfLetterOcurrences.set(letter, currentLetterOcurrences += 1);
        }
      }
    }
  }

  randomGenerate2DArrayValues(numberOfRows: number, numberOfCols: number) : string[][]{
    let arrayOfCellValues = [...Array(this.numberOfRows)].map(_=>Array(this.numberOfColumns));
    let alphabetCopy = Array.from(this.alphabet);
    this.mapOfLetterOcurrences.clear();

    if(this.writtenChar) {
      alphabetCopy = alphabetCopy.filter(x => x != this.writtenChar);

      this.randomizeWrittenCharInGrid(numberOfRows, arrayOfCellValues);
    }

    this.randomizeGridValues(numberOfRows, numberOfCols, arrayOfCellValues, alphabetCopy);

    return arrayOfCellValues;
  }

  getCodeDigitsPositions(currentSeconds: number) : TableCell[] {
    let positions = new Array<TableCell>();
    if(currentSeconds < 10) {
      positions.push({rowPosition: 0, colPosition:currentSeconds})
      positions.push({rowPosition: currentSeconds, colPosition:0})

      return positions;
    }

    let digits = currentSeconds.toString().split('').map(Number);
    positions.push({rowPosition: digits[0], colPosition:digits[1]})
    positions.push({rowPosition: digits[1], colPosition:digits[0]})

    return positions;
  }

  getCharValue(charCount: number) {
    if(charCount >= 9) {
      return charCount;
    }

    var num = Math.ceil(charCount/9);
    charCount = Math.ceil(charCount/num);

    return charCount;
  }

  generateCode(arrayOfCellValues: string[][]) : string{
    const date = new Date();
    let currentSeconds = date.getSeconds();

    let positions = this.getCodeDigitsPositions(currentSeconds);
    let firstChar = arrayOfCellValues[positions[0].rowPosition][positions[0].colPosition];
    let secondChar = arrayOfCellValues[positions[1].rowPosition][positions[1].colPosition];

    let firstCharCount = this.mapOfLetterOcurrences.get(firstChar);
    let secondCharCount = this.mapOfLetterOcurrences.get(secondChar);

    let firstCharNumber = this.getCharValue(firstCharCount);
    let secondCharNumber = this.getCharValue(secondCharCount);

    return firstCharNumber.toString() + secondCharNumber.toString();
  }

  startGridGeneration(numberOfRows: number, numberOfColumns: number) {
    this.arrayOfCellValues = this.randomGenerate2DArrayValues(numberOfRows, numberOfColumns);
    this.generatedCode = this.generateCode(this.arrayOfCellValues);
    this.gridHasValues = true;
  }

  generate2DGrid() {
    this.isLive = true;

    this.startGridGeneration(this.numberOfRows, this.numberOfColumns);
    this.intervalId = setInterval(() => {
      this.startGridGeneration(this.numberOfRows, this.numberOfColumns);
    }, 2000);
  }

  clearGridValues() {
    this.arrayOfCellValues = [...Array(this.numberOfRows)].map(_=>Array(this.numberOfColumns));
    this.gridHasValues = false;
  }

  cancelGridGeneration() {
    this.isLive = false;
    clearInterval(this.intervalId);
  }
  
}
