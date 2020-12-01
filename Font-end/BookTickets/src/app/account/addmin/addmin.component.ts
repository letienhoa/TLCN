import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart } from "chart.js";

import { AdminService } from "../../shared/admin.service";


@Component({
  selector: 'app-addmin',
  templateUrl: './addmin.component.html',
  styles: [
  ]
})
export class AddminComponent implements OnInit {

  isShow = 0;
  isCreateAccount = 1;

  srcImage;

  form: FormGroup;
  formRoute: FormGroup;
  formPoint:FormGroup;
  formCar:FormGroup;

  logIn:any;

  constructor(private fb:FormBuilder, private service: AdminService) { }

  ngOnInit(): void {
    this.onShowMenu(0);

    this.form = this.fb.group({
      tai_khoan:['', [Validators.required]],
      mat_khau:['', [Validators.required]],
      conf_mat_khau:['', [Validators.required]],
      tenKh:['', [Validators.required]],
      email:['', [Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      sdt:['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(10), Validators.minLength(10)]],
      cmnd:['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(10), Validators.minLength(10)]],
      dia_chi:['', [Validators.required]],
      thanh_pho:['', [Validators.required]],
      quan_huyen:['', [Validators.required]],
      confirm:0,
      status:0,
    })
  
    this.formRoute = this.fb.group({
      diem_di_id:['', [Validators.required]],
      diem_toi_id:['', [Validators.required]],
      khoang_cach:['', [Validators.required]],
      gia_ca:['', [Validators.required]],
      thoi_gian_hanh_trinh:['', [Validators.required]],
    })

    this.formPoint = this.fb.group({
      thanh_pho:['', [Validators.required]],
      ten_ben:['', [Validators.required]],
      dia_chi:['', [Validators.required]],
      hinh_anh:['', [Validators.required]],
    })

    this.formCar = this.fb.group({
      diem_di_id:['', [Validators.required]],
      diem_toi_id:['', [Validators.required]],
      
    })

    this.logIn = JSON.parse(sessionStorage.getItem("logIn"));
  }

  onShow(show:any,type:any){
    if(show == 2){
      this.isCreateAccount = 0;
      alert('chỉnh sửa thành công')
    }
    else if(show == 1){
      this.isCreateAccount = 0;
      this.createAccount();
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

  onShowChart(show:any,type:any){
    this.isCreateAccount = 1;
    var chart = new Chart('myChart', {
      type: 'bar',
      data: {
          labels: ['Hà Nội => TP HCM', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Hà Nội => TP HCM', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
              label: '# Tổng tiền',
              data: [12, 19, 3, 5, 2, 3,12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3,12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
    });
  }

  onShowMenu(index:any){
    this.isShow = index;
    this.isCreateAccount = 1;
    for(let i = 0;i<6;i++){
      if(i == index)
        document.getElementById(index).style.background = "-webkit-linear-gradient(right, #F2754E,#009344 )";
      else
        document.getElementById(i.toString()).style.background = "-webkit-linear-gradient(left, #F2754E,#009344 )";
    }
  }

  createAccount(){
    this.service.postCreateAccount(this.form.value).subscribe(
      data => console.log(data.data)
    )
  }

  createRoute(){
    this.service.postCreateRote(this.logIn.Token,this.formRoute.value).subscribe(
      data => console.log(data)
    )
  }

  imgeChanged(obj:any){
    if (obj.target.files && obj.target.files[0]) {
      const file = obj.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.srcImage = reader.result;

      reader.readAsDataURL(file);
  }
  }

}
