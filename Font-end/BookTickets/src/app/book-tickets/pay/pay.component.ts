import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styles: [
  ]
})
export class PayComponent implements OnInit {

  infor:any
  infor_router:any
  infor_seat:any
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.infor = JSON.parse(sessionStorage.getItem('b3'));
    this.infor_seat = JSON.parse(sessionStorage.getItem('b2'));
    this.infor_router = JSON.parse(sessionStorage.getItem('b1'));
  }

  onPay(){
/*     var index = 0
    for(let i of this.service.seat){
      index ++
      for(let j of this.infor_seat.seats){
        if(i.name == j){
          this.service.seat[index].status = 1
          console.log(this.service.seat[index].status)
          return
        }
      }
    } */

    this.router.navigate(['paypall']);
    
  }

  isSelect = false
  onSelect(index:any){
    index==1||index==2?window.alert('Thẻ này chưa được cập nhật'):this.isSelect=true
  }
}
