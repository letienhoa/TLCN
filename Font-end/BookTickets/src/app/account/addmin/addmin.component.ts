import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart } from "chart.js";
import { BookService } from 'src/app/shared/book.service';

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
  fileSelected: File = null;
  today;
  date;

  isRoute = false;
  isDate = 2;

  form: FormGroup;
  formRoute: FormGroup;
  formPoint:FormGroup;
  formCar:FormGroup;

  logIn;

  listDeparture;
  listDestination;
  listUser;
  listRoute;
  route;

  listCar=[];

  listMonth = ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"];
  listDate = ["Ngày 1","Ngày 2","Ngày 3","Ngày 4","Ngày 5","Ngày 6","Ngày 7","Ngày 8","Ngày 9","Ngày 10","Ngày 11","Ngày 12","Ngày 13","Ngày 14","Ngày 15","Ngày 16","Ngày 17"
  ,"Ngày 18","Ngày 19","Ngày 20","Ngày 21","Ngày 22","Ngày 23","Ngày 24","Ngày 25","Ngày 26","Ngày 27","Ngày 28","Ngày 29","Ngày 30"];

  listDataDate = [12, 19, 3, 5, 2,  5, 2, 3,12, 19, 3, 5, 2, 3,12, 19, 3, 5, 2,  5, 2, 3,12, 19, 3, 5, 2, 3,12, 19, 3];
  listDataMonth = [12, 19, 3, 5, 2,  5, 2, 3,12, 19, 3, 5];

  listColorMonth = ['rgba(255, 99, 132, 0.2)',
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
  'rgba(255, 159, 64, 0.2)',];
  listColorDate = ['rgba(255, 99, 132, 0.2)',
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
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',]

  chart:any;

  constructor(private fb:FormBuilder, private service: AdminService,public ser: BookService, private routerr: Router) { }

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
      ten_xe :['', [Validators.required]],
      hang_xe:['', [Validators.required]],
      tuyen_san_sang_id:['', [Validators.required]],
      tuyen_off_id:['', [Validators.required]],
      gio_chay:['', [Validators.required]],
      diem_di_id:['', [Validators.required]],
      diem_toi_id:['', [Validators.required]],
    })

    this.logIn = JSON.parse(sessionStorage.getItem("login"));
   
    this.getAllRoute();
    this.getAllAccount();
    this.getAllCar();
    this.getDate();
  }

  onItemChange(obj:any,type:any){
    if(type == 0){
      if(obj == 0) 
        this.isRoute = true;
      else 
        this.isRoute = false;
    }
    else{
      this.isDate = obj;
    }
  }

  getDate(){
    var date = new Date();
    this.today = date.getFullYear()+ '-' + ('0' + (date.getMonth() + 1)).slice(-2)  + '-' + ('0' + date.getDate()).slice(-2);
    this.date = date.getFullYear()+'/'+('0' + (date.getMonth() + 1)).slice(-2)+"/"+('0' + date.getDate()).slice(-2);
  }

  dateChanged(obj:any){
    var dd = new Date(obj.value);
    this.date = dd.getFullYear()+'/'+('0' + (dd.getMonth() + 1)).slice(-2)+"/"+('0' + dd.getDate()).slice(-2);
  }

  onShow(show:any,type:any,optArg = "qqqq"){
    if(show == 2){
      this.isCreateAccount = 0;
      switch(this.isShow){
        case 0:
          break;
        case 1:
          this.updateRoute();
          break;
        case 2:
            break;
        case 3:
          this.updateCar();
          break;
        default:
      }
    }
    else if(show == 1){
      this.isCreateAccount = 0;

      switch(this.isShow) {
        case 0:
          this.createAccount();
          break;
        case 1:
          this.createRoute();
          break;
        case 2:
          break;
        case 3:
          this.postCreateCar();
          break;
        default:
      }
    }
    else if(type==1){
      this.isCreateAccount = 1;
      alert('đăng ký')
    }
    else{
      this.isCreateAccount = 2;
      this.route = optArg;
      console.log(this.route)
      alert('chỉnh sửa')
    }
    
  }

  onShowChart(show:any,type:any){
    alert(type);
    alert(show);

    alert(this.date)
/*  this.service.getStatisticByDateRoute(this.date,type).subscribe(
      data => console.log(data)
    ); */


    this.isCreateAccount = 1;
    if(type==2){
      this.chart = new Chart('myChart2', {
        type: 'bar',
        data: {
            labels: this.listMonth,
            datasets: [{
                label: '# Tổng tiền',
                data: this.listDataMonth,
                backgroundColor: this.listColorMonth,
                borderColor: this.listColorMonth,
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
    else{
      this.chart = new Chart('myChart1', {
        type: 'bar',
        data: {
            labels: this.listDate,
            datasets: [{
                label: '# Tổng tiền',
                data: this.listDataDate,
                backgroundColor: this.listColorDate,
                borderColor: this.listColorDate,
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

  cityChanged(obj:any,index:any){
    if(index==0){
      this.ser.getBenById(obj).subscribe(
        data => {
          this.listDestination = data.data;
          this.ser.step1.destination.ben_toi = this.listDestination[0].ben_toi.replace('Bến xe','');
          this.ser.step1.destination.id = this.listDestination[0].id;
          sessionStorage.setItem('lBenToi', JSON.stringify(this.listDestination));
        }
      )
      const item = this.listDeparture.find(departure => departure.id == obj);
      this.ser.step1.departure.ben_toi = item.ben_toi.replace('Bến xe','');
      this.ser.step1.departure.id = item.id.toString();
      this.form.value.diem_di_id = obj;
    }
    else{
      const item = this.listDestination.find(destination => destination.id == obj);
      this.ser.step1.destination.ben_toi = item.ben_toi.replace('Bến xe','');
      this.ser.step1.destination.id = item.id.toString();
      this.form.value.diem_toi_id = obj;
    }
  }
  
  imgeChanged(obj:any){
    this.fileSelected = <File>obj.target.files[0];
    if (obj.target.files && obj.target.files[0]) {
      const file = obj.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.srcImage = reader.result;

      reader.readAsDataURL(file);
    }
  }

  createAccount(){

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
    this.service.postCreateAccount(this.logIn.Token,account).subscribe(
      data => {
        if(data.status==200){
          this.getAllAccount();
          return alert("Tạo tài khoản thành công");
        }
        else
          return alert("Không thể tạo tài khoản này");
      }
    )
  }

  createRoute(){
    this.service.postCreateRote(this.logIn.Token,this.formRoute.value).subscribe(
      data => {
        if(data.status==200){
          this.getAllRoute();
          return alert("Tạo tuyến thành công");
        }
        else
          return alert("Không thể tạo tuyến này");
      }
    )
  }

  updateRoute(){
    var routerId;
    for(let i of this.listRoute){
      if(i.ben_xe_di_id == this.route.ben_xe_di_id && i.ben_xe_toi_id == this.route.ben_xe_toi_id){
        routerId = i.id;
        break;
      }
    }
    var route = {
      diem_di_id:this.route.ben_xe_di_id,
      diem_toi_id:this.route.ben_xe_toi_id,
      khoang_cach:this.formRoute.value.khoang_cach,
      gia_ca:this.formRoute.value.gia_ca,
      thoi_gian_hanh_trinh:this.formRoute.value.thoi_gian_hanh_trinh
    }

    this.service.postUpdateRoute(this.logIn.Token,routerId,route).subscribe(
      data => {
        if(data.status == 200){
          this.getAllRoute();
          alert("Thay đổi thành công");
        }
        else{
          alert("Thay đổi không thành công");
        }
      }
    )
  }

  getAllRoute(){
    this.listDeparture = JSON.parse(sessionStorage.getItem('lBenDi'));
    this.listDestination = JSON.parse(sessionStorage.getItem('lBenToi'));
    this.service.getAllRoute().subscribe(
      data => this.listRoute =  data.data
    );
  }

  getAllAccount(){
    this.service.getAllAccount(this.logIn.Token).subscribe(
      data => {
        this.listUser = data.data;
      }
    )
  }

  getAllCar(){
    this.listCar = [];
    
    this.service.getAllCar(this.logIn.Token).subscribe(
      data => {
        for(let i of data.data){
          for(let j of this.listRoute){
            if(i.tuyenSanSangId==j.id){
              var car = {
                xeId:i.id,
                hangXe:i.hangXe,
                routeId: i.tuyenSanSangId,
                ben_xe_di: j.ben_xe_di,
                ben_xe_di_id: j.ben_xe_di_id,
                ben_xe_toi: j.ben_xe_toi,
                ben_xe_toi_id: j.ben_xe_toi_id,
                tenXe:i.tenXe,
                gioChay:i.gioChay,
                tuyenSanSangId:i.tuyenSanSangId,
                tuyenOffId:i.tuyenOffId
              }
              this.listCar.push(car);
            }
          }
        }
        var length = this.listCar.length;
        for(let i = 0;i < length-1;i++){
          for(let j = i+1; j<length;j++){
            if(this.listCar[i].routeId > this.listCar[j].routeId){
              var temp = this.listCar[i];
              this.listCar[i] = this.listCar[j];
              this.listCar[j] = temp;
            }
          }
        }
      }
    )
  }

  postCreateCar(){

    for(let i of this.listRoute){
      if(i.ben_xe_di_id == this.form.value.diem_di_id && i.ben_xe_toi_id == this.form.value.diem_toi_id){
        this.formCar.value.tuyen_san_sang_id = i.id;
      }
      else if(i.ben_xe_di_id == this.form.value.diem_toi_id && i.ben_xe_toi_id == this.form.value.diem_di_id)
      {
        this.formCar.value.tuyen_off_id = i.id;
      }
    }
    this.service.postCreateCar(this.logIn.Token,this.formCar.value).subscribe(
      data => {
        if(data.status == 200) return alert("Thêm thành công");
        else return alert("Thêm thất bại");
      }
    );
  }

  updateCar(){
    var car = {
      ten_xe : this.formCar.value.ten_xe,
      hang_xe : this.formCar.value.hang_xe,
      tuyen_san_sang_id:this.route.tuyenSanSangId,
      tuyen_off_id:this.route.tuyenOffId,
      gio_chay:this.formCar.value.gio_chay
    }

    this.service.postUpdateCar(this.route.xeId, car).subscribe(
      data => {
        if(data.status == 200){
          this.getAllCar();
          alert("Cập nhật thành công");
        }
        else alert("Cập nhật thất bại");
      }
    )
  }

  StatisticByDateRoute(){
    this.service.getStatisticByDateRoute(this.date,this.isDate).subscribe(
      data => console.log(data)
    );
  }

  onSubmit(){
    alert(123)
    this.service.uploadImage(this.fileSelected)
    .pipe()
    .subscribe(
      res => console.log("https://drive.google.com/uc?id="+res.id)
    )
  }


}
