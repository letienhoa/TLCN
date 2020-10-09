import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookTicketsService } from "../../shared/book-tickets.service";
@Component({
  selector: 'app-select-route',
  templateUrl: './select-route.component.html',
  styles: [
  ]
})
export class SelectRouteComponent implements OnInit {

  items = ['oneway','round']
  list_departure: any
  list_destination: any
  today:any
  constructor(public service: BookTicketsService, private router: Router) { }

  ngOnInit(): void {
    this.load();
    (<HTMLInputElement>document.getElementById("return-date")).disabled = true
  }
  
  getDate(){
    var today = new Date();
    var x = (<HTMLInputElement>document.getElementById("date"))
    x.value = today.getFullYear()+ '-' + ('0' + (today.getMonth() + 1)).slice(-2)  + '-' + ('0' + today.getDate()).slice(-2);
    this.today = x.value
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
    this.list_destination = this.service.getListAdd_A(this.service.select_route.departure)
    this.getDate()
    this.cityChanged_A(this.service.select_route.destination)
  }


  cityChanged(obj:any){
    this.list_destination = this.service.getListAdd_A(this.service.select_route.departure)
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
    this.router.navigate(['/booktickets/select-seat'])
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
  range:any 
  time:any
  cityChanged_A(obj:any){
    for(let i of this.list_destination)
    {
      if(i.name == obj)
      {
        this.range = i.range
        this.time = i.time
        return
      }
    }
  }


}
