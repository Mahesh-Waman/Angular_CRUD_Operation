import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import {MatToolbarModule,MatSnackBarModule,MatMenuModule,MatInputModule,MatCardModule,MatButtonModule,MatCheckboxModule,MAT_CHECKBOX_CLICK_ACTION} from '@angular/material'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {NavComponent} from './nav/nav.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import { MyRedDirective,ChangeBgColorDirective } from './my-red.directive';
import {HttpClientModule} from '@angular/common/http'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    RegistrationComponent,
    LoginComponent,
    MyRedDirective,
    ChangeBgColorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  HttpClientModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
    MatButtonModule,MatMenuModule, MatCardModule, MatInputModule, MatSnackBarModule, MatToolbarModule,MatCheckboxModule
  ],
  providers: [AuthService,AuthGuard,
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
