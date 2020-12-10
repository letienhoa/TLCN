import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LogInService } from "../../shared/log-in.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private fb:FormBuilder, private router: Router, private serveice: LogInService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email:new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      password:['', [Validators.required]]
    })
  }

  get email(){
    return this.form.get('primaryEmail')
  }

  onSubmit(){
    this.serveice.account.tai_khoan = this.form.value.email.toString();
    this.serveice.account.mat_khau = this.form.value.password.toString();
    
    this.serveice.postLogIn(this.serveice.account).subscribe(
      data => {
        sessionStorage.setItem('login',JSON.stringify(data));
        if(data.Roles == "ROLE_USER"){
          window.alert('success')
          return this.router.navigate(['login/customer', this.form.value.email])    
        }
        else if(data.Roles == "ROLE_ADMIN"){
          window.alert('success')
          return this.router.navigate(['login/admin', this.form.value.email])    
        }
        else if(data.Roles == null){
          window.alert("Sai tai khoan mat khau");
        }
        
        
      }
    )
  }
}
