import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookTicketsService } from "../shared/book-tickets.service";
declare var $:any
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  items = ['oneway','round']

  list_departure: any
  list_destiantion: any
  today:any
  constructor(public service: BookTicketsService, private route: Router) { 
   
  }


  ngOnInit(): void {
    this.load();
    (<HTMLInputElement>document.getElementById("return-date")).disabled = true
    
  }



  onItemChange(x){
    if(x==this.items[0]){
      (<HTMLInputElement>document.getElementById("return-date")).value = "";
      (<HTMLInputElement>document.getElementById("return-date")).disabled = true
      this.service.select_route.isOneWay = true
      this.service.select_route.returnday = ""
    }
    else{
      (<HTMLInputElement>document.getElementById("return-date")).disabled = false
      this.service.select_route.isOneWay = false

    }
  }

  load(){
    this.list_departure = this.service.getListAdd()
    this.list_destiantion = this.service.getListAdd_A(this.service.select_route.departure)
    this.getDate()
    $('.multiple-items').slick({
      infinites:true,
      slidesToShow:5,
      slidesToScroll:1,
      arrows:false,
      dots:false,
      autoplay: true,
      autoplaySpeed: 2000,
      centerMode:true,
      centerPadding:'0',
      pauseOnHover: false,
      responsive: [
        {
          breakpoint: 1100,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 4
          }
        },
        {
          breakpoint: 900,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 2
          }
        },
        {
          breakpoint: 700,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    });
  }

  submit(){
    if(this.service.select_route.isOneWay == false && this.service.select_route.returnday == ""){
      window.alert("xin hay chon ngay ve")
      return
    }
    var dd = new Date(this.service.select_route.daygo)
    this.service.select_route.daygo = dd.getDate()+"/"+dd.getMonth()+"/"+dd.getFullYear()
    sessionStorage.setItem('b1',JSON.stringify(this.service.select_route))
    console.log(sessionStorage.getItem('b1'))
    this.route.navigate(['/booktickets/select-seat'])
  }

    
  getDate(){
    var today = new Date();
    var x = (<HTMLInputElement>document.getElementById("date"))
    x.value = today.getFullYear()+ '-' + ('0' + (today.getMonth() + 1)).slice(-2)  + '-' + ('0' + today.getDate()).slice(-2);
    this.today = x.value
  }

  
  dateChanged(obj:any){
    var dd = new Date(obj.value)
    var value = dd.getDate()+"/"+dd.getMonth()+"/"+dd.getFullYear()
    if(this.service.select_route.isOneWay==true){
      this.service.select_route.daygo = value;
      this.service.select_route.returnday = "";
    }
    else{
      this.service.select_route.returnday=value
    }
  }

  cityChanged(obj:any){
    this.list_destiantion = this.service.getListAdd_A(this.service.select_route.departure)
  }
}
