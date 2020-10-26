import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookTicketsService } from 'src/app/shared/book-tickets.service';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styles: [
  ]
})
export class BookTicketComponent implements OnInit {

  form: FormGroup;
  isAccept = false;
  seat = []
  listitem = []
  price = 0
  today : any

  constructor(public service: BookTicketsService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.seat = this.service.seat
    console.log(this.seat)
    this.select_floor('floor-1')
    this.load()

  }

  select_floor(floor:any){
    var f3 = document.getElementById('show-floor-1')
    var f4 = document.getElementById('show-floor-2')
    if(floor == 'floor-1'){
      var f1 = document.getElementsByClassName(floor)
      f1[0].classList.add('show-boder')
      var f2 = document.getElementsByClassName('floor-2')
      f2[0].classList.remove('show-boder')
      if(f3.classList.toggle('hide-item') == true){
        f3.classList.toggle('hide-item')
      }
      if(f4.classList.toggle('hide-item') == false){
        f4.classList.toggle('hide-item')
      }
    }
    else{
      var f1 = document.getElementsByClassName(floor)
      f1[0].classList.add('show-boder')
      var f2 = document.getElementsByClassName('floor-1')
      f2[0].classList.remove('show-boder')
      if(f3.classList.toggle('hide-item') == false){
        f3.classList.toggle('hide-item')
      }
      if(f4.classList.toggle('hide-item') == true){
        f4.classList.toggle('hide-item')
      }
    }
  }

  load(){
    for(let i of this.seat){
      if(i.status == Number(1)){
        document.getElementsByClassName(i.name)[0].classList.add('disable');
       
      }
      else {
        document.getElementsByClassName(i.name)[0].classList.add('active');
      }
    }
    var bpa = document.getElementsByClassName('book-pay-accept')
    bpa[0].classList.add('show-book')
    this.getDate();
    this.setForm();
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

  onSubmitBook(){
    var b = document.getElementsByClassName('book-pay')
    b[0].classList.toggle('show-book')
    b = document.getElementsByClassName('book-pay-accept')
    b[0].classList.remove('show-book')
  }

  getDate(){
    var today = new Date();
    var x = (<HTMLInputElement>document.getElementById("item-date"))
    x.value = today.getFullYear()+ '-' + ('0' + (today.getMonth() + 1)).slice(-2)  + '-' + ('0' + today.getDate()).slice(-2);
    this.today = x.value
  }

  setForm(){
    this.form = this.fb.group({
      router: ['',[Validators.required]],
      date:[this.today,[Validators.required]],
      time:['',[Validators.required]],
      number:['1',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(5), Validators.minLength(1)]],
      point:['',[Validators.required]]
    });
  }

  onSubmit(){
    if(this.form.invalid){
      window.alert('Nhung thong tin duoc danh (*) phai duoc thuc hien');
      return;
    }
    if(!this.isAccept){
      window.alert('Ban chua chap nhan dieu khoan');
      return;
    }
    this.onSubmitBook()
  }

  onAccept(){
    this.isAccept?this.isAccept=false:this.isAccept=true;
    
  }
}
