import { Component, OnInit } from '@angular/core';
import { BookService } from "../shared/book.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styles: [
  ]
})
export class ScheduleComponent implements OnInit {

  allRouter = [];

  constructor(private service: BookService, private route: Router) { }

  ngOnInit(): void {
    this.getAllRoter();
  }

  getAllRoter(){
    this.service.getRouter().subscribe(
      data => {
        this.allRouter = data.data;
      }
    );
  }

  onClick(item:any){
    sessionStorage.setItem('schedule',JSON.stringify(item));
    this.route.navigate(['/booktickets/select-route']);
  }
}
