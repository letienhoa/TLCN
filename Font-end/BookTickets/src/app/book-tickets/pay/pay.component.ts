import { Component, OnInit } from '@angular/core';
import { BookTicketsService } from 'src/app/shared/book-tickets.service';

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
  
  constructor(private service: BookTicketsService) { }

  ngOnInit(): void {
    this.infor = JSON.parse(sessionStorage.getItem('b3'))
    this.infor_seat = JSON.parse(sessionStorage.getItem('b2'))
    this.infor_router = JSON.parse(sessionStorage.getItem('b1'))
    console.log(this.infor)
  }

  onPay(){
    if(this.isSelect==false){
      window.alert('Xin hãy chọn thẻ thanh toán')
      return
    }
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
    
  }

  isSelect = false
  onSelect(index:any){
    index==1||index==2?window.alert('Thẻ này chưa được cập nhật'):this.isSelect=true
  }
}
