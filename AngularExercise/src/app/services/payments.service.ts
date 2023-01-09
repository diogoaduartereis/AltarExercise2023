import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { PaymentEntry } from '../interfaces/PaymentEntry';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private environment;

  constructor(
    @Inject('environment') environment, private http: HttpClient
  ) {
    this.environment = environment;
  }

  // HttpClient API get() method => Fetch employees list
  getPayments(): Observable<PaymentEntry[]> {
    return this.http
      .get<PaymentEntry[]>(this.environment.apiUrl + '/api/payments')
      .pipe(retry(1), catchError(this.handleError));
  }

  insertPayment(paymentEntry: PaymentEntry): Observable<PaymentEntry> {
    return this.http
      .post<PaymentEntry>(
        this.environment.apiUrl + '/api/payments',
        JSON.stringify(paymentEntry),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
    }

  deletePayment(paymentEntry: PaymentEntry): Observable<PaymentEntry> {
    return this.http
      .delete<PaymentEntry>(
        this.environment.apiUrl + '/api/payments/' + paymentEntry._id,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
    }

  // Error handling
  handleError(error: any): Observable<any>{
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
