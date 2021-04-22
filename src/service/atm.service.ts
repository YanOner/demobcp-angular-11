import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';
import { Currency } from 'src/model/Currency';
import { Exchange } from 'src/model/Exchange';

@Injectable({ providedIn: 'root' })
export class AtmService {

    // private atmUrl = 'https://gmtatmw.azurewebsites.net/api/v1';
    private apiUrl = 'http://localhost:8080/api/v1';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 'mode': 'no-cors'
      };

    constructor(private http: HttpClient){}

    getCurrencies(): Observable<Currency[]> {
        return this.http.get<Currency[]>(this.apiUrl+"/currency", this.httpOptions)
        .pipe(tap(_ => console.log('fetched currency')));
    }
 
    convert(source: string, target: string): Observable<Exchange> {
        return this.http.get<Exchange>(this.apiUrl+"/currency/exchange?from="+source+"&to="+target+"&amount=1", this.httpOptions)
        .pipe(tap(_ => console.log('fetched convert'))); 
    }

}
