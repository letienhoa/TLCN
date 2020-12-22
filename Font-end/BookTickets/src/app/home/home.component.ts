import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ben } from '../models/Ben';


declare var $:any

import { BookService } from "../shared/book.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  items = ['oneway','round'];

  today:any;
  listDeparture:any;
  listDestiantion: any;
  listRoterPoppular: [];

  constructor( private route: Router, public ser: BookService) { 
  }

  ngOnInit(): void {
    this.load();
    (<HTMLInputElement>document.getElementById("return-date")).disabled = true;
  
  }

  onItemChange(x){
    if(x==this.items[0]){
      (<HTMLInputElement>document.getElementById("return-date")).value = "";
      (<HTMLInputElement>document.getElementById("return-date")).disabled = true
      this.ser.step1.isOneWay = true;
      this.ser.step1.returnday = "";
    }
    else{
      (<HTMLInputElement>document.getElementById("return-date")).disabled = false
      this.ser.step1.isOneWay = false;
    }
  }

  load(){
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
  
    this.ser.getAllBen().subscribe(data => {
      this.listDeparture = data.data;
      this.cityChanged(this.listDeparture[0].id,0);
      this.ser.step1.departure.ben_toi = data.data[0].thanh_pho.replace('Bến xe','');
      this.ser.step1.departure.id = this.listDeparture[0].id.toString();
      sessionStorage.setItem('lBenDi', JSON.stringify(this.listDeparture));
    });
    this.ser.step1.isOneWay = true;

    this.ser.getRoterPopular().subscribe(
      data => {
        this.listRoterPoppular = data.data;
        console.log(this.listRoterPoppular);
      }
    )
  }

  submit(){
    if(this.ser.step1.isOneWay == false && this.ser.step1.returnday == ""){
      window.alert("xin hay chon ngay ve");
      return;
    }

    sessionStorage.setItem('b1',JSON.stringify(this.ser.step1));
    console.log('Step1: '+sessionStorage.getItem('b1'));

    if(this.ser.step1.isOneWay == false){
      this.route.navigate(['/booktickets/select-seat-two-way']);
    }
    else{
      this.route.navigate(['/booktickets/select-seat']);
    }
  }
    
  getDate(){
    var today = new Date();
    var x = (<HTMLInputElement>document.getElementById("date"));
    x.value = today.getFullYear()+ '-' + ('0' + (today.getMonth() + 1)).slice(-2)  + '-' + ('0' + today.getDate()).slice(-2);
    this.ser.step1.daygo = ('0' + today.getDate()).slice(-2)+"/"+('0' + (today.getMonth() + 1)).slice(-2)+"/"+today.getFullYear();
    this.today = x.value;
  }

  dateChanged(obj:any){
    var dd = new Date(obj.value);
    var value = ('0' + dd.getDate()).slice(-2)+'/'+('0' + (dd.getMonth() + 1)).slice(-2) +"/"+dd.getFullYear();
    
    if(this.ser.step1.isOneWay == true){
      this.ser.step1.daygo = value;
      this.ser.step1.returnday = "";
    }
    else{
      this.ser.step1.returnday = value;
    }
  }

cityChanged(obj:any,index:any){
    if(index==0){
      this.ser.getBenById(obj).subscribe(
        data => {
          this.listDestiantion = data.data;
          this.ser.step1.destination.ben_toi = this.listDestiantion[0].ben_toi;
          this.ser.step1.destination.id = this.listDestiantion[0].id;
          sessionStorage.setItem('lBenToi', JSON.stringify(this.listDestiantion));
        }
      )
      const item = this.listDeparture.find(departure => departure.id == obj);
      this.ser.step1.departure.ben_toi = item.ben_toi;
      this.ser.step1.departure.id = item.id.toString();
    }
    else{
      const item = this.listDestiantion.find(destination => destination.id == obj);
      this.ser.step1.destination.ben_toi = item.ben_toi;
      this.ser.step1.destination.id = item.id.toString();  
    }
  }


}
