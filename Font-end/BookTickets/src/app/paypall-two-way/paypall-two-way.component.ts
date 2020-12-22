import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';
declare var paypal;

@Component({
  selector: 'app-paypall-two-way',
  templateUrl: './paypall-two-way.component.html',
  styles: [
  ]
})
export class PaypallTwoWayComponent implements OnInit {

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  infor:any
  infor_router:any
  infor_seat:any

  ticket = {}
  customer ={}
  listSeats = []

  routeGo:any;
  routeReturn:any;

  numberGo:any;
  numberReturn:any;

  listSeatsGo = [];
  listSeatsReturn = [];

  totalMoney = 0;

  paidFor = false;
  isWaitting = false;

  constructor(private service: BookService) { }

  ngOnInit(): void {
    this.infor = JSON.parse(sessionStorage.getItem('b3'));
    this.infor_seat = JSON.parse(sessionStorage.getItem('b2'));
    this.infor_router = JSON.parse(sessionStorage.getItem('b1'));

    this.routeGo = JSON.parse(sessionStorage.getItem("oneWay"));
    this.routeReturn = JSON.parse(sessionStorage.getItem("twoWay"));

    this.numberGo = this.routeGo.slot.length;
    this.numberReturn = this.routeReturn.slot.length;

    this.totalMoney = this.routeGo.gia_ve + this.routeReturn.gia_ve;

    console.log(this.routeGo);

    this.listSeatsGo = this.ConvertSeats(this.routeGo.slot);
    this.listSeatsReturn = this.ConvertSeats(this.routeReturn.slot);

    this.customer = {
      name:this.infor.username,
      sdt:this.infor.phone,
      email:this.infor.email,
      city:this.infor.city
    }

    var description = "Book ticket" + this.infor_router.departure.ben_toi + " -- "+this.infor_router.destination.ben_toi+" (thứ hồi)";
    var price = this.totalMoney/22000;
    this.payMent(description,price);
  }

  payMent(description:any, price:any){

    paypal
    .Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: description,
              amount: {
                currency_code: 'USD',
                value: price.toFixed(2)
              }
            }
          ]
        });
      },
      onApprove: async (data, actions) => {
        this.isWaitting = true;
        const order = await actions.order.capture();

        var ticket = {
          "gio_chay2":this.routeReturn.gio_chay,
          "gio_ket_thuc2":this.routeReturn.gio_chay,
          "id_tuyen_xe2":this.routeReturn.id_tuyen_xe,
          "date2":this.routeReturn.date,
          "gia_ve2":this.routeReturn.gia_ve,
          "slot2":this.routeReturn.slot,
          "gio_chay":this.routeGo.gio_chay,
          "gio_ket_thuc":this.routeGo.gio_chay,
          "id_tuyen_xe":this.routeGo.id_tuyen_xe,
          "sdt":this.infor.phone,
          "email":this.infor.email,
          "date":this.routeGo.date,
          "gia_ve":this.routeGo.gia_ve,
          "slot":this.routeGo.slot
      }
        this.service.postCreateTicket2(ticket).subscribe(
          data => {
            if(data.status==200){
              alert("Thành công");
              this.paidFor = true;
              console.log(data);
              this.isWaitting = false;
            }
            else{
              alert("Lỗi server");
              return;
            }

          }
        )
      },
      onError: err => {
        console.log(err);
      }
    })
    .render(this.paypalElement.nativeElement);
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
