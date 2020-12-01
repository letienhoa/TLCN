import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-infor-login',
  templateUrl: './infor-login.component.html',
  styles: [
  ]
})
export class InforLoginComponent implements OnInit {
  isShow = false
  constructor() { }

  ngOnInit(): void {
    this.load()
  }

  load(){
    this.onShowEditInfor()
    this.isShow = false
  }

  onShowEditInfor(){
    this.isShow == true?this.isShow=false:this.isShow=true
    var ei = document.getElementsByClassName('edit-infor-login')
    ei[0].classList.toggle('show-edit-infor')
  }
}
