import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Ben } from "../models/Ben";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  step1 = {
    departure: {
      id:'',
      ben_toi:''
    },
    destination: {
    id:'',
    ben_toi:''
    },
    daygo:"",
    returnday:"",
    isOneWay:true,
  };

  step2 = {
    routerId:0,
    time:0,
    boardingPoint:{
      id:'',
      name:''
    },
    seats:[],
    number:0,
    totalMoney:0
  };

  


  listDeparture: Ben[];

  private urlBen = "http://localhost:8082/api/ben";
  private urlTuyen = "http://localhost:8082/api/tuyenxe";
  private urlTram = "http://localhost:8082/api/tram-dung";
  private urlGiuong = "http://localhost:8082/api/web/giuong";
  private urlTicket = "http://localhost:8082/api/ve";


  constructor(public http: HttpClient) { }

  getAllBen(): Observable<any>{
    return this.http.get<any>(this.urlBen);
  }

  getBenById(id:any):Observable<any>{
    return this.http.get<any>(this.urlBen+"/get-list-ben-toi?ben_di_id="+id);
  }

  getRouterId(ben_di_id:any, ben_toi_id:any){
    return this.http.get<any>(this.urlTuyen+"/get-tuyen-xe?diem_di_id="+ben_di_id+"&diem_toi_id="+ben_toi_id);
  }

  getRunTime(id:any):Observable<any>{
    return this.http.get<any>(this.urlTuyen+"/"+id+"/gio-chay");
  }

  getListStop(diemDi:any, diemToi:any):Observable<any>{
    return this.http.get<any>(this.urlTram+"/get-list-tram-dung-tuyen-xe?diem_di="+diemDi+"&diem_toi="+diemToi);
  }

  getStatusSeat(tuyen_xe_id:any, gio:any, ngay:any):Observable<any>{
    return this.http.get<any>(this.urlGiuong+"/get-list-giuong-for-xe?tuyen_xe_id="+tuyen_xe_id+"&gio="+gio+"&ngay="+ngay);
  }

  getRoterPopular():Observable<any>{
    return this.http.get<any>(this.urlTuyen+"/get-tuyen-xe-pho-bien");
  }

  getRouter():Observable<any>{
    return this.http.get<any>(`${this.urlTuyen}/`);
  }

  postCreateTicket(ticket:any):Observable<any>{
    return this.http.post(this.urlTicket+"/create",ticket);
  }

  postCreateTicket2(ticket:any):Observable<any>{
    return this.http.post(this.urlTicket+"/create2",ticket);
  }

  getSearch(code:any):Observable<any>{
    return this.http.get(this.urlTicket+"/get-ve-by-code?code="+code);
  }

}
