import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogInService } from "../../../shared/log-in.service";

@Component({
  selector: 'app-infor-personal',
  templateUrl: './infor-personal.component.html',
  styles: [
  ]
})
export class InforPersonalComponent implements OnInit {

  isEdit = false;
  inforCustomer;
  customer;

  form:FormGroup;



  constructor(private fb:FormBuilder, private service: LogInService) { }

  ngOnInit(): void {
    this.load();
  }

  onEdit(){
    var ad = (<HTMLInputElement>document.getElementById('list-item-city'))
    if(!this.isEdit){
      this.isEdit = true
      ad.disabled = false
      ad = (<HTMLInputElement>document.getElementById('list-item-district')) 
      ad.disabled = false
    }
    else{
      this.form.value.ten = this.inforCustomer.tenKh;
      this.form.value.cmnd = this.inforCustomer.cmnd;
    
      this.service.postChangeInforPersional(this.customer.Token, this.customer.id,this.form.value)
      .subscribe(data => {
        if(data.status == 200){
          this.inforCustomer = data.data
        }
      });
    
      
      this.isEdit = false
      ad = (<HTMLInputElement>document.getElementById('list-item-city'))
      ad.disabled = true
      ad = (<HTMLInputElement>document.getElementById('list-item-district')) 
      ad.disabled = true
    }

  }

  load(){
    this.customer = JSON.parse(sessionStorage.getItem('login'));
    this.service.getInforCustomer(this.customer.Token,this.customer.id).subscribe(
      data => {
        this.inforCustomer = data.data;
        this.form = this.fb.group({
          ten:[this.inforCustomer.tenKh, [Validators.required]],
          cmnd:[this.inforCustomer.cmnd, [Validators.required]],
          email:[this.inforCustomer.email, [Validators.required]],
          dia_chi:[this.inforCustomer.diaChi, [Validators.required]],
          thanh_pho:[this.inforCustomer.thanhPho, [Validators.required]],
          quan_huyen:[this.inforCustomer.quanHuyen, [Validators.required]],
          sdt:[this.inforCustomer.sdt, [Validators.required]],
        })

      }
    );
  }
}
