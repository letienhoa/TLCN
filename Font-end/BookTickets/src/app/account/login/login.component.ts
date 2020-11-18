import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private fb:FormBuilder, private router: Router) { }

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
    if(this.form.invalid){
      return window.alert('Nhập email sai qui định')
    }
    if(this.form.value.email=='admin@gmail.com' && this.form.value.password=='admin'){
      window.alert('success')
      return this.router.navigate(['login/admin', this.form.value.email])
    }
    window.alert("Nhập sai tài khoản mật khẩu")
  }
}
