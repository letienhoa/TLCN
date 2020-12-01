import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-infor-customer',
  templateUrl: './infor-customer.component.html',
  styles: [
  ]
})
export class InforCustomerComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  constructor(private fb:FormBuilder, private router: Router) { }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('b2'))
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      phone: ['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(10), Validators.minLength(10)]],
      email: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      city: ['', [Validators.required]],
      district: ['', [Validators.required]],
    });
  }


  onSubmit(){
    // stop here if form is invalid
    if (this.form.invalid) {
      window.alert('Xin hay dien day du thong tin')
      return;
    }
    if(this.form.value.phone[0]!=0){
      window.alert('Số điện thoại phải bắt đầu bằng số 0');
      return
    }
    if(this.isCheck==false){
      window.alert('Bạn chưa đồng ý các điều kiện của nhà xe');
      return
    }
    sessionStorage.setItem('b3',JSON.stringify(this.form.value))
    this.router.navigate(['/booktickets/pay'])
  }

  isCheck = false;
  onChecked(){
    this.isCheck == true ? this.isCheck = false : this.isCheck = true
  }

  onClick(){
    this.router.navigate(['policy/rules'])
  }


}
