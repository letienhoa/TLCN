import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogInService } from 'src/app/shared/log-in.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  form:FormGroup;
  isWaitting = false;

  constructor(public http: HttpClient,private fb:FormBuilder, private service:LogInService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      tai_khoan:['', [Validators.required]],
      mat_khau:['', [Validators.required]],
      conf_mat_khau:['', [Validators.required]],
      tenKh:['', [Validators.required]],
      email:['', [Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      sdt:['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(10), Validators.minLength(10)]],
      cmnd:['', [Validators.required]],
      dia_chi:['', [Validators.required]],
      thanh_pho:['', [Validators.required]],
      quan_huyen:['', [Validators.required]],
    });
  }

/*   onSignUp(){
    document.querySelector('.cont').classList.toggle('s-signup')
  } */

  onSignUp(){

    var account = {
      tai_khoan:this.form.value.tai_khoan,
      mat_khau:this.form.value.mat_khau,
      ten: this.form.value.tenKh,
      email:this.form.value.email,
      sdt:this.form.value.sdt,
      cmnd:this.form.value.cmnd,
      dia_chi:this.form.value.dia_chi,
      thanh_pho:this.form.value.thanh_pho,
      quan_huyen:this.form.value.quan_huyen
    }

    var check = false;

    if(this.form.invalid){
      return alert("Xin hãy nhập đúng loại giá trị hoặc điền đầy đủ thông tin");
    }
    this.isWaitting = true;

    console.log(account);
    this.service.postCreateAccount(account).subscribe(
      data => {
        if(data.status == 200){
          alert('Xin hãy vào email để xác thực');
          check =true;
        }
        else{
          alert("Tên tài khoản đã tồn tại");
        }

        if(check == true){
          this.isWaitting = false;
          window.location.href = 'https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin';
        }
      }
    )

  }

}
