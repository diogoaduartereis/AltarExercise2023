import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableCell } from '../Interfaces/TableCell';
import {interval, Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-generator-page',
  templateUrl: './generator-page.component.html',
  styleUrls: ['./generator-page.component.scss']
})
export class GeneratorPageComponent implements OnInit, OnDestroy {
  alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
  numberOfRows: number = 10;
  numberOfColumns: number = 10;
  numbersOfColumnsInArray = Array(this.numberOfColumns).fill(1).map((x,i)=>i);
  numberOfCells: number = this.numberOfRows*this.numberOfColumns;
  weightOfWrittenChar: number = 0.2;
  amountOfWrittenChar: number = this.weightOfWrittenChar*this.numberOfCells;
  arrayOfCellValues: string[][] = [...Array(this.numberOfRows)].map(_=>Array(this.numberOfColumns));
  mapOfLetterPositions = new Map<string, TableCell[]>();
  writtenChar: string;
  timerSubscription: Subscription;
  isLive: boolean = false;

  constructor() { }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  randomGenerate2DArrayValues(numberOfRows: number, numberOfCols: number) : string[][]{
    let arrayOfCellValues = [...Array(numberOfRows)].map(_=>Array(numberOfCols));
    let alphabetCopy = Array.from(this.alphabet);

    if(!this.writtenChar) {
      alphabetCopy = alphabetCopy.filter(x => x != this.writtenChar);

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
    }

    for (var i = 0; i < numberOfRows; i++) {
      for (var j = 0; j < numberOfCols; j++) {
        let letter = alphabetCopy[this.getRandomInt(alphabetCopy.length)];

        if(!arrayOfCellValues[i][j]) {
          arrayOfCellValues[i][j] = letter;
        }
      }
    }

    return arrayOfCellValues;
  }

  ngOnInit(): void {
  }

  generate2DGrid() {
    this.isLive = true;

    this.arrayOfCellValues = this.randomGenerate2DArrayValues(this.numberOfRows, this.numberOfColumns);
    
    setInterval(() => {
      this.arrayOfCellValues = this.randomGenerate2DArrayValues(this.numberOfRows, this.numberOfColumns);
    }, 2000);
  }

  ngOnDestroy(): void { 
    this.timerSubscription.unsubscribe(); 
  } 

  oneCharOnly(event): boolean {
    if(!this.alphabet.includes(event.key)) {
      return false
    }
    else {
      return true;
    }
  }
}
