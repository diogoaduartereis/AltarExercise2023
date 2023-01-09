import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GridGenerationService } from '../services/grid-generation.service';
import { PaymentsService } from '../services/payments.service';
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
  constructor(public gridService: GridGenerationService, public paymentService: PaymentsService) { 
  }

  ngOnInit(): void {
    this.paymentService.getPayments().subscribe(payments => this.paymentsList = payments)

    this.gridService.generate2DGrid();
  }

  addPayment() {
    if(!this.paymentFormControl.errors && !this.amountFormControl.errors) {

      let newPayment = {
        name: this.paymentFormControl.value,
        amount: this.amountFormControl.value,
        code: this.gridService.generatedCode,
        grid: this.gridService.arrayOfCellValues,
        gridNumberOfCells: this.gridService.numberOfCells
      };

      this.paymentService.insertPayment(newPayment).subscribe(response => {
        this.paymentsList.push(response);
        this.table.renderRows();
      });
    }
  }

}
