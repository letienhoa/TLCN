import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() index = 0;
  @Input() success = 0;
  email=''
  nav: any

  constructor(private route: Router, private ac: ActivatedRoute) { }

  ngOnInit(): void {
    this.onChange(this.index)
    this.onPersonal()
    this.email = this.ac.snapshot.params['email']
    this.onShowDown()
  }

  onClick(){   
    var nav = document.getElementsByClassName('nav')
    nav[0].classList.toggle('collapse')

  } 

  onRouter(index: any){
    switch(index){
      case 1:{
        this.onChange(1);
        this.route.navigate(['/schedule']);
      }
      break;
      default:{
        this.onChange(0);
        this.route.navigate(['']);
      }
    }
  }

  onChange(index:any){
    this.nav = document.getElementsByClassName('item')
    if(index==-1){
      for(let i = 0; i< this.nav.length; i++){
        this.nav[i].classList.remove('pick')
      }
      return
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
}
