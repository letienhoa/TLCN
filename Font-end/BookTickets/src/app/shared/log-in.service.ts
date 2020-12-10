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
  private urlTicket = "http://localhost:8082/api/ve";

  constructor(public http: HttpClient) { }

  postLogIn(account:any):Observable<any>{
    return this.http.post( this.url+"/login",account);
  }

  getLogOut(token:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',      
        "Access-Control-Allow-Origin": "*",
        'Authorization': token })
    };
    return this.http.get(this.url+"/logout", httpOptions);
  }

  postChangePassword(token:any,userName:any,passWordOld:any,passWord:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',      
        "Access-Control-Allow-Origin": "*",
        'Authorization': token })
    };
    
    return this.http.post(this.url+"/change-password?user_name="+userName.toString()+"&password_old="+passWordOld.toString()+"&password="+passWord.toString()+"",null,httpOptions);
  }

  getInforCustomer(token:any, customerId:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',      
        "Access-Control-Allow-Origin": "*",
        'Authorization': token })
    };
    return this.http.get(this.url+"/"+customerId,httpOptions);

  }

  getTicketHistory(token:any, customerId:any){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',      
        "Access-Control-Allow-Origin": "*",
        'Authorization': token })
    };
    return this.http.get(this.urlTicket+"/thong-ke-theo-khach-hang?khach_hang_id="+customerId,httpOptions);
  }

  postChangeInforPersional(token:any,customerID:any,customerInfor:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',      
        "Access-Control-Allow-Origin": "*",
        'Authorization': token
      })
    };
    return this.http.post(this.url+"/update/"+customerID+"/",customerInfor,httpOptions);
  }
  
  getPointCustomer(token:any,customerId:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',      
        "Access-Control-Allow-Origin": "*",
        'Authorization': token
      })
    };
    return this.http.get(this.url+"/get-detail-point/"+customerId,httpOptions);
  }

  postCreateAccount(customer:any):Observable<any>{
    return this.http.post("http://localhost:8082/api/khach-hang/create",customer);
  }

}
