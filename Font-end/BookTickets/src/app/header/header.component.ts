import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { LogInService } from '../shared/log-in.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() index = 0;
  @Input() success = 0;

  @Input() pointAward = "";
  @Input() totalPoint = "";

  isShow = false;

  email=''
  nav: any
  customerInfor;

  constructor(private route: Router, private ac: ActivatedRoute, private service: LogInService) { }

  ngOnInit(): void {

    this.onChange(this.index);
    this.onPersonal();
    this.email = this.ac.snapshot.params['email'];
    this.onShowDown();
  }

  onClick(){   
    var nav = document.getElementsByClassName('nav')
    nav[0].classList.toggle('collapse')
  } 

  onChange(index:any){
    this.nav = document.getElementsByClassName('item')
    if(index==-1){
      for(let i = 0; i< this.nav.length; i++){
        this.nav[i].classList.remove('pick')
      }
      return
    }
    if(index>2){
      index = index -1;
    }
    this.nav[index].classList.add('pick')
    for(let i = 0; i< this.nav.length; i++){
      if( i != index ){
        this.nav[i].classList.remove('pick')
      }
    }
  }

  onPersonal(){
    if(this.success==1){
      var p = (<HTMLInputElement>document.getElementById("people"))
      p.style.display = 'none'
      var per = (<HTMLInputElement>document.getElementById("personal"))
      per.style.display = 'inital'
      p = (<HTMLInputElement>document.getElementById("addmin"))
      p.style.display = 'none'

    }
    else if(this.success==2){
      var per = (<HTMLInputElement>document.getElementById("personal"))
      per.style.display = 'none'
      var p = (<HTMLInputElement>document.getElementById("people"))
      p.style.display = 'none'
      p = (<HTMLInputElement>document.getElementById("addmin"))
      p.style.display = 'inital'
    }
    else{
      var p = (<HTMLInputElement>document.getElementById("personal"))
      p.style.display = 'none'
      p = (<HTMLInputElement>document.getElementById("addmin"))
      p.style.display = 'none'
    }
  }

  onShowDown(){
    var nav = document.getElementsByClassName('logOut')
    nav[0].classList.toggle('display_logout')
  }

  onLogOut(){
   const token = JSON.parse(sessionStorage.getItem('login')).Token;
   this.service.getLogOut(token).subscribe(
     data => {
       if(data.status == 200)
        this.route.navigate(['/'])
     }
   )
  }
}
