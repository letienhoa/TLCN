import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var paypal;

@Component({
  selector: 'app-payme',
  templateUrl: './payme.component.html',
  styles: [
  ]
})
export class PaymeComponent implements OnInit {
  @ViewChild('paypal',{static:true}) paypalElement:ElementRef;

  product = {
    price:777.55,
    description: 'used couch, decent condition',
    img:'assets/1.jpg'
  };

  paidFor = false;


  constructor() { }

  ngOnInit(): void {
    paypal
      .Buttons({
        createOrder:(data, actions) => {
          return actions.order.create({
            purchase_units:[
              {
                description: this.product.description,
                amount:{
                  currency_code:'VND',
                  value:this.product.price
                }
              }
            ]
          });
        },
        onApprove:async (data,actions) => {
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


}
