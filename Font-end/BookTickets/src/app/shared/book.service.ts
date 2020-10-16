import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Ben } from "../models/Ben";
import { Observable, of } from "rxjs";
import { catchError,tap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private url = "http://localhost:8082/api/web/ben";
  constructor(private http: HttpClient) { }

  getAllBen():Observable<Ben[]>{
    return this.http.get<Ben[]>(this.url).pipe(
      tap(received =>{console.log(JSON.stringify(received))} /* console.log(`received = ${JSON.stringify(received)}`) */),
      catchError(error => of([]))
    )
  }

  getBenById(id:any):Observable<Ben[]>{
    return this.http.get<Ben[]>(this.url+"/get-list-ben-toi?ben_di_id="+id).pipe(
      tap(received => console.log(`received = ${JSON.stringify(received)}`)),
      catchError(error => of([]))
    )
  }
}
