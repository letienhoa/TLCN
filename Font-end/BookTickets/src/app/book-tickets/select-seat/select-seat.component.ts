import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookTicketsService } from 'src/app/shared/book-tickets.service';


@Component({
  selector: 'app-select-seat',
  templateUrl: './select-seat.component.html',
  styles: [
  ]
})
export class SelectSeatComponent implements OnInit {

  seat = []


  listitem = []
  price = 0
  listTime: any
  constructor(public service: BookTicketsService, private router: Router) { }
  day: any
  ngOnInit(): void {
    this.seat = this.service.seat
    this.load();
    this.service.select_route = JSON.parse(sessionStorage.getItem('b1'));
    console.log(this.service.select_route)
    var today = new Date();
    this.day = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
  }

  isDown = true;
  onClick(){   
    if(this.isDown)
      this.isDown=false
    else
      this.isDown=true

    var nav1 = document.getElementsByClassName('information')
    nav1[0].classList.toggle('information-display')
    
  } 

  load(){
    for(let i of this.seat){
      if(i.status == Number(1)){
        document.getElementsByClassName(i.name)[0].classList.add('disable');
      }
      else{
        document.getElementsByClassName(i.name)[0].classList.add('active');
      }
    }
    this.getTime()
    this.getPoint()
    this. getSchedule()
  }
  list_sang = []
  list_chieu = []
  list_toi = []
  getTime(){
    this.listTime = this.service.getListTimes(this.service.select_route)
    for(let i in this.listTime.sang)
      this.list_sang.push(this.listTime.sang[i])
    for(let i in this.listTime.chieu)
      this.list_chieu.push(this.listTime.chieu[i])
    for(let i in this.listTime.toi)
      this.list_toi.push(this.listTime.toi[i])
  }

  list_points = []
  getPoint(){
    this.list_points = this.service.getListPoints(this.service.select_route)
  }

  schedule = []
  getSchedule(){
    this.schedule = this.service.getSchedule(this.service.select_route)
  }

  submit(){
    this.service.select_seat.seats = this.listitem
    this.service.select_seat.number = this.listitem.length
    this.service.select_seat.total_money = this.price
    console.log(this.service.select_seat)
    if(this.listitem.length == 0)
    {
      window.alert('Xin hãy chọn giường.')
      return
    }
    sessionStorage.setItem('b2',JSON.stringify(this.service.select_seat))
    console.log(sessionStorage.getItem('b2'))
    this.router.navigate(['/booktickets/infor-customer'])
  }

  onBook(item: any, index:any){
    var seat = document.getElementById(item);
    var test = seat.getElementsByClassName('disable');
    if(test[0] == null){
      
      var nav1 = document.getElementsByClassName(item)
      if(this.seat[index].status == 0 && this.listitem.length <= 5)
      {
        if(this.listitem.length + 1 == 6){
          window.alert("Số vé giới hạn mua là 5 vé")
          return
        }
        nav1[0].classList.add('select')
        this.listitem.push(item)
        this.seat[index].status = 2
      }
      else if(this.seat[index].status == 2)
      {
       
        nav1[0].classList.remove('select')
        this.seat[index].status = 0
        for(let i=0; i < this.listitem.length; i++){
          if(this.listitem[i]==item){
            this.listitem.splice(i,1)
          }
        }
      }
      this.price = 125000*this.listitem.length 
    }
    
  }
  
}
