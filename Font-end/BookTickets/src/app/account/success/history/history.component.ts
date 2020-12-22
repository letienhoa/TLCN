import { Component, OnInit } from '@angular/core';
import { LogInService } from "../../../shared/log-in.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styles: [
  ]
})
export class HistoryComponent implements OnInit {

  history;
  tempHistory = [];
  allRoute = [];

  constructor(private service: LogInService) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.getTiketHistory();
    this.getTime();
    this.getAllRoute();
  }

  getTiketHistory(){
    var customer = JSON.parse(sessionStorage.getItem("login"));
    this.service.getTicketHistory(customer.Token, customer.id).subscribe(
      data => {
        this.history = data;
        this.history = this.history.data;
        this.tempHistory = this.history;

        for(let i of this.history){
          if(i.trang_thai == "1"){
            i.trang_thai = "Đã chạy";
          }
          else{
            i.trang_thai = "Chưa chạy";
          }
        }
        console.log(data);
      }
    )
  }

  onReset(){
    this.history = this.tempHistory;
  }

  onSearch(){

  }

  onChangeDate(obj:any){
    var dd = new Date(obj.value);
    var day = dd.getDate()<10?"0"+dd.getDate():dd.getDate();
    var month = dd.getMonth()+1;
    var value = day+"/"+month+"/"+dd.getFullYear();
    this.history = [];
   
    for(let i of this.tempHistory){
      if(i.ngay_chay.toString() == value.toString()){
        this.history.push(i);
      }
    }
  }

  getTime(){
    var today = new Date();
    var x = (<HTMLInputElement>document.getElementById("historyDate"));
    x.value = today.getFullYear()+ '-' + ('0' + (today.getMonth() + 1)).slice(-2)  + '-' + ('0' + today.getDate()).slice(-2);
  }

  getAllRoute(){
    var routes = JSON.parse(sessionStorage.getItem('listRoute'));
    for(let i of routes){
      var route = {
        id:i.id,
        benDi:i.ben_xe_di,
        benToi:i.ben_xe_toi
      }
      this.allRoute.push(route);
    }
  }

  cityChanged(obj:any){
    //Id tuyến nha
    this.history = [];
    for(let i of this.tempHistory){
      if(i.id_tuyen_xe == obj){
        this.history.push(i);
      }
    }
  }

}
