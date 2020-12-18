import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart } from "chart.js";
import { BookService } from 'src/app/shared/book.service';

import { AdminService } from "../../shared/admin.service";


import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-addmin',
  templateUrl: './addmin.component.html',
  styles: [
  ]
})
export class AddminComponent implements OnInit {

  @ViewChild('khoang_thoi_gian') inputKhoangThoiGian;
  @ViewChild('khoang_cach') inputKhoangCach;
  @ViewChild('gia_ca') inputGiaCa;
  @ViewChild('tenXe') inputTenXe;
  @ViewChild('hangXe') inputHangXe;
  @ViewChild('gioChay') inputGioChay;

  @ViewChild('tenTP') inputTenTP;
  @ViewChild('diaChi') inputDiaChi;
  @ViewChild('tenBen') inputTenBen;


  isShow = 0;
  isCreateAccount = 1;
  isUpdate = false;

  typeChart = 1;

  isChart = 0;

  srcImage;
  fileSelected: File = null;
  today;
  date;

  isRoute = false;
  isDate = 1;
  isWaiting = false;

  form: FormGroup;
  formRoute: FormGroup;
  formPoint:FormGroup;
  formCar:FormGroup;

  logIn;

  listDeparture;
  listDestination;
  listUser;
  listRoute;
  listDestinationForRoute;
  route;

  listCar=[];

  listRouteExport = []

  listMonth = ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"];
  listDate = ["Ngày 1","Ngày 2","Ngày 3","Ngày 4","Ngày 5","Ngày 6","Ngày 7","Ngày 8","Ngày 9","Ngày 10","Ngày 11","Ngày 12","Ngày 13","Ngày 14","Ngày 15","Ngày 16","Ngày 17"
  ,"Ngày 18","Ngày 19","Ngày 20","Ngày 21","Ngày 22","Ngày 23","Ngày 24","Ngày 25","Ngày 26","Ngày 27","Ngày 28","Ngày 29","Ngày 30"];

  listDataDate = [];
  listDataMonth = [];

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

  data: any = []

  constructor(private fb:FormBuilder, private service: AdminService,public ser: BookService, private routerr: Router) { }

  ngOnInit(): void {
    this.isCreateAccount = 1;
    console.log(this.listDate);
    this.onShowMenu(0);

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
    })
  
    this.formRoute = this.fb.group({
      diem_di_id:['', [Validators.required]],
      diem_toi_id:['', [Validators.required]],
      khoang_cach:['', [Validators.required]],
      gia_ca:['', [Validators.required]],
      khoang_thoi_gian:['', [Validators.required]],
    })

    this.formPoint = this.fb.group({
      thanh_pho:['', [Validators.required]],
      ten_ben:['', [Validators.required]],
      dia_chi:['', [Validators.required]],
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
    this.onGetRouteToExport();
    this.onGetAllRouteInfor();
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

  dateValue;

  getDate(){
    var date = new Date();
    this.today = date.getFullYear()+ '-' + ('0' + (date.getMonth() + 1)).slice(-2)  + '-' + ('0' + date.getDate()).slice(-2);
    this.date = date.getFullYear()+'/'+('0' + (date.getMonth())).slice(-2)+"/"+('0' + date.getDate()).slice(-2);  
    this.dateValue = date.getFullYear()+'/'+('0' + (date.getMonth()+ 1)).slice(-2)+"/"+('0' + date.getDate()).slice(-2); 
  }
    
  dateChanged(obj:any){
    var dd = new Date(obj.value);
    this.dateValue = dd.getFullYear()+'/'+('0' + (dd.getMonth() + 1)).slice(-2)+"/"+('0' + dd.getDate()).slice(-2);
  }

  onShow(show:any,type:any,optArg = "qqqq"){
    if(show == 2){
      /* this.isCreateAccount = 0; */
      switch(this.isShow){
        case 0:
          break;
        case 1:
          this.updateRoute();
          break;
        case 2:
            this.onSubmit(2);
            break;
        case 3:
          this.updateCar();
          break;
        default:
      }
    }
    else if(show == 1){
      /* this.isCreateAccount = 0; */

      switch(this.isShow) {
        case 0:
          this.createAccount();
          break;
        case 1:
          this.createRoute();
          break;
        case 2:
          this.onSubmit(1);
          break;
        case 3:
          this.postCreateCar();
          break;
        default:
      }
    }
    else if(type==1){
      this.isCreateAccount = 1;
      this.ResetText();
      this.isUpdate =false;
      alert('đăng ký')
    
    }
    else{
      alert('chỉnh sửa');
      this.ResetText();
      this.route = optArg;
      this.isUpdate =true;
      if(this.isShow == 1){
        this.SwapData(this.route);
      }
      if(this.isShow == 1){
        this.formRoute = this.fb.group({
          diem_di_id:'',
          diem_toi_id:'',
          khoang_cach:'',
          gia_ca:'',
          khoang_thoi_gian:'',
        })
      }
      if(this.isShow == 2){
        this.formPoint = this.fb.group({
          thanh_pho:'',
          ten_ben:'',
          dia_chi:'',
        });
        this.srcImage = this.route.picture;
      }
      if(this.isShow == 3){
        this.formCar = this.fb.group({
          ten_xe :'',
          hang_xe:'',
          tuyen_san_sang_id:'',
          tuyen_off_id:'',
          gio_chay:'',
          diem_di_id:'',
          diem_toi_id:'',
        })
      }

      this.isCreateAccount = 2;
      this.ResetText();
    }
  }

  ResetText(){
    if(this.isShow==1){
      this.inputKhoangThoiGian.nativeElement.value = "";
      this.inputGiaCa.nativeElement.value = "";
      this.inputKhoangCach.nativeElement.value = "";
    }

    if(this.isShow == 3){
      this.inputTenXe.nativeElement.value = "";
      this.inputHangXe.nativeElement.value = "";
      this.inputGioChay.nativeElement.value = "";
    }

    if(this.isShow==2){
      this.inputTenTP.nativeElement.value = "";
      this.inputDiaChi.nativeElement.value = "";
      this.inputTenBen.nativeElement.value = "";
    }
  }

  SwapData(data:any){
    switch(this.isShow){
      case 0:
        break;
      case 1:
        this.formRoute.value.khoang_cach = data.khoang_cach;
        this.formRoute.value.gia_ca = data.gia_ca;
        this.formRoute.value.khoang_thoi_gian = data.khoang_thoi_gian;
        break;
      case 2:
        break;
      case 3:
        this.formCar.value.ten_xe = data.tenXe;
        this.formCar.value.hang_xe = data.hangXe;
        this.formCar.value.gio_chay = data.gioChay;
        break;
      case 4:
        break;
      case 5:
        break;
      default:
        break;
    }
  }
  listStatistic = [];

  onShowChart(show:any,type:any){
    this.onChangeTypeChart(show,type);

    if(show==false){
      this.isChart = 0;
      if(type==1){
        this.service.getStatisticByDateRoute(this.dateValue,type).subscribe(
          data => {
            console.log(this.listRoute);
            var lStatistic = data.data;
            this.listStatistic = [];
            
            for(let i of lStatistic){
              for(let j of this.listRoute){
                if(i.idTuyenXe == j.id){
                  var item = {
                    time:i.time,
                    route:j.ben_xe_di + " ⇒ "+j.ben_xe_toi,
                    number:i.tongVe,
                    totalMoney:i.doanhThu
                  }
                  this.listStatistic.push(item);
                }
              }
            }
            console.log(this.listStatistic); 
        }
        );
      }
      else{
        this.service.getStatisticsByMonthRoute(this.dateValue,type).subscribe(
          data => {
            this.listStatistic = [];
            var lStatistic = data.data;
            console.log(lStatistic);
            console.log("Tuyến ");
            console.log(this.listRoute);

            for(let i of lStatistic){
              for(let j of this.listRoute){
                if(i.idTuyenXe == j.id){
                  alert(123)
                  var item = {
                    time:i.time,
                    route:j.ben_xe_di + " ⇒ "+j.ben_xe_toi,
                    number:i.tongVe,
                    totalMoney:i.doanhThu
                  }
                  this.listStatistic.push(item);
                }
              }
            }
            console.log(this.listStatistic);
            
          }
        );
      }
    }
    else{
      this.isChart = 1;
      if(type==1){
        this.service.getStatisticsByDateRevenue(this.dateValue,type).subscribe(
          data => {
            var length = data.data.length;
            var listData = data.data;
            console.log("data");
            console.log(data.data);
            if(length == 31){
              if(this.listDate.length == 30)
                this.listDate.push("Ngày 31");
            }
            else{
              if(this.listDate.length == 31)
                this.listDate.pop();
  
            }
            console.log("list date");
            console.log(this.listDate)
            this.listDataDate = [];
  
            for(let i =0;i<length;i++){
              this.listDataDate.push(listData[i].totalAmount);
            }
            console.log("date of revenue")
            console.log(data);
            console.log(this.listDataDate);

            this.drawChart(type);
          }
        );
      }
      else{
        this.service.getStatisticsByMonthRevenue(this.dateValue,type).subscribe(
          data => {
            var length = data.data.length;
            var listData = data.data;
            console.log('data')
            console.log(data.data)
            
            this.listDataMonth = [];
  
            for(let i=0;i<length;i++){
              this.listDataMonth.push(listData[i].totalAmount);
            }
            console.log("month of route")
            console.log(this.listDataMonth);
            this.drawChart(type);
          }
        );
      }
    }
    this.isCreateAccount = 1;
  }

  drawChart(type:any){
    if(type==2){
      
      this.chart = new Chart(this.myChart, {
        type: 'bar',
        data: {
            labels: this.listMonth,
            datasets:[{
              label:"",
              data: this.listDataMonth,
              backgroundColor:this.listColorMonth,
              borderColor: this.listColorMonth
            }]
          }
        });
    }
    else{

      this.chart = new Chart(this.myChart, {
        type: 'bar',
        data: {
            labels: this.listDate,
            datasets:[{
              label:"",
              data: this.listDataDate,
              backgroundColor:this.listColorDate,
              borderColor: this.listColorDate
            }]
        }
      });
    }
  }

  myChart;
  onChangeTypeChart(show:any, type:any){
    if(show==true){
      this.typeChart = type==1?3:4;
      this.myChart = type==1?"myChart3":"myChart4";
    }
  }

  onChangeRoute(obj:any){
    this.listDestinationForRoute = JSON.parse(sessionStorage.getItem('lBenDi'));
    var length = this.listDestinationForRoute.length;
    for(var i = 0; i<length; i++){
      if(this.listDestinationForRoute[i].id == obj){
        this.listDestinationForRoute.splice(i,1);
        break;
      }
    }

    for(let j = 0; j<length;j++){
      for(let i of this.listRoute){
        if(i.ben_xe_di_id == obj && i.ben_xe_toi_id == this.listDestinationForRoute[j].id){
          this.listDestinationForRoute.splice(j,1);
        }
      }
    }
    
    console.log("du lieu tuyen xe");
    console.log(this.listRoute);
    console.log("du lieu xe toi");
    console.log(this.listDestinationForRoute);
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

    if(this.form.invalid){
      return alert("Xin hãy nhập đúng loại giá trị hoặc điền đầy đủ thông tin");
    }

    this.service.postCreateAccount(this.logIn.Token,account).subscribe(
      data => {
        if(data.status==200){
          this.getAllAccount();
          return alert("Tạo tài khoản thành công");
        }
        else
          alert("Không thể tạo tài khoản này")
          return;
      }
    )
  }

  createRoute(){
    if(this.formRoute.invalid){
      return alert("Xin hãy nhập đúng loại giá trị hoặc điền đầy đủ thông tin");
    }



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
      khoang_cach:this.formRoute.value.khoang_cach==""?this.route.khoang_cach:this.formRoute.value.khoang_cach,
      gia_ca:this.formRoute.value.gia_ca==""?this.route.gia_ca:this.formRoute.value.gia_ca,
      khoang_thoi_gian:this.formRoute.value.khoang_thoi_gian==""?this.route.khoang_thoi_gian:this.formRoute.value.khoang_thoi_gian
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
    /* this.listDestination = JSON.parse(sessionStorage.getItem('lBenToi')); */
    this.listDestinationForRoute = JSON.parse(sessionStorage.getItem('lBenDi'));
    console.log("Bến di");
    console.log(this.listDestinationForRoute)
    this.service.getAllRoute().subscribe(
      data => {
        this.listRoute =  data.data;
      }
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

/*     if(this.formCar.invalid){
      return alert("Xin hãy nhập đúng loại giá trị hoặc nhập đầy đủ dữ liệu");
    } */

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
        if(data.data != null) {
          this.getAllCar();
          return alert("Thêm thành công");
        }
        else return alert("Thêm thất bại");
      }
    );
  }

  updateCar(){
    var car = {
      ten_xe : this.formCar.value.ten_xe==""?this.route.tenXe:this.formCar.value.ten_xe,
      hang_xe : this.formCar.value.hang_xe==""?this.route.hangXe:this.formCar.value.hangXe,
      tuyen_san_sang_id:this.route.tuyenSanSangId,
      tuyen_off_id:this.route.tuyenOffId,
      gio_chay:this.formCar.value.gio_chay==""?this.route.gioChay:this.formCar.value.gio_chay
    }

    this.service.postUpdateCar(this.logIn.Token,this.route.xeId, car).subscribe(
      data => {
        if(data.status == 200){
          this.getAllCar();
          alert("Cập nhật thành công");
        }
        else alert("Cập nhật thất bại");
      }
    )
  }

  hinhAnh;

  onSubmit(data:any){
    this.isWaiting = true;
    if(data == 1){
      var data1 = {}
      if(this.fileSelected==null){
        data1 = {
          ten_ben:this.formPoint.value.ten_ben,
          dia_chi:this.formPoint.value.dia_chi,
          thanh_pho:this.formPoint.value.thanh_pho,
          picture:null,
        };
        console.log(data1);
      }
      else{
        this.service.uploadImage(this.fileSelected)
        .pipe()
        .subscribe(
        res => {
          this.hinhAnh = "https://drive.google.com/uc?id="+res.id;
          data1 = {
              ten_ben:this.formPoint.value.ten_ben,
              dia_chi:this.formPoint.value.dia_chi,
              thanh_pho:this.formPoint.value.thanh_pho,
              picture:this.hinhAnh,
            };
            this.onCreateRoute(data1);
          }
        )
      }

    }
    else{
      var data1 = {}
      var hinhAnh;
      console.log("AAA");
      console.log(this.route);
      if(this.fileSelected==null){
        if(this.route.picture!=null)
          hinhAnh = this.route.picture;
        else
          hinhAnh = null;

        data1 = {
          ten_ben:this.formPoint.value.ten_ben==""?this.route.ben_toi:this.formPoint.value.ten_ben,
          dia_chi:this.formPoint.value.dia_chi==""?this.route.dia_chi:this.formPoint.value.dia_chi,
          picture:hinhAnh,
        };
      }
      else{
        this.service.uploadImage(this.fileSelected)
        .pipe()
        .subscribe(
        res => {
          this.hinhAnh = "https://drive.google.com/uc?id="+res.id;
          data1 = {
              ten_ben:this.formPoint.value.ten_ben==""?this.route.ben_toi:this.formPoint.value.ten_ben,
              dia_chi:this.formPoint.value.dia_chi==""?this.route.dia_chi:this.formPoint.value.dia_chi,
              picture:this.hinhAnh,
            };
            console.log(data1);
            this.onUpdatePoint(this.route.id,data1)
          }
        )
      }
      
    }
    
    this.srcImage = "";
    this.ResetText();
    this.isCreateAccount = 1;
    this.ResetText();
  }

  onGetRouteToExport(){
    this.service.getAllRouteToExport(this.logIn.Token).subscribe(
      data => {
        var listRoute = data.data;
        console.log(this.listRoute);
        console.log(listRoute);
        for(let i of listRoute){
          for(let j of this.listRoute){
            if(i.id_tuyen_xe.toString() == j.id.toString()){
              var route = {
                id_tuyen_xe:i.id_tuyen_xe,
                ben_xe_di:j.ben_xe_di,
                ben_xe_toi:j.ben_xe_toi,
                gio_chay: i.gio_chay,
                so_luong_ve:i.so_luong_ve
              }
              this.listRouteExport.push(route)
            }
          }
        }
        console.log(this.listRouteExport);
      }
    )
  }

  onPostExcel(obj:any){
    console.log(obj);

    this.service.postExcel(this.logIn.Token,obj.id_tuyen_xe,obj.gio_chay).subscribe(
      data => {
        var infor = data.data;
        var route = {
          "Tuyến xe":infor.tuyen_xe,
          "Ngày chạy":infor.ngay_chay,
          "Tổng vé":infor.tong_ve,
          "Giờ chạy":infor.gio_chay,
        }
        this.data.push(route);
        for(let i of infor.danh_sach_ve){
          var routeInfor = {
            "Tên khách hàng":i.ten_khach_hang,
            "Số điện thoại":i.so_dien_thoai,
            "Mã vé":i.ma_ve,
            "Ví trí giường":i.vi_tri_giuong.toString()
          }
          this.data.push(routeInfor)
        }
        this.exportAsExcelFile(this.data,infor.tuyen_xe);
      }
    );
 }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION );
  }

  routeInfor;
  onGetAllRouteInfor(){
    this.service.getAllRouteInfor().subscribe(
      data => {
        this.routeInfor = data.data;
        console.log("Bến ")
        console.log(this.routeInfor);

      }
    )
  }

  onCreateRoute(data:any){
    this.service.postCreateB(this.logIn.Token,data).subscribe(
      data =>{
        if(data.data != null){
          this.onGetAllRouteInfor();
          this.isWaiting = false;
          alert("Thành công");
        }
        else {
          this.isWaiting = false;
          alert("Không tạo được bến");
        }
      }
    )
  }

  onUpdatePoint(id:any,data:any){

    this.service.postUpdateB(this.logIn.Token,id,data).subscribe(
      data =>{
        if(data.status == 200){
          this.onGetAllRouteInfor();
          this.isWaiting = false;
          alert("Cập nhật bến thành công");
        }
        else {
          this.isWaiting = false;
          alert("Không cập nhật được bến");
        }
      }
    )
  }
}

