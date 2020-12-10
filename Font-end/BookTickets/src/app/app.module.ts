import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
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

import {HttpClientModule} from '@angular/common/http'; 

import { SuccessComponent } from './account/success/success.component';
import { BookTicketComponent } from './account/success/book-ticket/book-ticket.component';
import { HistoryComponent } from './account/success/history/history.component';
import { RewardPointComponent } from './account/success/reward-point/reward-point.component';
import { InforLoginComponent } from './account/success/infor-login/infor-login.component';
import { InforPersonalComponent } from './account/success/infor-personal/infor-personal.component';
import { SelectPayComponent } from './account/success/pay/select-pay/select-pay.component';
import { AddminComponent } from './account/addmin/addmin.component';

import { BookService } from '../../src/app/shared/book.service';
import {LogInService} from '../../src/app/shared/log-in.service';
import {AdminService  } from "../../src/app/shared/admin.service";
import { PaypallComponent } from './paypall/paypall.component';
import { SelectSeatReturnAwayComponent } from './book-tickets/select-seat-return-away/select-seat-return-away.component';
import { PayTwoWayComponent } from './book-tickets/pay-two-way/pay-two-way.component';
import { PaypallTwoWayComponent } from './paypall-two-way/paypall-two-way.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NewsListComponent,
    NewsDetailsComponent,
    ScheduleComponent,
    DetailComponent,
    SelectRouteComponent,
    SelectSeatComponent,
    InforCustomerComponent,
    PayComponent,
    RulesComponent,
    InvoiceComponent,
    SuccessComponent,
    BookTicketComponent,
    HistoryComponent,
    RewardPointComponent,
    InforLoginComponent,
    InforPersonalComponent,
    SelectPayComponent,
    AddminComponent,
    PaypallComponent,
    SelectSeatReturnAwayComponent,
    PayTwoWayComponent,
    PaypallTwoWayComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
   
  ],
  providers: [LogInService,BookService,AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
