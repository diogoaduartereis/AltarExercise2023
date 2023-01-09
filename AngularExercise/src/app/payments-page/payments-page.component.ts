import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GridGenerationService } from '../services/grid-generation.service';
import { PaymentEntry } from '../interfaces/PaymentEntry';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-payments-page',
  templateUrl: './payments-page.component.html',
  styleUrls: ['./payments-page.component.scss']
})
export class PaymentsPageComponent implements OnInit {
  isLive: boolean;
  paymentFormControl = new FormControl('', [Validators.required]);
  amountFormControl = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]);
  paymentsList: PaymentEntry[] = [];
  displayedColumns: string[] = ['Name', 'Amount', 'Code', 'Grid'];

  @ViewChild(MatTable) table: MatTable<any>;
  constructor(public gridService: GridGenerationService) { 
  }

  ngOnInit(): void {
    this.gridService.generate2DGrid();
  }

  addPayment() {
    if(!this.paymentFormControl.errors && !this.amountFormControl.errors) {
      this.paymentsList.push({
        name: this.paymentFormControl.value,
        amount: this.amountFormControl.value,
        code: this.gridService.generatedCode,
        grid: this.gridService.arrayOfCellValues,
        gridNumberOfCells: this.gridService.numberOfCells
      });
      this.table.renderRows();
      console.log(this.gridService.numberOfCells);
    }
  }

}
