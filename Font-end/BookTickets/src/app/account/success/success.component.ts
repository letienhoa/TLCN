import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogInService } from 'src/app/shared/log-in.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styles: [
  ]
})
export class SuccessComponent implements OnInit {

  logIn;
  taiKhoan = "";
  index:any;
  customer;
  constructor(private route: ActivatedRoute, private service: LogInService) { }

  ngOnInit(): void {
    this.taiKhoan = this.route.snapshot.params['email'];
    this.load()
  }


  load(){
    this.loadChange(0)
    this.logIn =  JSON.parse(sessionStorage.getItem('login'));
    this.getInforCustomerById();
  }

  loadChange(index:any){
    var root = document.getElementsByClassName('container-success')
    var chil = root[0].getElementsByClassName('item')
    for(let i=0; i< chil.length; i++){
      chil[i].classList.remove('change')
    }
    chil[index].classList.add('change')
    this.index = index
  }

  getInforCustomerById(){
    this.service.getInforCustomer(this.logIn.Token,this.logIn.id).subscribe(
      data => {
        this.customer= data.data
        sessionStorage.setItem("customerInfor",JSON.stringify(this.customer));
      }
    );
  }



}
