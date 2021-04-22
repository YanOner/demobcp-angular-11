export interface Exchange {
    from: string;
    to: string;
    amount: number;
    rate: number;
    amountConvert: number;
    status: boolean;
    creationDatetime: string;
}