import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styles: [
  ]
})
export class SuccessComponent implements OnInit {

  index:any
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const itemId = this.route.snapshot.params['email'];
    this.load()
  }


  load(){
    this.loadChange(0)

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

}
