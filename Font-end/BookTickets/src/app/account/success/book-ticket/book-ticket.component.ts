import { Component, OnInit } from '@angular/core';
import { BookService } from "../../../shared/book.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styles: [
  ]
})
export class BookTicketComponent implements OnInit {

  seat = [];
  listitem = [];
  price = 0;

  seats = "";

  items = ['oneway','round'];

  today:any;
  listDeparture:any;
  listRoterPoppular: [];

  constructor(private route: Router, public service: BookService) { }

  ngOnInit(): void {
   
    console.log(this.seat);
    this.select_floor('floor-1');
    this.load();
  }

  select_floor(floor:any){
    var f3 = document.getElementById('show-floor-1')
    var f4 = document.getElementById('show-floor-2')
    if(floor == 'floor-1'){
      var f1 = document.getElementsByClassName(floor)
      f1[0].classList.add('show-boder')
      var f2 = document.getElementsByClassName('floor-2')
      f2[0].classList.remove('show-boder')
      if(f3.classList.toggle('hide-item') == true){
        f3.classList.toggle('hide-item')
      }
      if(f4.classList.toggle('hide-item') == false){
        f4.classList.toggle('hide-item')
      }
    }
    else{
      var f1 = document.getElementsByClassName(floor)
      f1[0].classList.add('show-boder')
      var f2 = document.getElementsByClassName('floor-1')
      f2[0].classList.remove('show-boder')
      if(f3.classList.toggle('hide-item') == false){
        f3.classList.toggle('hide-item')
      }
      if(f4.classList.toggle('hide-item') == true){
        f4.classList.toggle('hide-item')
      }
    }
  }

  load(){
    var bpa = document.getElementsByClassName('book-pay-accept');
    bpa[0].classList.add('show-book');

    this.getAllDeparture();
    this.getDate();

    this.service.getStatusSeat(this.service.step2.routerId,this.service.step2.time,this.service.step1.daygo).subscribe(
      data => {
        for(let i of data.data){
          if(i.trangThai == Number(1)){
            document.getElementsByClassName(i.stt)[0].classList.add('disable');
          }
          else{ 
            document.getElementsByClassName(i.stt)[0].classList.add('active');
          }
        }
        this.seat = data.data;
      }
    );
    
  }

  onBook(item: any, index:any){

    var seat = document.getElementById(item);
    var test = seat.getElementsByClassName('disable');
    if(test[0] == null){
      var nav1 = document.getElementsByClassName(item);
      if(this.seat[index].trangThai == 0 && this.listitem.length <= 5)
      {
        if(this.listitem.length + 1 == 6){
          window.alert("Số vé giới hạn mua là 5 vé");
          return;
        }
        nav1[0].classList.add('select');
        this.listitem.push(item);
        this.seat[index].trangThai = 2;
      }
      else if(this.seat[index].trangThai == 2)
      {
        nav1[0].classList.remove('select');
        this.seat[index].trangThai = 0;
        for(let i=0; i < this.listitem.length; i++){
          if(this.listitem[i]==item){
            this.listitem.splice(i,1);
          }
        }
      }
    }
    this.service.step2.totalMoney = this.price*this.listitem.length;

  }

  onSubmitBook(){
    this.service.step2.boardingPoint.id = this.service.step1.departure.id;
    this.service.step2.boardingPoint.name = "Bến xe "+this.service.step1.departure.ben_toi;
    this.service.step2.seats = this.listitem;
    this.service.step2.number = this.listitem.length;
    this.service.step2.totalMoney = this.price*this.listitem.length;

    for(let i of this.listitem){
      var temp = "";
      if(i<10){
        temp = "A0"+i;
      }
      else if(i>=10&&i<=22){
        temp = "A"+i;
      }
      else if(i-22<10){
        temp = "B0"+(i-22);
      }
      else if(i-22>=10){
        temp = "B"+(i-22);
      }
      this.seats += temp + " ";
    }

    if(this.listitem.length == 0)
    {
      window.alert('Xin hãy chọn giường.')
      return
    }
    sessionStorage.setItem('b2',JSON.stringify(this.service.step2));
    console.log(sessionStorage.getItem('b2'));

    var b = document.getElementsByClassName('book-pay')
    b[0].classList.toggle('show-book')
    b = document.getElementsByClassName('book-pay-accept')
    b[0].classList.remove('show-book')

  }

  getAllDeparture(){
    this.service.getRouter().subscribe(
      data => {
        this.listDeparture = data.data;
        this.getTimes(this.listDeparture[0].id);
        this.service.step2.routerId = this.listDeparture[0].id;
        this.service.step1.departure.id = this.listDeparture[0].ben_xe_di_id;
        this.service.step1.destination.id = this.listDeparture[0].ben_xe_toi_id;
        this.service.step1.departure.ben_toi = this.listDeparture[0].ben_xe_di;
        this.service.step1.destination.ben_toi = this.listDeparture[0].ben_xe_toi;
        this.service.step2.boardingPoint.id = this.service.step1.departure.id;
        this.service.step2.boardingPoint.name = this.service.step1.departure.ben_toi;
        this.price = this.listDeparture[0].gia_ca;
       
        sessionStorage.setItem('listRoute',JSON.stringify(this.listDeparture));
      }
    )
  }

  cityChanged(obj:any){
    this.service.step2.routerId = obj;
    for(let i of this.listDeparture){
      if(i.id == obj){
        this.service.step1.departure.id = i.ben_xe_di_id;
        this.service.step1.destination.id = i.ben_xe_toi_id;
        this.service.step1.departure.ben_toi = i.ben_xe_di;
        this.service.step1.destination.ben_toi = i.ben_xe_toi;
        this.price = i.gia_ca;
      }
    }
    this.getTimes(obj);
  }

  getDate(){
    var today = new Date();
    var x = (<HTMLInputElement>document.getElementById("date"));
    x.value = today.getFullYear()+ '-' + ('0' + (today.getMonth() + 1)).slice(-2)  + '-' + ('0' + today.getDate()).slice(-2);
    this.service.step1.daygo = today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear();
    this.today = x.value;
    this.getTimes(this.service.step2.routerId);
  }

  dateChanged(obj:any){
    var dd = new Date(obj.value);
    var value = dd.getDate()+"/"+dd.getMonth()+"/"+dd.getFullYear();
    this.service.step1.daygo = value;
  }

  listSang=[];
  listChieu=[];
  listToi = [];
  getTimes(routerId:any){
    this.listSang=[];
    this.listChieu=[];
    this.listToi = [];
    this.service.getRunTime(routerId).subscribe(res=>{
      for(let i of res.data){
        if(i.giochay<12)
          this.listSang.push(i.giochay)
        else if(i.giochay>=12&&i.giochay<17)
          this.listChieu.push(i.giochay)
        else 
          this.listToi.push(i.giochay)
      }
      this.service.step2.time = res.data[0].giochay;
      console.log(res.data);
    });
  }

  onChangeTime(obj:any){
    this.service.step2.time = obj;
    this.resetSeats(this.seat);
    this.service.getStatusSeat(this.service.step2.routerId,this.service.step2.time,this.service.step1.daygo).subscribe(
      data => {
        for(let i of data.data){
          if(i.trangThai == Number(1)){
            document.getElementsByClassName(i.stt)[0].classList.add('disable');
          }
          else{ 
            document.getElementsByClassName(i.stt)[0].classList.add('active');
          }
        }
        this.seat = data.data;
      }
    );
  }

  resetSeats(array:any){
    for(let i of array){
      document.getElementsByClassName(i.stt)[0].classList.remove('disable');
      document.getElementsByClassName(i.stt)[0].classList.remove('active');
      document.getElementsByClassName(i.stt)[0].classList.remove('select');
    }

    this.listitem = [];
    this.service.step2.totalMoney = 0
  }

  onBack(){
    var b = document.getElementsByClassName('book-pay')
    b[0].classList.toggle('show-book')
    b = document.getElementsByClassName('book-pay-accept')
    b[0].classList.add('show-book')
  }

}
