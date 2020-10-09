import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-infor-personal',
  templateUrl: './infor-personal.component.html',
  styles: [
  ]
})
export class InforPersonalComponent implements OnInit {

  isEdit = false
  constructor() { }

  ngOnInit(): void {
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
}
