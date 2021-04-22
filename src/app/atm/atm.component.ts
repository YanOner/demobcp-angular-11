import { Component, OnInit } from '@angular/core';
import { Currency } from 'src/model/Currency';
import { Exchange } from 'src/model/Exchange';
import { AtmService } from 'src/service/atm.service';

@Component({
  selector: 'app-atm',
  templateUrl: './atm.component.html',
  styleUrls: ['./atm.component.scss']
})
export class AtmComponent implements OnInit {

  title = 'WEB ANGULAR - EXCHANGE';

  countries: Currency[] = [];

  selectFrom: string = '';
  selectTo: string = '';

  convert: number = 0.00;

  exchange: Exchange;

  txtConvert: any = '1';

  result: number = 0;

  constructor(private atmService: AtmService) { }

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this.atmService.getCurrencies().subscribe(
      result => {
        this.countries = result;
        console.log('countries: ' + this.countries.length);
      }
    );
  }

  convertAtm() {
    this.convert = 0.00;
    if (this.selectFrom != '' && this.selectTo != '') {
      this.atmService.convert(this.selectFrom, this.selectTo).subscribe(
        result => {
          console.log(result);
          this.exchange = result;
          if (result.rate != null) 
            this.convert = result.rate;
        }
      )
    }
  }

  onSelectedFrom(value: string) {
    console.log(value);
    this.result = 0;
    this.selectFrom = value;
    this.convertAtm();
  }

  onSelectedTo(value: string) {
    console.log(value);
    this.result = 0;
    this.selectTo = value;
    this.convertAtm();
  }

  convertEvent() {
    this.result = 0;
    console.log(this.txtConvert);
    if (!Number.isNaN(this.txtConvert)) {
      this.result = this.convert * this.txtConvert;
    }
  }

}
