import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSignUp(){
    document.querySelector('.cont').classList.toggle('s-signup')
  }
  onSignIn(){

  }

}
