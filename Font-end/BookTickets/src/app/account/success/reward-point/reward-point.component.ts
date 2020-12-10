import { Component, OnInit } from '@angular/core';
import { LogInService } from 'src/app/shared/log-in.service';

@Component({
  selector: 'app-reward-point',
  templateUrl: './reward-point.component.html',
  styles: [
  ]
})
export class RewardPointComponent implements OnInit {

  point;

  constructor(private service: LogInService) { }

  ngOnInit(): void {
    this.getPointCustomer();
  }


  getPointCustomer(){
    var login =JSON.parse(sessionStorage.getItem("login"));
    this.service.getPointCustomer(login.Token, login.id).subscribe(
      data => {
        this.point = data.data;
        

      }
    )
  }

}
