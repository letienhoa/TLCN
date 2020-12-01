import { Component, OnInit } from '@angular/core';
import { LogInService } from "../../../shared/log-in.service";

@Component({
  selector: 'app-infor-personal',
  templateUrl: './infor-personal.component.html',
  styles: [
  ]
})
export class InforPersonalComponent implements OnInit {

  isEdit = false;
  inforCustomer;
  constructor(private service: LogInService) { }

  ngOnInit(): void {
    this.load();
  }

  onEdit(){
    var ad = (<HTMLInputElement>document.getElementById('list-item-city'))
   
    if(!this.isEdit){
      this.isEdit = true
      ad.disabled = false
      ad = (<HTMLInputElement>document.getElementById('list-item-district')) 
      ad.disabled = false
     
    }
    else{
      this.isEdit = false
      ad = (<HTMLInputElement>document.getElementById('list-item-city'))
      ad.disabled = true
      ad = (<HTMLInputElement>document.getElementById('list-item-district')) 
      ad.disabled = true
    }
  }

  load(){
    var customer = JSON.parse(sessionStorage.getItem('login'));
    this.service.getInforCustomer(customer.Token,customer.id).subscribe(
      data => {
        this.inforCustomer = data.data;
        console.log(this.inforCustomer);
      }
    );
  }
}
