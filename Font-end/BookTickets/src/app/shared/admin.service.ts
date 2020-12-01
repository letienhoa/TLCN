import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = "http://localhost:8082/api/admin"
  private urlRoute = "http://localhost:8082/api/tuyenxe"

  constructor(public http: HttpClient) { }

  postCreateAccount(account:any):Observable<any>{
    return this.http.post(this.url+'/create',account);
  }


  postCreateRote(token:any,route:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',      
        "Access-Control-Allow-Origin": "*",
        'Authorization': token })
    };
    return this.http.post(this.url+'/create',route,httpOptions);
  }
}
