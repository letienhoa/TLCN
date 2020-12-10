import { Component, OnInit } from '@angular/core';
import { sequenceEqual } from 'rxjs/operators';

@Component({
  selector: 'app-pay-two-way',
  templateUrl: './pay-two-way.component.html',
  styles: [
  ]
})
export class PayTwoWayComponent implements OnInit {

  infor:any;
  infor_router:any;
  infor_seat:any;

  oneWay:any;
  twoWay:any;

  infor_seat_go:any;
  infor_seat_return:any;

  numberGo:any;
  numberReturn:any;

  totalMoney = 0;

  isPay = false;
  constructor() { }

  ngOnInit(): void {
    this.infor = JSON.parse(sessionStorage.getItem('b3'));
    this.infor_seat = JSON.parse(sessionStorage.getItem('b2'));
    this.infor_router = JSON.parse(sessionStorage.getItem('b1'));

   

    this.oneWay = JSON.parse(sessionStorage.getItem("oneWay"));
    this.twoWay = JSON.parse(sessionStorage.getItem("twoWay"));

    this.infor_seat_go = this.ConvertSeats(this.oneWay.slot)
    this.infor_seat_return = this.ConvertSeats(this.twoWay.slot)

    this.numberGo = this.infor_seat_go.length;
    this.numberReturn = this.infor_seat_return.length;

    this.totalMoney = this.oneWay.gia_ve+this.twoWay.gia_ve;

    console.log("Data one way seats and two way seats")
    console.log(this.infor_seat_go);
    console.log(this.infor_seat_return);
    console.log("Data one way and two way")
    console.log(this.oneWay);
    console.log(this.twoWay);

    console.log(this.infor_seat);
  }

  onPay(){
    this.isPay = true;
  }

  isSelect = false
  onSelect(index:any){
    index==1||index==2?window.alert('Thẻ này chưa được cập nhật'):this.isSelect=true
  }

  ConvertSeats(listSeats:any){
    var list = [];
    for(let i of listSeats){
      if(i<10){
        list.push("A0"+i);
      }
      else if(i>=10&&i<=22){
        list.push("A"+i);
      }
      else if(i-22<10){
        list.push("B0"+(i-22));
      }
      else{
        list.push("B"+(i-22));
      }
    }
    return list;
  }

}
