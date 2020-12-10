import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styles: [
  ]
})
export class InvoiceComponent implements OnInit {

  code = "";  

  isShow = false;
  listItem = [];
  number = 0;
  data:any;

  constructor(private service:BookService) { }

  ngOnInit(): void {
  }


  onSearch(){
    this.service.getSearch(this.code).subscribe(
      data => {
        if(data.data == null){
          return alert("Bạn đã nhập sai mã");
        }
        else{
          this.data = data.data;
          this.isShow = true;
          this.listItem = this.ConvertSeats(this.data.slots);
          this.number = this.data.slots.length;
        }
        
      }
    )
  }

  ConvertSeats(data:any){
    var list = []
    for(let i of data){
      if(i<10){
        list.push("A0"+i);
      }
      if(i>=10&&i<=22){
        list.push("A"+i);
      }
      if(i-22<10){
        list.push("B0"+(i-22));
      }
      if(i-22>=10&&i-22<=22){
        list.push("B"+(i-22));
      }
    }
    return list;
  }

}
