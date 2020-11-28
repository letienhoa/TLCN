import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  account = {
    tai_khoan:'',
    mat_khau:''
  }

  private url = "http://localhost:8082/api/khach-hang";

  constructor(public http: HttpClient) { }

  postLogIn(account:any):Observable<any>{
    return this.http.post("http://localhost:8082/api/khach-hang/login",account);
  }

  getLogOut(token:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',      
        "Access-Control-Allow-Origin": "*",
        'Authorization': token })
    };
    return this.http.get("http://localhost:8082/api/khach-hang/logout", httpOptions);
  }

}
