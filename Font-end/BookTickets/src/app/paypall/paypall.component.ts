import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
declare var paypal;

@Component({
  selector: 'app-paypall',
  templateUrl: './paypall.component.html',
  styles: [
  ]
})
export class PaypallComponent implements OnInit {

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  infor:any
  infor_router:any
  infor_seat:any

  ticket = {}
  customer ={}
  listSeats = []


  paidFor = false;

  constructor() { }

  ngOnInit(): void {

    this.infor = JSON.parse(sessionStorage.getItem('b3'));
    this.infor_seat = JSON.parse(sessionStorage.getItem('b2'));
    this.infor_router = JSON.parse(sessionStorage.getItem('b1'));

    this.customer = {
      name:this.infor.username,
      sdt:this.infor.phone,
      email:this.infor.email,
      city:this.infor.city
    }

    this.ticket ={
      route:this.infor_seat.routerId,
      dateGo:this.infor_router.daygo,
      timeGo:this.infor_seat.time,
      seats:this.infor_seat.seats,
      number:this.infor_seat.number,
      totalMoney:this.infor_seat.totalMoney,
      range:"",
      time:"",
    }

    console.log(this.infor_router);
    this.listSeats = this.ConvertSeats(this.infor_seat.seats)
    console.log(this.listSeats)

    var description = "Book ticket" + this.infor_router.departure.ben_toi + " -- "+this.infor_router.destination.ben_toi;
    var price = this.infor_seat.totalMoney/22000;
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
        const order = await actions.order.capture();
        this.paidFor = true;
        console.log(order);
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