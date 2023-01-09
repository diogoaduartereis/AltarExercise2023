import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableCell } from '../interfaces/TableCell';
import { interval, Subscription, timer } from 'rxjs';
import { GridGenerationService } from '../services/grid-generation.service';

@Component({
  selector: 'app-generator-page',
  templateUrl: './generator-page.component.html',
  styleUrls: ['./generator-page.component.scss']
})
export class GeneratorPageComponent implements OnInit {
  canEnterChar = true;

  constructor(public gridService: GridGenerationService) { }

  ngOnInit(): void {
  }

  generate2DGrid(): void{
    this.gridService.generate2DGrid();
  }

  cancelGridGeneration(): void{
    this.gridService.cancelGridGeneration();
  }

  clearGridValues(): void{
    this.gridService.clearGridValues();
  }

  oneCharOnly(event): boolean {
    if (!this.canEnterChar) {
      return false;
    }

    if (!this.gridService.alphabet.includes(event.key)) {
      return false;
    }
    else {
      setTimeout(() => {
        this.canEnterChar = true;
      }, 4000);

      this.canEnterChar = false;
      return true;
    }
  }
}
