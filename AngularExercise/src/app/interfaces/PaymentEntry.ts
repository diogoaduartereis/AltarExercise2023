export interface PaymentEntry {
    _id?: string;
    name: string,
    amount: number;
    code: string;
    grid: string[][];
    gridNumberOfCells: number;
}