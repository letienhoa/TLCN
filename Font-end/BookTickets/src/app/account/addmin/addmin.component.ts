import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addmin',
  templateUrl: './addmin.component.html',
  styles: [
  ]
})
export class AddminComponent implements OnInit {

  isCreateAccount = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onShow(show:any,type:any){

    if(show == 2){
      this.isCreateAccount = 0;
      alert('chỉnh sửa thành công')
    }
    else if(show == 1){
      this.isCreateAccount = 0;
      alert('đăng ký thành công')
    }
    else if(type==1){
      this.isCreateAccount = 1;
      alert('đăng ký')
    }
    else{
      this.isCreateAccount = 2;
      alert('chỉnh sửa')
    }
  }
}
