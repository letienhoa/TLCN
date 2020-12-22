import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { NewsDetailsComponent } from './news/news-details/news-details.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DetailComponent } from './schedule/detail/detail.component';
import { SelectRouteComponent } from './book-tickets/select-route/select-route.component';
import { SelectSeatComponent } from './book-tickets/select-seat/select-seat.component';
import { InforCustomerComponent } from './book-tickets/infor-customer/infor-customer.component';
import { PayComponent } from './book-tickets/pay/pay.component';
import { RulesComponent } from './policy/rules/rules.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SuccessComponent } from './account/success/success.component';
import { AddminComponent } from './account/addmin/addmin.component';
import { SelectSeatReturnAwayComponent } from './book-tickets/select-seat-return-away/select-seat-return-away.component';
import { PayTwoWayComponent } from './book-tickets/pay-two-way/pay-two-way.component';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'news', component:NewsListComponent},
  {path:'news/details', component:NewsDetailsComponent},
  {path:'schedule', component:ScheduleComponent},
  {path:'schedule/detail/:id', component:DetailComponent},
  {path:'booktickets/select-route', component:SelectRouteComponent},
  {path:'booktickets/select-seat', component:SelectSeatComponent},
  {path:'booktickets/infor-customer', component:InforCustomerComponent},
  {path:'booktickets/pay', component:PayComponent},
  {path:'policy/rules', component:RulesComponent},
  {path:'invoice', component:InvoiceComponent},
  {path:'login/customer/:email', component:SuccessComponent},
  {path:'login/admin/:email', component:AddminComponent},
  {path:'booktickets/select-seat-two-way', component:SelectSeatReturnAwayComponent},
  {path:'booktickets/pay-two-way', component:PayTwoWayComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
